import { OrderType } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  article: string;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  orderType: OrderType;
  unitPrice: number;
  quantity: number;
  weightKg: number;
  minQty: number;
  stockAvailable: number;
}
