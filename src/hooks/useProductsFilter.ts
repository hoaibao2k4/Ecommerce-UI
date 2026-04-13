import { useGetProductsFilterQuery } from "@/stores/api/apiProduct";
import type { ProductParams } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useProductsFilter = (productParams: ProductParams | undefined) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to sync params to URL
  const updateUrl = (newParams: ProductParams) => {
    const urlParams = new URLSearchParams();
    if (newParams.keyword) urlParams.set("keyword", newParams.keyword);
    if (newParams.categoryId)
      urlParams.set("categoryId", String(newParams.categoryId));
    if (newParams.minPrice)
      urlParams.set("minPrice", String(newParams.minPrice));
    if (newParams.maxPrice)
      urlParams.set("maxPrice", String(newParams.maxPrice));
    if (newParams.sortBy) urlParams.set("sortBy", newParams.sortBy);
    if (newParams.direction) urlParams.set("direction", newParams.direction);
    if (newParams.page !== undefined && newParams.page > 0)
      urlParams.set("page", String(newParams.page + 1));

    setSearchParams(urlParams, { replace: true });
  };

  // API Params state (Initialize from URL if available)
  const [params, setParams] = useState<ProductParams>(() => {
    const page = Number(searchParams.get("page"));
    return {
      page: page ? page - 1 : (productParams?.page ?? 0),
      size: Number(searchParams.get("size")) || (productParams?.size ?? 8),
      keyword: searchParams.get("keyword") || (productParams?.keyword ?? ""),
      sortBy: searchParams.get("sortBy") || (productParams?.sortBy ?? "id"),
      direction: (() => {
        const dir = searchParams.get("direction");
        if (dir === "asc" || dir === "desc") return dir;
        return productParams?.direction ?? "asc";
      })(),
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : productParams?.minPrice,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : productParams?.maxPrice,
      categoryId: searchParams.get("categoryId")
        ? Number(searchParams.get("categoryId"))
        : productParams?.categoryId,
    };
  });

  // 2. UI Local state (for inputs)
  const [searchTerm, setSearchTerm] = useState(params.keyword || "");
  const [minPrice, setMinPrice] = useState(params.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice?.toString() || "");
  const [sortType, setSortType] = useState<
    "price-asc" | "price-desc" | "name-az" | "newest" | "category"
  >(() => {
    if (params.sortBy === "price") {
      return params.direction === "asc" ? "price-asc" : "price-desc";
    }
    if (params.sortBy === "name") return "name-az";
    if (params.sortBy === "createdAt") return "newest";
    return "newest";
  });

  const { data, isLoading, isError, error, isFetching } =
    useGetProductsFilterQuery(params);

  // Sync state to URL whenever params change
  useEffect(() => {
    updateUrl(params);
  }, [params]);

  // Actions
  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 }));
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearch = (keyword: string) => {
    setSearchTerm(keyword);
  };

  const onPriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const onSubmit = () => {
    setParams((prev) => ({
      ...prev,
      keyword: searchTerm,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: 0,
    }));
  };

  const onSortChange = (type: typeof sortType, id?: number) => {
    setSortType(type);

    setParams((prev) => {
      const newParams = { ...prev, page: 0 };

      if (type === "price-asc") {
        newParams.sortBy = "price";
        newParams.direction = "asc";
      } else if (type === "price-desc") {
        newParams.sortBy = "price";
        newParams.direction = "desc";
      } else if (type === "name-az") {
        newParams.sortBy = "name";
        newParams.direction = "asc";
      } else if (type === "newest") {
        newParams.sortBy = "createdAt";
        newParams.direction = "desc";
      } else if (type === "category") {
        newParams.categoryId = prev.categoryId === id ? undefined : id;
      }

      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("newest");
    setParams({
      page: 0,
      size: 8,
      keyword: "",
      sortBy: "id",
      direction: "asc",
    });
  };

  return {
    products: data?.content || [],
    pagination: {
      currentPage: (params.page ?? 0) + 1,
      totalPages: data?.totalPages || 0,
      totalElements: data?.totalElements || 0,
    },
    searchTerm,
    minPrice,
    maxPrice,
    sortType,
    selectedCategoryId: params.categoryId,
    isLoading: isLoading || isFetching,
    isError,
    error,
    handlePageChange,
    onSearch,
    onPriceChange,
    onSortChange,
    onSubmit,
    clearFilters,
  };
};
