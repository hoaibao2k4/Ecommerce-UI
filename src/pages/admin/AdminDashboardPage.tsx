import OrderStatusBadge from "@/components/Orders/OrderStatusBadge";
import Table, { type Column } from "@/components/ui/table";
import { useDashBoard } from "@/hooks/useDashBoard";
import ErrorPage from "@/pages/error/ErrorPage";
import LoadingPage from "@/pages/error/LoadingPage";
import { isCriticalError } from "@/utils/errorHelper";
import { FaBox, FaClipboardList, FaShoppingCart } from "react-icons/fa";

export default function AdminDashboardPage() {
  const {
    totalItems,
    totalOrders,
    pendingOrders,
    isLoading,
    isError,
    error,
    top5OrdersNewest,
  } = useDashBoard();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isCriticalError(isError, error)) {
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;
  }

  const summary = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Products",
      value: totalItems,
      icon: <FaBox className="text-3xl text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FaClipboardList className="text-3xl text-amber-500" />,
      bgColor: "bg-amber-50",
    },
  ];

  const columns: Column<(typeof top5OrdersNewest)[0]>[] = [
    {
      header: "Order ID",
      accessor: "id",
      render: (row) => <span className="font-bold">#{row.id}</span>,
    },
    { header: "Date", accessor: "createdAt" },
    {
      header: "Total",
      accessor: "totalAmount",
      render: (row) => (
        <span className="font-bold text-primary">${row.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <OrderStatusBadge status={row.status} />,
    },
  ];


  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {item.title}
              </p>
              <h3 className="text-4xl font-black mt-2 text-slate-800">
                {item.value?.toLocaleString()}
              </h3>
            </div>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bgColor}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recent Orders</h3>
        </div>
        <Table data={top5OrdersNewest} columns={columns} />
      </div>
    </div>
  );
}
