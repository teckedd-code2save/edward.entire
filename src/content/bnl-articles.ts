import type { Article } from './article-library';
import { gcBnlArticle } from './gc-bnl-article';

export const bnlArticles: Article[] = [
  {
    id: 'bnl-getting-started',
    title: 'Bring Your Own Data.',
    accent: 'Run the Declaration.',
    subtitle: 'A practical first session with Backend as Natural Language',
    description: 'An empty workspace, your own records, and a real Rust compiler. Query data, change a rule, inspect the result, and create a local task in the live BNL playground.',
    tags: ['bnl', 'getting-started', 'rust', 'playground'],
    date: 'September 2026',
    html: `
<p class="article-standfirst">A compiler demo should let you change the input and see the consequence. The <a href="#/playground/bnl">BNL playground</a> runs the actual Rust compiler and executor in your browser, starting with no business records.</p>
<figure class="article-evidence"><a href="/images/bnl/bnl-production-empty-20260928.jpg" target="_blank" rel="noreferrer"><img src="/images/bnl/bnl-production-empty-20260928.jpg" width="1357" height="932" loading="lazy" alt="Released BNL playground with zero records and empty customer fields" /></a><figcaption>Public production capture, 28 September 2026. The real Rust/WASM runtime has loaded with zero business records. Starter declarations provide grammar; you supply the values.</figcaption></figure>
<h2>1. Start with a customer you choose</h2>
<p><a href="#/playground/bnl">Open the playground</a>. In “Your data”, enter an ID, name and email, then select <strong>Add customer &amp; load</strong>. Choose an ID using letters, digits, hyphens or underscores. The form inserts your record into the dataset and fills the customerId invocation input. No account or installation is required.</p>
<p>The runtime data stays in this tab. The site downloads the compiler once; it does not upload the records you enter. Reloading or navigating away clears runtime memory, so export work you want to keep. Browser extensions and your device remain outside this isolation boundary.</p>
<h2>2. Add your own orders</h2>
<p>The records editor contains four arrays: customers, orders, subscriptions and invoices. Add your order objects inside <code>orders</code>. Each needs <code>id</code>, <code>customerId</code>, <code>state</code> and <code>createdAt</code>, all strings. Use the exact imported customer ID. Use consistent ISO dates because the current runtime sorts dates as text. JSON property names and string values need double quotes.</p>
<p>Select <strong>Load records</strong>. Import validates types, duplicate IDs and customer relationships before replacing the current dataset. It also clears prior local tasks and reviews. If import fails, your last valid runtime state remains intact. The record-shape panel documents every supported collection. An empty orders array is valid and produces an empty query result.</p>
<h2>3. Execute a declaration</h2>
<p>The query starter contains this executable declaration:</p>
<pre><code>Compose MyOrderFeed
Input customerId: CustomerId
Allow Customer.Read
Fetch orders using Order.ListByCustomer.v1 with customerId = $input.customerId
Select recent from orders where state = "completed" order by createdAt descending limit 5
Return recent</code></pre>
<p>The typed input uses your customer ID: the input name is <code>customerId</code>, its <code>type</code> is <code>CustomerId</code>, and its <code>value</code> is the ID you entered. Select <strong>Run declaration</strong>. Result contains the selected rows from your imported data. The runtime does not invent missing orders.</p>
<p>Change <code>descending</code> to <code>ascending</code>, or change the filter to a state that exists in your data. Run again. The output should reflect those changes. <strong>Compile only</strong> shows the typed BIR without executing the declaration. Execution trace shows which operations actually ran.</p>
<p>The deployed runtime was also checked with a small integer rule, <code>days &gt; 30</code>: a supplied input of 31 returned true, and 12 returned false. The capture below shows that second execution. Those numbers are explicit verification inputs, not preloaded customer data.</p>
<figure class="article-evidence"><a href="/images/bnl/bnl-production-execution-20260928.jpg" target="_blank" rel="noreferrer"><img src="/images/bnl/bnl-production-execution-20260928.jpg" width="1357" height="932" loading="lazy" alt="Public Rust BNL runtime returning Boolean false for the supplied days value of 12" /></a><figcaption>Actual production execution: days = 12 produces false for days &gt; 30. The same page displays the runtime source commit and WASM digest.</figcaption></figure>
<h2>4. Try a state change</h2>
<p>Add an invoice with your own <code>id</code> and <code>customerId</code>, nonnegative integer <code>amountMinor</code> and <code>overdueDays</code>, and Boolean <code>paid</code>. Load the data, then select <strong>Create a local task</strong>. Enter that invoice ID in the typed inputs. The starter requires an unpaid invoice with overdueDays greater than 30; change the threshold to the rule you want to test.</p>
<p>On success, inspect <strong>Session state</strong> for the newly created task. If the rule fails, the runtime returns a policy diagnostic and commits no task. Repeated successful calls create additional tasks: this starter does not add duplicate suppression. The task is a real record in this browser session, not a notification sent to someone.</p>
<h2>5. Keep the evidence</h2>
<p><strong>Export workspace</strong> downloads your declaration, typed-input text, loaded dataset, any unapplied data edits, the last executed request, its response and the runtime build identity. To resume, paste the saved declaration and inputs back, and load the JSON stored in datasetText. Exported execution results are evidence of the earlier run; importing data does not recreate earlier effects.</p>
<p>There is no public source-install command yet: the BNL repository remains private while its licensing and research work continue. The browser playground is the available way to get started today. Read <a href="#/article/bnl-runtime-boundaries">what the runtime guarantees and where it stops</a>, or <a href="#/playground/bnl">try your first declaration</a>.</p>`,
  },
  {
    id: 'bnl-runtime-boundaries',
    title: 'What Actually Runs',
    accent: 'Behind the Words',
    subtitle: 'The compiler, transaction and capability boundaries in the public BNL playground',
    description: 'How a controlled-language declaration becomes a typed execution plan, why failed runs preserve state, and what the public runtime deliberately cannot do.',
    tags: ['bnl', 'compilers', 'execution', 'architecture'],
    date: 'September 2026',
    html: `
<p class="article-standfirst">Backend as Natural Language asks whether explicit, bounded declarations can make backend behaviour easier to inspect. The <a href="#/playground/bnl">public playground</a> makes that question executable with your own data.</p>
<h2>From declaration to execution</h2>
<p>The browser downloads a WebAssembly build of BNL’s Rust compiler and runtime. A declaration is parsed into canonical, typed Backend Intermediate Representation (BIR). Validation checks registered types, capability arguments and dependencies. The planner orders the graph, then the executor evaluates it against the records you imported.</p>
<p>This is a controlled language: Compose, Input, Allow, Fetch, Select, Check, Require, Call and Return have defined meanings. It is not an LLM guessing what a paragraph meant. Unsupported clauses and incompatible nominal types are rejected. CustomerId and InvoiceId are distinct even when both contain strings.</p>
<h2>The result must follow the data</h2>
<p>The public wrapper constructs an empty store. It never loads the older workbench’s fictional business fixtures. Records come from the visitor’s form or JSON import; outputs, traces and state come from the actual executor. The interface exposes a source commit, build-input checksums and the WASM digest so a run can be tied to an artifact.</p>
<p>Each tab has a dedicated worker and independent runtime memory. Import is atomic and resets local effects. During execution, operations modify a pending copy; the executor commits it only after the whole graph succeeds. A failed policy or capability leaves the previous committed store unchanged. Trace entries show the failed and rolled-back operations.</p>
<h2>Local effects have a precise meaning</h2>
<p>The public capability boundary permits customer queries, invoice lookup, local follow-up tasks, local account reviews and invoice idempotency markers. The Rust wrapper rejects payment and external-message capabilities before execution, including calls hidden behind false conditions. Allow declares a requirement; it cannot grant capabilities the wrapper does not provide.</p>
<p>A created task is stored in this tab. No email is sent, no payment is settled, and no backend is deployed. The separate native host and durable outbox delivery work have their own identity, approval, storage and receiver boundaries. Those systems are not exposed by this playground.</p>
<h2>Bounded and inspectable</h2>
<p>The wrapper limits requests to 64 KiB, declarations to 32 KiB, imported records to 200 and retained local effects to 200. Graphs remain finite and bounded. The WASM memory ceiling is 64 MiB; the UI terminates a worker if an operation exceeds five seconds. Initial runtime loading has a separate fifteen-second budget. A stopped worker loses its session and requires a restart and data import.</p>
<p>These are implementation limits and development checks, not a claim of production durability, arbitrary-English understanding or independent human generalisation. The browser is a place to test declarations and understand their consequences. Start with the <a href="#/article/bnl-getting-started">step-by-step guide</a>, then change the data and the rule yourself.</p>`,
  },
  gcBnlArticle,
];
