import { usePagination } from "@/hooks/usePagination";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import CustomButton from "../button";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<PaginationProps>) {
  const { pageNumbers, isFirstPage, isLastPage } = usePagination(
    currentPage,
    totalPages,
    5,
  );
  return (
    <div className={`inline-flex items-center gap-1`}>
      {/* double left arrow */}
      <CustomButton
        disabled={isFirstPage}
        onClick={() => onPageChange(1)}
        size="md"
      >
        <MdKeyboardDoubleArrowLeft />
      </CustomButton>
      {/* left arrow */}  
      <CustomButton
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        size="md"
      >
        <MdKeyboardArrowLeft />
      </CustomButton>
      {/* page numbers */}  
      <div className="flex gap-1">
        {pageNumbers.map((page) => (
          <CustomButton
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            size="md"
            onClick={() => onPageChange(page)}
          >
            {page}
          </CustomButton>
        ))}
      </div>
      {/* right arrow */}
      <CustomButton
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        size="md"
      >
        <MdKeyboardArrowRight />
      </CustomButton>
      {/* double right arrow */}  
      <CustomButton
        disabled={isLastPage}
        onClick={() => onPageChange(totalPages)}
        size="md"
      >
        <MdKeyboardDoubleArrowRight />
      </CustomButton>
    </div>
  );
}
