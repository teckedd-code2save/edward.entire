import { Link } from 'react-router-dom';
import './PortfolioSections.css';

const researchRevision = 'e5ce66b03b39c77f658e3e38e77e50c2b4f1d789';
const alignmentSource = `https://github.com/teckedd-code2save/ghana-health-ai/blob/${researchRevision}/docs/alignment-handoff-20260915.md`;
const dondoCard = 'https://huggingface.co/teckedd/gha-dondo-w2v-bert-twi-v2/blob/1ede2c51897382904bdb527e3123a6fb9e0c3e59/README.md';
const whisperCard = 'https://huggingface.co/teckedd/gha-whisper-small-twi-v6/blob/db22ba3178f02d5b337ea6a5b606b9ff71922213/README.md';

export default function Research() {
  function jump(id: string) {
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  return <div className="sections-page research-notebook">
    <header className="research-opening">
      <div className="page-shell sections-masthead">
        <div><p className="eyebrow">Research / Twi, language & systems</p><h1>Start with the way <br />people <em>speak.</em></h1></div>
        <div><p className="sections-lede">Ghana Health AI began with a simple question: can someone start a useful conversation in Twi? I’m working through the speech, meaning, and data problems behind that experience.</p><div className="section-actions"><a className="button-primary" href="https://ghanahealth.serendepify.com/" target="_blank" rel="noreferrer">Try the research preview ↗</a><a className="section-link" href="https://huggingface.co/teckedd" target="_blank" rel="noreferrer">Explore the models ↗</a></div></div>
      </div>
      <nav className="page-shell research-chapter-nav" aria-label="Research chapters">{[['speech', '01', 'Hear the words'], ['meaning', '02', 'Build the data'], ['evaluation', '03', 'Test the response']].map(([id, number, label]) => <button type="button" key={id} onClick={() => jump(id)}><span>{number}</span>{label}<span aria-hidden="true">↓</span></button>)}</nav>
    </header>

    <div className="page-shell research-findings">
      <p className="research-context">A research notebook, with links to the underlying work. Measurements are from my own evaluations; they are not independent benchmarks or overall product accuracy. No result here establishes clinical safety or native-speaker certification.</p>
      <section className="research-finding" id="speech" tabIndex={-1} aria-labelledby="speech-title">
        <div className="finding-heading"><p className="eyebrow">01 / Speech recognition</p><h2 id="speech-title">First, hear <br />the words.</h2><p>A conversation starts before the language model. It starts with getting the person’s words right.</p></div>
        <div className="finding-body"><p className="finding-lead">I adapted speech models for Twi and published the checkpoints with their training recipes and evaluation notes.</p><p>DONDO and Whisper explore different approaches to transcription. Each run documents its data, decoding method, and remaining errors.</p>
          <div className="section-actions"><a className="section-link" href={dondoCard} target="_blank" rel="noreferrer">Read the DONDO model card ↗</a><a className="section-link" href={whisperCard} target="_blank" rel="noreferrer">Read the Whisper model card ↗</a></div>
          <details className="evidence-disclosure"><summary>Speech evaluation details <span aria-hidden="true">+</span></summary><div>
            <p>Word error rate (WER) counts transcription errors against a reference; lower is better. It is not a measure of medical or conversational accuracy.</p>
            <dl className="research-results"><div><dt>DONDO v2 / greedy CTC</dt><dd><strong>27.43% WER</strong><span>Validation value published in the 18 August model card. This run uses no language-model decoder.</span></dd></div><div><dt>Whisper v6 / local-holdout trial</dt><dd><strong>29.70% WER</strong><span>Validation value published in the 16 August model card. The card records this trial as not promoted.</span></dd></div></dl>
            <p className="source-caption">These cards describe different runs and conditions. The values are presented separately, not as a controlled head-to-head benchmark. Links above are pinned to the versions reviewed on 3 October 2026.</p>
            <a className="section-link" href="https://huggingface.co/teckedd/gha-dondo-w2v-bert-twi-v1" target="_blank" rel="noreferrer">Follow the earlier DONDO trial ↗</a>
          </div></details>
        </div>
      </section>
      <section className="research-finding" id="meaning" tabIndex={-1} aria-labelledby="meaning-title">
        <div className="finding-heading"><p className="eyebrow">02 / Language data</p><h2 id="meaning-title">A translation pair <br />is a beginning.</h2><p>Teaching a model to align two languages is one step toward a conversation.</p></div>
        <div className="finding-body"><p className="finding-lead">I built a Twi–English alignment release that keeps every training example connected to its source.</p><p>Sentence pairs, dictionary entries, and translated questions keep their own identities. The next collection challenge is native, multi-turn Twi replies—the turns that teach a model how to answer and carry a conversation.</p>
          <div className="section-actions"><a className="section-link" href={alignmentSource} target="_blank" rel="noreferrer">Inspect the data handoff ↗</a><Link className="section-link" to="/article/training-an-interpreter-not-an-assistant">Read why the dataset matters →</Link></div>
          <details className="evidence-disclosure"><summary>Dataset composition <span aria-hidden="true">+</span></summary><div><dl className="research-results"><div><dt>Unique alignment sources</dt><dd><strong>30,404</strong><span>Sentence, dictionary, and question pairs in the 15 September handoff.</span></dd></div><div><dt>Training + validation examples</dt><dd><strong>60,808</strong><span>Two translation directions from those same sources—not additional conversations.</span></dd></div></dl><p>English retention data is stored separately. This handoff did not train a new model or change production chat. Native Twi response collection and health review remained unfinished.</p></div></details>
        </div>
      </section>
      <section className="research-finding" id="evaluation" tabIndex={-1} aria-labelledby="evaluation-title">
        <div className="finding-heading"><p className="eyebrow">03 / Evaluation</p><h2 id="evaluation-title">The answer has <br />to mean something.</h2><p>A tidy response can still misunderstand the person asking.</p></div>
        <div className="finding-body"><p className="finding-lead">I test meaning, language, and product behavior separately, and keep the failures that change the next experiment.</p><p>Ghana Health AI made the distinction between interpreting a question and answering it visible. That led to a collection workflow for reviewed responses and explicit checks before a candidate could enter the product.</p><div className="section-actions"><Link className="section-link" to="/article/meaning-before-medicine">Read the meaning and safety study →</Link><a className="section-link" href={`https://github.com/teckedd-code2save/ghana-health-ai/tree/${researchRevision}`} target="_blank" rel="noreferrer">Inspect the research source ↗</a></div>
          <ol className="research-process"><li><span>01</span><strong>Keep the source</strong><p>Data identity, model revision, and experiment context.</p></li><li><span>02</span><strong>Inspect the failures</strong><p>Meaning, language, and behavior in the product.</p></li><li><span>03</span><strong>Decide what ships</strong><p>Check the results before promoting a model.</p></li></ol>
          <details className="evidence-disclosure"><summary>Next experiments <span aria-hidden="true">+</span></summary><div><p>The next questions concern model foundations, native Twi responses, and the cost of training and serving them. The MORENA audit starts with tokenizer and language checks before deciding whether adaptation is justified.</p><a className="section-link" href="https://github.com/teckedd-code2save/ghana-health-ai/pull/37" target="_blank" rel="noreferrer">Inspect the MORENA audit ↗</a></div></details>
        </div>
      </section>
    </div>
    <section className="section-next"><div className="page-shell section-next-inner"><div><p className="eyebrow">Another research question / BNL</p><h2>Can a backend rule <br />be something you read?</h2><p>The compiler experiment is available as a working browser editor. Change the rule and inspect the result.</p></div><div className="section-actions"><Link className="button-primary" to="/playground/bnl">Try the compiler →</Link><Link className="section-link" to="/contact?topic=research">Talk research →</Link></div></div></section>
  </div>;
}
