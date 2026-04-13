import { apiSlice } from "@/stores/api/apiSlice";
import {
  type PageData,
  type ProductParams,
  type ProductRequest,
  type ProductResponse,
} from "@/types";

export const apiProduct = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/products/all",
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ProductResponse, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),

    getProductsFilter: builder.query<PageData<ProductResponse>, ProductParams>({
      query: (params) => ({
        url: "/products",
        params: params,
      }),
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<void, ProductRequest>({
        query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<void, {id: number, body: ProductRequest}>({
      query: ({id, body}) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsFilterQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiProduct;
