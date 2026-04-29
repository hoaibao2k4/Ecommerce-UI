import { logout } from "@/stores/slices/authSlice";
import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: "include", // enable cookie
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status == 401 && typeof args === "object" && args.url != "/me") {
    api.dispatch(logout());
    const apiUrl = import.meta.env.VITE_API_URL;
    globalThis.location.href = `${apiUrl}/oauth2/authorization/keycloak`;
  }


  if (result.error?.status === "FETCH_ERROR") {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Auth", "Order", "Category"],
  endpoints: () => ({}),
});
