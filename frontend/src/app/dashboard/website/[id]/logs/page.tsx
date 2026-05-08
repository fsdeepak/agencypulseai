"use client";
import { useParams } from "next/navigation"; // or 'react-router-dom'
import { useGetLogs } from "@/hooks/log.hook";
import Link from "next/link";
import { useMemo } from "react";
import DataTable from "@/components/ui/DataTable";
import { colunms, Logs } from "./_data";

interface GroupedLogs extends Logs {
  count: number;
  lastOccurrence: string;
}

export default function WebsiteLogsPage() {
  const params = useParams();
  const websiteId = params.id as string; // This grabs 'cmotsazx9000048la2imyq9u4'

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetLogs(websiteId);

  const allLogs = data?.pages.flatMap((page) => page.logs) ?? [];

  const groupedLogs = useMemo((): GroupedLogs[] => {
    const groups = allLogs.reduce(
      (acc, log) => {
        const key = `${log.createdAt}-${log.method}-${log.url}-${log.message}`;

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
        <DataTable
          data={groupedLogs}
          columns={colunms}
          emptyMessage="No logs found for this website."
        />
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
