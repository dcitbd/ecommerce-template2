import React, { useState } from "react";
import { useFraud } from "@/hooks/useFraud";
import { getFraudBadgeColor } from "@/api/fraud/fraudScore";

export const AdminFraudPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const { loading, report, checkFraud } = useFraud();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    checkFraud(phone);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">🛡️ ফ্রড চেক সেন্টার (Courier Fraud Detection)</h1>
        <p className="text-xs text-slate-500">
          বাংলাদেশের সকল শীর্ষ কুরিয়ার সার্ভিসের পার্সেল ডেলিভারি ও রিটার্ন হিস্ট্রি অনুসন্ধান
        </p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01711223344)..."
          className="flex-1 p-3 bg-white border border-slate-200 rounded-2xl text-xs font-mono font-bold shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow"
        >
          {loading ? "যাচাই হচ্ছে..." : "অনুসন্ধান করুন"}
        </button>
      </form>

      {report && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b">
            <div>
              <div className="text-xs text-slate-500">অনুসন্ধানকৃত নম্বর:</div>
              <div className="text-base font-black font-mono text-slate-900">{report.phone}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-black border ${getFraudBadgeColor(report.riskRating)}`}>
              {report.riskRating}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border">
              <div className="text-[11px] text-slate-500">মোট পার্সেল</div>
              <div className="text-xl font-black text-slate-900">{report.totalParcels}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-[11px] text-emerald-700">সফল ডেলিভারি</div>
              <div className="text-xl font-black text-emerald-700">{report.deliveredParcels}</div>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <div className="text-[11px] text-rose-700">রিটার্ন / ক্যান্সেল</div>
              <div className="text-xl font-black text-rose-700">{report.returnedParcels}</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">কুরিয়ার ভিত্তিক বিস্তারিত:</h4>
            <div className="divide-y text-xs border rounded-xl overflow-hidden">
              {report.courierReports.map(c => (
                <div key={c.courier} className="p-2.5 flex justify-between bg-slate-50">
                  <span className="font-bold">{c.courier}</span>
                  <span className="text-emerald-700 font-semibold">ডেলিভার্ড: {c.delivered} টি</span>
                  <span className="text-rose-600 font-semibold">রিটার্ন: {c.returned} টি</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
