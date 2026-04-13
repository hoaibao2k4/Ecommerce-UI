export const TableSkeleton = ({ colCount, rowCount }: { colCount: number, rowCount: number }) => (
  <>
    {Array.from({ length: rowCount }, (_, i) => (
      <tr key={i} className="animate-pulse">
        {Array.from({ length: colCount }, (_, j) => (
          <td key={j} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
        ))}
      </tr>
    ))}
  </>
);