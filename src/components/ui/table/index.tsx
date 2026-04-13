import { TableSkeleton } from "@/components/ui/skeleton/TableSkeleton";
import type React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
  filter?: React.ReactNode; // inline filter
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyText?: string;
}

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyText = "No data",
}: Readonly<TableProps<T>>) {
  const hasFilters = columns.some((col) => !!col.filter);

  const renderTableBody = () => {
    if (isLoading) {
      return <TableSkeleton colCount={columns.length} rowCount={5} />;
    }

    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-gray-400"
          >
            {emptyText}
          </td>
        </tr>
      );
    }

    return data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50 transition-colors border-b">
        {columns.map((col) => (
          <td key={col.header} className="px-6 py-4 whitespace-nowrap">
            {col.render ? col.render(row) : String(row[col.accessor] ?? "")}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-black tracking-widest border-b">
            <tr>
              {columns.map((col) => (
                <th key={col.header} className="px-6 py-4">
                  {col.header}
                </th>
              ))}
            </tr>
            {/* Filter Row Inline */}
            {hasFilters && (
              <tr className="bg-white border-b border-slate-100">
                {columns.map((col) => (
                  <th key={col.header} className="px-6 py-2 font-normal">
                    {col.filter && (
                      <div className="relative group">{col.filter}</div>
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {renderTableBody()}
          </tbody>
        </table>
      </div>
    </div>
  );
}


