import React, { useState } from "react";
import { getReturnOrders, saveReturnOrders } from "@/services/returnOrderService";
import { ReturnOrder } from "@/types/order";

export const AdminReturnsPage: React.FC = () => {
  const [returns, setReturns] = useState<ReturnOrder[]>(getReturnOrders());

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">🔄 রিটার্ন ও রিফান্ড অর্ডার</h1>
          <p className="text-xs text-slate-500">গ্রাহকদের রিটার্ন আবেদন ও রিফান্ড ম্যানেজমেন্ট</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-600 font-bold">
            <tr>
              <th className="p-3">অর্ডার নং</th>
              <th className="p-3">গ্রাহকের নাম ও ফোন</th>
              <th className="p-3">প্রোডাক্ট</th>
              <th className="p-3">রিটার্নের কারণ</th>
              <th className="p-3 text-right">রিফান্ড পরিমাণ</th>
              <th className="p-3 text-center">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {returns.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-indigo-700">{r.orderNumber}</td>
                <td className="p-3">
                  <div className="font-bold text-slate-800">{r.customerName}</div>
                  <div className="text-slate-500 font-mono text-[10px]">{r.customerPhone}</div>
                </td>
                <td className="p-3">{r.productName}</td>
                <td className="p-3 text-slate-600 italic">"{r.returnReason}"</td>
                <td className="p-3 text-right font-bold text-slate-900">৳{r.refundAmount.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {r.returnStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
