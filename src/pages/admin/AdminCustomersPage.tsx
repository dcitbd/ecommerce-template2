import React, { useState } from "react";
import { useCustomer } from "@/hooks/useCustomer";
import { RISK_BADGES } from "@/constants/customerRisk";
import { exportToCSV } from "@/utils/csvExporter";

export const AdminCustomersPage: React.FC = () => {
  const { customers } = useCustomer();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">👥 কাস্টমার লিস্ট (CRM &amp; Risk Rating)</h1>
          <p className="text-xs text-slate-500">কোন ডুপ্লিকেট নেই (ফোন নম্বর ভিত্তিক যাচাইকৃত গ্রাহক প্রোফাইল)</p>
        </div>
        <button
          onClick={() => exportToCSV("customers", filtered)}
          className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
        >
          📥 CSV এক্সপোর্ট
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="নাম বা মোবাইল দিয়ে গ্রাহক খুঁজুন..."
          className="p-2.5 bg-slate-50 border rounded-xl text-xs w-full sm:w-80"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b text-slate-600 font-bold">
              <tr>
                <th className="p-3">কাস্টমার নাম</th>
                <th className="p-3">মোবাইল</th>
                <th className="p-3">ঠিকানা</th>
                <th className="p-3 text-center">সাকসেস অর্ডার</th>
                <th className="p-3 text-center">ক্যানসেল অর্ডার</th>
                <th className="p-3 text-center">মোট অর্ডার</th>
                <th className="p-3 text-center">রেটিং (%)</th>
                <th className="p-3 text-center">রিস্ক স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => {
                const badge = RISK_BADGES[c.riskStatus] || { label: c.riskStatus, color: "bg-slate-100 text-slate-700" };
                return (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 font-mono font-bold text-indigo-700">{c.phone}</td>
                    <td className="p-3 truncate max-w-xs">{c.address || "N/A"}</td>
                    <td className="p-3 text-center font-bold text-emerald-600">{c.successOrdersCount}</td>
                    <td className="p-3 text-center font-bold text-rose-600">{c.cancelledOrdersCount}</td>
                    <td className="p-3 text-center font-bold">{c.totalOrdersCount}</td>
                    <td className="p-3 text-center font-black">{c.ratingPercentage}%</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
