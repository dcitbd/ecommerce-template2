import React from "react";
import { SITE_CONFIG } from "@/config/siteConfig";

export const SocialMarketplaceSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="max-w-2xl mb-8">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            সকল প্ল্যাটফর্মে আমরা সক্রিয়
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold mt-3">
            আমাদের অফিসিয়াল স্টোর ও সোশ্যাল চ্যানেলসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            দারাজ, বিক্রয় ডট কম, ফেসবুক মার্কেটপ্লেস ছাড়াও আমাদের প্রতিটি অফিশিয়াল চ্যানেলে যুক্ত থাকুন সর্বশেষ প্রাইস আপডেটের জন্য।
          </p>
        </div>

        {/* Marketplace Links Grid */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            মার্কেটপ্লেস স্টোরসমূহ:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {SITE_CONFIG.marketplaces.map(mp => (
              <a
                key={mp.platform}
                href={mp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/15 p-2.5 rounded-xl text-center text-xs font-bold transition-all hover:scale-105"
              >
                <div className="text-sm mb-1">🛒</div>
                <div className="truncate">{mp.platform}</div>
                <div className="text-[9px] text-emerald-400 font-normal">Active Store</div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Channels */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
            কমিউনিটি ও ডাইরেক্ট আপডেট:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SITE_CONFIG.socialLinks.map(soc => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all"
              >
                <span>🔗</span>
                <div className="truncate">
                  <div>{soc.platform}</div>
                  <div className="text-[9px] text-slate-300 font-normal truncate">{soc.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
