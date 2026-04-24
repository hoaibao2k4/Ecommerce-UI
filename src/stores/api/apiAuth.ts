import { apiSlice } from "@/stores/api/apiSlice";
import type { LoginForm, RegisterForm } from "@/types";

export const apiAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: LoginForm) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: RegisterForm) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutAll: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutAllMutation, useGetMeQuery } =
  apiAuth;
