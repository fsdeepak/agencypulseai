import { Column } from "@/components/ui/DataTable";

export interface Alert {
  id: string;
  method: string;
  url: string;
  message: string;
  createdAt: string;
  severity: string;
  type: string;
  stack: string;
  aiReason: string;
  aiSuggestion: string;
  status: number;
  count: number;
}
export const columns: Column<Alert>[] = [
  {
    header: "Timestamp",
    render: (alert) => (
      <div className="flex items-center gap-3 text-[12px]">
        <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
        <span className="text-[10px] opacity-90">
          {new Date(alert.createdAt).toLocaleTimeString()}
        </span>
      </div>
    ),
    className: "w-[10%]",
  },
  {
    header: "Happens",
    render: (alert) => (
      <span className="px-2 py-1 rounded text-gray-200 font-bold">
        {alert.count}x
      </span>
    ),
    className: "w-[1%]",
  },
  {
    header: "Status",
    render: (alert) => (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
        {alert.status}
      </span>
    ),
    className: "w-[1%]",
  },
  {
    header: "Type",
    render: (alert) => (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
        {alert.type}
      </span>
    ),
    className: "w-[1%]",
  },
  {
    header: "Severity",
    render: (alert) => (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
        {alert.severity}
      </span>
    ),
    className: "w-[1%]",
  },
  {
    header: "Method",
    render: (alert) => (
      <span className="text-gray-200 font-semibold">{alert.method}</span>
    ),
    className: "w-[1%]",
  },
  {
    header: "URL",
    render: (alert) => (
      <div
        className="max-w-[420px] text-gray-200 hover:underline cursor-default"
        title={alert.url}
      >
        {alert.url}
      </div>
    ),
    className: "w-[20%]",
  },
  {
    header: "Message & Stack",
    render: (alert) => (
      <div className="flex flex-col gap-1.5">
        <span className="text-gray-200 leading-relaxed">{alert.message}</span>
        {alert.stack && (
          <details className="mt-1">
            <summary className="text-[10px] text-red-400 cursor-pointer hover:text-red-600">
              View Stack Trace
            </summary>
            <pre className="mt-2 p-3 bg-red-50 text-red-500 text-[11px] rounded border border-red-100 overflow-x-auto whitespace-pre-wrap break-all leading-normal">
              {alert.stack}
            </pre>
          </details>
        )}
      </div>
    ),
    className: "w-[5%]",
  },
  {
    header: "AI Reason",
    render: (alert) => (
      <span className="text-gray-200 font-semibold">{alert.aiReason}</span>
    ),
    className: "w-[25%]",
  },
  {
    header: "AI Suggestion",
    render: (alert) => (
      <span className="text-gray-200 font-semibold">{alert.aiSuggestion}</span>
    ),
    className: "w-[50%]",
  },
];
