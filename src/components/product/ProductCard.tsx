import React, { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { calculateDiscountPercentage } from "@/utils/discountCalculator";

export const ProductCard: React.FC<{
  product: Product;
  navigate: (route: string) => void;
}> = ({ product, navigate }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const discount = calculateDiscountPercentage(
    product.prices.mrp,
    product.prices.stockPrice || product.prices.preOrderPrice || product.prices.mrp
  );

  const isFavorite = isInWishlist(product.id);
  const hasStock = product.stock > 0;

  const currentPrice = product.prices.stockPrice || product.prices.preOrderPrice || product.prices.mrp;

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, hasStock ? "Stock" : "Pre-Order", 1);
    navigate("checkout");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, hasStock ? "Stock" : "Pre-Order", 1);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `হ্যালো টেকনো ওয়ার্ল্ড বিডি! আমি ${product.name} (আর্টিকেল: ${product.article}) অর্ডার করতে আগ্রহী।\nদাম: ৳${currentPrice.toLocaleString()}\nলিঙ্ক: https://technoworldbangladesh.com/#/product/${product.slug}`
    );
    window.open(`https://wa.me/8801351009358?text=${msg}`, "_blank");
  };

  const handleWholesaleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, "WholeSale", product.prices.minWholesaleQty || 10);
    navigate("checkout");
  };

  return (
    <div
      onClick={() => navigate(`product/${product.slug}`)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer relative"
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {discount > 0 && (
          <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow">
            {discount}% OFF
          </span>
        )}
        {hasStock ? (
          <span className="bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-md shadow">
            ইন স্টক ({product.stock})
          </span>
        ) : (
          <span className="bg-amber-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded-md shadow">
            প্রি-অর্ডার (১০-১৫ দিন)
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-sm hover:scale-110 transition-transform"
        title="পছন্দের তালিকায় রাখুন"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Image Slider / Hover */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.images[activeImageIndex] || product.images[0] || "/public/images/default-product.webp"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.images.length > 1 && (
          <div className="absolute bottom-2 flex gap-1 z-10">
            {product.images.map((_, i) => (
              <span
                key={i}
                onMouseEnter={() => setActiveImageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === i ? "bg-indigo-600 w-4" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Article & Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="bg-slate-100 text-slate-700 font-mono px-1.5 py-0.5 rounded text-[10px] font-semibold">
              {product.article}
            </span>
            <span className="font-bold text-slate-600">{product.brand}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Price Block */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-extrabold text-slate-950">
                ৳{currentPrice.toLocaleString()}
              </span>
              {product.prices.mrp > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ৳{product.prices.mrp.toLocaleString()}
                </span>
              )}
            </div>

            {/* Wholesale Pricing Tag */}
            {product.prices.wholesalePrice && (
              <div className="mt-1 flex items-center justify-between text-[10px] text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-lg font-semibold">
                <span>হোলসেল রেট (মিনিমাম {product.prices.minWholesaleQty || 10} পিস):</span>
                <span className="font-bold text-indigo-900">৳{product.prices.wholesalePrice.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {/* Primary Order Button */}
            {hasStock ? (
              <button
                onClick={handleOrderNow}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-xl shadow-sm transition-all text-center"
              >
                অর্ডার নাও
              </button>
            ) : (
              <button
                onClick={handleOrderNow}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 rounded-xl shadow-sm transition-all text-center"
              >
                প্রি-অর্ডার
              </button>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 font-bold text-xs py-2 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1"
            >
              <span>🛒</span> কার্ট
            </button>
          </div>

          {/* WhatsApp Order Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <span>💬</span> হোয়াটসঅ্যাপ অর্ডার
          </button>
        </div>
      </div>
    </div>
  );
};
