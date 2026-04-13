import Badge from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

// mapping order status to badge variant
export const getStatusVariant = (status: OrderStatus) => {
  const s = status?.toUpperCase();
  switch (s) {
    case "DELIVERED":
      return "success";
    case "PENDING":
      return "warning";
    case "CONFIRMED":
    case "SHIPPED":
      return "info";
    case "CANCELLED":
      return "danger";
    default:
      return "default";
  }
};

export default function OrderStatusBadge({ status, className }: Readonly<OrderStatusBadgeProps>) {
  return (
    <Badge 
      variant={getStatusVariant(status)} 
      className={`font-black tracking-tighter ${className}`}
    >
      {status}
    </Badge>
  );
}
