import { motion } from 'framer-motion';

const tracks = [
  {
    number: '01',
    title: 'Twi semantic recovery',
    body: 'Recovering faithful meaning, intent, entities, and uncertainty from imperfect Twi transcripts. The latest Qwen LoRA adapter is published but held back after product tests exposed remaining semantic errors.',
    link: 'https://huggingface.co/teckedd/gha-understand-twi-medical-plus-language-v3',
    label: 'Inspect the v3 adapter',
  },
  {
    number: '02',
    title: 'Ghana Health AI',
    body: 'Exploring how Twi-first voice interaction, grounded health knowledge, and careful escalation can make everyday health information more accessible in Ghana.',
    link: 'https://github.com/teckedd-code2save/ghana-health-ai',
    label: 'Explore the health AI build',
  },
  {
    number: '03',
    title: 'Human-reviewed language data',
    body: 'A review workbench with persisted decisions, CSV round-trips, source provenance, and split-safe exports. Model drafts, silver research data, and reviewed gold data remain distinct evidence classes.',
    link: 'https://github.com/teckedd-code2save/ghana-health-ai/blob/main/data/understanding-corpus/README.md',
    label: 'Read the corpus protocol',
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
  ['01', 'Prepare', 'Stream and cap Waxal, Common Voice, and local product audio; preserve frozen holdouts and provenance.'],
  ['02', 'Train', 'Run resumable Whisper and W2V-BERT jobs on Modal GPUs with checkpoint volumes, explicit phase logs, and cost-aware smoke runs.'],
  ['03', 'Evaluate', 'Measure WER/CER across Twi, English retention, health language, code-switching, phone noise, and product-domain audio.'],
  ['04', 'Publish', 'Push checkpoints and validated model cards to Hugging Face, including base model, data, metrics, limitations, and safety scope.'],
  ['05', 'Serve', 'Deploy separate Modal ASR, TTS, and Twi embedding endpoints with cached model volumes and health checks.'],
  ['06', 'Promote', 'Require automated gates and production evidence; a completed training run is never treated as a shipping decision.'],
];

const labMetrics = [
  ['12,223', 'review candidates', 'source-traceable queue'],
  ['7,814', 'silver corpus rows', 'not human-verified gold'],
  ['0', 'reviewed response rows', 'training correctly blocked'],
  ['100', 'minimum response rows', 'train + dev + test gate'],
];

const questions = [
  ['Now', 'Can a small adapted model recover Twi meaning without inventing symptoms, intent, or context?'],
  ['Near', 'How should AI systems explain confidence, escalation, and intervention to the people relying on them?'],
  ['Long', 'What does accountable human–robot and human–agent collaboration look like in health, energy, and public systems?'],
];

export default function Research() {
  return (
    <div>
      <section className="research-lab-hero">
        <div className="lab-grid" aria-hidden="true" />
        <motion.div className="page-shell research-intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <div>
            <p className="eyebrow lab-kicker"><i /> Research environment · Accra / GH</p>
            <h1 className="display">Language AI,<br /><span>under test.</span></h1>
            <p className="lede">My research sits between speech ML, interactive AI, and production engineering. I train and publish Ghanaian-language models, run GPU workloads on Modal, and build the evaluation and safety machinery required to put them in front of real users.</p>
            <div className="hero-actions"><a className="lab-button" href="https://huggingface.co/teckedd" target="_blank" rel="noreferrer">Open model registry ↗</a><a className="lab-text-link" href="https://github.com/teckedd-code2save/ghana-health-ai" target="_blank" rel="noreferrer">Inspect research code</a></div>
          </div>
        </motion.div>
        <motion.div className="page-shell lab-metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45, duration: .7 }}>
          {labMetrics.map(([value, label, context]) => <div key={label}><strong>{value}</strong><span>{label}</span><small>{context}</small></div>)}
        </motion.div>
      </section>

      <section className="editorial-section" aria-labelledby="understanding-update">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">Latest work · 4 September 2026</p><h2 id="understanding-update" className="section-title">From meaning<br />to an answer.</h2></div><p className="lede">The next research lane changes the objective: train a Twi-native model to produce both an inspectable interpretation and its own bounded response, rather than hiding an interpreter behind a hosted writer.</p></div>
          <div className="research-track"><span className="track-number">DATA</span><div><h2>From review queue to silver corpus</h2></div><p>The 12,223-candidate queue carries 9,245 draft proposals. A separate 7,814-row silver artifact combines medical symptoms, GhanaNLP speech, WAXAL, and targeted product-failure seeds. Its splits contain 6,329 train, 725 dev, and 760 test rows. These are research labels—not clinician-validated or human-verified gold data.</p></div>
          <div className="research-track"><span className="track-number">TRAIN</span><div><h2>Qwen adaptation on Modal</h2></div><p>Fine-tuned Qwen2.5-1.5B-Instruct with LoRA on Modal A100 infrastructure. V3 completed 650 steps after removing unrelated context from ambiguity notes and aligning JSON-only training targets with the inference prompt. Checkpoints and model cards were published to Hugging Face.</p></div>
          <div className="research-track"><span className="track-number">GATE</span><div><h2>Published does not mean promoted</h2><a className="project-arrow" href="https://huggingface.co/teckedd/gha-understand-twi-medical-plus-language-v3" target="_blank" rel="noreferrer">Inspect v3 on Hugging Face ↗</a></div><p>V2 passed 3/8 product fixtures; v3 passed 7/11 on an expanded suite. The different denominators prevent a like-for-like improvement claim. V3 still confuses an eye-pain phrase with cough and misreads a hospital-location request, so it has not been promoted to the live Research endpoint.</p></div>
          <div className="research-track"><span className="track-number">SHIP</span><div><h2>Research modes with boundaries</h2></div><p>Built shadow-adapter integration, an explicit research-mode picker, latency limits, on-demand review lanes, and compact corpus summaries. The workbench persists human decisions and supports CSV review and strict export gates, keeping experimental adaptation separate from accepted evidence.</p></div>
          <div className="research-track"><span className="track-number">NEXT</span><div><h2>Response-capable review loop</h2><a className="project-arrow" href="https://github.com/teckedd-code2save/ghana-health-ai/tree/d459c2a" target="_blank" rel="noreferrer">Inspect the active research commit ↗</a></div><p>The active branch adds reviewed Twi replies, explicit routine-to-emergency safety labels, and consented multi-speaker recordings tied to individual phrases. A strict exporter refuses to train until at least 100 reviewed response rows exist across train, development, and test splits. Today it exports zero—the correct result while review is incomplete.</p></div>
          <p className="lede">Evidence snapshots: semantic pipeline <a href="https://github.com/teckedd-code2save/ghana-health-ai/tree/9f4ff2c490da50762f7a6afc9e807143d4842e84" target="_blank" rel="noreferrer">9f4ff2c</a>; active response-corpus work <a href="https://github.com/teckedd-code2save/ghana-health-ai/tree/d459c2a" target="_blank" rel="noreferrer">d459c2a</a>. The latter is active branch work, not a trained or promoted model. Neither corpus establishes clinical safety.</p>
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
          <div className="section-head"><div><p className="eyebrow">02 · Modal research infrastructure</p><h2 className="section-title">A lab that can<br /><span style={{ color: 'var(--acid)' }}>actually ship.</span></h2></div><p className="lede">Modal is the compute and serving layer—not a one-off notebook host. The same system supports controlled training, evaluation recovery, artifact storage, and production inference.</p></div>
          <div className="modal-pipeline">
            {modalStages.map(([number, title, body]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="research-proof-strip"><span>GPU training</span><span>persistent volumes</span><span>detached + resumable runs</span><span>FastAPI / ASGI endpoints</span><span>HF token secrets</span><span>promotion audits</span></div>
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
          <div className="section-head"><div><p className="eyebrow">04 · Research horizon</p><h2 className="section-title">Build now.<br /><span style={{ color: 'var(--acid)' }}>Ask further.</span></h2></div><p className="lede">A practical thread connects today’s prototypes to longer-term work in accountable autonomous systems.</p></div>
          <div className="principles">
            {questions.map(([time, question], index) => <article className="principle" key={time}><b>0{index + 1} / {time}</b><h3>{question}</h3></article>)}
          </div>
        </div>
      </section>
    </div>
  );
}
