export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}
