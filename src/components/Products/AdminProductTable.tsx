import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import Table, { type Column } from "@/components/ui/table";
import type { CategoryResponse, ProductResponse } from "@/types";
import { FaEdit, FaTrash } from "react-icons/fa";

interface AdminProductTableProps {
  products: ProductResponse[];
  isLoading: boolean;
  categories: CategoryResponse[] | undefined;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  searchTerm: string;
  sortType: string;
  selectedCategoryId: number | undefined;
  onSearch: (value: string) => void;
  onSortChange: (type: any, value?: any) => void;
  onSubmit: () => void;
  handlePageChange: (page: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AdminProductTable({
  products,
  isLoading,
  categories,
  pagination,
  searchTerm,
  sortType,
  selectedCategoryId,
  onSearch,
  onSortChange,
  onSubmit,
  handlePageChange,
  onEdit,
  onDelete,
}: Readonly<AdminProductTableProps>) {
  const columns: Column<ProductResponse>[] = [
    {
      header: "ID",
      accessor: "id",
      render: (row) => (
        <span className="font-bold text-slate-500">#{row.id}</span>
      ),
    },
    {
      header: "Product Name",
      accessor: "name",
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.name}</span>
      ),
      filter: (
        <CustomInput
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50"
        />
      ),
    },
    {
      header: "Price",
      accessor: "price",
      render: (row) => (
        <span className="font-bold text-primary">
          ${row.price.toLocaleString()}
        </span>
      ),
      filter: (
        <div className="flex items-center gap-2">
          <select
            value={sortType === "price-asc" ? "asc" : sortType === "price-desc" ? "desc" : ""}
            onChange={(e) => {
              if (e.target.value === "asc") onSortChange("price-asc");
              else if (e.target.value === "desc") onSortChange("price-desc");
              else onSortChange("newest");
            }}
            className="w-full px-2 py-1 text-[10px] border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-slate-50 font-bold text-slate-500 italic"
          >
            <option value="">Sort Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (row) => <span>{row.category?.categoryName || "N/A"}</span>,
      filter: (
        <select
          value={selectedCategoryId || ""}
          onChange={(e) => onSortChange("category", Number(e.target.value) || undefined)}
          className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 appearance-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "Stock",
      accessor: "stockQuantity",
      render: (row) => {
        if (row.stockQuantity === 0)
          return <Badge variant="danger">Out of stock</Badge>;
        if (row.stockQuantity < 5)
          return <Badge variant="warning">{row.stockQuantity} low stock</Badge>;
        return <Badge variant="success">{row.stockQuantity} in stock</Badge>;
      },
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center gap-2">
          <CustomButton
            onClick={() => onEdit(row.id)}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaEdit />
          </CustomButton>
          <CustomButton
            onClick={() => onDelete(row.id)}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FaTrash />
          </CustomButton>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
      <Table
        data={products}
        columns={columns}
        isLoading={isLoading}
        emptyText="No products found."
      />

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
