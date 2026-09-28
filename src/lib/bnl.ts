export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export type BnlResponse = {
  status: string;
  committed?: boolean;
  value?: Json;
  outputType?: string;
  state: Record<string, Json[]>;
  error?: { code: string; message: string; line?: number };
  trace?: Json[];
  bir?: Json;
  semanticDigest?: string;
  catalogue?: Json;
  build: { sourceCommit: string; wasmSha256: string; wasmBytes: number };
};
export const emptyData = { customers: [], orders: [], subscriptions: [], invoices: [] };
export const recipes = {
  orders: {
    label: 'Query your orders', input: 'customerId', type: 'CustomerId',
    source: 'Compose MyOrderFeed\nInput customerId: CustomerId\nAllow Customer.Read\nFetch orders using Order.ListByCustomer.v1 with customerId = $input.customerId\nSelect recent from orders where state = "completed" order by createdAt descending limit 5\nReturn recent',
  },
  policy: {
    label: 'Check an invoice', input: 'invoiceId', type: 'InvoiceId',
    source: 'Compose MyInvoiceCheck\nInput invoiceId: InvoiceId\nAllow Invoice.FollowUp\nFetch invoice using Invoice.GetById.v1 with invoiceId = $input.invoiceId\nCheck eligible when invoice.paid is false and invoice.overdueDays > 30\nReturn eligible',
  },
  task: {
    label: 'Create a local task', input: 'invoiceId', type: 'InvoiceId',
    source: 'Compose MyFollowUp\nInput invoiceId: InvoiceId\nAllow Invoice.FollowUp\nFetch invoice using Invoice.GetById.v1 with invoiceId = $input.invoiceId\nCheck eligible when invoice.paid is false and invoice.overdueDays > 30\nRequire eligible\nCall task using FollowUpTask.Create.v1 with invoiceId = $input.invoiceId when true\nReturn task',
  },
};
export const pretty = (value: unknown) => JSON.stringify(value, null, 2);
export class BnlSession {
  private worker: Worker;
  private counter = 0;
  private pending?: { id: number; timer: ReturnType<typeof setTimeout>; resolve: (response: BnlResponse) => void; reject: (error: Error) => void };
  constructor() {
    this.worker = new Worker(new URL('/bnl/worker.js', window.location.origin));
    this.worker.onmessage = ({ data }: MessageEvent<{ id: number; response: BnlResponse; error?: string }>) => {
      if (!this.pending || this.pending.id !== data.id) return;
      const pending = this.pending;
      clearTimeout(pending.timer);
      this.pending = undefined;
      if (data.error) pending.reject(new Error(data.error)); else pending.resolve(data.response);
    };
    this.worker.onerror = () => this.dispose();
  }
  send(request: unknown): Promise<BnlResponse> {
    if (this.pending) return Promise.reject(new Error('Wait for the current operation.'));
    return new Promise((resolve, reject) => {
      const id = ++this.counter;
      const timer = setTimeout(() => this.dispose(), id === 1 ? 15000 : 5000);
      this.pending = { id, timer, resolve, reject };
      this.worker.postMessage({ id, request });
    });
  }
  dispose() {
    this.worker.terminate();
    if (this.pending) {
      clearTimeout(this.pending.timer);
      this.pending.reject(new Error('The runtime stopped. Its in-memory session is gone. Restart, then load your records again.'));
      this.pending = undefined;
    }
  }
}
