import OrderStatusBadge from "@/components/Orders/OrderStatusBadge";
import CustomButton from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useOrder } from "@/hooks/useMyOrder";
import ErrorPage from "@/pages/error/ErrorPage";
import LoadingPage from "@/pages/error/LoadingPage";
import { isCriticalError } from "@/utils/errorHelper";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaShoppingBag } from "react-icons/fa";
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
          {myOrders?.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className={`group bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isExpanded
                    ? "border-primary shadow-2xl shadow-primary/5 ring-1 ring-primary/10"
                    : "border-border shadow-sm hover:shadow-xl hover:border-primary/20"
                }`}
              >
                {/* Top: Order Info */}
                <CustomButton
                  variant="ghost"
                  className={`w-full text-left p-8 flex flex-wrap justify-between items-center gap-6 cursor-pointer select-none transition-colors border-none rounded-none !justify-start ${
                    isExpanded ? "bg-slate-50/80" : "bg-white"
                  }`}
                  onClick={() => toggleOrder(order.id)}
                  type="button"
                  aria-expanded={isExpanded}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                        Order Number
                      </p>
                      <p className="font-bold text-foreground text-lg">
                        #{order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                        Date Placed
                      </p>
                      <p className="font-bold text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
                        Total Amount
                      </p>
                      <p className="font-black text-primary text-xl">
                        ${order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 ml-auto md:ml-0">
                    <OrderStatusBadge status={order.status} />
                    <span
                      className={`p-3 rounded-full transition-all duration-300 ${
                        isExpanded
                          ? "bg-primary text-white rotate-180"
                          : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                </CustomButton>

                {/* Bottom: Items Summary (Animated) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="px-8 pb-8 pt-4 space-y-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                        <div className="space-y-6">
                          {order.orderItems?.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between group/item p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover/item:scale-110 transition-transform duration-500">
                                  <FaShoppingBag className="text-slate-400 text-xl" />
                                </div>
                                <div>
                                  <h4 className="font-black text-foreground">
                                    {item.productName}
                                  </h4>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-bold px-2 py-0.5 bg-green-200 text-slate-600 rounded-md">
                                      Quantity: {item.quantity}
                                    </span>
                                    <span className="text-base font-bold text-primary">
                                      ${item.unitPrice.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-black text-foreground">
                                  $
                                  {(
                                    item.unitPrice * item.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex gap-4 w-full sm:w-auto">
                            {order.status?.toUpperCase() === "PENDING" && (
                              <CustomButton
                                variant="danger"
                                className="flex-1 sm:flex-none rounded-2xl px-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCancellingOrderId(order.id);
                                }}
                              >
                                Cancel Order
                              </CustomButton>
                            )}
                            <CustomButton className="flex-1 sm:flex-none rounded-2xl px-8 shadow-xl shadow-primary/20">
                              Buy Again
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
