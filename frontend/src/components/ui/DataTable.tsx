import React from "react";

export interface Column<T> {
  header: string;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}
const DataTable = <T,>({
  data,
  columns,
  emptyMessage = "No logs found for this website.",
}: DataTableProps<T>) => {
  return (
    <>
      <table className="w-full text-left border-collapse font-mono text-sm">
        <thead className="bg-gray-900 text-gray-200 uppercase text-[10px] tracking-wider">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`px-4 py-3 border-b whitespace-nowrap ${col.className}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-800">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700/50 transition-colors align-top"
              >
                {columns.map((col) => (
                  <td
                    key={col.header}
                    className={`px-4 py-3 text-gray-200 ${col.className || ""}`}
                  >
                    {col.render(item, index)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length} // Fix: Uses header count, not data length
                className="px-4 py-12 text-center text-gray-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
