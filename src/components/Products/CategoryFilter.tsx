import CustomButton from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import type { CategoryResponse } from "@/types";

interface CategoryFilterProps {
  categories: CategoryResponse[] | undefined;
  isLoading: boolean;
  selectedCategoryId: number | undefined;
  onSortChange: (
    type: "category" | "newest" | "name-az" | "price-asc" | "price-desc",
    id?: number,
  ) => void;
}

export default function CategoryFilter({
  categories,
  isLoading,
  selectedCategoryId,
  onSortChange,
}: Readonly<CategoryFilterProps>) {
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground">Category</h2>
      <div className="flex items-start gap-2 overflow-x-auto pb-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-lg flex-shrink-0" />
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
    </>
  );
}
