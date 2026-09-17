import React, { useState } from "react";
import { getIncompleteOrders, saveIncompleteOrders } from "@/services/incompleteOrderService";
import { addOrder } from "@/services/orderService";
import { IncompleteOrder } from "@/types/order";

export const AdminIncompleteOrdersPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const [list, setList] = useState<IncompleteOrder[]>(getIncompleteOrders());

  const handleSendToOrderList = (item: IncompleteOrder) => {
    addOrder({
      customerName: item.customerName,
      customerPhone: item.customerPhone,
      customerEmail: item.customerEmail,
      deliveryAddress: item.deliveryAddress || "Not specified",
      deliveryMethod: "Home delivery",
      deliveryArea: "Inside Dhaka",
      deliveryCharge: 90,
      totalWeightKg: 0.5,
      items: item.items,
      subtotal: item.totalAmount - 90,
      totalAmount: item.totalAmount,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Unpaid",
      orderStatus: "Pending",
      orderType: item.items[0]?.orderType || "Stock",
      notes: "Recovered from Incomplete Order"
    });

    const updated = list.filter(o => o.id !== item.id);
    setList(updated);
    saveIncompleteOrders(updated);
    alert("ইনকমপ্লিট অর্ডারটি সফলভাবে মূল অর্ডার লিস্টে পাঠানো হয়েছে!");
  };

  const handleDelete = (id: string) => {
    const updated = list.filter(o => o.id !== id);
    setList(updated);
    saveIncompleteOrders(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">⏳ ইনকমপ্লিট অর্ডারসমূহ (Abandoned Checkouts)</h1>
          <p className="text-xs text-slate-500">যেসব গ্রাহক চেকআউট ফর্ম পূরণ করে সাবমিট না করে চলে গেছেন</p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          মোট {list.length} টি ড্রপ-অফ
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-600 font-bold">
            <tr>
              <th className="p-3">কাস্টমার</th>
              <th className="p-3">মোবাইল</th>
              <th className="p-3">প্রোডাক্ট</th>
              <th className="p-3">পরিত্যাগের ধাপ</th>
              <th className="p-3 text-right">মূল্য</th>
              <th className="p-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{item.customerName}</td>
                <td className="p-3 font-mono text-indigo-700 font-semibold">{item.customerPhone}</td>
                <td className="p-3">{item.items[0]?.productName}</td>
                <td className="p-3 text-amber-700 font-semibold">{item.stepAbandoned}</td>
                <td className="p-3 text-right font-bold">৳{item.totalAmount.toLocaleString()}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleSendToOrderList(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow"
                    >
                      সেন্ড ইন অর্ডার লিষ্ট
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-rose-600 text-xs px-2 py-1 hover:bg-rose-50 rounded"
                    >
                      মুছুন
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
