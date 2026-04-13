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
  credentials: "include",
});

import { logout } from "../slices/authSlice";

let isRefreshing = false;

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
    console.log("Token expired, attempting refresh...");

    if (isRefreshing) {
      // If another API is already calling refresh, wait 1s then call the current API again
      await new Promise((resolve) => setTimeout(resolve, 1000));
      result = await baseQuery(args, api, extraOptions);
    } else {
      isRefreshing = true;
      try {
        // Call refresh endpoint directly through baseQuery
        const refreshResult = await baseQuery(
          { url: "/auth/refresh-token", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // New token has been updated in Cookie, call the API that failed initially
          result = await baseQuery(args, api, extraOptions);
          console.log("Token refreshed successfully");
        } else {
          // Refresh Token is also expired -> Force logout
          api.dispatch(logout());
          console.log("Refresh token expired, logging out...");
          globalThis.location.href = "/login";
        }
      } finally {
        isRefreshing = false;
      }
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
