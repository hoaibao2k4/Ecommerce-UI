export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stockQuantity: number;
}
export interface CartState {
  items: CartItem[];
  totalAmount: number;
}