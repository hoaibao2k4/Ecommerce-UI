import { useCreateOrderMutation } from "@/stores/api/apiOrder";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/stores/slices/cartSlice";
import type { AppDispatch, RootState } from "@/stores/store";
import type { OrderRequest } from "@/types";
import { getErrorMessage } from "@/utils/errorHelper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const [createOrder, { isError, isLoading, isSuccess, reset }] =
    useCreateOrderMutation();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = async () => {
    const orders: OrderRequest[] = cart.items.map((item) => ({
      productId: Number(item.id),
      quantity: item.quantity,
    }));
    try {
      await createOrder({ items: orders }).unwrap();
    } catch (error: unknown) {
      const msg = getErrorMessage(error);

      if (msg.includes("Insufficient stock")) {
        dispatch(clearCart());
      }

      toast.error(msg);
    }
  };
  return {
    cart,
    isError,
    isLoading,
    isSuccess,
    reset,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleCheckout,
  };
};
