import CustomButton from "@/components/ui/button";
import Card from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import Skeleton from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import ErrorPage from "@/pages/error/ErrorPage";
import type { CategoryResponse } from "@/types";
import { isCriticalError } from "@/utils/errorHelper";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

export default function ProductPage() {
  const {
    products,
    pagination,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
    searchTerm,
    minPrice,
    maxPrice,
    sortType,
    selectedCategoryId,
    handlePageChange,
    onSearch,
    onPriceChange,
    onSortChange,
    onSubmit,
    clearFilters,
  } = useProductsFilter({
    page: 0,
    size: 8,
    keyword: "",
    sortBy: "id",
    direction: "asc",
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategories();

  const isCritical =
    isCriticalError(isProductsError, productsError) ||
    isCriticalError(isCategoriesError, categoriesError);

  if (isCritical) {
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;
  }

  return (
    <main className="container mx-auto p-6 md:p-10 space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          Discover Products
        </h1>
        <h2 className="text-2xl font-bold text-foreground">Category</h2>
        <div className="flex items-start gap-2 overflow-x-auto pb-2">
          {isCategoriesLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-24 rounded-lg flex-shrink-0"
                />
              ))
            : categories?.map((category: CategoryResponse) => (
                <CustomButton
                  key={category.id}
                  variant={
                    category.id === selectedCategoryId ? "primary" : "secondary"
                  }
                  size="lg"
                  onClick={() => onSortChange("category", category.id)}
                >
                  {category.categoryName}
                </CustomButton>
              ))}
        </div>
      </header>

      {/* Toolbar: Search, Price, Sort */}
      <section className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Search Field */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Search</p>
            <input
              type="text"
              placeholder="Iphone, Nike, Clean Code..."
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
          </div>

          {/* Price Range */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Price Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={minPrice}
                onChange={(e) => onPriceChange(e.target.value, maxPrice)}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <span className="text-muted">—</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={maxPrice}
                onChange={(e) => onPriceChange(minPrice, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
            </div>
          </div>

          {/* Sort Actions */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">
              View Options
            </p>
            <div className="flex gap-2">
              <CustomButton
                variant={sortType === "newest" ? "primary" : "secondary"}
                size="sm"
                className="flex-1"
                onClick={() => onSortChange("newest")}
              >
                Newest
              </CustomButton>
              <CustomButton
                variant={sortType.startsWith("price") ? "primary" : "secondary"}
                size="sm"
                className="px-10"
                onClick={() => {
                  onSortChange(
                    sortType === "price-asc" ? "price-desc" : "price-asc",
                  );
                }}
              >
                <div className="flex items-center gap-2">
                  <span>Price</span>
                  {sortType === "price-asc" ? (
                    <HiArrowNarrowUp className="w-4 h-4" />
                  ) : (
                    <HiArrowNarrowDown className="w-4 h-4" />
                  )}
                </div>
              </CustomButton>
              <CustomButton
                variant={sortType === "name-az" ? "primary" : "secondary"}
                size="sm"
                className="px-3"
                onClick={() => onSortChange("name-az")}
              >
                A-Z
              </CustomButton>
            </div>
          </div>
          {/* Submit Button */}
          <div className="lg:col-span-12 flex justify-end pt-4 border-t border-border/50">
            <CustomButton
              variant="primary"
              size="lg"
              className="w-full md:w-auto px-10"
              onClick={onSubmit}
            >
              Apply Filters
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted">
          Showing <b>{products.length}</b> of <b>{pagination.totalElements}</b>{" "}
          products
        </p>
        {(searchTerm || minPrice || maxPrice) && (
          <button
            onClick={clearFilters}
            className="text-primary hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Responsive Grid for Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center min-h-[400px]">
        {isProductsLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full max-w-[300px] space-y-4 p-4 border border-gray-100 rounded-2xl"
            >
              <Skeleton className="aspect-square w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24 rounded-lg" />
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stockQuantity={product.stockQuantity}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="text-6xl text-muted/20">🔍</div>
            <h3 className="text-xl font-bold text-foreground">
              No products found
            </h3>
            <p className="text-muted">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center pt-10 border-t border-border">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
