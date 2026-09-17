import React from "react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export const CategorySections: React.FC<{
  categories: Category[];
  products: Product[];
  navigate: (route: string) => void;
}> = ({ categories, products, navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-10">
      {categories.map(cat => {
        const catProducts = products.filter(p => p.categoryId === cat.id || p.categoryName === cat.name);
        if (catProducts.length === 0) return null;

        // Up to 12 products (2 * 6)
        const displayProducts = catProducts.slice(0, 12);

        return (
          <section key={cat.id} className="bg-slate-50/50 p-4 sm:p-6 rounded-3xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>📸</span> {cat.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {catProducts.length} টি পণ্য তালিকাভুক্ত রয়েছে
                </p>
              </div>
              <button
                onClick={() => navigate(`products?category=${cat.id}`)}
                className="bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-600 font-bold text-xs px-4 py-2 rounded-full shadow-sm transition-all"
              >
                সি-অল ({cat.name}) →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {displayProducts.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
