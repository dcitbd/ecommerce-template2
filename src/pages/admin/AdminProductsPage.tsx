import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { exportToCSV } from "@/utils/csvExporter";
import { exportToExcel } from "@/utils/excelExporter";
import { isArticleUnique } from "@/utils/articleValidator";
import { Product } from "@/types/product";

export const AdminProductsPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { products, refreshProducts } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in_stock" | "out_of_stock">("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  const [duplicatingProduct, setDuplicatingProduct] = useState<Product | null>(null);
  const [newArticleCode, setNewArticleCode] = useState("");
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const totalCount = products.length;
  const activeCount = products.filter(p => p.isActive).length;
  const inStockCount = products.filter(p => p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;

  const filtered = products.filter(p => {
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === "all" ? true : statusFilter === "active" ? p.isActive : !p.isActive;

    const matchStock =
      stockFilter === "all" ? true : stockFilter === "in_stock" ? p.stock > 0 : p.stock <= 0;

    return matchSearch && matchStatus && matchStock;
  });

  const handleToggleActive = (productId: string) => {
    const all = [...products];
    const item = all.find(p => p.id === productId);
    if (!item) return;
    item.isActive = !item.isActive;
    localStorage.setItem("twbd_products_data", JSON.stringify(all));
    refreshProducts();
  };

  const handleSaveInline = (productId: string) => {
    const all = [...products];
    const item = all.find(p => p.id === productId);
    if (!item) return;
    if (item.prices.stockPrice) item.prices.stockPrice = editPrice;
    item.stock = editStock;
    localStorage.setItem("twbd_products_data", JSON.stringify(all));
    setEditingId(null);
    refreshProducts();
  };

  const handleDelete = (productId: string) => {
    if (confirm("আপনি কি নিশ্চিত এই প্রোডাক্টটি ডিলিট করতে চান?")) {
      const all = products.filter(p => p.id !== productId);
      localStorage.setItem("twbd_products_data", JSON.stringify(all));
      refreshProducts();
    }
  };

  const handleConfirmDuplicate = () => {
    if (!newArticleCode.trim()) {
      setDuplicateError("নতুন আর্টিকেল কোড দিন।");
      return;
    }
    if (!isArticleUnique(newArticleCode, null, products)) {
      setDuplicateError("এই আর্টিকেল / SKU কোডটি ইতিমধ্যে অন্য একটি প্রোডাক্টে ব্যবহৃত হচ্ছে! ইউনিক কোড দিন।");
      return;
    }
    if (!duplicatingProduct) return;

    const clone: Product = {
      ...duplicatingProduct,
      id: "prod-" + Date.now(),
      article: newArticleCode.trim().toUpperCase(),
      name: `${duplicatingProduct.name} (Copy)`,
      slug: `${newArticleCode.toLowerCase()}-${duplicatingProduct.slug}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const all = [clone, ...products];
    localStorage.setItem("twbd_products_data", JSON.stringify(all));
    setDuplicatingProduct(null);
    setNewArticleCode("");
    setDuplicateError(null);
    refreshProducts();
  };

  const handleExportCSV = () => {
    const exportRows = products.map(p => ({
      Article: p.article,
      Name: p.name,
      Brand: p.brand,
      Category: p.categoryName,
      Stock: p.stock,
      MRP: p.prices.mrp,
      StockPrice: p.prices.stockPrice || "",
      PreOrderPrice: p.prices.preOrderPrice || "",
      WholesalePrice: p.prices.wholesalePrice || "",
      TotalOrders: p.totalOrders,
      Active: p.isActive ? "Yes" : "No"
    }));
    exportToCSV("techno-world-products", exportRows);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900">📷 প্রোডাক্ট ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500 mt-0.5">ইনভেন্টরি, প্রাইসিং, অনক্লিক এডিট ও ডুপ্লিকেট চেকার</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("admin/add-product")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            + নতুন প্রোডাক্ট অ্যাড
          </button>
          <button
            onClick={() => navigate("admin/bulk-upload")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200"
          >
            বাল্ক আপলোড
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            📥 CSV এক্সপোর্ট
          </button>
          <button
            onClick={() => exportToExcel("techno-world-products", products)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            📊 Excel এক্সপোর্ট
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => { setStatusFilter("all"); setStockFilter("all"); }}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === "all" && stockFilter === "all" ? "bg-indigo-50 border-indigo-500 shadow" : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs text-slate-500 font-semibold">সকল প্রোডাক্ট</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter(statusFilter === "active" ? "all" : "active")}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === "active" ? "bg-emerald-50 border-emerald-500 shadow" : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs text-emerald-700 font-semibold">এক্টিভ প্রোডাক্ট</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{activeCount}</div>
        </div>

        <div
          onClick={() => setStockFilter(stockFilter === "in_stock" ? "all" : "in_stock")}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            stockFilter === "in_stock" ? "bg-blue-50 border-blue-500 shadow" : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs text-blue-700 font-semibold">ইন স্টক (In Stock)</div>
          <div className="text-2xl font-black text-blue-700 mt-1">{inStockCount}</div>
        </div>

        <div
          onClick={() => setStockFilter(stockFilter === "out_of_stock" ? "all" : "out_of_stock")}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            stockFilter === "out_of_stock" ? "bg-rose-50 border-rose-500 shadow" : "bg-white border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-xs text-rose-700 font-semibold">স্টক আউট (Out of Stock)</div>
          <div className="text-2xl font-black text-rose-700 mt-1">{outOfStockCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="প্রোডাক্ট নাম বা আর্টিকেল/SKU দিয়ে খুঁজুন..."
            className="w-full sm:w-80 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
          <span className="text-xs text-slate-500">প্রদর্শিত: {filtered.length} টি পণ্য</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">Product Info</th>
                <th className="p-3">অর্ডার টাইপ</th>
                <th className="p-3">Price (অনক্লিক এডিট)</th>
                <th className="p-3">Stock (অনক্লিক এডিট)</th>
                <th className="p-3 text-center">এক্টিভ / ডিএক্টিভ</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => {
                const isEditing = editingId === p.id;
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0] || "/public/images/default-product.webp"}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                          <div className="font-mono text-[10px] text-indigo-700 font-semibold mt-0.5">
                            Article: {p.article}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                            <span>📦 অর্ডার: {p.totalOrders}</span>
                            <span>❤️ উইশলিস্ট: {p.totalWishlist}</span>
                            <span>👁️ ভিউ: {p.viewsCount}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 font-semibold text-slate-700">{p.orderTypes.join(", ")}</td>

                    <td className="p-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={e => setEditPrice(Number(e.target.value))}
                          className="w-24 p-1 bg-white border border-indigo-500 rounded text-xs font-bold"
                        />
                      ) : (
                        <div
                          onClick={() => {
                            setEditingId(p.id);
                            setEditPrice(p.prices.stockPrice || p.prices.mrp);
                            setEditStock(p.stock);
                          }}
                          className="cursor-pointer hover:text-indigo-600 font-bold"
                          title="ক্লিক করে এডিট করুন"
                        >
                          ৳{(p.prices.stockPrice || p.prices.mrp).toLocaleString()} ✏️
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={e => setEditStock(Number(e.target.value))}
                          className="w-16 p-1 bg-white border border-indigo-500 rounded text-xs font-bold"
                        />
                      ) : (
                        <div
                          onClick={() => {
                            setEditingId(p.id);
                            setEditPrice(p.prices.stockPrice || p.prices.mrp);
                            setEditStock(p.stock);
                          }}
                          className={`cursor-pointer font-bold ${p.stock > 0 ? "text-emerald-700" : "text-rose-600"}`}
                          title="ক্লিক করে এডিট করুন"
                        >
                          {p.stock} পিস ✏️
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggleActive(p.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          p.isActive
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-200 text-slate-600 border border-slate-300"
                        }`}
                      >
                        {p.isActive ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Inactive)"}
                      </button>
                    </td>

                    <td className="p-3 text-right">
                      {isEditing ? (
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => handleSaveInline(p.id)}
                            className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            সেভ
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-[10px]"
                          >
                            বাতিল
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              setDuplicatingProduct(p);
                              setNewArticleCode(p.article + "-COPY");
                              setDuplicateError(null);
                            }}
                            className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded hover:bg-indigo-100"
                          >
                            ডুপ্লিকেট
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-1 rounded hover:bg-rose-100"
                          >
                            মুছুন
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {duplicatingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-extrabold text-slate-900 text-sm mb-2">📋 প্রোডাক্ট ডুপ্লিকেট তৈরি করুন</h3>
            <p className="text-xs text-slate-500 mb-4">পুরো শপে একই আর্টিকেল একবারের বেশি ব্যবহার করা যাবে না। নতুন ও ইউনিক কোড দিন:</p>
            {duplicateError && (
              <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
                ⚠️ {duplicateError}
              </div>
            )}
            <div className="space-y-3 text-xs mb-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">মূল প্রোডাক্ট:</label>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-800 font-semibold">{duplicatingProduct.name}</div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">নতুন আর্টিকেল / SKU কোড *</label>
                <input
                  type="text"
                  value={newArticleCode}
                  onChange={e => setNewArticleCode(e.target.value)}
                  placeholder="যেমন: SN-A7M4-V2"
                  className="w-full p-2.5 border rounded-xl font-mono uppercase font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setDuplicatingProduct(null)}
                className="px-4 py-2 rounded-xl border font-bold text-slate-700"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmDuplicate}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold shadow"
              >
                ডুপ্লিকেট সম্পন্ন করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
