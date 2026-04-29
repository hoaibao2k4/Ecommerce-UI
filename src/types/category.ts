export interface CategoryResponse {
  id: number;
  categoryName: string;
  description: string;
}

export interface CategoryRequest {
  categoryName?: string;
  description?: string;
}
