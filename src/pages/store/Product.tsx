import Pagination from "@/components/ui/pagination";
import { useCategories } from "@/hooks/useCategories";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import ErrorPage from "@/pages/error/ErrorPage";
import { isCriticalError } from "@/utils/errorHelper";
import CategoryFilter from "@/components/Products/CategoryFilter";
import ProductFilters from "@/components/Products/ProductFilters";
import ProductGrid from "@/components/Products/ProductGrid";

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
    <main className="container mx-auto p-4 md:py-12 space-y-12">
      {/* Categories */}
      <section className="space-y-4">
        <CategoryFilter
          categories={categories}
          isLoading={isCategoriesLoading}
          selectedCategoryId={selectedCategoryId}
          onSortChange={onSortChange}
        />
      </section>

      {/* Filters & Sort */}
      <ProductFilters
        searchTerm={searchTerm}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortType={sortType}
        onSearch={onSearch}
        onPriceChange={onPriceChange}
        onSortChange={onSortChange}
        onSubmit={onSubmit}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isProductsLoading}
        totalElements={pagination?.totalElements || 0}
      />

      {/* Pagination */}
      {!isProductsLoading && pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center pt-8">
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
