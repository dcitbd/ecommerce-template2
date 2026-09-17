import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

export const PopularProducts: React.FC<{
  products: Product[];
  navigate: (route: string) => void;
}> = ({ products, navigate }) => {
  // Select top 12 popular products
  const popular = [...products].sort((a, b) => b.totalOrders - a.totalOrders).slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h2 className="text-xl font-extrabold text-slate-900">জনপ্রিয় প্রোডাক্ট সমূহ</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">সবচেয়ে বেশি বিক্রিত ক্যামেরা, লেন্স ও আনুষঙ্গিক গ্যাজেট (২*৬ = ১২টি)</p>
        </div>
        <button
          onClick={() => navigate("products")}
          className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
        >
          সব দেখুন (See All) →
        </button>
      </div>

      {/* 2 * 6 = 12 Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {popular.map(p => (
          <ProductCard key={p.id} product={p} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};
