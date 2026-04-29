import ProductModal from "@/components/Products/ProductModal";
import CustomButton from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useProduct } from "@/hooks/useProduct";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import ErrorPage from "@/pages/error/ErrorPage";
import { isCriticalError } from "@/utils/errorHelper";
import { useGetCategoriesQuery } from "@/stores/api/apiCategory";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AdminProductTable from "@/components/Products/AdminProductTable";

export default function AdminProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >();

  const { handleCreateProduct, handleUpdateProduct, handleDeleteProduct } =
    useProduct();

  const { data: categories } = useGetCategoriesQuery();

  const {
    products,
    pagination,
    isLoading,
    isError,
    error,
    handlePageChange,
    searchTerm,
    onSearch,
    sortType,
    onSortChange,
    onSubmit,
    selectedCategoryId,
  } = useProductsFilter({
    page: 0,
    size: 5,
    keyword: "",
  });

  if (isCriticalError(isError, error))
    return <ErrorPage onRetry={() => globalThis.location.reload()} />;

  const handleEdit = (id: number) => {
    setSelectedProductId(id);
    setIsEdit(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id);
    setIsDelete(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Product Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage all your store products from here
          </p>
        </div>
        <CustomButton
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </CustomButton>
      </div>

      <AdminProductTable
        products={products}
        isLoading={isLoading}
        categories={categories}
        pagination={pagination}
        searchTerm={searchTerm}
        sortType={sortType}
        selectedCategoryId={selectedCategoryId}
        onSearch={onSearch}
        onSortChange={onSortChange}
        onSubmit={onSubmit}
        handlePageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleProduct={handleCreateProduct}
      />
      <ProductModal
        isOpen={isEdit}
        onClose={() => {
          setIsEdit(false);
          setSelectedProductId(undefined);
        }}
        handleProduct={handleUpdateProduct}
        id={selectedProductId}
      />
      <ConfirmDialog
        isOpen={isDelete}
        onCancel={() => {
          setIsDelete(false);
          setSelectedProductId(undefined);
        }}
        onConfirm={async () => {
          if (selectedProductId) {
            const success = await handleDeleteProduct(selectedProductId);
            if (success) {
              // check if exists 1 item in current page => go to previous page
              if (products.length === 1 && pagination.currentPage > 1) {
                handlePageChange(pagination.currentPage - 1);
              }
            }
            setIsDelete(false);
            setSelectedProductId(undefined);
          }
        }}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
