import { useCreateOrderMutation } from "@/stores/api/apiOrder";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/stores/slices/cartSlice";
import type { AppDispatch, RootState } from "@/stores/store";
import type { CartItem, OrderRequest } from "@/types";
import { getErrorMessage } from "@/utils/errorHelper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
      dispatch(clearCart());
      toast.success("Order placed successfully!");
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      toast.error(msg);
    }
  };
  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
    toast.success("Added to cart successfully");
  };

  const handleBuyNow = (item: CartItem) => {
    handleAddToCart(item);
    navigate("/cart");
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
    handleAddToCart,
    handleBuyNow,
  };
};
