import OrderStatusBadge from "@/components/Orders/OrderStatusBadge";
import CustomButton from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import OrderItemsList from "@/components/Orders/OrderItemsList";
import type { OrderResponse } from "@/types";

interface OrderHistoryItemProps {
  order: OrderResponse;
  isExpanded: boolean;
  onToggle: (orderId: number) => void;
  onCancel: (orderId: number) => void;
}

export default function OrderHistoryItem({
  order,
  isExpanded,
  onToggle,
  onCancel,
}: Readonly<OrderHistoryItemProps>) {
  return (
    <div
      className={`group bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${
        isExpanded
          ? "border-primary shadow-2xl shadow-primary/5 ring-1 ring-primary/10"
          : "border-border shadow-sm hover:shadow-xl hover:border-primary/20"
      }`}
    >
      <CustomButton
        variant="ghost"
        className={`w-full text-left p-8 flex flex-wrap justify-between items-center gap-6 cursor-pointer select-none transition-colors border-none rounded-none !justify-start ${
          isExpanded ? "bg-slate-50/80" : "bg-white"
        }`}
        onClick={() => onToggle(order.id)}
        type="button"
        aria-expanded={isExpanded}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
              Order Number
            </p>
            <p className="font-bold text-foreground text-lg">#{order.id}</p>
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
              <OrderItemsList items={order.orderItems || []} showTitle={false} />

              <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex gap-4 w-full sm:w-auto">
                  {order.status?.toUpperCase() === "PENDING" && (
                    <CustomButton
                      variant="danger"
                      className="flex-1 sm:flex-none rounded-2xl px-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancel(order.id);
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
}
