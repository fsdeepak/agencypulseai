import { Column } from "@/components/ui/DataTable";

export interface Logs {
  id: string;
  method: string;
  url: string;
  message: string;
  createdAt: string;
  severity: string;
  type: string;
  stack: string;
  status: number;
  responseTime: number;
  count: number;
}

export const colunms: Column<Logs>[] = [
  {
    header: "Timestamp",
    render: (log) => (
      <div className="flex items-center gap-3 text-[12px]">
        <span>{new Date(log.createdAt).toLocaleDateString()}</span>
        <span className="text-[10px] opacity-90">
          {new Date(log.createdAt).toLocaleTimeString()}
        </span>
      </div>
    ),
    className: "w-[10%]",
  },
  {
    header: "Happens",
    render: (log) => <span className="font-semibold">{log.count}x</span>,
    className: "w-[1%]",
  },
  {
    header: "Status",
    className: "w-[1%]",
    render: (log) => (
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
          log.status >= 400
            ? "bg-red-600 text-white border-red-100"
            : "bg-green-500 text-white border-green-100"
        }`}
      >
        {log.status}
      </span>
    ),
  },
  {
    header: "Method",
    render: (log) => <span className="font-semibold">{log.method}</span>,
    className: "w-[1%]",
  },
  {
    header: "Latency",
    render: (log) => (
      <span className="whitespace-nowrap">
        {log.responseTime}
        <span className="text-[10px] ml-0.5">ms</span>
      </span>
    ),
    className: "w-[1%]",
  },
  {
    header: "URL",
    render: (log) => (
      <div
        className="max-w-[600px] hover:underline cursor-default truncate"
        title={log.url}
      >
        {log.url}
      </div>
    ),
    className: "w-[34%]",
  },

  {
    header: "Message & Stack",
    render: (log) => (
      <div className="flex flex-col gap-1.5">
        <span className="leading-relaxed">{log.message}</span>
        {log.stack && (
          <details className="mt-1">
            <summary className="text-[10px] text-red-400 cursor-pointer hover:text-red-600">
              View Stack Trace
            </summary>
            <pre className="mt-2 p-3 bg-red-900/20 text-red-400 text-[11px] rounded border border-red-900/30 overflow-x-auto whitespace-pre-wrap break-all leading-normal">
              {log.stack}
            </pre>
          </details>
        )}
      </div>
    ),
    className: "w-[50%]",
  },
];
