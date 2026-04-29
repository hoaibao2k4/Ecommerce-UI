import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router";
import CartItemList from "@/components/Cart/CartItemList";
import CartSummary from "@/components/Cart/CartSummary";
import CartSuccessModal from "@/components/Cart/CartSuccessModal";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    isLoading,
    isSuccess,
    reset,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleCheckout,
  } = useCart();

  return (
    <main className="container mx-auto p-6 md:py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-muted italic">
          You have {cart.items.length} items in your cart
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <section className="md:col-span-8">
          <CartItemList
            items={cart.items}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </section>

        {/* Right: Checkout Sidebar */}
        <div className="md:col-span-4">
          <CartSummary
            totalAmount={cart.totalAmount}
            itemCount={cart.items.length}
            isLoading={isLoading}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      <CartSuccessModal
        isOpen={isSuccess}
        onClose={reset}
        onViewHistory={() => {
          reset();
          navigate("/orders");
        }}
        onContinueShopping={() => {
          reset();
          navigate("/products");
        }}
      />
    </main>
  );
}
