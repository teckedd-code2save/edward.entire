#!/usr/bin/env python3
"""Exercise the production portfolio with its real WASM. Synthetic data exists only in this test."""
import functools, hashlib, http.server, json, pathlib, threading, time
from playwright.sync_api import sync_playwright

ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/evidence/bnl-playground-2026-09-28';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',4183),functools.partial(Quiet,directory=str(ROOT/'dist')))
threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
def check(name,condition):
    checks.append({'name':name,'passed':bool(condition)})
    if not condition:raise AssertionError(name)
def ready(page):page.get_by_role('status').filter(has_text='Ready. Your runtime starts with zero records.').wait_for(timeout=20000)
def execute(page,source=None,inputs=None):
    if source is not None:page.get_by_label('BNL declaration',exact=True).fill(source)
    if inputs is not None:page.get_by_label('Typed inputs · use an ID from your records',exact=True).fill(json.dumps(inputs))
    page.get_by_role('button',name='Run declaration',exact=False).click()
    page.get_by_role('button',name='Compile only',exact=True).wait_for()
    page.wait_for_function("!document.querySelector('.bnl-run-actions button').disabled")
    return json.loads(page.get_by_label('result output',exact=True).inner_text())
def state(page):
    page.get_by_role('button',name='Session state',exact=True).click()
    return json.loads(page.get_by_label('state output',exact=True).inner_text())
def load(page,data):
    page.get_by_label('Records · JSON',exact=True).fill(json.dumps(data,indent=2))
    page.get_by_role('button',name='Load records',exact=True).click()
    page.wait_for_function("!document.querySelector('.bnl-actions button').disabled")

