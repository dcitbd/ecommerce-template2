import React, { useState } from "react";
import { getSizes, saveSizes } from "@/services/sizeService";
import { SizeKitItem } from "@/types/size";

export const AdminSizesPage: React.FC = () => {
  const [sizes, setSizes] = useState<SizeKitItem[]>(getSizes());
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    const updated = [...sizes, { id: "sz-" + Date.now(), name, productCount: 0 }];
    setSizes(updated);
    saveSizes(updated);
    setName("");
  };

  const handleDelete = (id: string) => {
    const updated = sizes.filter(s => s.id !== id);
    setSizes(updated);
    saveSizes(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">📏 সাইজ / কিট ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">বডি অনলি, লেন্স কিট, কম্বো প্যাক কনফিগারেশন</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="সাইজ বা কিটের নাম..."
            className="p-2 border rounded-xl text-xs"
          />
          <button onClick={handleAdd} className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
            যোগ করুন
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sizes.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-slate-900">{s.name}</div>
              <div className="text-[10px] text-slate-400">ব্যবহার: {s.productCount} টি</div>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-rose-500 text-xs">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};
