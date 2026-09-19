import './ResearchWritingStudio.css';

const tracks = [
  {
    number: '01',
    title: 'General Twi-English model research',
    body: 'The target is now an independently serving model that understands and answers general questions, preserves corrections and context, handles code-switching, and can request validated tools. Health education is a specialization, not the whole model.',
    link: 'https://github.com/teckedd-code2save/ghana-health-ai/tree/feat/response-capable-research',
    label: 'Inspect the active research branch',
  },
  {
    number: '02',
    title: 'Ghana Health AI',
    body: 'The live product remains the place where speech, meaning, safety, latency, and user interaction meet. Research checkpoints do not enter the product automatically; promotion is a separate evidence-backed decision.',
    link: 'https://github.com/teckedd-code2save/ghana-health-ai',
    label: 'Explore the health AI build',
  },
  {
    number: '03',
    title: 'Model Factory / ML systems',
    body: 'The next systems track turns the research stack into a measured pipeline: Arrow/Parquet corpus releases, GPU profiling, distributed training, checkpoint recovery, serving benchmarks, and durable experiment orchestration.',
    link: 'https://github.com/teckedd-code2save/frontier-ai-career-quest',
    label: 'Follow the systems programme',
  },
];

const modelWork = [
  {
    name: 'DONDO v2 · Twi ASR',
    repo: 'teckedd/gha-dondo-w2v-bert-twi-v2',
    href: 'https://huggingface.co/teckedd/gha-dondo-w2v-bert-twi-v2',
    result: '27.31% WER',
    note: 'Fine-tuned W2V-BERT with a Twi KenLM decoder. Beat the stable Whisper v6 comparison on the same 300-sample Waxal slice and became the beta candidate, pending broader held-out validation.',
  },
  {
    name: 'DONDO v1 · Twi ASR',
    repo: 'teckedd/gha-dondo-w2v-bert-twi-v1',
    href: 'https://huggingface.co/teckedd/gha-dondo-w2v-bert-twi-v1',
    result: '71.91 → 35.77% WER',
    note: 'An 800-step domain-adaptation run that converted a weak zero-shot baseline into useful evidence. Published with evaluation, intended use, limitations, and a non-promotion decision.',
  },
  {
    name: 'Whisper v6 · stable route',
    repo: 'teckedd/gha-whisper-small-twi-v6',
    href: 'https://huggingface.co/teckedd/gha-whisper-small-twi-v6',
    result: '30.44% WER',
    note: 'The current stable Twi checkpoint. Cross-language testing exposed severe English regression, leading to separate language routes instead of hiding the weakness behind one model.',
  },
  {
    name: 'Balanced v7 · retention trials',
    repo: 'Whisper small · frozen + unfrozen',
    href: 'https://huggingface.co/teckedd',
    result: '2 controlled failures',
    note: 'Mixed Twi and English fine-tunes improved English retention but regressed Twi. The models remain public as reproducible negative results and were correctly rejected for production.',
  },
];

const modalStages = [
  ['01', 'Prepare', 'Build source-accounted corpus releases with protected evaluation groups, provenance, hashes, stable splits, and explicit evidence classes.'],
  ['02', 'Train', 'Run bounded GPU experiments from immutable model/data revisions; preserve run IDs, adapter hashes, checkpoints, replay data, and negative results.'],
  ['03', 'Evaluate', 'Separate language, meaning, intent/entities, multi-turn behavior, health safety, tool authorization, ASR, and product fixtures instead of collapsing them into one score.'],
  ['04', 'Preserve', 'Store model revisions, raw generations, corpus manifests, decision reports, and private Modal artifacts so a result can be reproduced or rejected later.'],
  ['05', 'Audition', 'Expose research candidates privately only after their gates pass; compare them against untouched bases without proprietary fallback hiding the result.'],
  ['06', 'Promote', 'Treat product routing as a separate decision. Lower loss, clean JSON, or a completed GPU run are never enough on their own.'],
];

const labMetrics = [
  ['30,404', 'alignment sources', 'active research branch · source-backed'],
  ['60,808', 'paired task views', 'two directions, not unique sources'],
  ['2,131', 'English replay paths', 'preserved separately'],
  ['0', 'active response models promoted', 'research remains isolated'],
];

const questions = [
  ['Now', 'Which existing foundation and data mixture can improve Twi meaning and conversation without losing English, context, negation, or tool discipline?'],
  ['Near', 'Where are the real bottlenecks when the same research pipeline is measured from corpus I/O through GPU training, recovery, evaluation, and serving?'],
  ['Long', 'What does accountable human–agent collaboration look like when language, health, tools, and consequential actions meet?'],
];

