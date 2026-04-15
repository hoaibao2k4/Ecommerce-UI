import CustomButton from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "react-router";

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
        <section className="md:col-span-8 space-y-6">
          {cart.items.length > 0 ? (
            <div className="space-y-6">
              {cart.items.map((item) => (
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
                      onClick={() => handleRemoveFromCart(item.id)}
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
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </CustomButton>
                    <span className="px-3 font-bold">{item.quantity}</span>
                    <CustomButton
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 hover:text-primary disabled:opacity-30"
                      disabled={item.quantity >= item.stockQuantity}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
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
          ) : (
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
          )}
        </section>

        {/* Right: Checkout Sidebar */}
        <aside className="md:col-span-4 h-fit sticky top-24">
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <h2 className="text-xl font-extrabold text-foreground pb-4 border-b">
              Checkout
            </h2>

            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>${cart.totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold pt-4 border-t border-dashed">
                <span>Total</span>
                <span className="text-primary">
                  ${cart.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <CustomButton
              disabled={cart.items.length === 0 || isLoading}
              className="w-full py-6 text-lg rounded-2xl shadow-lg shadow-primary/20"
              onClick={handleCheckout}
            >
              {isLoading ? "Loading..." : "Checkout Now"}
            </CustomButton>

            <p className="text-[10px] text-center text-muted">
              Secure Checkout - 30 Day Returns - Free Shipping over $500
            </p>
          </div>
        </aside>
      </div>

      <Modal isOpen={isSuccess} onClose={reset} title="Order Successful">
        <div className="text-center space-y-4 py-4 px-2">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Thank you!</h3>
            <p className="text-slate-500">
              Your order has been received and is being processed.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <CustomButton
              onClick={() => {
                reset();
                navigate("/orders");
              }}
            >
              View Order History
            </CustomButton>
            <CustomButton
              variant="secondary"
              onClick={() => {
                reset();
                navigate("/products");
              }}
            >
              Continue Shopping
            </CustomButton>
          </div>
        </div>
      </Modal>
    </main>
  );
}
