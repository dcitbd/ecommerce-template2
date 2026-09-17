import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { useProducts } from "@/hooks/useProducts";
import { getColors } from "@/services/colorService";
import { getSizes } from "@/services/sizeService";
import { generateProductSlug } from "@/utils/slugGenerator";
import { isArticleUnique } from "@/utils/articleValidator";
import { validateAndCompressImage } from "@/utils/imageCompressor";
import { addProduct } from "@/services/productService";
import { OrderType, ProductCondition } from "@/types/product";

export const AdminAddProductPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { products, refreshProducts } = useProducts();
  const colors = getColors();
  const sizes = getSizes();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [article, setArticle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [brand, setBrand] = useState(brands[0]?.name || "");
  const [condition, setCondition] = useState<ProductCondition>("Brand New");
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<OrderType[]>(["Stock"]);
  const [mrp, setMrp] = useState<number>(0);
  const [stockPrice, setStockPrice] = useState<number>(0);
  const [preOrderPrice, setPreOrderPrice] = useState<number>(0);
  const [wholesalePrice, setWholesalePrice] = useState<number>(0);
  const [minWholesaleQty, setMinWholesaleQty] = useState<number>(10);
  const [stock, setStock] = useState<number>(10);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Black"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Standard Kit"]);
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("Sensor: 33MP Full-Frame\nVideo: 4K 60p\nMount: E-Mount");
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const autoSlug = generateProductSlug(article || "SKU", name || "Product");

  const handleNameChange = (val: string) => {
    setName(val);
    const low = val.toLowerCase();
    if (low.includes("lens") || low.includes("mm")) {
      const lensCat = categories.find(c => c.name.toLowerCase().includes("lens"));
      if (lensCat) setCategoryId(lensCat.id);
    } else if (low.includes("camera") || low.includes("eos") || low.includes("alpha") || low.includes("mark")) {
      const camCat = categories.find(c => c.name.toLowerCase().includes("camera"));
      if (camCat) setCategoryId(camCat.id);
    } else if (low.includes("gimbal") || low.includes("osmo") || low.includes("pocket") || low.includes("dji")) {
      const gimCat = categories.find(c => c.name.toLowerCase().includes("gimbal"));
      if (gimCat) setCategoryId(gimCat.id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("সর্বোচ্চ ৫টি ছবি আপলোড করা যাবে।");
      return;
    }

    const newImgs: string[] = [];
    for (const f of files) {
      const res = await validateAndCompressImage(f);
      if (res.isValid && res.base64) {
        newImgs.push(res.base64);
      } else {
        alert(res.error || "ছবি আপলোড ত্রুটি");
      }
    }
    setImages(prev => [...prev, ...newImgs]);
  };

  const toggleOrderType = (type: OrderType) => {
    setSelectedOrderTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleProceedToPreview = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("প্রোডাক্টের নাম দিন।");
    if (!article.trim()) errs.push("আর্টিকেল / SKU দিন।");
    if (!isArticleUnique(article, null, products)) {
      errs.push("এই আর্টিকেল কোডটি ইতিমধ্যে পুরো শপে ব্যবহৃত হচ্ছে! ভিন্ন কোড দিন।");
    }
    if (selectedOrderTypes.length === 0) errs.push("কমপক্ষে একটি অর্ডার টাইপ সিলেক্ট করুন।");
    if (mrp <= 0) errs.push("সঠিক MRP দিন।");
    if (selectedOrderTypes.includes("Stock") && stockPrice <= 0) errs.push("স্টক প্রাইস দিন।");
    if (selectedOrderTypes.includes("Pre-Order") && preOrderPrice <= 0) errs.push("প্রি-অর্ডার প্রাইস দিন।");
    if (selectedOrderTypes.includes("WholeSale") && wholesalePrice <= 0) errs.push("হোলসেল প্রাইস দিন।");
    if (images.length === 0) errs.push("কমপক্ষে একটি প্রোডাক্টের ছবি আপলোড করুন।");

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setStep(2);
  };

  const handlePublish = () => {
    const specObj: Record<string, string> = {};
    specs.split("\n").forEach(line => {
      const parts = line.split(":");
      if (parts.length === 2) {
        specObj[parts[0].trim()] = parts[1].trim();
      }
    });

    const categoryObj = categories.find(c => c.id === categoryId);

    addProduct({
      name,
      slug: autoSlug,
      article: article.trim().toUpperCase(),
      categoryId,
      categoryName: categoryObj?.name || "Cameras",
      brand,
      color: selectedColors,
      sizeKit: selectedSizes,
      condition,
      orderTypes: selectedOrderTypes,
      prices: {
        mrp,
        stockPrice: selectedOrderTypes.includes("Stock") ? stockPrice : undefined,
        preOrderPrice: selectedOrderTypes.includes("Pre-Order") ? preOrderPrice : undefined,
        wholesalePrice: selectedOrderTypes.includes("WholeSale") ? wholesalePrice : undefined,
        minWholesaleQty: selectedOrderTypes.includes("WholeSale") ? minWholesaleQty : undefined,
      },
      stock,
      rating: 5.0,
      reviewsCount: 0,
      viewsCount: 1,
      totalOrders: 0,
      totalWishlist: 0,
      images: images.length ? images : ["/public/images/default-product.webp"],
      specifications: specObj,
      description,
      manufacturerCountry: "Dubai",
      weightKg: 0.85,
      isActive: true,
    });

    refreshProducts();
    alert("প্রোডাক্ট সফলভাবে পাবলিশ হয়েছে!");
    navigate("admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">+ নতুন প্রোডাক্ট যোগ করুন</h1>
          <p className="text-xs text-slate-500">
            {step === 1 ? "ধাপ ১: যাবতীয় তথ্য ও প্রাইসিং পূরণ করুন" : "ধাপ ২: প্রিভিউ ও চূড়ান্ত প্রকাশ"}
          </p>
        </div>
        <button
          onClick={() => navigate("admin/products")}
          className="text-xs font-bold text-slate-600 hover:underline"
        >
          ← তালিকায় ফিরুন
        </button>
      </div>

      {errors.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs space-y-1">
          {errors.map((e, i) => <div key={i}>⚠️ {e}</div>)}
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">প্রোডাক্টের নাম *</label>
              <input
                type="text"
                value={name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="যেমন: Sony Alpha A7 IV Mirrorless Camera"
                className="w-full p-2.5 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">SKU / আর্টিকেল কোড * (পুরো শপে ইউনিক)</label>
              <input
                type="text"
                value={article}
                onChange={e => setArticle(e.target.value.toUpperCase())}
                placeholder="যেমন: SN-A7M4"
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono uppercase font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-500 mb-1">অটো-জেনারেটেড স্লাগ (Auto-Slug):</label>
            <input
              type="text"
              value={autoSlug}
              readOnly
              className="w-full p-2 bg-slate-100 border rounded-xl text-slate-600 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি (অটো-সাজেস্টেড)</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">ব্র্যান্ড</label>
              <select
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold"
              >
                {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">কন্ডিশন</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="New">New</option>
                <option value="Old Model">Old Model</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="block font-bold text-slate-800 mb-1">
              প্রোডাক্টের ছবি আপলোড (সর্বোচ্চ ৫টি ছবি, সর্বোচ্চ ১ মেগাবাইট প্রতি ছবি)
            </label>
            <p className="text-[11px] text-slate-500 mb-3">প্রথম ছবিটি স্বয়ংক্রিয়ভাবে কভার ফটো হিসেবে যুক্ত হবে।</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded-xl bg-white text-xs w-full"
            />
            {images.length > 0 && (
              <div className="flex gap-3 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl border overflow-hidden flex-shrink-0">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-indigo-600 text-white text-[8px] text-center font-bold">
                        কভার
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-rose-600 text-white text-[9px] w-4 h-4 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
            <label className="block font-bold text-slate-900">অর্ডার টাইপ (Multi-select) ও প্রাইজিং:</label>
            <div className="flex gap-4">
              {(["Stock", "Pre-Order", "WholeSale"] as OrderType[]).map(type => (
                <label key={type} className="flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOrderTypes.includes(type)}
                    onChange={() => toggleOrderType(type)}
                    className="rounded text-indigo-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">কাটা দাগের MRP *</label>
                <input
                  type="number"
                  value={mrp || ""}
                  onChange={e => setMrp(Number(e.target.value))}
                  placeholder="275000"
                  className="w-full p-2 bg-white border rounded-xl"
                />
              </div>
              {selectedOrderTypes.includes("Stock") && (
                <div>
                  <label className="block font-bold text-emerald-700 mb-1">স্টক সেল প্রাইস *</label>
                  <input
                    type="number"
                    value={stockPrice || ""}
                    onChange={e => setStockPrice(Number(e.target.value))}
                    placeholder="248000"
                    className="w-full p-2 bg-white border rounded-xl"
                  />
                </div>
              )}
              {selectedOrderTypes.includes("Pre-Order") && (
                <div>
                  <label className="block font-bold text-amber-700 mb-1">প্রি-অর্ডার প্রাইস *</label>
                  <input
                    type="number"
                    value={preOrderPrice || ""}
                    onChange={e => setPreOrderPrice(Number(e.target.value))}
                    placeholder="232000"
                    className="w-full p-2 bg-white border rounded-xl"
                  />
                </div>
              )}
              {selectedOrderTypes.includes("WholeSale") && (
                <div>
                  <label className="block font-bold text-indigo-700 mb-1">হোলসেল প্রাইস *</label>
                  <input
                    type="number"
                    value={wholesalePrice || ""}
                    onChange={e => setWholesalePrice(Number(e.target.value))}
                    placeholder="220000"
                    className="w-full p-2 bg-white border rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">মজুত স্টক সংখ্যা (Pieces)</label>
              <input
                type="number"
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">স্পেসিফিকেশন (প্রতি লাইনে Key: Value)</label>
              <textarea
                rows={3}
                value={specs}
                onChange={e => setSpecs(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">বিস্তারিত বিবরণ (Description)</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="প্রোডাক্ট সম্পর্কিত বিস্তারিত তথ্য ও ওয়ারেন্টি সুবিধা..."
              className="w-full p-2.5 bg-slate-50 border rounded-xl"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleProceedToPreview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow"
            >
              নেক্সট: প্রিভিউ দেখুন →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 text-xs">
          <h3 className="font-extrabold text-slate-900 text-sm pb-2 border-b">🔍 প্রিভিউ ও ভেরিফিকেশন</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <img
                src={images[0] || "/public/images/default-product.webp"}
                alt=""
                className="w-full h-64 object-contain bg-slate-50 rounded-2xl border"
              />
            </div>
            <div className="space-y-3">
              <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                {article}
              </span>
              <h2 className="text-base font-black text-slate-900">{name}</h2>
              <div className="text-slate-500">ব্র্যান্ড: {brand} | ক্যাটাগরি: {categories.find(c => c.id === categoryId)?.name}</div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div>MRP: ৳{mrp.toLocaleString()}</div>
                {stockPrice > 0 && <div className="text-emerald-700 font-bold">স্টক প্রাইস: ৳{stockPrice.toLocaleString()}</div>}
                {preOrderPrice > 0 && <div className="text-amber-700 font-bold">প্রি-অর্ডার প্রাইস: ৳{preOrderPrice.toLocaleString()}</div>}
                {wholesalePrice > 0 && <div className="text-indigo-700 font-bold">হোলসেল প্রাইস: ৳{wholesalePrice.toLocaleString()}</div>}
              </div>
              <div>মজুত স্টক: {stock} টি</div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700"
            >
              ← এডিট করতে ফিরুন
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow"
            >
              ✓ প্রোডাক্ট পাবলিশ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
