import { ProductReview } from "@/types/review";

const REVIEWS_KEY = "twbd_reviews_data";

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: "rev-01",
    productId: "prod-001",
    productName: "Sony Alpha A7 IV",
    customerName: "Ashraful Islam (Wedding Photographer)",
    rating: 5,
    comment: "দুবাই থেকে প্রি-অর্ডারে ১২ দিনের মাথায় ইনটেক্ট প্যাকেজে ক্যামেরা হাতে পেয়েছি। পিকচার কোয়ালিটি চমৎকার!",
    isApproved: true,
    createdAt: "2026-09-02T10:00:00Z"
  },
  {
    id: "rev-02",
    productId: "prod-002",
    productName: "Canon PowerShot G7 X Mark III",
    customerName: "Nusrat Jahan (Content Creator)",
    rating: 5,
    comment: "ভ্লগিংয়ের জন্য ১০০% সেরা ক্যামেরা। টেকনো ওয়ার্ল্ড বিডির সার্ভিস ও কমিউনিকেশন দারুণ।",
    isApproved: true,
    createdAt: "2026-09-08T14:30:00Z"
  },
  {
    id: "rev-03",
    productId: "prod-008",
    productName: "DJI Osmo Pocket 3 Creator Combo",
    customerName: "Farhan Tanvir",
    rating: 5,
    comment: "কুরিয়ার সার্ভিসের মাধ্যমে দ্রুত ও সুরক্ষিতভাবে হাতে পেলাম। অনেক ধন্যবাদ টেকনো ওয়ার্ল্ড বিডিকে।",
    isApproved: true,
    createdAt: "2026-09-12T11:00:00Z"
  }
];

export function getReviews(): ProductReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_REVIEWS;
  } catch {
    return INITIAL_REVIEWS;
  }
}

export function saveReviews(reviews: ProductReview[]) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}
