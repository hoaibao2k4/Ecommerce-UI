import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: "include", // enable cookie
});

import { logout } from "../slices/authSlice";

let refreshPromise: Promise<boolean> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;

  if (
    result?.error?.status === 401 &&
    url !== "/auth/login" &&
    url !== "/auth/register"
  ) {
    refreshPromise ??= (async () => {
      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh-token", method: "POST" },
          api,
          extraOptions,
        );

        return !!refreshResult.data;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();

    const isSuccess = await refreshPromise;

    if (isSuccess) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      globalThis.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Auth", "Order", "Category"],
  endpoints: () => ({}),
});
