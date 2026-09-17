import React from "react";
import { SITE_CONFIG } from "@/config/siteConfig";

export const Footer: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-16 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg">
              TW
            </div>
            <div>
              <div className="font-bold text-white text-base leading-none">
                {SITE_CONFIG.name}
              </div>
              <div className="text-[10px] text-amber-400 font-bold uppercase mt-0.5">
                {SITE_CONFIG.bengaliName}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            আমরা বাজারে সেরা মূল্যে ডিজিটাল ক্যামেরা, লেন্স এবং ভিডিওগ্রাফি গ্যাজেট সরবরাহকারী। পাইকারি ও প্রি-অর্ডার স্পেশালিস্ট।
          </p>
          <div className="text-xs space-y-1.5 text-slate-300">
            <div>📍 ঠিকানা: {SITE_CONFIG.address}</div>
            <div>📞 মোবাইল: <a href={`tel:${SITE_CONFIG.phone}`} className="text-amber-400 font-bold">{SITE_CONFIG.phone}</a></div>
            <div>✉️ ই-মেইল: {SITE_CONFIG.email}</div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
            গুরুত্বপূর্ণ পেইজসমূহ
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => navigate("")} className="hover:text-amber-400 transition-colors">হোম পেইজ</button></li>
            <li><button onClick={() => navigate("products")} className="hover:text-amber-400 transition-colors">সকল প্রোডাক্ট</button></li>
            <li><button onClick={() => navigate("products?orderType=Pre-Order")} className="hover:text-amber-400 transition-colors">প্রি-অর্ডার ডিলস</button></li>
            <li><button onClick={() => navigate("products?orderType=WholeSale")} className="hover:text-amber-400 transition-colors">হোলসেল পলিসি</button></li>
            <li><button onClick={() => navigate("track")} className="hover:text-amber-400 transition-colors">অর্ডার ট্র্যাকিং</button></li>
            <li><button onClick={() => navigate("login")} className="hover:text-amber-400 transition-colors">কাস্টমার পোর্টাল</button></li>
          </ul>
        </div>

        {/* Payment & Security */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
            পেমেন্ট ও ডেলিভারি পলিসি
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            সহজ ও নিরাপদ পেমেন্ট মাধ্যম: bKash, Nagad, Rocket, ক্যাশ অন ডেলিভারি, ব্যাংক ট্রান্সফার এবং ডলার (USD/USDT)।
          </p>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="text-emerald-400 font-semibold">✓ ১০০% সিকিউর ট্রানজেকশন</div>
            <div className="text-slate-400">✓ কুরিয়ার চেক ও ফ্রড ভেরিফিকেশন</div>
            <div className="text-slate-400">✓ ইন-অফিস কালেকশন (চার্জ ফ্রি)</div>
          </div>
        </div>

        {/* Support Channels */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            যোগাযোগ ও অর্ডার চ্যানেল
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            যেকোনো সহায়তায় সরাসরি হোয়াটসঅ্যাপ বা টেলিগ্রামে নক করুন:
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/8801351009358"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold p-2.5 rounded-xl transition-all"
            >
              <span>💬</span> WhatsApp: +880 1351-009358
            </a>
            <a
              href={SITE_CONFIG.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-bold p-2.5 rounded-xl transition-all"
            >
              <span>📢</span> Telegram: @technoworldbd1
            </a>
          </div>
        </div>
      </div>

      {/* Developer Credits Section */}
      <div className="border-t border-slate-900 pt-6 mt-6 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
        <div>
          © {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত — <span className="text-slate-300 font-bold">টেকনো ওয়ার্ল্ড বিডি (Techno World BD)</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs flex flex-wrap items-center justify-center gap-1.5">
          <span>কারিগরি সহযোগিতা বা ডেভেলপার:</span>
          <a
            href={SITE_CONFIG.developer.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-bold hover:underline"
          >
            {SITE_CONFIG.developer.name}
          </a>
          <span>|</span>
          <span>{SITE_CONFIG.developer.role},</span>
          <a
            href={SITE_CONFIG.developer.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 font-bold hover:underline"
          >
            Dream Career IT BD
          </a>
        </div>
      </div>
    </footer>
  );
};
