export type Article = {
  id: string;
  title: string;
  accent: string;
  subtitle: string;
  description: string;
  tags: string[];
  date: string;
  html: string;
};

export const groundControlTerminalArticle: Article = {
  id: 'nsenter-bridge',
  title: 'How GroundControl’s Terminal',
  accent: 'Reaches the Host',
  subtitle: 'The Docker host bridge, command lifecycle, and approval boundary behind the browser terminal',
  description: 'A terminal inside a container is not automatically a terminal on the server. How I connected the two in GroundControl—and why host identity, command review, and the privilege boundary matter.',
  tags: ['groundcontrol', 'host-execution', 'docker', 'developer-tools'],
  date: 'September 2026 · Revised from July 2026',
  html: `
<p class="article-standfirst">The interesting part of GroundControl’s terminal is not that it accepts commands in a browser. It is where those commands run. A control plane can look convincing while operating on the wrong machine.</p>

<h2>The command was right. The environment was wrong.</h2>
<p>I built GroundControl to manage the VPS hosting my deployments. Running the control plane in Docker made it straightforward to package and update. But it also introduced an awkward boundary: the application was inside a container, while the services it needed to manage lived on the host.</p>
<p>The mounted Docker socket let GroundControl inspect containers. It did not make every shell command a host command. A request for <code>caddy version</code> could report that Caddy was missing even though Caddy was serving traffic on the server. Package installation, service management, and filesystem inspection had the same problem. They were asking the application’s environment about the host’s state.</p>
<p>This was more consequential than an inconvenient terminal. If a dashboard mistakes its own container for the managed machine, its installation checks and operational decisions become unreliable too. I needed an explicit way to cross that boundary.</p>

<h2>A short-lived helper, created by the host</h2>
<p>The useful observation was that GroundControl already had access to the host’s Docker daemon. Rather than adding a second long-running host agent for the local setup, I used that connection to create a small helper container for each host command.</p>
<p>The bridge image contains Alpine and <code>util-linux</code>, with <code>nsenter</code> as its entry point. GroundControl builds it locally when needed. The helper starts with the host PID namespace and privileged capabilities, then targets the host’s PID 1 to enter its mount, UTS, IPC, network, and PID namespaces.</p>
<pre><code>Browser command
  → authenticated terminal endpoint
  → execOnTarget
  → host Docker daemon
  → temporary nsenter helper
  → host shell
  → stdout · stderr · exit code</code></pre>
<p>That changes the meaning of the command. The shell now sees the host filesystem and service environment, rather than the application container’s copy of them. The helper also sets a predictable system path and applies the requested working directory. A quoted command is passed to <code>sh -c</code>; the result comes back through the same interface as other execution paths.</p>
<p>The normal helper uses Docker’s automatic removal on exit. It is a per-command execution mechanism, not a permanently running management agent. The GroundControl application container itself does not need the helper’s <code>--pid=host</code> flag. The Docker daemon creates the process that does.</p>
<blockquote>The design is small because it reuses a capability the installation already has. The engineering work is making the target environment explicit—and being honest about the authority that capability carries.</blockquote>

<h2>One result contract, different execution paths</h2>
<p>The local container bridge is one part of the execution layer. <code>execOnVps</code> also supports direct local execution and remote execution through SSH. <code>execOnTarget</code> routes a containerized local target toward the host-access strategies; an explicitly supplied remote connection goes through the SSH path. Each returns standard output, standard error, and an exit code.</p>
<p>That common result shape matters. A terminal, an installation check, and a deployment operation should not each invent their own way to interpret success. But a shared function is not enough on its own: callers must still identify the correct target. The browser terminal’s containerized path currently uses the local host bridge; it should not be read as proof that every terminal request resolves an arbitrary remote host selection.</p>
<p>GroundControl also checks whether it appears to have reached the host by comparing the target’s PID 1 command line with the application container’s. Matching identities produce a warning. This is a useful diagnostic, not an infallible identity guarantee. The general execution path can fall back to the container when host access is unavailable; a separate strict entry point rejects that final fallback for callers that require host execution.</p>

<h2>A terminal experience, not a persistent shell session</h2>
<p>The current interface is deliberately command-oriented. It posts a command and working directory to an authenticated endpoint and displays the returned output and exit status. It is not a persistent interactive PTY: exporting a variable in one request does not establish a lasting shell environment for the next request.</p>
<p>The browser maintains a working-directory value, handles simple <code>cd</code> navigation, and keeps recent command history locally. Tab completion combines command history with path, project, and container suggestions. Capability-aware helper chips avoid recommending <code>systemctl</code> when the detected system does not provide it, or Caddy commands when Caddy is absent.</p>
<p>There are practical compatibility decisions underneath that experience. The command route can resolve common binaries, select the available Docker Compose form, and provide hints when a Bash invocation is rewritten for <code>sh</code>. These details are less dramatic than the namespace bridge, but they decide whether an operator can actually use it. The helpers and completion endpoint are separate paths, so they still need to agree with the execution target.</p>

<h2>AI proposes; the operator runs</h2>
<p>Typing <code>/ai check disk space</code> follows a different path from entering a shell command. GroundControl first returns a proposed command with an explanation. The interface offers <strong>Run</strong>, <strong>Edit</strong>, and <strong>Dismiss</strong>. Generating a suggestion does not automatically execute that suggested operation.</p>
<p>For common requests, a model call is unnecessary. Disk usage, memory, container listings, and some deployment queries have deterministic handlers. Other requests receive server context before a configured language model produces a POSIX-shell suggestion. Context collection itself can perform inspection commands; the approval step concerns the proposed command.</p>
<p>There is an important product distinction here: a deployment is not simply a line in <code>docker ps</code>. The terminal’s deployment helper was written to inspect managed Compose directories instead of substituting a raw container list. That helper is narrower than the newer deployment inventory, where enrolled workloads can live in other locations. It needs to evolve with that inventory; a plausible command is not proof of complete coverage.</p>
<p>The useful role of AI is to reduce the distance between an operational question and an inspectable command. It does not remove the need to understand what that command will touch. The terminal’s review step is a user-interface boundary, not a server-side authorization system that makes model-authored shell inherently safe.</p>

<h2>Ephemeral does not mean least privilege</h2>
<p>This bridge has substantial authority. Access to a rootful Docker daemon can provide root-equivalent control of the host, and the helper intentionally uses privileged namespace access. Keeping the helper short-lived does not turn the application holding that socket into a low-privilege system.</p>
<p>The terminal endpoint requires authentication and rejects several recognizably destructive command patterns. Those checks are useful friction, not a complete shell sandbox or a comprehensive policy engine. An authenticated operator still has powerful host access. Command history in a browser is also not the same thing as a durable, server-side audit trail.</p>
<p>That is the right way to present this design: an administrative control plane for a trusted operator, with a consequential host boundary. Stronger policy enforcement, consistent target routing, and durable operation records remain important hardening work. They should not be implied merely because the interface contains an approval button.</p>

<h2>The same idea solves a deployment lifecycle problem</h2>
<p>The bridge also has a detached execution path for self-redeployment. If GroundControl replaces its own application container, a deployment process tied to that container can die halfway through the job. The detached helper is owned by Docker instead, with output directed to a host file, so the operation can outlive the application process that initiated it.</p>
<p>This is what I find valuable about the work. The terminal is not an isolated feature pasted onto a dashboard. The execution boundary supports diagnosis, host operations, and the lifecycle of the control plane itself. After GitHub Actions delivers an image, GroundControl provides the place to inspect what is running and act on the actual server.</p>
<p>A convincing infrastructure interface has to do more than display the right panels. It has to preserve the meaning of “this host,” “this deployment,” and “this command” all the way from the browser to the process that runs.</p>

<p class="article-footnote">Implementation reviewed in September 2026 at <a href="https://github.com/teckedd-code2save/groundcontrol/tree/a387ac78f74a49cef8590bdc27277e74caa33e9f" target="_blank" rel="noreferrer">GroundControl commit a387ac7</a>. Primary implementation: <a href="https://github.com/teckedd-code2save/groundcontrol/blob/a387ac78f74a49cef8590bdc27277e74caa33e9f/src/lib/docker-host-bridge.ts" target="_blank" rel="noreferrer">Docker host bridge</a>, <a href="https://github.com/teckedd-code2save/groundcontrol/blob/a387ac78f74a49cef8590bdc27277e74caa33e9f/src/lib/host-exec.ts" target="_blank" rel="noreferrer">execution routing</a>, and <a href="https://github.com/teckedd-code2save/groundcontrol/blob/a387ac78f74a49cef8590bdc27277e74caa33e9f/src/app/terminal/page.tsx" target="_blank" rel="noreferrer">terminal interface</a>. This is a source-grounded account of the implementation, not a security certification or a claim that every deployment configuration has been tested.</p>`,
};

