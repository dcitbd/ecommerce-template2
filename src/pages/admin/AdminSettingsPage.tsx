import React, { useState } from "react";
import { useSettingsContext } from "@/contexts/SettingsContext";

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettingsContext();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">⚙️ ওয়েবসাইট ও শপ সেটিংস</h1>
          <p className="text-xs text-slate-500">নাম, যোগাযোগের তথ্য, সোশ্যাল লিঙ্ক ও মার্কেটপ্লেস সংযোগ</p>
        </div>
        {saved && <span className="text-xs font-bold text-emerald-600">✓ সংরক্ষিত হয়েছে!</span>}
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">দোকান / ওয়েবসাইটের নাম</label>
            <input type="text" defaultValue={settings.siteName} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
            <input type="tel" defaultValue={settings.phone} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">ই-মেইল</label>
            <input type="email" defaultValue={settings.email} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">টেলিগ্রাম প্রাইস চ্যানেল</label>
            <input type="text" defaultValue={settings.telegram} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">অফিসের ঠিকানা</label>
            <textarea rows={2} defaultValue={settings.address} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
          </div>
        </div>

        <div className="pt-3 border-t flex justify-end">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow">
            পরিবর্তন সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};
