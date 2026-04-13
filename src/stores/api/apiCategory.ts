import { apiSlice } from "@/stores/api/apiSlice";
import type { CategoryRequest, CategoryResponse } from "@/types";

const apiCategory = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryResponse[], void>({
            query: () => "/categories",
            providesTags: ["Category"],
        }), 
        createCategory: builder.mutation<void, CategoryRequest>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = apiCategory;