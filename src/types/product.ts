import type { Params } from '@/types/common';
import { type CategoryResponse } from './category';

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: CategoryResponse;
  isActive: boolean;
  createdAt: string;
}

export interface ProductParams extends Params{
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductRequest {
  name?: string,
  description?: string,
  price?: number,
  stockQuantity?: number,
  categoryId?: number,
}