export default function Research() {
  return (
    <div className="research-studio">
      <section className="lab-studio-hero">
        <div className="page-shell lab-studio-intro">
          <div className="lab-studio-copy">
            <p className="studio-page-kicker"><span /> Research environment · Accra / GH</p>
            <h1>Language AI,<br /><span>under test.</span></h1>
            <p className="lede">My research sits between low-resource language AI, ML systems, and production engineering. I build source-traceable corpora, compare foundations, train and reject adapters on Modal, preserve protected evaluation, and keep product promotion separate from a successful GPU run.</p>
            <div className="hero-actions"><a className="research-action" href="https://huggingface.co/teckedd" target="_blank" rel="noreferrer">Open model registry <span>↗</span></a><a className="research-text-link" href="https://github.com/teckedd-code2save/ghana-health-ai" target="_blank" rel="noreferrer">Inspect research code ↗</a></div>
          </div>
        </div>
        <dl className="page-shell lab-studio-metrics">
          {labMetrics.map(([value, label, context]) => <div key={label}><dt>{label}</dt><dd><strong>{value}</strong><small>{context}</small></dd></div>)}
        </dl>
      </section>

      <section className="editorial-section" aria-labelledby="understanding-update">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">Latest work · 19 September 2026</p><h2 id="understanding-update" className="section-title">A model programme,<br />not a demo.</h2></div><p className="lede">The research question has widened from medical semantic extraction to a general Twi-English model that can converse, preserve corrections, and use tools safely. The programme now compares foundations, protects evaluation, records rejected checkpoints, and makes source accounting part of the model decision.</p></div>
          <div className="research-track"><span className="track-number">TARGET</span><div><h2>General understanding first</h2></div><p>Health education and commerce are specializations inside a broader conversational target. ASR and TTS remain separate components, and tool calls are validated actions rather than knowledge the model is allowed to pretend it has.</p></div>
          <div className="research-track"><span className="track-number">DATA</span><div><h2>Source-backed alignment release</h2><a className="project-arrow" href="https://github.com/teckedd-code2save/ghana-health-ai/blob/feat/response-capable-research/docs/alignment-handoff-20260915.md" target="_blank" rel="noreferrer">Inspect the handoff ↗</a></div><p>The active branch contains 30,404 source-backed alignment records producing 60,808 bidirectional task views, plus 2,131 English-retention conversation paths. The counts stay separate so two training directions are not misreported as twice as many unique conversations. Per-record provenance, splits, terms, checksums, and a private Modal storage receipt travel with the release.</p></div>
          <div className="research-track"><span className="track-number">FAIL</span><div><h2>Better metrics can still mean reject</h2></div><p>Qwen medical v4 learned its schema and improved over the untouched base, yet managed only 79/672 strict semantic passes and 1/11 product fixtures. Afrique, MiniCPM, and gpt-oss comparisons exposed different failures in negation, context, repetition, health, language matching, and tool behavior. These checkpoints remain evidence, not hidden dead ends.</p></div>
          <div className="research-track"><span className="track-number">GATE</span><div><h2>MORENA starts before training</h2><a className="project-arrow" href="https://github.com/teckedd-code2save/ghana-health-ai/pull/37" target="_blank" rel="noreferrer">Inspect the open MORENA audit ↗</a></div><p>The newest substrate test begins with tokenizer fragmentation on eligible non-protected Twi, then frozen zero-shot meaning/language evaluation, and only then a bounded LoRA adaptation if the evidence justifies it. Tokenizer efficiency, loss, and chat quality are deliberately kept as different measurements.</p></div>
          <div className="research-track"><span className="track-number">SYSTEM</span><div><h2>From model research to ML systems</h2></div><p>The next capstone instruments the same programme end to end: canonical Arrow/Parquet corpus releases, GPU profiling, distributed training, checkpoint/restart, serving memory and latency, and durable experiment orchestration. The research problem stays real while the systems depth increases.</p></div>
          <p className="research-source-note">The source-backed alignment, response-model comparisons, and some corpus work above live on the active <a href="https://github.com/teckedd-code2save/ghana-health-ai/tree/feat/response-capable-research" target="_blank" rel="noreferrer">response-capable research branch</a>, not the current production branch. The MORENA audit is an open pre-training gate. No result on this page establishes clinical safety or native-speaker certification.</p>
        </div>
      </section>

      <section className="editorial-section model-ledger-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">01 · Speech-model lineage</p><h2 className="section-title">Results, including<br />the ones that failed.</h2></div><div><p className="lede">The speech experiments underpin the newer understanding work. These results retain their original evaluation context; the model cards document intended use and limitations.</p><a className="project-arrow" href="https://huggingface.co/teckedd" target="_blank" rel="noreferrer">View the full Hugging Face profile ↗</a></div></div>
          <div className="model-ledger">
            {modelWork.map((model, index) => <a className="model-row" href={model.href} target="_blank" rel="noreferrer" key={model.name}><span className="track-number">0{index + 1}</span><div><h3>{model.name}</h3><code>{model.repo}</code></div><strong>{model.result}</strong><p>{model.note}</p><i aria-hidden="true">↗</i></a>)}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">02 · Research infrastructure</p><h2 className="section-title">A lab that keeps<br /><span>its receipts.</span></h2></div><p className="lede">Modal is the compute and artifact layer, but the important part is the contract around it: immutable model/data identity, bounded runs, protected evaluation, saved raw outputs, negative decisions, and private audition before product promotion.</p></div>
          <div className="modal-pipeline">
            {modalStages.map(([number, title, body]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="research-proof-strip"><span>immutable revisions</span><span>source provenance</span><span>GPU training</span><span>persistent volumes</span><span>private auditions</span><span>promotion audits</span></div>
        </div>
      </section>

      <section className="editorial-section" style={{ background: 'var(--paper-2)' }}>
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">03 · Active tracks</p><h2 className="section-title">Questions with<br />working code.</h2></div><p className="lede">Research is strongest when the argument can meet a real user, device, dataset, or deployment constraint.</p></div>
          <div>
            {tracks.map((track) => (
              <article className="research-track" key={track.number}>
                <span className="track-number">{track.number}</span>
                <div><h2>{track.title}</h2><a href={track.link} target="_blank" rel="noreferrer" className="project-arrow">{track.label} ↗</a></div>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">04 · Research horizon</p><h2 className="section-title">Build now.<br /><span>Ask further.</span></h2></div><p className="lede">A practical thread connects today’s prototypes to longer-term work in accountable autonomous systems.</p></div>
          <div className="principles">
            {questions.map(([time, question], index) => <article className="principle" key={time}><b>0{index + 1} / {time}</b><h3>{question}</h3></article>)}
          </div>
        </div>
      </section>
    </div>
  );
}
