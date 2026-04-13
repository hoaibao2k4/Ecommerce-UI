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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  apiAuth;
