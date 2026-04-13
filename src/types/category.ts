export interface CategoryResponse {
  id: number;
  categoryName: string;
  description: string;
  isActive: boolean;
}

export interface CategoryRequest {
  categoryName?: string;
  description?: string;
}
