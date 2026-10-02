import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, RotateCcw } from 'lucide-react';
import { BnlSession, pretty, recipes, type BnlResponse } from '@/lib/bnl';

export default function BnlMiniEditor() {
  const session = useRef<BnlSession | null>(null);
  const mounted = useRef(true);
  const [source, setSource] = useState(recipes.policy.source);
  const [days, setDays] = useState('12');
  const [paid, setPaid] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<BnlResponse | null>(null);
  const [message, setMessage] = useState('Load the example to start your own local session.');
  const [panel, setPanel] = useState<'result' | 'trace'>('result');

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; session.current?.dispose(); session.current = null; };
  }, []);

  function edited() {
    setResult(null);
    setMessage(ready ? 'Changed. Run the rule to see its new result.' : 'Load the example to start your own local session.');
  }

  async function loadExample() {
    if (busy) return;
    setBusy(true); setReady(false); setResult(null); setMessage('Starting the browser runtime…');
    session.current?.dispose();
    try {
      const current = new BnlSession(); session.current = current;
      await current.send({ action: 'init' });
      if (!mounted.current) return;
      setSource(recipes.policy.source); setDays('12'); setPaid(false); setReady(true);
      setMessage('Example ready. Try 12 days, then change it to 45.');
    } catch (error) {
      if (mounted.current) setMessage(error instanceof Error ? error.message : 'Could not start the runtime. Try loading the example again.');
    } finally { if (mounted.current) setBusy(false); }
  }

  async function run() {
    const overdueDays = Number(days);
    if (!ready || busy || !session.current) return;
    setResult(null);
    if (days.trim() === '' || !Number.isSafeInteger(overdueDays) || overdueDays < 0) {
      setMessage('Enter a whole number of overdue days, zero or greater.'); return;
    }
    setBusy(true); setPanel('result'); setMessage('Running your rule…');
    try {
      const imported = await session.current.send({ action: 'import', data: {
        customers: [{ id: 'demo-customer', name: 'Example customer', email: 'example@example.com' }],
        orders: [], subscriptions: [],
        invoices: [{ id: 'demo-invoice', customerId: 'demo-customer', amountMinor: 10000, overdueDays, paid }],
      } });
      if (imported.error) throw new Error(imported.error.message);
      const response = await session.current.send({ action: 'run', source, inputs: { invoiceId: { type: 'InvoiceId', value: 'demo-invoice' } } });
      if (!mounted.current) return;
      setResult(response);
      setMessage(response.error ? `${response.error.message}${response.error.line ? ` · line ${response.error.line}` : ''}` : 'Executed in your browser.');
    } catch (error) {
      if (!mounted.current) return;
      setReady(false); setMessage(error instanceof Error ? error.message : 'The runtime stopped. Load the example to restart.');
    } finally { if (mounted.current) setBusy(false); }
  }

  return <div className="mini-editor" aria-label="Interactive BNL editor">
    <div className="mini-editor-bar"><span><i /> BNL / browser edition</span><span>Real execution · example data</span></div>
    <div className="mini-editor-grid">
      <div className="mini-editor-source">
        <label htmlFor="showcase-bnl-source">01 / Edit the rule</label>
        <div className="mini-code-area"><div className="mini-line-numbers" aria-hidden="true">{source.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div><textarea id="showcase-bnl-source" value={source} spellCheck={false} disabled={busy} onChange={event => { setSource(event.target.value); edited(); }} aria-describedby="showcase-bnl-grammar" /></div>
        <p id="showcase-bnl-grammar" className="mini-hint">The starter checks for an unpaid invoice overdue by more than 30 days. Edit the rule to change the decision.</p>
      </div>
      <div className="mini-editor-result">
        <p className="mini-label">02 / Change the input</p>
        <div className="mini-input-row"><label htmlFor="showcase-bnl-days">Days overdue<input id="showcase-bnl-days" type="number" min="0" step="1" value={days} disabled={busy} onChange={event => { setDays(event.target.value); edited(); }} /></label><label className="mini-check"><input type="checkbox" checked={paid} disabled={busy} onChange={event => { setPaid(event.target.checked); edited(); }} /> Already paid</label></div>
        <div className="mini-output-tabs" role="group" aria-label="BNL output"><button type="button" aria-pressed={panel === 'result'} onClick={() => setPanel('result')}>Result</button><button type="button" aria-pressed={panel === 'trace'} onClick={() => setPanel('trace')}>Execution trace</button></div>
        <div className="mini-output" aria-label="Execution output">{result ? <pre className={panel === 'result' && typeof result.value === 'boolean' && !result.error ? 'mini-boolean' : ''}>{pretty(panel === 'trace' ? result.trace ?? [] : result.error ?? result.value)}</pre> : <div className="mini-empty"><span>?</span><p>Your result appears here.</p></div>}</div>
      </div>
    </div>
    <div className="mini-editor-bottom"><div className="mini-run-actions"><button type="button" className="mini-run" onClick={() => void (ready ? run() : loadExample())} disabled={busy}><Play size={14} aria-hidden="true" />{busy ? 'Working…' : ready ? 'Run rule' : 'Load example'}</button>{ready && <button type="button" className="mini-reset" onClick={() => void loadExample()} disabled={busy} aria-label="Reset BNL example"><RotateCcw size={15} /></button>}<p role="status" aria-live="polite">{message}</p></div><Link to="/playground/bnl">Full editor <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    <p className="mini-boundary">A small example using BNL’s supported grammar. Everything runs in this tab; the full editor accepts your own records.</p>
  </div>;
}
