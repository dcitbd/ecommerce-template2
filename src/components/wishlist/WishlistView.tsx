import React from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { getStoredProducts } from "@/services/productService";

export const WishlistView: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const allProducts = getStoredProducts();

  const handleAddToCart = (productId: string) => {
    const prod = allProducts.find(p => p.id === productId);
    if (prod) {
      addItem(prod, prod.stock > 0 ? "Stock" : "Pre-Order", 1);
    }
  };

  const handleOrderNow = (productId: string) => {
    const prod = allProducts.find(p => p.id === productId);
    if (prod) {
      addItem(prod, prod.stock > 0 ? "Stock" : "Pre-Order", 1);
      navigate("checkout");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span>❤️</span> পছন্দের তালিকা (Wishlist / Love)
        </h1>
        <p className="text-xs text-slate-500">আপনার সংরক্ষিত প্রিয় প্রোডাক্টসমূহ</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-5xl mb-3">❤️</div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">আপনার উইশলিস্ট খালি!</h2>
          <p className="text-xs text-slate-500 mb-6">যেকোনো প্রোডাক্টের হার্ট (Love) আইকনে ক্লিক করে তালিকায় রাখুন।</p>
          <button
            onClick={() => navigate("products")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
          >
            প্রোডাক্ট দেখুন →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-rose-600 flex items-center justify-center text-xs shadow"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mb-1">{item.article}</div>
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-2">{item.name}</h3>
                <div className="text-sm font-extrabold text-slate-900 mb-3">
                  ৳{item.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={() => handleOrderNow(item.productId)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-xl shadow-sm text-center"
                >
                  অর্ডার নাও
                </button>
                <button
                  onClick={() => handleAddToCart(item.productId)}
                  className="w-full bg-slate-100 hover:bg-indigo-50 text-slate-800 font-bold text-xs py-1.5 rounded-xl border border-slate-200 text-center"
                >
                  + কার্টে নিন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
