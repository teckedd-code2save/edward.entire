// Each worker owns one real Rust WASM runtime. No data leaves this worker.
let runtime;
let build;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
async function load() {
  const base = new URL('./', self.location.href);
  const manifestResponse = await fetch(new URL('build-manifest.json', base));
  if (!manifestResponse.ok) throw new Error('Runtime manifest could not be loaded.');
  build = await manifestResponse.json();
  const response = await fetch(new URL('bnl-playground.wasm', base));
  if (!response.ok) throw new Error('The Rust runtime could not be loaded.');
  const bytes = await response.arrayBuffer();
  const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
  if (digest !== build.wasmSha256) throw new Error('Runtime checksum mismatch. Reload to fetch a consistent build.');
  const module = await WebAssembly.compile(bytes);
  if (WebAssembly.Module.imports(module).length) throw new Error('Unexpected runtime imports.');
  runtime = (await WebAssembly.instantiate(module, {})).exports;
}
self.onmessage = async ({ data: { id, request } }) => {
  try {
    if (!runtime) await load();
    const bytes = encoder.encode(JSON.stringify(request));
    if (bytes.length > 65536) throw new Error('Request exceeds 64 KiB. Reduce the data or declaration.');
    runtime.playground_request_clear();
    for (const byte of bytes) runtime.playground_request_byte(byte);
    runtime.playground_dispatch();
    const length = runtime.playground_response_len();
    if (length > 8 * 1024 * 1024) throw new Error('Runtime response exceeds the display budget.');
    const output = new Uint8Array(length);
    for (let i = 0; i < length; i++) output[i] = runtime.playground_response_byte(i);
    self.postMessage({ id, response: { ...JSON.parse(decoder.decode(output)), build } });
  } catch (error) {
    self.postMessage({ id, error: error instanceof Error ? error.message : 'Runtime failed.' });
  }
};
