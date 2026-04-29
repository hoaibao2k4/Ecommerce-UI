import { FaShoppingBag } from "react-icons/fa";
import type { OrderItem } from "@/types";

interface OrderItemsListProps {
  items: OrderItem[];
  showTitle?: boolean;
}

export default function OrderItemsList({ 
  items, 
  showTitle = true 
}: Readonly<OrderItemsListProps>) {
  return (
    <div>
      {showTitle && (
        <h3 className="font-bold text-lg border-b pb-2 mb-4 text-slate-800">
          Products
        </h3>
      )}
      <div className="space-y-6">
        {items.map((item) => (
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
                ${(item.unitPrice * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
