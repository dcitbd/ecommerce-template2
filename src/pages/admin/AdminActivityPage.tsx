import React from "react";
import { getActivityLogs } from "@/services/activityService";

export const AdminActivityPage: React.FC = () => {
  const logs = getActivityLogs();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">📜 এক্টিভ হিস্ট্রি ও অডিট লগ</h1>
        <p className="text-xs text-slate-500">
          কে কখন লগইন করছে ও কি কাজ করছে তার অপরিবর্তনীয় রেকর্ড (শুধুমাত্র দেখার জন্য, কোনো এডিট/ডিলিট নয়)
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b font-bold text-slate-700">
            <tr>
              <th className="p-3">সময় ও তারিখ</th>
              <th className="p-3">ব্যবহারকারী</th>
              <th className="p-3">রোল</th>
              <th className="p-3">অ্যাকশন</th>
              <th className="p-3">কার্যবিবরণী</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-3 text-slate-500 whitespace-nowrap">{new Date(log.createdAt).toLocaleString("bn-BD")}</td>
                <td className="p-3 font-bold text-slate-900">{log.userName}</td>
                <td className="p-3 font-semibold text-indigo-700">{log.userRole}</td>
                <td className="p-3 font-bold">{log.action}</td>
                <td className="p-3 text-slate-600">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
