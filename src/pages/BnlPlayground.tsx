import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BnlSession, emptyData, pretty, recipes } from '../lib/bnl';
import type { BnlResponse } from '../lib/bnl';
import './BnlPlayground.css';

type Recipe = keyof typeof recipes;
type Panel = 'result' | 'trace' | 'state' | 'bir';
const initialInputs = pretty({ customerId: { type: 'CustomerId', value: '' } });
export default function BnlPlayground() {
  const session = useRef<BnlSession | null>(null);
  const [generation, setGeneration] = useState(0);
  const [recipe, setRecipe] = useState<Recipe>('orders');
  const [source, setSource] = useState(recipes.orders.source);
  const [inputs, setInputs] = useState(initialInputs);
  const [data, setData] = useState(pretty(emptyData));
  const [loadedData, setLoadedData] = useState(pretty(emptyData));
  const [response, setResponse] = useState<BnlResponse | null>(null);
  const [lastRequest, setLastRequest] = useState<unknown>({ action: 'init' });
  const [catalogue, setCatalogue] = useState<unknown>(null);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('Loading the Rust runtime…');
  const [fatal, setFatal] = useState(false);
  const [panel, setPanel] = useState<Panel>('result');
  const [customer, setCustomer] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    const current = new BnlSession(); session.current = current;
    let active = true;
    current.send({ action: 'init' }).then(result => {
      if (!active) return;
      setResponse(result); setLastRequest({ action: 'init' }); setCatalogue(result.catalogue); setFatal(false);
      setLoadedData(pretty(emptyData)); setMessage('Ready. Your runtime starts with zero records.');
    }).catch(error => { if (active) { setFatal(true); setMessage(String(error.message)); } })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; current.dispose(); };
  }, [generation]);

  async function dispatch(request: unknown): Promise<BnlResponse | undefined> {
    if (!session.current || busy || fatal) return;
    setBusy(true);
    try {
      const result = await session.current.send(request); setResponse(result); setLastRequest(request);
      setMessage(result.error ? `${result.error.code}: ${result.error.message}${result.error.line ? ` (line ${result.error.line})` : ''}` :
        result.status === 'succeeded' ? 'Run committed to this local session.' :
          result.status === 'compiled' ? 'Declaration compiled. Inspect BIR; no execution occurred.' :
            result.status === 'imported' ? 'Your records are loaded. Previous local effects were cleared.' : 'Session reset to zero records.');
      return result;
    } catch (error) {
      session.current.dispose(); setFatal(true); setResponse(null);
      setMessage(error instanceof Error ? error.message : 'Runtime failed. Restart to continue.');
    } finally { setBusy(false); }
  }
  async function loadData(text = data) {
    try {
      const value: unknown = JSON.parse(text);
      const result = await dispatch({ action: 'import', data: value });
      if (result?.status === 'imported') setLoadedData(text);
    } catch { setMessage('The records editor is not valid JSON. Nothing was changed.'); }
  }
  function chooseRecipe(value: Recipe) {
    setRecipe(value); setSource(recipes[value].source);
    setInputs(pretty({ [recipes[value].input]: { type: recipes[value].type, value: '' } }));
  }
  async function addCustomer(event: FormEvent) {
    event.preventDefault();
    try {
      const value = JSON.parse(data) as Record<string, unknown>;
      if (!value || typeof value !== 'object' || !Array.isArray(value.customers)) throw new Error();
      const next = pretty({ ...value, customers: [...value.customers, customer] });
      const result = await dispatch({ action: 'import', data: JSON.parse(next) as unknown });
      if (result?.status === 'imported') {
        setData(next); setLoadedData(next);
        if (recipe === 'orders') setInputs(pretty({ customerId: { type: 'CustomerId', value: customer.id } }));
        setCustomer({ id: '', name: '', email: '' });
      }
    } catch { setMessage('Fix the records JSON first; customers must be an array.'); }
  }
  async function run(action: 'run' | 'compile') {
    setPanel(action === 'compile' ? 'bir' : 'result');
    try { await dispatch(action === 'compile' ? { action, source } : { action, source, inputs: JSON.parse(inputs) as unknown }); }
    catch { setMessage('Typed inputs must be valid JSON. Nothing ran.'); }
  }
  async function readFile(file?: File) {
    if (!file) return;
    if (file.size > 65536) { setMessage('Choose a JSON dataset smaller than 64 KiB.'); return; }
    try { const text = await file.text(); JSON.parse(text); setData(text); setMessage('File opened in the editor. Select Load records to validate and apply it.'); }
    catch { setMessage('Could not read a valid JSON file.'); }
  }
  function download() {
    const workspace = { schema: 'bnl-playground-export-1', source, inputsText: inputs, datasetText: loadedData, unappliedDatasetText: data === loadedData ? undefined : data, lastRequest, execution: response };
    const url = URL.createObjectURL(new Blob([pretty(workspace)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'my-bnl-workspace.json'; link.click(); URL.revokeObjectURL(url);
  }
  const disabled = busy || fatal;
  const state = response?.state;
  const records = ['customers', 'orders', 'subscriptions', 'invoices'].reduce((n, key) => n + (state?.[key]?.length ?? 0), 0);
  const effects = (state?.tasks?.length ?? 0) + (state?.reviews?.length ?? 0);
  const output = panel === 'result' ? response?.error ?? (response?.status === 'succeeded' ? { type: response.outputType, value: response.value, committed: response.committed } : null)
    : panel === 'trace' ? response?.trace : panel === 'state' ? state : response?.bir;
  return (
    <div className="bnl-page">
      <header className="bnl-hero page-shell">
        <div className="bnl-eyebrow"><span>THE WORKBENCH / 01</span><span>BNL · EXECUTABLE PREVIEW</span></div>
        <h1>Your words.<br /><em>Actual execution.</em></h1>
        <div className="bnl-intro"><p>Write a backend declaration. Bring your own records. See what the compiler builds and what the runtime actually does.</p><Link to="/article/bnl-getting-started">Start with the walkthrough <span>↗</span></Link></div>
        <div className="bnl-runtime-strip"><span className={fatal ? 'bnl-signal offline' : 'bnl-signal'}>{busy ? 'Working…' : fatal ? 'Runtime stopped' : 'Rust → WebAssembly'}</span><span>{response ? `${records} records · ${effects} local tasks / reviews` : 'No active session'}</span><span>In this tab · no data upload</span></div>
      </header>
      <div className="page-shell bnl-workspace">
        <aside className="bnl-data bnl-card">
          <div className="bnl-section-label"><span>01 / YOUR DATA</span><span>Starts empty</span></div>
          <h2>Bring something real.</h2>
          <p className="bnl-help">Add a customer you choose, then enter related records below. Use data you are comfortable working with here. Everything stays in this tab’s runtime memory.</p>
          <form onSubmit={addCustomer} className="bnl-customer-form">
            <label>Customer ID<input required maxLength={128} pattern="[A-Za-z0-9_-]+" value={customer.id} onChange={e => setCustomer({ ...customer, id: e.target.value })} placeholder="Your own ID" /></label>
            <label>Name<input required maxLength={1024} value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Customer or organisation" /></label>
            <label>Email<input required type="email" maxLength={1024} value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} placeholder="Enter an email" /></label>
            <button disabled={disabled} className="bnl-secondary" type="submit">Add customer & load</button>
          </form>
          <label className="bnl-editor-label" htmlFor="bnl-data">Records · JSON</label>
          <textarea id="bnl-data" className="bnl-code bnl-records" spellCheck={false} value={data} onChange={e => setData(e.target.value)} aria-describedby="bnl-data-help" />
          <p id="bnl-data-help" className="bnl-help">Up to 200 records / 64 KiB. Import replaces the dataset and clears local effects. Omit tenantId.</p>
          <div className="bnl-actions"><button disabled={disabled} onClick={() => void loadData()}>Load records</button><label className="bnl-file">Open JSON<input type="file" accept="application/json,.json" onChange={e => void readFile(e.target.files?.[0])} /></label></div>
          <p className="bnl-data-status">{data === loadedData ? 'Editor matches the loaded dataset.' : 'Editor has changes. Load records before running them.'}</p>
          <details><summary>Record shapes</summary><p className="bnl-help">All fields are required. IDs must be unique within each collection. Related customerId values must exist in customers.</p><dl className="bnl-shapes"><dt>customers</dt><dd>id, name, email: strings</dd><dt>orders</dt><dd>id, customerId, state, createdAt: strings</dd><dt>subscriptions</dt><dd>id, customerId, plan: strings; active: boolean</dd><dt>invoices</dt><dd>id, customerId: strings; amountMinor, overdueDays: nonnegative integers; paid: boolean</dd></dl><p className="bnl-help">createdAt sorts as text. Use consistent ISO dates. Amounts use minor units; integers must be ≤ 9,007,199,254,740,991.</p></details>
        </aside>
        <div className="bnl-main">
          <section className="bnl-card bnl-declaration">
            <div className="bnl-section-label"><span>02 / DECLARE & RUN</span><span>Controlled language</span></div>
            <div className="bnl-editor-heading"><h2>Make the rule yours.</h2><label className="bnl-recipe-label">Declaration starter<select value={recipe} onChange={e => chooseRecipe(e.target.value as Recipe)}>{Object.entries(recipes).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label></div>
            <p className="bnl-help">Starters contain grammar, not business records. Edit them freely. Unsupported clauses produce a compiler diagnostic.</p>
            <label className="bnl-editor-label" htmlFor="bnl-source">BNL declaration</label>
            <textarea id="bnl-source" className="bnl-code bnl-source" spellCheck={false} value={source} onChange={e => setSource(e.target.value)} />
            <label className="bnl-editor-label" htmlFor="bnl-inputs">Typed inputs · use an ID from your records</label>
            <textarea id="bnl-inputs" className="bnl-code bnl-inputs" spellCheck={false} value={inputs} onChange={e => setInputs(e.target.value)} />
            <div className="bnl-run-actions"><button disabled={disabled || data !== loadedData} onClick={() => void run('run')}>Run declaration <span aria-hidden="true">↗</span></button><button className="bnl-secondary" disabled={disabled} onClick={() => void run('compile')}>Compile only</button><button className="bnl-text-button" onClick={download}>Export workspace ↓</button></div>
            <p className="bnl-boundary">Queries and local task / review records execute here. Payments and messages are unavailable. Reloading or leaving this page clears the runtime; export anything you want to keep.</p>
          </section>
          <section className="bnl-card bnl-output">
            <div className="bnl-section-label"><span>03 / INSPECT THE EVIDENCE</span><span>{response?.status ?? 'Loading'}</span></div>
            <div role="status" aria-live="polite" className={`bnl-status${response?.error || fatal ? ' has-error' : ''}`}>{message}</div>
            <p className="bnl-help">Evidence from the last operation. Run or compile again after editing a declaration or its inputs.</p>
            <div className="bnl-tabs" role="group" aria-label="Execution view">{(['result', 'trace', 'state', 'bir'] as Panel[]).map(key => <button key={key} aria-pressed={panel === key} onClick={() => setPanel(key)}>{key === 'bir' ? 'Compiled BIR' : key === 'state' ? 'Session state' : key === 'trace' ? 'Execution trace' : 'Result'}</button>)}</div>
            {output != null ? <pre className="bnl-result" tabIndex={0} aria-label={`${panel} output`}>{pretty(output)}</pre> : <div className="bnl-empty"><span>∅</span><h3>No {panel === 'result' ? 'result' : panel} yet.</h3><p>{panel === 'bir' ? 'Compile a declaration to inspect its typed intermediate representation.' : 'Load your records and run a declaration. The values you see here will come from that execution.'}</p></div>}
            <div className="bnl-session-actions"><button className="bnl-text-button" disabled={busy} onClick={() => { setBusy(true); setFatal(false); setResponse(null); setGeneration(n => n + 1); }}>Restart empty session</button><Link to="/article/bnl-runtime-boundaries">How execution works ↗</Link></div>
          </section>
        </div>
      </div>
      <section className="page-shell bnl-under-the-hood"><h2>Inspectable, all the way down.</h2><p>The declaration passes through BNL’s Rust compiler, typed BIR validator, planner and executor. This preview supports a bounded grammar and registered capabilities. It does not interpret arbitrary English or deploy a backend.</p><details><summary>Available capability contracts & types</summary><pre className="bnl-result">{pretty(catalogue)}</pre></details><p className="bnl-build">{response?.build ? <>Source {response.build.sourceCommit} · WASM SHA-256 {response.build.wasmSha256}</> : 'Build identity appears after the runtime loads.'}<br /><a href="/bnl/build-manifest.json" target="_blank" rel="noreferrer">Build manifest ↗</a> · <a href="/bnl/THIRD-PARTY-NOTICES.txt" target="_blank" rel="noreferrer">Runtime notices ↗</a></p></section>
    </div>
  );
}
