import { useGetOrdersFilterQuery, useUpdateOrderStatusMutation } from "@/stores/api/apiOrder";
import { useGetProductsQuery } from "@/stores/api/apiProduct";
import { getErrorMessage } from "@/utils/errorHelper";
import type { OrderStatus } from "@/types";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDashBoard = () => {
  const { 
    data: products, 
    isLoading: productsLoading, 
    isError: isProductsError, 
    error: productsError 
  } = useGetProductsQuery();

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrdersFilterQuery({
    page: 0,
    size: 5,
    sortBy: "createdAt",
    direction: "desc",
  });

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: isPendingError,
    error: pendingError,
  } = useGetOrdersFilterQuery({
    page: 0,
    size: 1,
    status: "PENDING",
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const totalItems = useMemo(
    () => products?.reduce((acc, item) => acc + item.stockQuantity, 0) || 0,
    [products],
  );

  const top5OrdersNewest = useMemo(() => {
    if (!orders) return [];
    return orders.content;
  }, [orders]);

  const handleUpdateOrderStatus = async (
    orderId: number,
    orderStatus: OrderStatus,
  ) => {
    try {
      await updateOrderStatus({ orderId, orderStatus }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    totalItems: totalItems,
    totalOrders: orders?.totalElements,
    pendingOrders: pendingData?.totalElements || 0,
    top5OrdersNewest,
    isLoading: productsLoading || ordersLoading || pendingLoading,
    isError: isProductsError || isOrdersError || isPendingError,
    error: productsError || ordersError || pendingError,
    handleUpdateOrderStatus,
  };
};
