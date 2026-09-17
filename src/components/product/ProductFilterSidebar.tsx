import React, { useState } from "react";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
import { ColorItem } from "@/types/color";
import { SizeKitItem } from "@/types/size";

export interface FilterState {
  categoryId: string;
  subCategoryId: string;
  childCategoryId: string;
  minPrice: number;
  maxPrice: number;
  selectedBrands: string[];
  stockStatus: "all" | "in_stock" | "out_of_stock";
  orderTypes: string[];
  minRating: number;
  selectedColors: string[];
  selectedSizes: string[];
  manufacturerCountry: string;
}

export const ProductFilterSidebar: React.FC<{
  categories: Category[];
  brands: Brand[];
  colors: ColorItem[];
  sizes: SizeKitItem[];
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
}> = ({ categories, brands, colors, sizes, filters, onChange, onReset }) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(filters.categoryId || null);
  const [expandedSub, setExpandedSub] = useState<string | null>(filters.subCategoryId || null);

  const toggleBrand = (brandName: string) => {
    const next = filters.selectedBrands.includes(brandName)
      ? filters.selectedBrands.filter(b => b !== brandName)
      : [...filters.selectedBrands, brandName];
    onChange({ ...filters, selectedBrands: next });
  };

  const toggleOrderType = (type: string) => {
    const next = filters.orderTypes.includes(type)
      ? filters.orderTypes.filter(t => t !== type)
      : [...filters.orderTypes, type];
    onChange({ ...filters, orderTypes: next });
  };

  const toggleColor = (colorName: string) => {
    const next = filters.selectedColors.includes(colorName)
      ? filters.selectedColors.filter(c => c !== colorName)
      : [...filters.selectedColors, colorName];
    onChange({ ...filters, selectedColors: next });
  };

  const toggleSize = (sizeName: string) => {
    const next = filters.selectedSizes.includes(sizeName)
      ? filters.selectedSizes.filter(s => s !== sizeName)
      : [...filters.selectedSizes, sizeName];
    onChange({ ...filters, selectedSizes: next });
  };

  return (
    <aside className="w-full lg:w-72 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6 flex-shrink-0">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
          <span>⚙️</span> ফিল্টার সমূহ
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-rose-600 hover:underline"
        >
          রিসেট
        </button>
      </div>

      {/* 1. 3-Tier Category Tree Filter (Category > Sub > Child) */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          ক্যাটাগরি ট্রি (Category Tree)
        </h4>
        <div className="space-y-1 text-xs">
          <div
            onClick={() => {
              onChange({ ...filters, categoryId: "", subCategoryId: "", childCategoryId: "" });
              setExpandedCat(null);
              setExpandedSub(null);
            }}
            className={`p-1.5 rounded-lg cursor-pointer font-semibold ${
              !filters.categoryId ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            সকল ক্যাটাগরি
          </div>

          {categories.map(cat => (
            <div key={cat.id} className="space-y-1">
              <div
                onClick={() => {
                  const isSelected = filters.categoryId === cat.id;
                  onChange({
                    ...filters,
                    categoryId: isSelected ? "" : cat.id,
                    subCategoryId: "",
                    childCategoryId: ""
                  });
                  setExpandedCat(isSelected ? null : cat.id);
                }}
                className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer font-semibold ${
                  filters.categoryId === cat.id ? "bg-indigo-100 text-indigo-800 font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-400">
                  {expandedCat === cat.id ? "▼" : "▶"}
                </span>
              </div>

              {/* Sub Categories */}
              {expandedCat === cat.id && cat.subCategories?.length > 0 && (
                <div className="pl-3 border-l-2 border-indigo-200 ml-2 space-y-1">
                  {cat.subCategories.map(sub => (
                    <div key={sub.id} className="space-y-1">
                      <div
                        onClick={() => {
                          const isSelected = filters.subCategoryId === sub.id;
                          onChange({
                            ...filters,
                            subCategoryId: isSelected ? "" : sub.id,
                            childCategoryId: ""
                          });
                          setExpandedSub(isSelected ? null : sub.id);
                        }}
                        className={`flex items-center justify-between p-1 rounded-md cursor-pointer text-[11px] ${
                          filters.subCategoryId === sub.id ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>• {sub.name}</span>
                        {sub.children?.length > 0 && (
                          <span className="text-[9px] text-slate-400">
                            {expandedSub === sub.id ? "▼" : "▶"}
                          </span>
                        )}
                      </div>

                      {/* Child Categories */}
                      {expandedSub === sub.id && sub.children?.length > 0 && (
                        <div className="pl-3 border-l-2 border-indigo-100 ml-2 space-y-0.5">
                          {sub.children.map(child => (
                            <div
                              key={child.id}
                              onClick={() => {
                                const isSelected = filters.childCategoryId === child.id;
                                onChange({
                                  ...filters,
                                  childCategoryId: isSelected ? "" : child.id
                                });
                              }}
                              className={`p-1 rounded cursor-pointer text-[10px] ${
                                filters.childCategoryId === child.id ? "bg-indigo-600 text-white font-bold" : "text-slate-500 hover:bg-slate-100"
                              }`}
                            >
                              - {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Filter by Stock (In Stock selected by default) */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          স্টক স্ট্যাটাস (Stock Status)
        </h4>
        <div className="space-y-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={filters.stockStatus === "in_stock"}
              onChange={() => onChange({ ...filters, stockStatus: "in_stock" })}
              className="text-indigo-600"
            />
            <span className="font-semibold text-emerald-700">In Stock (ইন স্টক)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={filters.stockStatus === "all"}
              onChange={() => onChange({ ...filters, stockStatus: "all" })}
              className="text-indigo-600"
            />
            <span className="text-slate-600">সব প্রোডাক্ট (All)</span>
          </label>
        </div>
      </div>

      {/* 3. Filter by Order Type (Stock, Pre-Order, WholeSale) */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          অর্ডার টাইপ (Order Type)
        </h4>
        <div className="space-y-1.5 text-xs">
          {["Stock", "Pre-Order", "WholeSale"].map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.orderTypes.includes(type)}
                onChange={() => toggleOrderType(type)}
                className="rounded text-indigo-600"
              />
              <span className="text-slate-700 font-medium">
                {type === "Stock" ? "রেগুলার স্টক (Stock)" : type === "Pre-Order" ? "প্রি-অর্ডার (Pre-Order)" : "হোলসেল / পাইকারি (WholeSale)"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Filter by Price */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          মূল্য সীমা (Price Range)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minPrice || ""}
            onChange={e => onChange({ ...filters, minPrice: Number(e.target.value) })}
            placeholder="Min (৳)"
            className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          />
          <span className="text-slate-400">-</span>
          <input
            type="number"
            value={filters.maxPrice || ""}
            onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            placeholder="Max (৳)"
            className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* 5. Filter by Brand */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          ব্র্যান্ড (Brand)
        </h4>
        <div className="space-y-1 text-xs max-h-36 overflow-y-auto pr-1">
          {brands.map(b => (
            <label key={b.id} className="flex items-center justify-between cursor-pointer py-0.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(b.name)}
                  onChange={() => toggleBrand(b.name)}
                  className="rounded text-indigo-600"
                />
                <span className="text-slate-700">{b.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{b.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Filter by Rating */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          রেটিং (Rating)
        </h4>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[5, 4, 3].map(stars => (
            <button
              key={stars}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === stars ? 0 : stars })}
              className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                filters.minRating === stars ? "bg-amber-500 text-white border-amber-600" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {stars}★ ও তদূর্ধ্ব
            </button>
          ))}
        </div>
      </div>

      {/* 7. Filter by Color */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          কালার (Color)
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          {colors.map(c => {
            const isSelected = filters.selectedColors.includes(c.name);
            return (
              <button
                key={c.id}
                onClick={() => toggleColor(c.name)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                  isSelected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-300"
                  style={{ backgroundColor: c.hexCode }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Filter by Size / Kit */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          সাইজ / কিট (Size / Kit)
        </h4>
        <div className="space-y-1 text-xs max-h-32 overflow-y-auto pr-1">
          {sizes.map(s => (
            <label key={s.id} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={filters.selectedSizes.includes(s.name)}
                onChange={() => toggleSize(s.name)}
                className="rounded text-indigo-600"
              />
              <span className="text-slate-700 truncate">{s.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 9. Filter by Manufacturer Country */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          ম্যানুফ্যাকচারার কান্ট্রি (Country)
        </h4>
        <select
          value={filters.manufacturerCountry}
          onChange={e => onChange({ ...filters, manufacturerCountry: e.target.value })}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
        >
          <option value="">সকল দেশ (All Countries)</option>
          <option value="Dubai">Dubai (সংযুক্ত আরব আমিরাত)</option>
          <option value="Hong Kong">Hong Kong (হংকং)</option>
          <option value="Russia">Russia (রাশিয়া)</option>
          <option value="Japan">Japan (জাপান)</option>
          <option value="China">China (চীন)</option>
          <option value="USA">USA (যুক্তরাষ্ট্র)</option>
        </select>
      </div>
    </aside>
  );
};
