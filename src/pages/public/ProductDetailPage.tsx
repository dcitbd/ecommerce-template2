import React, { useState } from "react";
import { getProductBySlug } from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { calculateDiscountPercentage } from "@/utils/discountCalculator";
import { OrderType } from "@/types/product";

export const ProductDetailPage: React.FC<{
  slug: string;
  navigate: (route: string) => void;
}> = ({ slug, navigate }) => {
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>(
    product?.orderTypes[0] || "Stock"
  );
  const [selectedColor, setSelectedColor] = useState<string>(product?.color[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizeKit[0] || "");
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">প্রোডাক্ট পাওয়া যায়নি!</h2>
        <button
          onClick={() => navigate("products")}
          className="bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-full"
        >
          প্রোডাক্ট তালিকায় ফিরে যান
        </button>
      </div>
    );
  }

  const effectivePrice =
    selectedOrderType === "WholeSale"
      ? (product.prices.wholesalePrice || product.prices.stockPrice || product.prices.mrp)
      : selectedOrderType === "Pre-Order"
      ? (product.prices.preOrderPrice || product.prices.stockPrice || product.prices.mrp)
      : (product.prices.stockPrice || product.prices.mrp);

  const discount = calculateDiscountPercentage(product.prices.mrp, effectivePrice);
  const hasStock = product.stock > 0;
  const isFav = isInWishlist(product.id);

  const handleOrderNow = () => {
    addItem(product, selectedOrderType, quantity, selectedColor, selectedSize);
    navigate("checkout");
  };

  const handleAddToCart = () => {
    addItem(product, selectedOrderType, quantity, selectedColor, selectedSize);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `হ্যালো টেকনো ওয়ার্ল্ড বিডি! আমি ${product.name} (SKU: ${product.article}) অর্ডার করতে চাই।\nটাইপ: ${selectedOrderType}\nপরিমাণ: ${quantity}\nদাম: ৳${effectivePrice}`
    );
    window.open(`https://wa.me/8801351009358?text=${msg}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <span onClick={() => navigate("")} className="cursor-pointer hover:underline">হোম</span>
        <span>/</span>
        <span onClick={() => navigate("products")} className="cursor-pointer hover:underline">{product.categoryName}</span>
        <span>/</span>
        <span className="font-bold text-slate-800 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Left Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 relative">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 ${
                    selectedImage === idx ? "border-indigo-600 ring-2 ring-indigo-200" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details & Order controls */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded text-xs">
                SKU: {product.article}
              </span>
              <span className="text-xs font-bold text-indigo-600">
                ব্র্যান্ড: {product.brand}
              </span>
              <span className="text-xs text-slate-400">
                • {product.manufacturerCountry} থেকে আমদানিকৃত
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex text-amber-400">
                {"⭐".repeat(Math.round(product.rating))}
              </div>
              <span className="font-bold text-slate-700">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} কাস্টমার রিভিউ)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ৳{effectivePrice.toLocaleString()}
              </span>
              {product.prices.mrp > effectivePrice && (
                <span className="text-sm text-slate-400 line-through">
                  ৳{product.prices.mrp.toLocaleString()}
                </span>
              )}
            </div>

            {/* Wholesale info */}
            {product.prices.wholesalePrice && (
              <div className="text-xs text-indigo-700 font-semibold bg-indigo-50 p-2 rounded-xl border border-indigo-100 flex justify-between">
                <span>📦 হোলসেল প্রাইস (মিনিমাম {product.prices.minWholesaleQty || 10} পিস):</span>
                <span className="font-black">৳{product.prices.wholesalePrice.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Order Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              অর্ডার টাইপ নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {product.orderTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedOrderType(type);
                    if (type === "WholeSale") {
                      setQuantity(Math.max(quantity, product.prices.minWholesaleQty || 10));
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedOrderType === type
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color & Size Variant */}
          <div className="grid grid-cols-2 gap-4">
            {product.color?.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কালার:</label>
                <select
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                >
                  {product.color.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
            {product.sizeKit?.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সাইজ / কিট:</label>
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                >
                  {product.sizeKit.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Quantity Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">পরিমাণ:</span>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(selectedOrderType === "WholeSale" ? 10 : 1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-white text-slate-800 font-bold hover:bg-slate-200"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-xs">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 rounded-lg bg-white text-slate-800 font-bold hover:bg-slate-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Order Actions */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleOrderNow}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all"
              >
                {hasStock ? "অর্ডার করুন (Order Now)" : "প্রি-অর্ডার কনফার্ম করুন"}
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-slate-100 hover:bg-indigo-50 text-slate-800 font-bold text-xs py-3 rounded-xl border border-slate-200"
              >
                🛒 কার্টে রাখুন
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <span>💬</span> হোয়াটসঅ্যাপে অর্ডার
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-1 ${
                  isFav ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                {isFav ? "❤️ লাভড" : "🤍 লাভ"}
              </button>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              টেকনিক্যাল স্পেসিফিকেশন:
            </h3>
            <div className="bg-slate-50 rounded-xl p-3 border text-xs space-y-1.5">
              {Object.entries(product.specifications || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-slate-200/60 pb-1">
                  <span className="font-semibold text-slate-600">{key}:</span>
                  <span className="text-slate-900 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
