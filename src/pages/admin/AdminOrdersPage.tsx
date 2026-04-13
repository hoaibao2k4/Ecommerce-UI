import { StatusDropdown } from "@/components/Orders/StatusDropDown";
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
          {/* Order Status History/Timeline */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-[10px] uppercase font-black text-slate-400 mb-6 tracking-widest text-center">
              Order Progress
            </h3>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
              {/* Progress Line Connector */}
              <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

              {(() => {
                const standardSteps = [
                  "PENDING",
                  "CONFIRMED",
                  "SHIPPED",
                  "DELIVERED",
                ];
                const isCancelled =
                  selectedOrder?.status.toUpperCase() === "CANCELLED";
                const steps = isCancelled
                  ? [...standardSteps.slice(0, 2), "CANCELLED"]
                  : standardSteps;

                return steps.map((step, idx) => {
                  const isCompleted = isCancelled
                    ? step === "CANCELLED" ||
                      standardSteps.indexOf(step) <
                        standardSteps.indexOf(
                          selectedOrder?.status.toUpperCase() || "",
                        )
                    : standardSteps.indexOf(
                        selectedOrder?.status.toUpperCase() || "",
                      ) >= standardSteps.indexOf(step);

                  const isCurrent =
                    selectedOrder?.status.toUpperCase() === step;
                  const isCancelledStep = step === "CANCELLED";

                  return (
                    <div
                      key={step}
                      className="relative z-10 flex flex-row sm:flex-col items-center gap-3 sm:gap-2 flex-1 w-full sm:w-auto"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-4 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          isCompleted
                            ? isCancelledStep
                              ? "bg-red-500 border-red-200 text-white"
                              : "bg-primary border-primary/20 text-white"
                            : "bg-white border-slate-200 text-slate-300"
                        } ${
                          isCurrent
                            ? isCancelledStep
                              ? "ring-4 ring-red-200 scale-110"
                              : "ring-4 ring-primary/20 scale-110"
                            : ""
                        }`}
                      >
                        {isCompleted ? (isCancelledStep ? "✕" : "✓") : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-tighter sm:tracking-widest ${
                          isCurrent
                            ? isCancelledStep
                              ? "text-red-500"
                              : "text-primary"
                            : isCompleted
                              ? "text-slate-600"
                              : "text-slate-300"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-bold text-lg border-b pb-2 mb-4 text-slate-800 italic">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                  Customer ID
                </p>
                <p className="font-bold text-slate-700">#{selectedOrder?.userId}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                  Username
                </p>
                <p className="font-bold text-slate-800 text-base">
                  {selectedOrder?.username}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                  Email Contact
                </p>
                <p className="font-bold text-primary underline underline-offset-4 decoration-primary/20">
                  {selectedOrder?.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                  Order Date
                </p>
                <p className="font-bold text-slate-700">
                  {selectedOrder && new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div>
            <h3 className="font-bold text-lg border-b pb-2 mb-4 text-slate-800">
              Products
            </h3>
            <div className="space-y-3">
              {selectedOrder?.orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 transition-all hover:bg-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white shadow-sm border border-slate-200 rounded-lg flex items-center justify-center text-xl">
                      📦
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {item.productName}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-black text-primary">
                    ${(item.unitPrice * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
