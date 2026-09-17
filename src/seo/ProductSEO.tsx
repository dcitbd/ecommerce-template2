import React from "react";
import { Product } from "@/types/product";
export const ProductSEO: React.FC<{ product: Product }> = ({ product }) => {
  React.useEffect(() => {
    document.title = `${product.name} (আর্টিকেল: ${product.article}) - সেরা দামে কিনুন | Techno World BD`;
  }, [product]);
  return null;
};
