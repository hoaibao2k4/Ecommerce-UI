import { useGetOrdersFilterQuery, useUpdateOrderStatusMutation } from "@/stores/api/apiOrder";
import { useGetProductsQuery } from "@/stores/api/apiProduct";
import { getErrorMessage } from "@/utils/errorHelper";
import type { OrderStatus } from "@/types";
import { useMemo } from "react";
import toast from "react-hot-toast";

export const useDashBoard = () => {
  const { data, isLoading } = useGetProductsQuery();

  const { data: orders, isLoading: ordersLoading } = useGetOrdersFilterQuery({
    page: 0,
    size: 1000,
    sortBy: "createdAt",
    direction: "desc",
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const pendingOrders = useMemo(
    () => orders?.content.filter((order) => order.status.toUpperCase() === "PENDING"),
    [orders],
  );

  const totalItems = useMemo(
    () => data?.reduce((acc, item) => acc + item.stockQuantity, 0),
    [data],
  );

  const top5OrdersNewest = useMemo(() => {
    if (!orders) return [];
    return orders.content.slice(0, 5);
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
    totalItems,
    totalOrders: orders?.totalElements,
    isLoading: isLoading || ordersLoading,
    pendingOrders: pendingOrders?.length,
    top5OrdersNewest,
    orders: orders?.content || [],
    handleUpdateOrderStatus,
  };
};
