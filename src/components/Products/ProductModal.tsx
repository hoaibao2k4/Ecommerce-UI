import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useCategories } from "@/hooks/useCategories";
import { useProduct } from "@/hooks/useProduct"; // Import hook
import type { ProductRequest } from "@/types";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductSchemaType } from "@/schemas/productSchema";
import { useForm } from "react-hook-form";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleProduct: (product: ProductRequest, id?: number) => Promise<boolean>;
  id?: number;
}

export default function ProductModal({
  isOpen,
  onClose,
  handleProduct,
  id,
}: Readonly<ProductModalProps>) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: product, isLoading: isLoadingProduct } = useProduct(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stockQuantity: 0,
      categoryId: undefined,
      description: "",
    },
  });

  // Reset form when product data arrives (Edit mode) or modal opens/closes
  useEffect(() => {
    if (product && id) {
      reset({
        name: product.name,
        price: product.price,
        stockQuantity: product.stockQuantity,
        categoryId: product.category?.id,
        description: product.description,
      });
    } else if (isOpen && !id) {
      // Clear form for "Add New Product" mode
      reset({
        name: "",
        price: 0,
        stockQuantity: 0,
        categoryId: undefined,
        description: "",
      });
    }
  }, [product, id, isOpen, reset]);

  const onSubmit = async (data: ProductRequest) => {
    const success = await handleProduct(data, id);
    if (success) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={id ? "Update Product" : "Add New Product"}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={isLoadingProduct ? "opacity-50 pointer-events-none" : ""}>
          <CustomInput
            label="Product Name"
            placeholder="E.g. iPhone 15 Pro Max"
            id="product-name"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <CustomInput
              label="Price"
              type="number"
              placeholder="0.00"
              id="product-price"
              error={errors.price?.message}
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <CustomInput
              label="Stock Quantity"
              type="number"
              placeholder="0"
              id="product-stock"
              error={errors.stockQuantity?.message}
              {...register("stockQuantity", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-2 mt-6">
            <label
              htmlFor="product-category"
              className="block text-sm font-medium text-foreground"
            >
              Category
            </label>
            <select
              id="product-category"
              className={`w-full bg-soft-bg border text-foreground px-4 py-2.5 text-sm rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none h-[43px] ${
                errors.categoryId ? "border-secondary" : "border-border"
              }`}
              disabled={isLoadingCategories}
              {...register("categoryId", {
                valueAsNumber: true,
              })}
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-[11px] font-medium text-secondary">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <CustomInput
              label="Description"
              as="textarea"
              id="product-description"
              rows={4}
              placeholder="Describe the product features..."
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t mt-8">
            <CustomButton variant="secondary" onClick={onClose} type="button">
              Cancel
            </CustomButton>
            <CustomButton variant="primary" type="submit" isLoading={isLoadingProduct}>
              {id ? "Save Changes" : "Create Product"}
            </CustomButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

