import { StatusDropdown } from "@/components/Orders/StatusDropDown";
import OrderTimeline from "@/components/Orders/OrderTimeline";
import OrderCustomerInfo from "@/components/Orders/OrderCustomerInfo";
import OrderItemsList from "@/components/Orders/OrderItemsList";
import CustomButton from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Pagination from "@/components/ui/pagination";
import Table, { type Column } from "@/components/ui/table";
import { useDashBoard } from "@/hooks/useDashBoard";
import { useOrdersFilter } from "@/hooks/useOrdersFilter";
import ErrorPage from "@/pages/error/ErrorPage";
import { isCriticalError } from "@/utils/errorHelper";
import type { OrderResponse, OrderStatus } from "@/types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function AdminOrdersPage() {
  const { handleUpdateOrderStatus } = useDashBoard();
  const {
    orders,
    pagination,
    isLoading,
    isError,
    error,
    handlePageChange,
    onStatusChange,
    currentStatus,
  } = useOrdersFilter({
    size: 5,
  });

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Show ErrorPage
  if (isCriticalError(isError, error))
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const columns: Column<OrderResponse>[] = [
    {
      header: "Order ID",
      accessor: "id",
      render: (row) => (
        <span className="font-bold text-slate-500">#{row.id}</span>
      ),
    },
    {
      header: "Customer",
      accessor: "userId",
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.userId}</span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (row) => (
        <span className="text-slate-500 font-medium">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Total",
      accessor: "totalAmount",
      render: (row) => (
        <span className="font-bold text-primary">
          ${row.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <StatusDropdown
          currentStatus={row.status}
          orderId={row.id}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
        />
      ),
      filter: (
        <select
          value={currentStatus || ""}
          onChange={(e) => onStatusChange(e.target.value as OrderStatus | "")}
          className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 appearance-none cursor-pointer font-bold text-slate-600 italic"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <CustomButton
            title="View Details"
            onClick={() => setSelectedOrderId(row.id)}
            className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <FaEye />
          </CustomButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Order Management
          </h1>
          <p className="text-sm text-slate-500">
            View and manage customer orders
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <Table
          data={orders}
          columns={columns}
          isLoading={isLoading}
          emptyText="No orders found."
        />

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Modal
        isOpen={selectedOrderId !== null}
        onClose={() => setSelectedOrderId(null)}
        title={`Order Details #${selectedOrderId}`}
        size="lg"
      >
        <div className="space-y-8">
          {selectedOrder && (
            <>
              <OrderTimeline status={selectedOrder.status} />
              <OrderCustomerInfo
                userId={selectedOrder.userId}
                username={selectedOrder.username}
                email={selectedOrder.email}
                createdAt={selectedOrder.createdAt}
              />
              <OrderItemsList items={selectedOrder.orderItems || []} />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
