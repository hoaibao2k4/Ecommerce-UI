import { useMemo } from "react";

export const usePagination = (currentPage: number, totalPages: number, visiblePages: number) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const pageNumbers = useMemo(() => {
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - (visiblePages - 1));
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return { pageNumbers, isFirstPage, isLastPage };
};