try:
 with sync_playwright() as pw:
    browser=pw.chromium.launch(args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1050},device_scale_factor=1)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:4183/#/playground/bnl');ready(page)
    check('fresh runtime is empty',all(not rows for rows in state(page).values()))
    check('no default typed customer value',json.loads(page.get_by_label('Typed inputs · use an ID from your records',exact=True).input_value())['customerId']['value']=='')
    page.get_by_role('button',name='Result',exact=True).click();page.screenshot(path=str(OUT/'01-empty-desktop.png'),full_page=True)
    traffic=[];page.on('request',lambda r:traffic.append({'url':r.url,'method':r.method,'body':r.post_data}))
    customer={'id':'visitor-test-c','name':'<img src=x onerror=alert(1)>','email':'visitor@example.invalid'}
    page.get_by_label('Customer ID',exact=True).fill(customer['id']);page.get_by_label('Name',exact=True).fill(customer['name']);page.get_by_label('Email',exact=True).fill(customer['email'])
    page.get_by_role('button',name='Add customer & load',exact=True).click()
    page.wait_for_function("!document.querySelector('.bnl-run-actions button').disabled")
    query=page.get_by_label('BNL declaration',exact=True).input_value();query_inputs={'customerId':{'type':'CustomerId','value':customer['id']}}
    check('empty orders produce an actual empty result',execute(page)['value']==[])
    data={'customers':[customer],'orders':[{'id':'order-a','customerId':customer['id'],'state':'completed','createdAt':'2026-01-02'},{'id':'order-b','customerId':customer['id'],'state':'completed','createdAt':'2026-01-03'}],'invoices':[{'id':'visitor-invoice','customerId':customer['id'],'amountMinor':1731,'overdueDays':47,'paid':False}],'subscriptions':[]}
    load(page,data)
    check('actual imported orders returned',execute(page)['value'][0]['id']=='order-b')
    check('declaration ordering changes output',execute(page,query.replace('descending','ascending'))['value'][0]['id']=='order-a')
    data['orders'][0]['createdAt']='2026-02-01';load(page,data)
    check('data changes alter output',execute(page,query)['value'][0]['id']=='order-a')
    check('incorrect nominal type rejects',execute(page,inputs={'customerId':{'type':'InvoiceId','value':customer['id']}})['code']=='BNL2301')
    check('unsupported language rejects',str(execute(page,'Please invent a backend',query_inputs)['code']).startswith('BNL'))
    bad=json.loads(json.dumps(data));bad['customers'].append(customer);load(page,bad)
    check('invalid import reports rejection','PLAY422' in page.get_by_role('status').inner_text())
    check('invalid import preserves previous data',len(state(page)['customers'])==1)
    load(page,data)
    task='Compose UserTask\nInput invoiceId: InvoiceId\nAllow Invoice.FollowUp\nCall task using FollowUpTask.Create.v1 with invoiceId = $input.invoiceId when true\nReturn task'
    ii={'invoiceId':{'type':'InvoiceId','value':'visitor-invoice'}}
    check('failed policy rejects after local write',execute(page,task.replace('Return task','Require false\nReturn task'),ii)['code']=='BNL3400')
    check('failed execution rolls back local tasks',state(page)['tasks']==[])
    page.get_by_role('button',name='Execution trace',exact=True).click()
    trace=json.loads(page.get_by_label('trace output',exact=True).inner_text())
    check('trace records rollback',any(e['status']=='rolled-back' for e in trace))
    check('real local write commits',execute(page,task,ii)['value']['performed'] is True)
    check('local task contains supplied invoice ID',state(page)['tasks'][0]['invoiceId']=='visitor-invoice')
    execute(page,task,ii);check('session persists between calls',len(state(page)['tasks'])==2)
    banned=task.replace('FollowUpTask.Create.v1','AccountManager.NotifyOverdueInvoice.v1').replace('when true','when false')
    check('external effects rejected even when unreachable',execute(page,banned,ii)['code']=='PLAY403')
    check('visitor content rendered as text',len(page.locator('img[src="x"]').all())==0)
    second=browser.new_page();second.goto('http://127.0.0.1:4183/#/playground/bnl');ready(second)
    check('separate tabs have separate stores',all(not rows for rows in state(second).values()));second.close()
    execute(page,query,query_inputs)
    with page.expect_download() as download:page.get_by_role('button',name='Export workspace',exact=False).click()
    exported=json.loads(pathlib.Path(download.value.path()).read_text())
    check('export captures actual request and result',exported['lastRequest']['source']==query and exported['execution']['value'][0]['id']=='order-a')
    page.locator('.bnl-output').scroll_into_view_if_needed();page.screenshot(path=str(OUT/'02-real-result-desktop.png'))
    check('execution sends no data over the network',not any(r['method']!='GET' or 'visitor-test-c' in r['url'] or r['body'] for r in traffic))
    check('no localStorage persistence',page.evaluate('Object.keys(localStorage).length')==0)
    mobile=browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
    mobile.goto('http://127.0.0.1:4183/#/playground/bnl');ready(mobile)
    check('mobile page has no horizontal overflow',mobile.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
    mobile.get_by_role('button',name='Toggle navigation',exact=True).click();check('mobile playground link accessible',mobile.get_by_role('link',name='Playground',exact=True).is_visible())
    mobile.get_by_role('button',name='Toggle navigation',exact=True).click();mobile.screenshot(path=str(OUT/'03-mobile-empty.png'),full_page=True)
    mobile.get_by_label('Customer ID',exact=True).focus();mobile.keyboard.press('Tab');check('keyboard moves to Name field',mobile.get_by_label('Name',exact=True).evaluate('(el)=>el===document.activeElement'))
    mobile.close()
    page.get_by_role('button',name='Restart empty session',exact=True).click();ready(page);check('restart clears effects and records',all(not rows for rows in state(page).values()))
    page.goto('http://127.0.0.1:4183/#/article/bnl-getting-started')
    page.get_by_role('heading',name='1. Start with a customer you choose',exact=True).wait_for()
    check('guide links to working playground',page.locator('a[href="#/playground/bnl"]').count()>=2)
    page.goto('http://127.0.0.1:4183/#/article/bnl-runtime-boundaries')
    page.get_by_role('heading',name='Local effects have a precise meaning',exact=True).wait_for()
    check('boundary guide renders',page.get_by_role('heading',name='Local effects have a precise meaning').is_visible())
    broken=browser.new_page();broken.route('**/bnl/worker.js',lambda route:route.fulfill(status=200,content_type='application/javascript',body='throw new Error("test-only worker failure")'))
    broken.goto('http://127.0.0.1:4183/#/playground/bnl');broken.get_by_role('status').filter(has_text='runtime stopped').wait_for(timeout=20000)
    check('fatal worker errors visibly stop execution',broken.get_by_role('button',name='Run declaration',exact=False).is_disabled());broken.close()
    check('no application exceptions',not errors)
    browser.close()
finally:
 server.shutdown()
 report={'suite':'BNL actual-WASM browser acceptance','syntheticTestInputsOnly':True,'checks':checks,'passed':sum(c['passed'] for c in checks),'total':len(checks),'build':json.loads((ROOT/'public/bnl/build-manifest.json').read_text())}
 (OUT/'browser-scorecard.json').write_text(json.dumps(report,indent=2)+'\n')
 print(json.dumps({'passed':report['passed'],'total':report['total'],'checks':checks},indent=2))
