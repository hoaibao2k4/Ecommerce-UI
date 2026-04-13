export interface PageData<T> {
  content: T[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface Params {
  page?: number;
  size?: number;
  keyword?: string;
  sortBy?: string;
  direction?: "asc" | "desc";
}