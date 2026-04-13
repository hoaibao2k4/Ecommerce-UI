import OrderStatusBadge from "@/components/Orders/OrderStatusBadge";
import CustomButton from "@/components/ui/button";
import type { OrderStatus } from "@/types";
import { useEffect, useRef, useState } from "react";

const STATUS_ORDER: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  // record<K, T>
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [], // Final state
  CANCELLED: [], // Final state
};

interface StatusDropdownProps {
  currentStatus: OrderStatus;
  orderId: number;
  handleUpdateOrderStatus: (orderId: number, orderStatus: OrderStatus) => void;
}

export function StatusDropdown({
  currentStatus,
  orderId,
  handleUpdateOrderStatus,
}: Readonly<StatusDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const normalizedStatus =
    (currentStatus?.toUpperCase() as OrderStatus) || "PENDING";
  const nextValidStatuses = VALID_TRANSITIONS[normalizedStatus] || [];
  const isFinalState = nextValidStatuses.length === 0;

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect(); // get position dropdown
      const spaceBelow = globalThis.innerHeight - rect.bottom; // space below dropdown
      setIsTop(spaceBelow < 180);
    }
  }, [isOpen]);

  return (
    <div
      className="relative inline-flex flex-col items-center"
      onMouseLeave={() => setIsOpen(false)}
      ref={triggerRef}
      role="none"
    >
      <button
        type="button"
        disabled={isFinalState}
        className={`transition-opacity group bg-transparent border-none p-0 outline-none ${
          isFinalState
            ? "cursor-default"
            : "cursor-pointer hover:opacity-80 focus:ring-2 ring-primary/20 rounded-full"
        }`}
        onClick={() => !isFinalState && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <OrderStatusBadge
          status={currentStatus}
          className={`${
            !isFinalState &&
            "group-hover:ring-2 ring-offset-1 ring-current/30 transition-all duration-300"
          }`}
        />
      </button>

      {/* Tooltip Dropdown */}
      {!isFinalState && (
        <div
          className={`absolute transition-all duration-300 p-3 w-44 bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 flex flex-col gap-2 ${
            isTop ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
          } ${
            isOpen
              ? `opacity-100 visible translate-y-0`
              : `opacity-0 invisible ${isTop ? "translate-y-2" : "-translate-y-2"}`
          }`}
        >
          {isTop ? (
            <>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[6px] border-transparent border-t-slate-200"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-[6px] border-transparent border-t-white"></div>
            </>
          ) : (
            <>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[6px] border-transparent border-b-slate-200"></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[2px] border-[6px] border-transparent border-b-white"></div>
            </>
          )}

          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 px-1 text-center tracking-wider">
            Change Status:
          </p>
          {STATUS_ORDER.filter((s) => nextValidStatuses.includes(s)).map(
            (status) => (
              <CustomButton
                key={status}
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleUpdateOrderStatus(orderId, status);
                  setIsOpen(false);
                }}
                className="w-full !justify-start p-1 transition-all group"
              >
                <OrderStatusBadge
                  status={status}
                  className="w-full justify-center group-hover:ring-2 ring-offset-1 ring-current/30 transition-all duration-300"
                />
              </CustomButton>
            ),
          )}
        </div>
      )}
    </div>
  );
}
