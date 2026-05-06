"use client";
import { useParams } from "next/navigation"; // or 'react-router-dom'
import { useGetLogs } from "@/hooks/log.hook";
import Link from "next/link";
import { useMemo } from "react";

interface Logs {
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
}

interface GroupedLogs extends Logs {
  count: number;
  lastOccurrence: string;
}

export default function WebsiteLogsPage() {
  const params = useParams();
  const websiteId = params.id as string; // This grabs 'cmotsazx9000048la2imyq9u4'

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetLogs(websiteId);

  // Flatten the logs across all pages
  const allLogs = data?.pages.flatMap((page) => page.logs) ?? [];

  const groupedLogs = useMemo((): GroupedLogs[] => {
    const groups = allLogs.reduce(
      (acc, log) => {
        const key = `${log.method}-${log.url}-${log.message}`;

        if (!acc[key]) {
          acc[key] = {
            ...log,
            count: 1,
            lastOccurrence: log.createdAt,
          };
        } else {
          acc[key].count += 1;
        }
        return acc;
      },
      {} as Record<string, any>,
    );
    return Object.values(groups);
  }, [allLogs]);

  if (isLoading) return <div>Loading logs...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl pt-12 pb-8 font-bold mb-4 text-gray-200">
          Website Logs
        </h1>
        <div>
          <Link href={`/dashboard/website/${websiteId}/alerts`}>
            <button className="btn">Check Alerts</button>
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
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap">
                Method
              </th>
              <th className="px-4 py-3 border-b w-[34%]">URL</th>
              <th className="px-4 py-3 border-b w-[1%] whitespace-nowrap">
                Latency
              </th>
              <th className="px-4 py-3 border-b">Message & Stack</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-800">
            {groupedLogs.length > 0 ? (
              groupedLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50/50 transition-colors align-top"
                >
                  {/* Timestamp */}
                  <td className="px-4 py-3 whitespace-nowrap text-gray-200 text-[12px]">
                    <div className="flex items-center gap-3">
                      <span>
                        {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] opacity-90">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>

                  {/* count */}
                  <td className="px-4 py-3">
                    <span className="text-gray-200 font-semibold">
                      {log.count}x
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                        log.status >= 400
                          ? "bg-red-600 text-white border-red-100"
                          : "bg-green-500 text-white border-green-100"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                  {/* Method */}
                  <td className="px-4 py-3">
                    <span className="text-gray-200 font-semibold">
                      {log.method}
                    </span>
                  </td>

                  {/* URL - Takes 25% of the space */}
                  <td className="px-4 py-3">
                    <div
                      className="max-w-[600px] text-gray-200 hover:underline cursor-default"
                      title={log.url}
                    >
                      {log.url}
                    </div>
                  </td>

                  {/* Latency */}
                  <td className="px-4 py-3 whitespace-nowrap text-gray-200">
                    {log.responseTime}
                    <span className="text-[10px] ml-0.5">ms</span>
                  </td>

                  {/* Message & Stack - Takes the rest of the space */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-200 leading-relaxed">
                        {log.message}
                      </span>
                      {log.stack && (
                        <details className="mt-1">
                          <summary className="text-[10px] text-red-400 cursor-pointer hover:text-red-600">
                            View Stack Trace
                          </summary>
                          <pre className="mt-2 p-3 bg-red-50 text-red-500 text-[11px] rounded border border-red-100 overflow-x-auto whitespace-pre-wrap break-all leading-normal">
                            {log.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-gray-200 italic"
                >
                  No logs found for this website.
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
