import { addToCart } from "@/stores/slices/cartSlice";
import type { CartItem } from "@/types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const useCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
    toast.success("Added to cart successfully");
  };

  const handleBuyNow = (item: CartItem) => {
    handleAddToCart(item);
    navigate("/cart");
  };

  return {
    handleAddToCart,
    handleBuyNow,
  };
};
