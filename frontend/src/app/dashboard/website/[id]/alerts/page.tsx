"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation"; // or 'react-router-dom'
import { useGetAlerts } from "@/hooks/log.hook";
import Link from "next/link";

interface Alert {
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
}

interface GroupedAlerts extends Alert {
  count: number;
  lastOccurrence: string;
}

export default function WebsitealertsPage() {
  const params = useParams();
  const websiteId = params.id as string; // This grabs 'cmotsazx9000048la2imyq9u4'

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAlerts(websiteId);

  // Flatten the alerts across all pages
  const allAlerts = data?.pages.flatMap((page) => page.alerts) ?? [];

  const groupedAlerts = useMemo((): GroupedAlerts[] => {
    const groups = allAlerts.reduce(
      (acc, alert) => {
        const key = `${alert.method}-${alert.url}-${alert.message}`;

        if (!acc[key]) {
          acc[key] = {
            ...alert,
            count: 1,
            lastOccurrence: alert.createdAt,
          };
        } else {
          acc[key].count += 1;
        }
        return acc;
      },
      {} as Record<string, any>,
    );

    return Object.values(groups);
  }, [allAlerts]);

  if (isLoading) return <div>Loading alerts...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl pt-12 pb-8 font-bold mb-4 text-gray-200">
          Website Alerts
        </h1>
        <div>
          <Link href={`/dashboard/website/${websiteId}/logs`}>
            <button className="btn">Back to Logs</button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse font-mono text-sm">
          <thead className="bg-gray-900 text-gray-200 uppercase text-[10px] tracking-wider">
            <tr>
              {/* w-[1%] whitespace-nowrap forces the column to shrink-wrap the text */}
              <th className="px-4 py-3 border-b w-[10%] whitespace-nowrap">
                Timestamp
              </th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap text-center">
                Happens
              </th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap text-center">
                Status
              </th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap text-center">
                Type
              </th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap text-center">
                Severity
              </th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap">
                Method
              </th>
              <th className="px-4 py-3 border-b w-[20%]">URL</th>
              <th className="px-4 py-3 border-b">Message & Stack</th>
              <th className="px-4 py-3 border-b">AI Reason</th>
              <th className="px-4 py-3 border-b">AI Suggestion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-800">
            {groupedAlerts.length > 0 ? (
              groupedAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-gray-50/50 transition-colors align-top"
                >
                  {/* Timestamp */}
                  <td className="px-4 py-3 whitespace-nowrap text-gray-200 text-[12px]">
                    <div className="flex items-center gap-3">
                      <span>
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] opacity-90">
                        {new Date(alert.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>

                  {/* count */}
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 rounded text-gray-200 font-bold">
                      {alert.count}x
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
                      {alert.status}
                    </span>
                  </td>

                  {/* type */}
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
                      {alert.type}
                    </span>
                  </td>

                  {/* severity */}
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border bg-red-600 text-white border-red-100">
                      {alert.severity}
                    </span>
                  </td>

                  {/* Method */}
                  <td className="px-4 py-3">
                    <span className="text-gray-200 font-semibold">
                      {alert.method}
                    </span>
                  </td>

                  {/* URL - Takes 25% of the space */}
                  <td className="px-4 py-3">
                    <div
                      className="max-w-[420px] text-gray-200 hover:underline cursor-default"
                      title={alert.url}
                    >
                      {alert.url}
                    </div>
                  </td>

                  {/* Message & Stack - Takes the rest of the space */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-200 leading-relaxed">
                        {alert.message}
                      </span>
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
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-200 font-semibold">
                      {alert.aiReason}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-200 font-semibold">
                      {alert.aiSuggestion}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-12 text-center text-gray-200 italic"
                >
                  No alerts found for this website.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="grid place-items-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn mt-5"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
