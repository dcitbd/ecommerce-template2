import React, { useState } from "react";
import { getBanners, saveBanners, BannerItem } from "@/services/bannerService";

export const AdminBannersPage: React.FC = () => {
  const [banners, setBanners] = useState<BannerItem[]>(getBanners());

  const moveBanner = (index: number, direction: "up" | "down") => {
    const next = [...banners];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setBanners(next);
    saveBanners(next);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">🖼️ ব্যানার স্লাইডার ম্যানেজমেন্ট</h1>
        <p className="text-xs text-slate-500">হোম পেজের ৮টি/১০টি স্লাইডিং ব্যানার পরিচালনা ও ক্রম নির্ধারণ</p>
      </div>

      <div className="space-y-3">
        {banners.map((b, idx) => (
          <div key={b.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={b.image} alt="" className="w-24 h-14 rounded-xl object-cover border" />
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">{b.badge}</span>
                <h3 className="font-bold text-xs text-slate-900 mt-1">{b.title}</h3>
                <p className="text-[11px] text-slate-500 truncate max-w-md">{b.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={idx === 0}
                onClick={() => moveBanner(idx, "up")}
                className="p-1.5 bg-slate-100 rounded-lg text-xs disabled:opacity-30"
              >
                ▲ উপরে
              </button>
              <button
                disabled={idx === banners.length - 1}
                onClick={() => moveBanner(idx, "down")}
                className="p-1.5 bg-slate-100 rounded-lg text-xs disabled:opacity-30"
              >
                ▼ নিচে
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
