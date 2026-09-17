import React, { useState } from "react";
import { getColors, saveColors } from "@/services/colorService";
import { ColorItem } from "@/types/color";

export const AdminColorsPage: React.FC = () => {
  const [colors, setColors] = useState<ColorItem[]>(getColors());
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#000000");

  const handleAdd = () => {
    if (!name.trim()) return;
    const updated = [...colors, { id: "c-" + Date.now(), name, hexCode: hex, productCount: 0 }];
    setColors(updated);
    saveColors(updated);
    setName("");
  };

  const handleDelete = (id: string) => {
    const updated = colors.filter(c => c.id !== id);
    setColors(updated);
    saveColors(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">🎨 কালার ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">প্রোডাক্ট ভ্যারিয়েন্ট কালার কনফিগারেশন</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="রঙের নাম (যেমন: Titanium)"
            className="p-2 border rounded-xl text-xs"
          />
          <input
            type="color"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="w-9 h-9 p-0 border rounded-xl cursor-pointer"
          />
          <button onClick={handleAdd} className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
            যোগ করুন
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border shadow-inner" style={{ backgroundColor: c.hexCode }} />
              <div>
                <div className="font-bold text-xs text-slate-900">{c.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{c.hexCode}</div>
              </div>
            </div>
            <button onClick={() => handleDelete(c.id)} className="text-rose-500 text-xs">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};
