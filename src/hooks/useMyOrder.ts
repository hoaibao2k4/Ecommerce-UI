import {
  useCancelOrderMutation,
  useGetMyOrdersQuery,
} from "@/stores/api/apiOrder";
import { getErrorMessage } from "@/utils/errorHelper";
import toast from "react-hot-toast";

export const useOrder = () => {
  const {
    data: myOrders,
    isLoading: isLoadingMyOrders,
    isError: isErrorMyOrders,
    error: errorMyOrders,
  } = useGetMyOrdersQuery();

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancelOrder({ orderId }).unwrap();
      toast.success("Order cancelled successfully");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  return {
    myOrders,
    isLoadingMyOrders,
    isErrorMyOrders,
    errorMyOrders,
    handleCancelOrder,
  };
};
