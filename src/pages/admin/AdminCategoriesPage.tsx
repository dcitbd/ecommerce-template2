import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { saveCategories } from "@/services/categoryService";
import { Category } from "@/types/category";

export const AdminCategoriesPage: React.FC = () => {
  const { categories } = useCategories();
  const [list, setList] = useState<Category[]>(categories);
  const [newCatName, setNewCatName] = useState("");
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState("");

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const item: Category = {
      id: "cat-" + Date.now(),
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      productCount: 0,
      subCategories: []
    };
    const updated = [...list, item];
    setList(updated);
    saveCategories(updated);
    setNewCatName("");
  };

  const handleAddSubCategory = (catId: string) => {
    if (!newSubName.trim()) return;
    const updated = list.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          subCategories: [
            ...c.subCategories,
            {
              id: "sub-" + Date.now(),
              name: newSubName.trim(),
              slug: newSubName.toLowerCase().replace(/\s+/g, "-"),
              categoryId: catId,
              productCount: 0,
              children: []
            }
          ]
        };
      }
      return c;
    });
    setList(updated);
    saveCategories(updated);
    setNewSubName("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">🗂️ ক্যাটাগরি ট্রি ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">ক্যাটাগরি &gt; সাব-ক্যাটাগরি &gt; চাইল্ড ক্যাটাগরি স্ট্রাকচার</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
            placeholder="নতুন মূল ক্যাটাগরি..."
            className="p-2 bg-slate-50 border rounded-xl text-xs"
          />
          <button
            onClick={handleAddCategory}
            className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            + ক্যাটাগরি যোগ করুন
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        {list.map(cat => (
          <div key={cat.id} className="border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">📂 {cat.name}</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                  {cat.subCategories.length} সাব-ক্যাটাগরি
                </span>
              </div>
              <button
                onClick={() => setSelectedCatId(selectedCatId === cat.id ? null : cat.id)}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                {selectedCatId === cat.id ? "বন্ধ করুন" : "+ সাব-ক্যাটাগরি যোগ"}
              </button>
            </div>

            {selectedCatId === cat.id && (
              <div className="flex gap-2 pt-2 border-t">
                <input
                  type="text"
                  value={newSubName}
                  onChange={e => setNewSubName(e.target.value)}
                  placeholder="সাব-ক্যাটাগরির নাম..."
                  className="p-2 border rounded-xl text-xs flex-1"
                />
                <button
                  onClick={() => handleAddSubCategory(cat.id)}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  যোগ করুন
                </button>
              </div>
            )}

            {cat.subCategories.length > 0 && (
              <div className="pl-4 border-l-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                {cat.subCategories.map(sub => (
                  <div key={sub.id} className="p-2.5 bg-slate-50 rounded-xl border text-xs">
                    <div className="font-bold text-slate-800">• {sub.name}</div>
                    <div className="text-[10px] text-slate-400">পণ্য: {sub.productCount} টি</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
