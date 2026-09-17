export type ProductCondition = 'Brand New' | 'Old Model' | 'Like New' | 'New';
export type OrderType = 'Stock' | 'Pre-Order' | 'WholeSale';

export interface ProductPricing {
  mrp: number;
  stockPrice?: number;
  preOrderPrice?: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  article: string; // SKU/Article, must be globally unique
  categoryId: string;
  categoryName: string;
  subCategoryId?: string;
  childCategoryId?: string;
  brand: string;
  color: string[];
  sizeKit: string[];
  condition: ProductCondition;
  orderTypes: OrderType[];
  prices: ProductPricing;
  stock: number;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  totalOrders: number;
  totalWishlist: number;
  images: string[];
  specifications: Record<string, string>;
  description: string;
  manufacturerCountry: string; // Dubai, Hong Kong, Russia, Japan etc.
  weightKg: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
