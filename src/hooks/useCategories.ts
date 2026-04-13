import { useGetCategoriesQuery } from "@/stores/api/apiCategory";

export const useCategories = () => {
  const { isError, error, isLoading, data, isFetching } = useGetCategoriesQuery();

  return {
    isError,
    error,
    isLoading,
    data,
    isFetching,
  };
};
