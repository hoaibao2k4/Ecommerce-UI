import { useGetOrdersFilterQuery } from "@/stores/api/apiOrder";
import type { OrderParams, OrderStatus } from "@/types";
import { useState } from "react";

export const useOrdersFilter = (initialParams?: Partial<OrderParams>) => {
  const [params, setParams] = useState<OrderParams>({
    page: initialParams?.page ?? 0,
    size: initialParams?.size ?? 10,
    sortBy: initialParams?.sortBy ?? "createdAt",
    direction: initialParams?.direction ?? "desc",
    status: initialParams?.status ?? undefined,
  });

  const { data, isLoading, isFetching, isError, error } =
    useGetOrdersFilterQuery(params);

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 }));
  };

  const onStatusChange = (status: OrderStatus | "") => {
    setParams((prev) => ({
      ...prev,
      status: status === "" ? undefined : status,
      page: 0,
    }));
  };

  const onSortChange = (sortBy: string, direction: "asc" | "desc") => {
    setParams((prev) => ({
      ...prev,
      sortBy,
      direction,
      page: 0,
    }));
  };

  return {
    orders: data?.content || [],
    pagination: {
      currentPage: (params.page ?? 0) + 1,
      totalPages: data?.totalPages || 0,
      totalElements: data?.totalElements || 0,
    },
    isLoading: isLoading || isFetching,
    isError,
    error,
    currentStatus: params.status,
    handlePageChange,
    onStatusChange,
    onSortChange,
  };
};
