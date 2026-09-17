import { useState, useEffect } from "react";
import { ProductReview } from "@/types/review";
import { getReviews } from "@/services/reviewService";

export const useReviews = () => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const refreshReviews = () => setReviews(getReviews());
  useEffect(() => { refreshReviews(); }, []);
  return { reviews, refreshReviews };
};
