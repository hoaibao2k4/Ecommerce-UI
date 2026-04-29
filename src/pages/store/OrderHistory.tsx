import CustomButton from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useOrder } from "@/hooks/useMyOrder";
import ErrorPage from "@/pages/error/ErrorPage";
import LoadingPage from "@/pages/error/LoadingPage";
import { isCriticalError } from "@/utils/errorHelper";
import OrderHistoryItem from "@/components/Orders/OrderHistoryItem";
import { useState } from "react";
import { Link } from "react-router";

export default function OrderHistory() {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(
    null,
  );

  const toggleOrder = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const {
    myOrders,
    isLoadingMyOrders,
    isErrorMyOrders,
    errorMyOrders,
    handleCancelOrder,
  } = useOrder();

  if (isCriticalError(isErrorMyOrders, errorMyOrders))
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;

  const handleConfirm = (orderId: number) => {
    handleCancelOrder(orderId);
    setCancellingOrderId(null);
  };
  if (isLoadingMyOrders) {
    return <LoadingPage />;
  }
  return (
    <main className="container mx-auto p-6 md:py-16 space-y-12 max-w-5xl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Order History
          </h1>
        </div>
        {(myOrders?.length ?? 0) > 0 && (
          <Link
            to="/products"
            className="text-sm font-bold text-primary flex items-center gap-2"
          >
            <CustomButton variant="primary">Continue Shopping</CustomButton>
          </Link>
        )}
      </header>

      {(myOrders?.length ?? 0) > 0 ? (
        <div className="space-y-8">
          {myOrders?.map((order) => (
            <OrderHistoryItem
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggle={toggleOrder}
              onCancel={setCancellingOrderId}
            />
          ))}
          {cancellingOrderId !== null && (
            <ConfirmDialog
              title="Cancel Order"
              message="Are you sure you want to cancel this order?"
              onConfirm={() => handleConfirm(cancellingOrderId)}
              onCancel={() => setCancellingOrderId(null)}
              isOpen={cancellingOrderId !== null}
              confirmText="Yes"
            />
          )}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 space-y-6">
          <div className="relative inline-block">
            <div className="text-8xl animate-pulse grayscale opacity-20">
              🛒
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              ?
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black italic">No orders found</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto italic">
              Your order history is empty. Start your journey with our latest
              collections.
            </p>
          </div>
          <Link to="/products">
            <CustomButton className="px-12 py-6 rounded-full font-black uppercase tracking-wider hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 active:scale-95">
              Explore Store
            </CustomButton>
          </Link>
        </div>
      )}
    </main>
  );
}
