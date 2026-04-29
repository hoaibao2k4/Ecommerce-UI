import CustomButton from "@/components/ui/button";

interface CartSummaryProps {
  totalAmount: number;
  itemCount: number;
  isLoading: boolean;
  onCheckout: () => void;
}

export default function CartSummary({
  totalAmount,
  itemCount,
  isLoading,
  onCheckout,
}: Readonly<CartSummaryProps>) {
  return (
    <aside className="h-fit sticky top-24">
      <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
        <h2 className="text-xl font-extrabold text-foreground pb-4 border-b">
          Checkout
        </h2>

        <div className="space-y-4 text-sm font-medium">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-extrabold pt-4 border-t border-dashed">
            <span>Total</span>
            <span className="text-primary">
              ${totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <CustomButton
          disabled={itemCount === 0 || isLoading}
          className="w-full py-6 text-lg rounded-2xl shadow-lg shadow-primary/20"
          onClick={onCheckout}
        >
          {isLoading ? "Loading..." : "Checkout Now"}
        </CustomButton>

        <p className="text-[10px] text-center text-muted">
          Secure Checkout - 30 Day Returns - Free Shipping over $500
        </p>
      </div>
    </aside>
  );
}
