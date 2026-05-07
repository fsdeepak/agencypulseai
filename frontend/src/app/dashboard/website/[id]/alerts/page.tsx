"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation"; // or 'react-router-dom'
import { useGetAlerts } from "@/hooks/log.hook";
import Link from "next/link";
import DataTable from "@/components/ui/DataTable";
import { columns, Alert } from "./_data";

interface GroupedAlerts extends Alert {
  count: number;
  lastOccurrence: string;
}

export default function WebsitealertsPage() {
  const params = useParams();
  const websiteId = params.id as string; // This grabs 'cmotsazx9000048la2imyq9u4'

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAlerts(websiteId);

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
        <DataTable
          data={groupedAlerts}
          columns={columns}
          emptyMessage="No alerts found for this website."
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
