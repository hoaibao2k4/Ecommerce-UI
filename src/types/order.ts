import type { Params } from "@/types";

export type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED" | "SHIPPED";

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  username: string;
  email: string;
  createdAt: Date;
  status: OrderStatus;
  totalAmount: number;
  orderItems: OrderItem[];
}

export interface OrderRequest {
  productId: number;
  quantity: number;
}

export interface OrderParams extends Params {
  status?: OrderStatus;
  minTotalAmount?: number;
  maxTotalAmount?: number;
}


