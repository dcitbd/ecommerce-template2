import React, { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { getBanners, BannerItem } from "@/services/bannerService";

export const CategoryBannerCarousel: React.FC<{
  categories: Category[];
  navigate: (route: string) => void;
}> = ({ categories, navigate }) => {
  const [banners, setBanners] = useState<BannerItem[]>(getBanners());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* 20% Category List */}
        <div className="w-full lg:w-1/5 bg-white rounded-2xl border border-slate-200 shadow-sm p-3 hidden md:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-slate-100 font-bold text-slate-800 text-sm">
              <span>📂</span>
              <span>ক্যাটাগরি সমূহ</span>
            </div>
            <ul className="space-y-1">
              {categories.slice(0, 8).map(cat => (
                <li
                  key={cat.id}
                  onClick={() => navigate(`products?category=${cat.id}`)}
                  className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 cursor-pointer transition-colors"
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-mono">
                    {cat.productCount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div
            onClick={() => navigate("products")}
            className="pt-2 mt-2 border-t border-slate-100 text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            সব ক্যাটাগরি দেখুন →
          </div>
        </div>

        {/* 80% 10 Sliding Banner Carousel */}
        <div className="w-full lg:w-4/5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-[16/8] sm:aspect-[21/9] flex items-center">
          {banners.map((b, idx) => (
            <div
              key={b.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover opacity-45 transform scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-center px-6 sm:px-12 max-w-2xl">
                <span className="inline-block bg-amber-400 text-slate-950 font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full w-fit mb-3 shadow-md">
                  {b.badge}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
                  {b.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-5">
                  {b.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate(b.link.replace(/^\//, ""))}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
                  >
                    অর্ডার করুন এখনই →
                  </button>
                  <a
                    href="https://wa.me/8801351009358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow"
                  >
                    <span>💬</span>
                    <span>হোয়াটসঅ্যাপ অর্ডার</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-3 right-6 z-20 flex gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-amber-400" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Prev/Next arrows */}
          <button
            onClick={() => setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center text-sm backdrop-blur"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center text-sm backdrop-blur"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};
