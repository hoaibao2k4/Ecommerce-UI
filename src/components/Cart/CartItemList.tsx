import CustomButton from "@/components/ui/button";
import { Link } from "react-router";
import type { CartItem } from "@/types";

interface CartItemListProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function CartItemList({
  items,
  onRemove,
  onUpdateQuantity,
}: Readonly<CartItemListProps>) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center space-y-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-slate-200/50 text-5xl">
          🛒
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            Your cart is feeling lonely
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto text-balance">
            Looks like you haven't added anything to your cart yet. Let's find something amazing for you!
          </p>
        </div>
        <Link to="/products">
          <CustomButton className="px-10 py-4 rounded-2xl font-black hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95">
            Start Shopping
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-border shadow-sm group transition-all hover:shadow-md"
        >
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 border border-border flex-shrink-0">
            <img
              src="/placeholder-images.jpg"
              className="w-full h-full object-cover"
              alt={item.name}
            />
          </div>

          <div className="flex-grow space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <CustomButton
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-xs text-red-500 hover:underline font-bold pt-2 px-0"
            >
              Remove
            </CustomButton>
          </div>

          <div className="flex items-center border border-border rounded-lg bg-background p-1">
            <CustomButton
              variant="ghost"
              size="sm"
              className="px-3 py-1 hover:text-primary disabled:opacity-30"
              disabled={item.quantity <= 1}
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              −
            </CustomButton>
            <span className="px-3 font-bold">{item.quantity}</span>
            <CustomButton
              variant="ghost"
              size="sm"
              className="px-3 py-1 hover:text-primary disabled:opacity-30"
              disabled={item.quantity >= item.stockQuantity}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </CustomButton>
          </div>

          <div className="text-right whitespace-nowrap">
            <p className="font-extrabold text-xl text-foreground">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
      <div className="pt-4">
        <Link
          to="/"
          className="inline-block text-primary font-bold hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
