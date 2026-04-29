import { useGetProductByIdQuery } from "@/stores/api/apiProduct";
import { addToCart } from "@/stores/slices/cartSlice";
import type { AppDispatch } from "@/stores/store";
import type { CartItem } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

export const useProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error, isFetching } = useGetProductByIdQuery(Number(id));
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const handleIncrease = () => {
    if (data && quantity < data.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const navigate = useNavigate();
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      id: Number(data?.id),
      name: data?.name || "",
      price: Number(data?.price),
      quantity: quantity,
      stockQuantity: Number(data?.stockQuantity),
    };
    toast.success("Product added to cart");
    dispatch(addToCart(item));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return {
    //state
    quantity,
    setQuantity,

    // handlers
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    handleBuyNow,

    //api
    product: data,
    isLoading,
    isError,
    error,
    isFetching,
  };
};
