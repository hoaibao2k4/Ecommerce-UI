import { apiSlice } from "@/stores/api/apiSlice";
import type {
  OrderParams,
  OrderRequest,
  OrderResponse,
  OrderStatus,
  PageData,
} from "@/types";

export const apiOrder = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    cancelOrder: builder.mutation<void, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order", "Product"],
    }),
    createOrder: builder.mutation<void, { items: OrderRequest[] }>({
      query: (items) => ({
        url: `/orders`,
        method: "POST",
        body: items,
      }),
      invalidatesTags: ["Order", "Product"],
    }),
    updateOrderStatus: builder.mutation<
      void,
      { orderId: number; orderStatus: OrderStatus }
    >({
      query: ({ orderId, orderStatus }) => ({
        url: `/orders/${orderId}/status?orderStatus=${orderStatus}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query<OrderResponse[], void>({
      query: () => `/orders/my-orders`,
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<OrderResponse, { orderId: number }>({
      query: ({ orderId }) => `/orders/${orderId}`,
      providesTags: ["Order"],
    }),
    getOrdersFilter: builder.query<PageData<OrderResponse>, OrderParams>({
      query: (params) => ({
        url: `/orders`,
        params: params,
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersFilterQuery,
} = apiOrder;
