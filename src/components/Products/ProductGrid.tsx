import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import type { ProductResponse } from "@/types";

interface ProductGridProps {
  products: ProductResponse[] | undefined;
  isLoading: boolean;
  totalElements: number;
}

export default function ProductGrid({
  products,
  isLoading,
  totalElements,
}: Readonly<ProductGridProps>) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-lg text-slate-700">
          Search results
          {!isLoading && products && (
            <span className="ml-2 text-primary text-sm font-black italic bg-primary/10 px-3 py-1 rounded-full">
              {totalElements} products found
            </span>
          )}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-4">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
            ))
          : products?.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                stockQuantity={product.stockQuantity}
                imageUrl="https://placehold.co/400x400"
              />
            ))}
      </div>

      {!isLoading && (!products || products.length === 0) && (
        <div className="text-center py-32 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem]">
          <div className="text-6xl mb-4 grayscale opacity-30">🔍</div>
          <p className="text-xl font-bold text-slate-800">No products found</p>
          <p className="text-slate-500 mt-2">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </section>
  );
}
