export interface WishlistItem {
  productId: string;
  name: string;
  article: string;
  image: string;
  price: number;
  mrp: number;
  stock: number;
  orderTypes: ('Stock' | 'Pre-Order' | 'WholeSale')[];
  addedAt: string;
}
