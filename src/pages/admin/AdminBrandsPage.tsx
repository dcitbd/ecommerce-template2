import React, { useState } from "react";
import { useBrands } from "@/hooks/useBrands";
import { saveBrands } from "@/services/brandService";
import { Brand } from "@/types/brand";

export const AdminBrandsPage: React.FC = () => {
  const { brands } = useBrands();
  const [list, setList] = useState<Brand[]>(brands);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Japan");

  const handleAddBrand = () => {
    if (!name.trim()) return;
    const b: Brand = {
      id: "b-" + Date.now(),
      name: name.trim(),
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      logo: "/public/images/default-brand.webp",
      originCountry: country,
      productCount: 0
    };
    const updated = [b, ...list];
    setList(updated);
    saveBrands(updated);
    setName("");
  };

  const handleDelete = (id: string) => {
    const updated = list.filter(b => b.id !== id);
    setList(updated);
    saveBrands(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">🏷️ ব্র্যান্ড ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">ক্যামেরা ও এক্সেসরিজ ব্র্যান্ড তালিকা</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="ব্র্যান্ডের নাম..."
            className="p-2 bg-slate-50 border rounded-xl text-xs"
          />
          <button
            onClick={handleAddBrand}
            className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            + ব্র্যান্ড যোগ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {list.map(b => (
          <div key={b.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center relative">
            <button
              onClick={() => handleDelete(b.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 text-xs"
            >
              ✕
            </button>
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-800 text-sm mb-2 shadow-inner">
              {b.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="font-bold text-xs text-slate-900">{b.name}</h3>
            <span className="text-[10px] text-slate-500">{b.originCountry}</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full mt-2">
              {b.productCount} টি পণ্য
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
