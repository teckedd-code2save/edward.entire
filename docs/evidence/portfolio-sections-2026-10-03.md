# Supporting portfolio sections — 3 October 2026

## Visitor experience

Research now follows three questions: hearing the words, building language data, and evaluating a response. Model and data details are available in plain-language disclosures. Writing features the actual BNL playground, adds subject filters and reading times, and provides article navigation plus links to the associated project. Working together connects three concrete needs to current projects. Contact can prepare an email draft for a project, role, or research conversation; the visitor reviews and sends it in their own email application.

The homepage connects the project collection to Research and Writing. Quick-help links now open the relevant project. At the user’s request, the opening now reads “I turn ideas into working products.” with “Engineer & independent builder” and concrete product examples. The 3D scene, camera, scroll timeline, chapter behavior, and five-project spotlight are unchanged.

At the user’s request, presentation labels such as “Open the evidence,” “Selected evidence,” and “Inspect the evidence” were removed. Research disclosures name their contents directly. The BNL output panel says “Result.” The shipping article links to the practical guide and runtime explanation rather than offering standalone capture/manifest links.

## Research source reconciliation

Reviewed the published model cards and the Ghana Health AI research handoff. Earlier portfolio figures referred to different runs and decoding conditions, so this page now links to exact published source versions and does not rank the results as a shared benchmark.

- [DONDO v2 model card](https://huggingface.co/teckedd/gha-dondo-w2v-bert-twi-v2/blob/1ede2c51897382904bdb527e3123a6fb9e0c3e59/README.md): card dated 18 August 2026, validation WER 0.27425920666477327 (27.43%), greedy CTC without a language-model decoder. The card’s candidate flag is not treated as proof of current production promotion.
- [Whisper v6 model card](https://huggingface.co/teckedd/gha-whisper-small-twi-v6/blob/db22ba3178f02d5b337ea6a5b606b9ff71922213/README.md): card dated 16 August 2026, local-holdout trial validation WER approximately 0.296972 (29.70%), explicitly not promoted. Different run conditions prevent a controlled head-to-head comparison with DONDO.
- [Alignment handoff](https://github.com/teckedd-code2save/ghana-health-ai/blob/e5ce66b03b39c77f658e3e38e77e50c2b4f1d789/docs/alignment-handoff-20260915.md): 30,404 unique sources, yielding 59,664 training and 1,144 validation examples across two translation directions (60,808 total). The directional examples are not additional source conversations. English retention records remain separate. The handoff did not train a new model or alter production chat; native multi-turn Twi response collection and health review remained unfinished.
- [MORENA audit](https://github.com/teckedd-code2save/ghana-health-ai/pull/37): linked as a next-experiment research artifact, not as a released model or completed training result.

These are the author’s evaluations. The page does not claim independent benchmarking, overall conversational accuracy, clinical safety, or native-speaker certification.

## Validation

- Production TypeScript/Vite build and ESLint passed with Node 24. The existing large-chunk advisory remains.
- All 43 tests across nine files passed, including contact topic/deep-link behavior, body encoding, preserved introductions, writing filters, article section focus, and research chapter navigation.
- Browser checks at desktop width and 390px: Research chapters and disclosures, Writing subject filtering, article section focus without changing the hash route, Working together navigation, and Contact topic selection with a preserved introduction. The email destination was inspected; no email was sent.
- No horizontal overflow on the Research, Writing, Working together, or Contact pages at 390px.
- The revised home introduction fits above the 3D scene at 390px (heading bottom 239px, scene start 279px). Desktop chapter navigation still updates the scene and heading; no browser errors were recorded.
