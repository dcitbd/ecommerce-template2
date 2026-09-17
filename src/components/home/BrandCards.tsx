import React from "react";
import { Brand } from "@/types/brand";

export const BrandCards: React.FC<{
  brands: Brand[];
  navigate: (route: string) => void;
}> = ({ brands, navigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🏷️</span> অফিসিয়াল ব্র্যান্ড সমূহ
          </h2>
          <p className="text-xs text-slate-500">১০০% আসল অথেনটিক ক্যামেরা ও এক্সেসরিজ ব্র্যান্ড</p>
        </div>
        <button
          onClick={() => navigate("products")}
          className="text-xs font-bold text-indigo-600 hover:underline"
        >
          সকল ব্র্যান্ড →
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-3">
        {brands.map(brand => (
          <div
            key={brand.id}
            onClick={() => navigate(`products?brand=${brand.name}`)}
            className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-extrabold text-slate-800 group-hover:scale-105 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shadow-inner">
              {brand.name.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2 truncate w-full">
              {brand.name}
            </span>
            <span className="text-[10px] text-slate-400">
              {brand.productCount} টি পণ্য
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
