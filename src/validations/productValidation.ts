import { Product } from "@/types/product";

export function validateProductForm(product: Partial<Product>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!product.name || product.name.trim().length < 3) errors.push("প্রোডাক্টের নাম ন্যূনতম ৩ অক্ষরের হতে হবে।");
  if (!product.article || product.article.trim().length < 2) errors.push("আর্টিকেল / SKU কোড আবশ্যক।");
  if (!product.categoryId) errors.push("ক্যাটাগরি নির্বাচন করা আবশ্যক।");
  if (!product.brand) errors.push("ব্র্যান্ড নির্বাচন করা আবশ্যক।");
  if (!product.orderTypes || product.orderTypes.length === 0) errors.push("কমপক্ষে একটি অর্ডার টাইপ নির্বাচন করুন।");
  if (!product.prices?.mrp || product.prices.mrp <= 0) errors.push("বৈধ MRP প্রাইস দিন।");
  if (product.orderTypes?.includes("Stock") && (!product.prices?.stockPrice || product.prices.stockPrice <= 0)) {
    errors.push("স্টক প্রাইস সঠিকভাবে দিন।");
  }
  if (product.orderTypes?.includes("Pre-Order") && (!product.prices?.preOrderPrice || product.prices.preOrderPrice <= 0)) {
    errors.push("প্রি-অর্ডার প্রাইস সঠিকভাবে দিন।");
  }
  if (product.orderTypes?.includes("WholeSale") && (!product.prices?.wholesalePrice || product.prices.wholesalePrice <= 0)) {
    errors.push("হোলসেল প্রাইস সঠিকভাবে দিন।");
  }
  if (!product.images || product.images.length === 0) errors.push("কমপক্ষে ১টি ছবি যুক্ত করুন।");
  if (product.images && product.images.length > 5) errors.push("সর্বোচ্চ ৫টি ছবি আপলোড করা যাবে।");

  return { isValid: errors.length === 0, errors };
}
