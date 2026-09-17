import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export const MainNavbar: React.FC<{
  currentRoute: string;
  navigate: (route: string) => void;
}> = ({ currentRoute, navigate }) => {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useAuth();
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchFilteredProducts = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (slug: string) => {
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(`product/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => navigate("")}
          className="flex items-center gap-2 cursor-pointer select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-200">
            TW
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
              TECHNO WORLD <span className="text-indigo-600">BD</span>
            </div>
            <div className="text-[10px] tracking-widest text-amber-600 font-bold uppercase mt-0.5">
              Wholesale &amp; Pre-Order
            </div>
          </div>
        </div>

        {/* Live Search Bar with Dropdown Preview */}
        <div ref={searchRef} className="flex-1 max-w-xl relative hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="ক্যামেরা, লেন্স বা আর্টিকেল দিয়ে সার্চ করুন (যেমন: SN-A7M4, Canon, Lens)..."
              className="w-full bg-slate-100 border border-slate-200 rounded-full py-2.5 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
            />
            <span className="absolute left-4 top-3 text-slate-400">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-slide-down">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>ম্যাচিং প্রোডাক্ট ({searchFilteredProducts.length})</span>
                <span className="text-indigo-600 cursor-pointer" onClick={() => { setShowSearchResults(false); navigate("products"); }}>সব দেখুন →</span>
              </div>
              {searchFilteredProducts.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-sm">
                  কোন প্রোডাক্ট খুঁজে পাওয়া যায়নি।
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {searchFilteredProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.slug)}
                      className="p-3 flex items-center gap-3 hover:bg-indigo-50/60 cursor-pointer transition-colors"
                    >
                      <img
                        src={p.images[0] || "/public/images/default-product.webp"}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{p.name}</div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono text-[10px]">{p.article}</span>
                          <span>• {p.brand}</span>
                          <span className="text-emerald-600 font-bold">৳{(p.prices.stockPrice || p.prices.mrp).toLocaleString()}</span>
                        </div>
                      </div>
                      <span className="text-xs text-indigo-600 font-semibold flex-shrink-0">বিস্তারিত →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Products link */}
          <button
            onClick={() => navigate("products")}
            className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              currentRoute.startsWith("products") ? "text-indigo-600 bg-indigo-50" : "text-slate-700 hover:text-indigo-600"
            }`}
          >
            প্রোডাক্ট’স
          </button>

          {/* Track Order */}
          <button
            onClick={() => navigate("track")}
            className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 text-xs font-semibold p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="অর্ডার ট্র্যাক করুন"
          >
            <span className="text-base">📦</span>
            <span className="hidden sm:inline">ট্র্যাক</span>
          </button>

          {/* Wishlist / Love */}
          <button
            onClick={() => navigate("wishlist")}
            className="relative p-2 text-slate-700 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="পছন্দের তালিকা"
          >
            <span className="text-lg">❤️</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse-subtle">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("cart")}
            className="relative p-2 text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="শপিং কার্ট"
          >
            <span className="text-lg">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(["Super Admin", "Admin", "Manager", "Worker"].includes(user.role) ? "admin" : "customer")}
                className="flex items-center gap-2 bg-slate-100 hover:bg-indigo-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden lg:inline max-w-[90px] truncate">{user.name}</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full">
                  {user.role === "Customer" ? "ড্যাশবোর্ড" : user.role}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("login")}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm shadow-indigo-200 transition-all"
            >
              <span>👤</span>
              <span>লগইন</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
