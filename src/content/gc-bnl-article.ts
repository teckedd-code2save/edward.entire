import type { Article } from './article-library';

export const gcBnlArticle: Article = {
  id: 'shipping-bnl-through-groundcontrol',
  title: 'Shipping BNL',
  accent: 'From the Browser',
  subtitle: 'Building and shipping a browser compiler through GroundControl',
  description: 'How I used GroundControl’s browser terminal to build the BNL playground, catch a restart bug, and check the deployed compiler.',
  tags: ['groundcontrol', 'bnl', 'verification', 'developer-tools'],
  date: '28 September 2026',
  html: `
<p class="article-standfirst">The goal was to let people try Backend as Natural Language with their own data while I was away from my computer. GroundControl supplied the working host; the result is a <a href="#/playground/bnl">public, executable playground</a> on this portfolio.</p>
<h2>A real terminal, a bounded build</h2>
<p>GroundControl’s current terminal is a persistent xterm/PTY session on the selected VPS. Through that authenticated surface, the work used isolated Git checkouts and resource-bounded Docker containers: Rust 1.88 for the compiler, Playwright 1.57 with Chromium 143 for browser acceptance, and Node 24 for the portfolio.</p>
<p>This was supervised terminal work. It was not an autonomous Loop run, a built-in BNL integration or a replacement CI service. GroundControl remained the operational control plane; GitHub held the source/review history; Vercel published the existing portfolio after merge.</p>
<figure class="article-evidence"><a href="/images/bnl/gc-bnl-scorecard-20260928.jpg" target="_blank" rel="noreferrer"><img src="/images/bnl/gc-bnl-scorecard-20260928.jpg" width="1057" height="369" loading="lazy" alt="GroundControl terminal displaying measured BNL verification results and exact runtime identity" /></a><figcaption>Live GC terminal, 28 September 2026. A script reads saved scorecards: shipping HTTP 37/37, delivery/migration 33/33 and actual-WASM browser acceptance 31/31. The crop omits infrastructure identifiers and the shell prompt. These are recorded test outcomes, not native GC dashboard metrics.</figcaption></figure>
<h2>Make the values come from execution</h2>
<p>The public wrapper invokes the existing Rust compiler, typed BIR validator, planner and guarded executor. Its store begins empty. Visitors supply records and typed inputs, change declarations, and inspect the resulting values, execution traces and local state.</p>
<p>The browser suite changed data and sorting rules to prove the result followed them. It checked invalid nominal types and imports, rollback after a staged write, committed tasks, separate-tab isolation, export identity, worker failure, keyboard access and a 390px mobile viewport. The final suite passed 31 checks. The portfolio’s 30 existing tests, lint and production build also passed.</p>
<p>The native delivery review was separate. It found a liveness bug where a batch smaller than the route count could keep skipping later routes. The correction reserves a slot for every configured route. Seven host Rust tests, 37 shipping HTTP checks and 33 delivery/migration checks passed. The public playground cannot access that native delivery path.</p>
<h2>Keep the failed attempts</h2>
<p>The first container command did not have Cargo on its login-shell PATH. Packaging then could not resolve a linked worktree’s host-side Git metadata. Those failures stayed in the record; Cargo used its container path and packaging ran from the real checkout.</p>
<p>The first browser attempt checked an article before its animated route had mounted. The corrected harness waits for the destination heading. A later review found that an export after restart could retain the previous request identity; the implementation and regression were updated.</p>
<h2>Check the public consequence</h2>
<p>After release, a fresh public session loaded with zero records and the expected source/binary identity. A custom declaration checked whether a supplied integer was greater than 30. Input 31 produced true; changing it to 12 produced false. Those were explicit verification inputs, not customer fixtures.</p>
<figure class="article-evidence"><a href="/images/bnl/bnl-production-execution-20260928.jpg" target="_blank" rel="noreferrer"><img src="/images/bnl/bnl-production-execution-20260928.jpg" width="1357" height="932" loading="lazy" alt="Deployed BNL playground returning false from the actual Rust runtime for the supplied integer 12" /></a><figcaption>Public execution after release cb61c49: the real runtime returns false for days = 12 under the rule days &gt; 30. The source commit and WASM digest are visible below the result.</figcaption></figure>
<p>The distinction matters: a shell command finishing, a test passing and a public feature working are three separate observations. GroundControl provided the host access to build it. Changing inputs in the published playground confirmed that the compiler was working after release.</p>
<h2>Repeat the workflow</h2>
<ol><li>Pin source and build inputs in an isolated checkout.</li><li>Run explicit build and test commands through the authenticated GC terminal, with resource limits.</li><li>Retain exit codes, scorecards, hashes, failures and captioned screenshots.</li><li>Publish through the application’s existing review/deployment path.</li><li>Open the public route independently and change an input to verify its consequence.</li></ol>
<p><a href="#/article/bnl-getting-started">Start with your own BNL data</a> or read <a href="#/article/bnl-runtime-boundaries">how the runtime works</a>.</p>
<p class="article-footnote">Captured 28 September 2026, UTC. Rust runtime source a1d606c588ceb849c6a85561a9820c6ab6885e58; WASM SHA-256 fa55334543c5e22ef64ea7adb3a7583f134a071fc3c739a91c86a0bc0d49e337. <a href="https://github.com/teckedd-code2save/groundcontrol/blob/68e2c230576ded23b7554d7ca8622338ae832ea0/src/app/terminal/page.tsx" target="_blank" rel="noreferrer">Current terminal implementation</a>. Development evidence does not establish independent language generalisation, production payment/message delivery or autonomous recovery.</p>`,
};