export const newArticles: Article[] = [
  {
    id: 'training-an-interpreter-not-an-assistant',
    title: 'Training a Direct-Response',
    accent: 'Twi Model',
    subtitle: 'Why Ghana Health AI needs a new dataset before it can replace the hosted response model',
    description: 'The first Twi adapter learned to recover meaning. It did not learn to answer. Here is why the next corpus adds reviewed Twi replies, safety decisions, and a hard gate before training.',
    tags: ['ghana-health-ai', 'twi', 'datasets', 'llm-training'],
    date: 'September 2026',
    html: `
<p class="article-standfirst">A model can understand a sentence without being able to answer it. Ghana Health AI made that distinction visible—and it changed the training plan.</p>

<h2>The answer was better than the model</h2>
<p>The current research path has two model calls. A small Qwen adapter receives informal Twi and proposes a structured interpretation: normalized Twi, faithful English meaning, intent, entities, ambiguity, and whether clarification is required. A larger hosted model then receives that interpretation as a hint and writes the response.</p>
<p>This is useful engineering. It lets an experimental language model improve understanding without giving it control of a health conversation. But it creates an evaluation trap. If Research v1 produces a sensible answer, the answer may demonstrate the strength of the hosted response model rather than the strength of the adapter.</p>
<p>I exposed that boundary in the product. Every reply can reveal what the research adapter returned, whether its hint was actually used, what the final model believed the user meant, and which model wrote the response. The panel is not chain-of-thought. It is inspectable application state.</p>

<h2>The dataset taught the wrong job</h2>
<p>The semantic corpus contains fields such as <code>normalized_twi</code>, <code>faithful_english_meaning</code>, <code>intent</code>, <code>entities</code>, and <code>requires_clarification</code>. Those targets teach semantic recovery. They do not provide enough supervision for a model to generate a useful, natural, bounded Twi response.</p>
<p>Asking that adapter to replace the response model would therefore be dishonest. It would be evaluated on a capability it was never trained to acquire.</p>
<blockquote>The next checkpoint should not be another interpreter hidden behind a better writer. It should produce both a machine-checkable interpretation and its own short Twi reply.</blockquote>

<h2>A response-capable corpus</h2>
<p>The new training lane adds two reviewed targets: <code>reply_twi</code> and <code>safety_level</code>. For a health row to enter response supervision, it must now carry a reviewed normalized phrase, faithful meaning, intent, Twi response, and one of four safety levels: routine, same day, urgent, or emergency. Source, consent scope, and a stable split remain attached.</p>
<p>The review interface keeps those decisions together on one card. It prioritizes medical rows that already have source-linked draft answers, but it never silently approves them. A reviewer can correct the meaning, response, and urgency, then attach consented recordings from multiple speakers to the same phrase. The audio stays private until a separate consent and licence review authorizes an export.</p>

<h2>The zero-row result is a success</h2>
<p>The response exporter currently produces zero trainable rows. That is not a broken pipeline. It is the pipeline refusing to turn unreviewed machine drafts into medical supervision. Strict export also blocks training until there are at least 100 reviewed response rows distributed across train, development, and test splits.</p>
<p>This is slower than generating thousands of plausible answers with another model. It is also much more valuable. The corpus becomes a record of what humans accepted, what they corrected, and what the model is permitted to learn.</p>

<h2>What happens next</h2>
<p>Once the reviewed floor is met, the next Modal run can fine-tune a direct-response checkpoint. Promotion still requires parseable structured output, meaning preservation across person, symptom, negation, time and code-switching, no critical errors on the locked emergency set, and native review of the generated Twi. The Hugging Face model card must report the corpus, sources, limitations, and non-production status.</p>
<p>The target is not simply fewer API calls. It is a Twi-native model whose understanding and answer can be evaluated together. Until that evidence exists, the hosted model remains in the response path—and the interface says so.</p>
<p class="article-footnote">Active research snapshot: <a href="https://github.com/teckedd-code2save/ghana-health-ai/tree/d459c2a" target="_blank" rel="noreferrer">commit d459c2a</a>. This work is experimental and does not establish clinical safety.</p>`,
  },
  groundControlTerminalArticle,
  {
    id: 'meaning-before-medicine',
    title: 'Semantic Accuracy as a',
    accent: 'Health Safety Boundary',
    subtitle: 'Why semantic errors are the first safety problem in a Twi health assistant',
    description: 'A safe health policy is useless if the language model routes eye pain as cough or mistakes rest for work. The safety case begins with faithful meaning.',
    tags: ['health-ai', 'safety', 'evaluation', 'akan'],
    date: 'September 2026',
    html: `
<p class="article-standfirst">Before a health assistant can give careful advice, it has to know what was said. In a low-resource language pipeline, that is not a preliminary detail. It is the first safety boundary.</p>

<h2>One wrong word changes the clinical path</h2>
<p>Consider the informal Twi phrase <code>m'ani kum paa</code>: my eye hurts badly. Earlier research checkpoints could map the phrase toward cough or general weakness. Once that happens, even a perfectly written safety policy is operating on the wrong symptom.</p>
<p>The same problem appears across conversation turns. <code>Me regye m'ahome</code> means I am resting, but an ASR error can substitute <code>adwuma</code>, work. The assistant then asks about a difficult job instead of recognizing rest. The response may be grammatical and empathetic while being completely irrelevant.</p>
<p>These are semantic failures before they are medical failures. They corrupt who is affected, what symptom exists, how severe it is, and what a follow-up refers to.</p>

<h2>Evaluate the interpretation, not just the prose</h2>
<p>Typical chat evaluation looks at the final answer. That hides where the failure began. Ghana Health AI now exposes a collapsed “What the model understood” record beneath a reply. It separates the research adapter’s candidate interpretation from the final response model’s interpretation and records whether the adapter was used.</p>
<p>This matters when two model choices produce similar answers. Both may feed the same response model and deterministic safety guards. Convergent prose is not evidence of convergent understanding. Conversely, different responses may come from the same meaning but different clarification choices.</p>
<blockquote>“Reported understanding: understood” is a model’s structured claim, not proof that the interpretation is correct.</blockquote>

<h2>Build failures back into the corpus</h2>
<p>Product failures are now captured as targeted dataset seeds: eye pain, child fever, infant age, confirmed malaria, care navigation, severe follow-ups, and code-switched commerce requests. Each row preserves the original text, normalized form, faithful meaning, literal translation, intent, entities, ambiguity, and provenance.</p>
<p>The review workbench keeps machine proposals separate from reviewed decisions. Silver rows remain silver. A published adapter remains experimental. A larger fixture score is not presented as a like-for-like improvement when the test denominator changed.</p>

<h2>Safety becomes a smaller, clearer layer</h2>
<p>Once meaning is reliable, the safety layer can work with explicit facts: child versus adult, eye versus chest, possible fever versus confirmed malaria, routine discomfort versus a red flag. It can ask for missing age or temperature, escalate vision loss or injury, and refuse to invent a diagnosis.</p>
<p>Deterministic guards still matter. They catch known emergencies and constrain uncertain models. But they should not compensate for a language system that routinely misunderstands the user. The goal is a layered system: faithful semantic recovery, explicit uncertainty, reviewed response behavior, and narrow safety overrides.</p>

<h2>The research question</h2>
<p>The hard question is not “Can an LLM speak Twi?” It is whether a small model can preserve the meaning of informal, noisy, conversational Twi well enough for a health system to act cautiously. That requires product-derived tests, native review, locked safety cases, and the willingness to reject a trained model.</p>
<p>Ghana Health AI is being built around that willingness. Training completion is an experiment result. Publication is traceability. Promotion is a separate decision.</p>
<p class="article-footnote"><a href="https://github.com/teckedd-code2save/ghana-health-ai" target="_blank" rel="noreferrer">Inspect the research system</a> or review the public models on <a href="https://huggingface.co/teckedd" target="_blank" rel="noreferrer">Hugging Face</a>.</p>`,
  },
  {
    id: 'garbage-collection-is-product-design',
    title: 'Designing Safe Docker',
    accent: 'Garbage Collection',
    subtitle: 'What a full VPS taught GroundControl about safe infrastructure cleanup',
    description: 'A production deploy ran out of disk while old images and build cache occupied the server. The fix was not another prune command—it was a governed cleanup product.',
    tags: ['groundcontrol', 'docker', 'operations', 'product-design'],
    date: 'August 2026',
    html: `
<p class="article-standfirst">A server filling up is easy to describe as an operations problem. For GroundControl, it exposed a product problem: resource cleanup was still something the operator had to remember.</p>

<h2>The deployment that could not unpack</h2>
<p>A GroundControl production build completed and reached the VPS, then failed while extracting the new image. The machine had less than a gigabyte free. Old images and Docker build cache occupied most of the disk.</p>
<p>The running production container was still healthy, so the incident was recoverable. I removed only unused build/cache resources and a disposable Odoo proof stack. Free space returned, and the deployment could proceed. But “SSH in and prune carefully” is not an acceptable steady-state workflow for a control plane whose job is to make a VPS manageable.</p>
<blockquote>If the platform can deploy workloads, it must also understand the lifecycle of what those deployments leave behind.</blockquote>

<h2>Why blind prune is not the feature</h2>
<p><code>docker system prune</code> is easy to expose as a button. It is also too blunt to be trustworthy. A stopped container may be intentionally preserved. Its image may be the only fast rollback path. A named volume may hold business data. A concurrent image pull may make an otherwise safe cleanup race with deployment.</p>
<p>The useful product is not “run prune.” It is a cleanup plan with policy.</p>
<p>GroundControl should first inventory reclaimable images, stopped containers, build cache, and volumes. It should protect every image referenced by a running container, preserve stopped-container images by default, retain known rollback tags, and never delete named volumes without a separate explicit decision. The operator should see estimated reclaimed space before execution.</p>

<h2>Garbage collection needs levels</h2>
<p>A safe design can expose increasingly aggressive plans:</p>
<ul>
  <li><strong>Routine:</strong> expired build cache and dangling layers.</li>
  <li><strong>Conservative:</strong> unused images older than a retention window, excluding protected tags and stopped-container dependencies.</li>
  <li><strong>Recovery:</strong> a reviewed plan for disposable stacks and larger unused artifacts when disk pressure is critical.</li>
</ul>
<p>Every plan should be previewable, auditable, and idempotent. A cleanup run should report what it considered, what policy protected, what it removed, how much space returned, and whether deployment can resume.</p>

<h2>Resource efficiency is part of reliability</h2>
<p>Disk pressure is predictable. GroundControl already observes containers, services, Compose projects, Caddy routes, and deployment state. That context makes it better placed than a generic cron job to decide what is safe. It knows which image is live, which domain maps to which project, and which deployment created an artifact.</p>
<p>The longer-term design is closed-loop: measure disk pressure, create a cleanup proposal, apply policy, ask for approval when risk crosses a boundary, execute through the same audited host bridge, then verify capacity and service health.</p>

<h2>The lesson</h2>
<p>Infrastructure UX is often judged by how easily it creates things. Mature infrastructure products are equally defined by how safely they remove them. Garbage collection is not housekeeping around the product. It is lifecycle management—and therefore core product behavior.</p>
<p class="article-footnote"><a href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">GroundControl source</a> · Production lessons from an isolated Odoo deployment proof and the VPS rollout that followed.</p>`,
  },
  {
    id: 'when-green-deploy-looks-red',
    title: 'When Cleanup Fails After a',
    accent: 'Successful Deploy',
    subtitle: 'Separating release correctness from non-critical cleanup in GroundControl',
    description: 'The application deployed and passed its public smoke test, but a concurrent Docker prune marked the workflow failed. That is an observability bug with operational consequences.',
    tags: ['groundcontrol', 'ci-cd', 'reliability', 'observability'],
    date: 'August 2026',
    html: `
<p class="article-standfirst">A deployment can succeed technically and still be reported as failed. That sounds cosmetic until someone rolls back a healthy release because the pipeline lied.</p>

<h2>The failure after success</h2>
<p>During a GroundControl rollout, the new application image reached the VPS, the container started, and the public smoke test passed. The workflow then ran a final Docker cleanup. Another prune was already active, so that cleanup command failed—and GitHub marked the entire deployment red.</p>
<p>The production release was healthy. The status was not.</p>
<p>This is a subtle reliability defect. Operators use the pipeline result as a compressed account of reality. If optional maintenance can override evidence that the release is serving correctly, the signal becomes untrustworthy.</p>

<h2>Model the phases by consequence</h2>
<p>A release pipeline contains work with different semantics:</p>
<ul>
  <li><strong>Release-critical:</strong> pull the intended image, apply compatible migrations, start the container, and prove readiness.</li>
  <li><strong>Verification:</strong> check the public route and required dependencies.</li>
  <li><strong>Maintenance:</strong> prune old artifacts, refresh caches, or collect diagnostics.</li>
</ul>
<p>The first two determine whether the release exists and works. The third improves the environment but should not rewrite the outcome after success. Maintenance failures deserve warnings, metrics, and follow-up—not a false rollback signal.</p>

<h2>Non-fatal does not mean invisible</h2>
<p>The immediate patch made final cleanup non-fatal. That prevents a prune race from marking a healthy release as failed. But simply appending <code>|| true</code> everywhere would create the opposite problem: genuine capacity issues would disappear.</p>
<p>The better contract records cleanup as a separate result. Deployment can remain green while reporting “maintenance degraded,” the reason, current free space, and whether intervention is required. A future cleanup planner can then retry safely without rebuilding or redeploying the application.</p>
<blockquote>A pipeline status should answer one question precisely: is the intended version running and healthy? Secondary work needs its own signal.</blockquote>

<h2>Live proofs reveal boundary errors</h2>
<p>This issue emerged while testing GroundControl against a disposable Odoo deployment. The same proof exposed an Odoo 19 command incompatibility and a public-IP discovery path that omitted HTTPS. None of those defects were obvious from a dashboard screenshot. They appeared only when the product had to create a real stack, configure a real route, survive constrained disk, and report the outcome.</p>
<p>That is why GroundControl’s development loop treats deployments as experiments. Rehearse against an isolated target, retain the logs, fix the abstraction rather than the one folder, and prove the correction through the live path.</p>

<h2>Operational truth is a feature</h2>
<p>Good infrastructure software does more than execute commands. It preserves the meaning of what happened. A green release should mean the intended version is serving. A red release should mean it is not. Cleanup, capacity, and drift remain important, but they should be represented in a way that helps the operator choose the next action.</p>
<p class="article-footnote">GroundControl is a self-hosted VPS control plane built around real deploy, diagnose, rehearse, rollback, and recovery loops. <a href="https://groundcontrol.serendepify.com" target="_blank" rel="noreferrer">View the live system</a>.</p>`,
  },
];
