import { Product } from "@/types/product";
import { INITIAL_PRODUCTS } from "./productData";

const PRODUCT_STORAGE_KEY = "twbd_products_data";

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(id: string): Product | undefined {
  return getStoredProducts().find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getStoredProducts().find(p => p.slug === slug);
}

export function addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const products = getStoredProducts();
  const newProduct: Product = {
    ...product,
    id: "prod-" + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
