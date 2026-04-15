import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import { useProductDetails } from "@/hooks/useProductDetails";
import ErrorPage from "@/pages/error/ErrorPage";
import LoadingPage from "@/pages/error/LoadingPage";
import { isCriticalError } from "@/utils/errorHelper";
import { Link } from "react-router";

export default function ProductDetails() {
  const {
    product,
    quantity,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    handleBuyNow,
    isLoading,
    isError,
    error,
  } = useProductDetails();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isCriticalError(isError, error)) {
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;
  }

  return (
    <main className="container mx-auto p-6 md:py-12 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="text-sm text-muted">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* 2. Left Side: Product Image */}
        <section className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-border group">
            <img
              src="/placeholder-images.jpg"
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </section>

        {/* 3. Right Side: Product Info */}
        <section className="space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              {product.category.categoryName}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              <Badge variant={product.stockQuantity > 0 ? "success" : "danger"} size="lg">
                {product.stockQuantity > 0 ? `Available: ${product.stockQuantity}` : "Sold Out"}
              </Badge>
            </div>
          </div>

          <div className="border-t border-b border-border py-6">
            <p className="text-muted leading-relaxed text-lg">
              {product.description} This premium product is designed to provide
              you with the best experience possible. Crafted with high-quality
              materials and cutting-edge technology.
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-6">
              <span className="font-bold text-foreground">Quantity</span>
              <div className="flex items-center border border-border rounded-xl px-2 py-1 bg-white shadow-sm">
                <CustomButton
                  variant="ghost"
                  size="sm"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-xl hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </CustomButton>
                <span className="w-12 text-center font-bold text-lg">
                  {quantity}
                </span>
                <CustomButton
                  variant="ghost"
                  size="sm"
                  onClick={handleIncrease}
                  disabled={quantity >= (product?.stockQuantity ?? 0)}
                  className="w-10 h-10 flex items-center justify-center text-xl hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </CustomButton>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <CustomButton
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 py-6 text-lg rounded-2xl shadow-lg shadow-primary/20"
                disabled={product.stockQuantity === 0}
              >
                Add to Cart
              </CustomButton>
              <CustomButton
                variant="secondary"
                size="lg"
                className="flex-1 py-6 text-lg rounded-2xl border-2"
                onClick={handleBuyNow}
                disabled={product.stockQuantity === 0}
              >
                Buy Now
              </CustomButton>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
