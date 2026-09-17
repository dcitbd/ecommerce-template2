import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getStoredProducts } from "@/services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = () => {
    setProducts(getStoredProducts());
    setLoading(false);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return { products, loading, refreshProducts };
};
