import React from "react";
import { SITE_CONFIG } from "@/config/siteConfig";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
          <span className="bg-indigo-600 text-white font-semibold px-2 py-0.5 rounded text-[10px]">
            DUBAI PRE-ORDER
          </span>
          <span>✅ সোর্স: {SITE_CONFIG.sources}</span>
          <span className="text-slate-500">|</span>
          <span>⚡ {SITE_CONFIG.deliveryDuration}</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 font-medium">🛡️ {SITE_CONFIG.warrantyText}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a
            href={SITE_CONFIG.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
          >
            📢 টেলিগ্রাম প্রাইস চ্যানেল
          </a>
          <a
            href={SITE_CONFIG.whatsappChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
          >
            💬 হোয়াটসঅ্যাপ চ্যানেল
          </a>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="text-white font-bold tracking-wider hover:text-indigo-400"
          >
            📞 {SITE_CONFIG.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
