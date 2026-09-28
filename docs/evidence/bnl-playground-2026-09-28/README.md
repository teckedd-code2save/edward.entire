# BNL playground verification — 28 September 2026

The public preview executes the real Rust compiler and executor over visitor-supplied data. The product begins empty; all test business inputs in this archive are explicitly synthetic and exist only in the acceptance test.

## Results

- Portfolio production build and lint passed; all 30 existing Vitest tests passed on Node 24.
- Actual-WASM Chromium acceptance: 31/31. See browser-scorecard.json and scripts/bnl-browser-check.py.
- The first browser run passed the runtime/data checks but checked an article link before the animated SPA route had mounted. Its scorecard and log are retained. The test now awaits the destination heading.
- Empty desktop, executed-result desktop and 390px mobile screenshots are retained. The browser test ran in an isolated Docker container with networking disabled and served the production dist locally.
- SHA-256 verification, no WASM imports, source/data sensitivity, nominal-type rejection, atomic import/rollback, local effects, cross-tab isolation, escaped visitor content, export identity, no execution uploads, no localStorage, keyboard navigation, mobile overflow and visible worker failure were checked.

## Explicit boundary review

Reviewed the Rust wrapper allowlist, typed import/relationship validation, engine copy-then-commit path, byte ABI, memory cap, browser worker lifecycle, escaped JSON rendering, request/response identity and download-only export. No native host, fixture data, secrets, message adapter or payment adapter is packaged. The compiled binary contains neither historical customer-001 nor invoice-001 fixture IDs. This is an implementation review and development evidence, not an independent security audit or language generalisation study.

## Provenance and limits

BNL source: a1d606c588ceb849c6a85561a9820c6ab6885e58. WASM SHA-256: fa55334543c5e22ef64ea7adb3a7583f134a071fc3c739a91c86a0bc0d49e337. The authoritative file-level manifest is public/bnl/build-manifest.json. The browser suite tests the portfolio source at 8bea7b4f6aeb0729ab455b693ae4078a5dec1d23. Runtime source remains private; no open-source license is implied. Dependency license texts are in public/bnl/THIRD-PARTY-NOTICES.txt.

GC used the existing bnl-validation-browser:20260927 image (Rust 1.88 / Playwright 1.57 / Chromium 143) and official node:24-bookworm. Commands and raw outputs are retained. Initial runtime packaging failed because Cargo was absent from the login-shell PATH, then because the worktree metadata was outside the build container. Cargo was invoked using its container path and packaging ran against the real host worktree; these were environment repairs, not ignored failures. Original BNL build logs are retained in the private BNL evidence archive.

GitHub Actions availability is reported separately from GC checks; these results do not manufacture a green GitHub status. Production deployment and public URL verification are recorded after release.
