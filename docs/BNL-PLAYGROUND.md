# BNL public playground

Production was verified after PR64 released as cb61c49e5fe133ee465d13f4e965af4511443721. See [captioned production and GC screenshots](evidence/bnl-playground-2026-09-28/PRODUCTION-SCREENSHOTS.md), the [image manifest](../public/images/bnl/manifest.json), and the original [browser scorecard](evidence/bnl-playground-2026-09-28/browser-scorecard.json). Images are embedded in the getting-started guide and GroundControl articles; synthetic acceptance inputs are explicitly labelled.

Route: `/#/playground/bnl`. Guides: `/#/article/bnl-getting-started` and `/#/article/bnl-runtime-boundaries`.

The public page runs the actual BNL Rust compiler and guarded executor compiled to WebAssembly. It is not a JavaScript imitation. It begins with an empty Store, imports visitor-supplied data and maintains local effects only in its worker. No input data is uploaded or placed in localStorage, URLs or telemetry. Explicit export downloads a JSON workspace.

`public/bnl/build-manifest.json` pins the private BNL source revision, build inputs and binary checksum. `worker.js` checks the checksum, rejects unexpected WASM imports and invokes the byte-oriented ABI. `src/lib/bnl.ts` owns the worker watchdog; `src/pages/BnlPlayground.tsx` renders the real response as escaped text. The native host, fixture workbench and delivery worker are not deployed.

Limits: 64 KiB request, 32 KiB declaration, 200 imported rows, 200 retained task/review/marker effects, 64 MiB WASM memory, five-second operation timeout (fifteen seconds for initial loading). Import and execution are atomic. Import replaces all data and clears effects. Runtime teardown clears session memory. Export captures the last executed request separately from currently edited source/inputs, so an edited declaration cannot be mistaken for the cause of an earlier result.

Allowed capabilities: customer/order/subscription/outstanding-invoice reads, invoice lookup, follow-up task creation, account review, invoice idempotency check/record. Payment/refund/message calls are rejected before execution, including unreachable calls. These controls bound a public browser runtime; they are not production authentication or durable storage.

## Maintainer build

With authorised access to the private BNL repository, use the source commit in the manifest:

```sh
cargo test --locked --manifest-path playground/Cargo.toml
rustup target add wasm32-unknown-unknown
RUSTFLAGS=-Clink-arg=--max-memory=67108864 cargo build --locked --release --target wasm32-unknown-unknown --manifest-path playground/Cargo.toml
python3 playground/build.py
```

Copy only `playground/dist/bnl-playground.wasm`, `build-manifest.json` and third-party notices into `public/bnl/`. Never copy the native host package, fixture exports, credentials or private repository. BNL's source license remains undecided. The compiled BNL artifact is not covered by this portfolio's MIT license; dependency notices remain in `public/bnl/THIRD-PARTY-NOTICES.txt`.

Run `npm ci`, `npm run build`, `npm run lint` and `npm test` using Node 24. Browser acceptance must use the real WASM: empty load, user-created data, source/data sensitivity, rejected source/types/import, committed local effects, rollback, cross-tab isolation, export, mobile overflow, keyboard access, network privacy and visible fatal recovery. Evidence and exact deployment identity are recorded alongside this guide.
