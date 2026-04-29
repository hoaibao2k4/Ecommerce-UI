import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

interface ProductFiltersProps {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  sortType: string;
  onSearch: (value: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onSortChange: (
    type: "category" | "newest" | "name-az" | "price-asc" | "price-desc",
    id?: number,
  ) => void;
  onSubmit: () => void;
}

export default function ProductFilters({
  searchTerm,
  minPrice,
  maxPrice,
  sortType,
  onSearch,
  onPriceChange,
  onSortChange,
  onSubmit,
}: Readonly<ProductFiltersProps>) {
  return (
    <section className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Search Field */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <p className="text-sm font-semibold text-foreground">Search</p>
          <CustomInput
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
            <CustomInput
              type="number"
              placeholder="Min"
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={minPrice}
              onChange={(e) => onPriceChange(e.target.value, maxPrice)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <span className="text-muted">—</span>
            <CustomInput
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
          <p className="text-sm font-semibold text-foreground">View Options</p>
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
  );
}
