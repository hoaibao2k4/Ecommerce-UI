import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/stores/api/apiProduct";
import { getErrorMessage } from "@/utils/errorHelper";
import type { ProductRequest } from "@/types";
import toast from "react-hot-toast";

export const useProduct = (id?: number) => {
  const { data, isLoading, error } = useGetProductByIdQuery(id ?? 0, {
    skip: !id, // Skip GET API call if no id is provided
  });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleCreateProduct = async (product: ProductRequest) => {
    try {
      await createProduct(product).unwrap();
      toast.success("Product created successfully!");
      return true;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      return false;
    }
  };

  const handleUpdateProduct = async (product: ProductRequest, id?: number) => {
    try {
      if (!id) return false;
      await updateProduct({ id, body: product }).unwrap();
      toast.success("Product updated successfully!");
      return true;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      return false;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
      return true;
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      return false;
    }
  };
  return {
    data,
    isLoading,
    error,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};
