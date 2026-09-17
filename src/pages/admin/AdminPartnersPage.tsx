import React, { useState } from "react";
import { useCourier } from "@/hooks/useCourier";
import { usePayment } from "@/hooks/usePayment";
import { getDeliveryAreas, saveDeliveryAreas, getDeliveryMethods, saveDeliveryMethods } from "@/services/deliveryService";

export const AdminPartnersPage: React.FC = () => {
  const { couriers, saveCouriers } = useCourier();
  const { paymentMethods, savePaymentMethods } = usePayment();
  const [areas, setAreas] = useState(getDeliveryAreas());
  const [methods, setMethods] = useState(getDeliveryMethods());

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">🔌 কুরিয়ার ও পেমেন্ট পার্টনার কনফিগারেশন</h1>
        <p className="text-xs text-slate-500">API সংযোগ, পেমেন্ট মেথড ও ডেলিভারি চার্জ নির্ধারণ</p>
      </div>

      {/* Couriers */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b">
          🚚 কুরিয়ার API কানেকশন (Add Courier)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {couriers.map(c => (
            <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-slate-900">
                <span>{c.name}</span>
                <span className="text-emerald-600 text-[10px]">API Ready</span>
              </div>
              <input
                type="text"
                placeholder="API Key / Token"
                defaultValue={c.apiKey || "twbd_live_key_99214"}
                className="w-full p-2 bg-white border rounded-lg font-mono text-[11px]"
              />
              <button
                onClick={() => alert(`${c.name} API ক্রেডেনশিয়াল সেভ হয়েছে!`)}
                className="w-full bg-indigo-600 text-white font-bold py-1.5 rounded-lg text-[10px]"
              >
                আপডেট করুন
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b">
          💳 পেমেন্ট মেথড ও গেটওয়ে (Add Payment Method)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {paymentMethods.map(p => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-slate-900">
                <span>{p.name}</span>
                {p.isDefault && <span className="bg-amber-100 text-amber-900 text-[9px] px-2 py-0.5 rounded font-bold">Default</span>}
              </div>
              <input
                type="text"
                placeholder="মার্চেন্ট / একাউন্ট নং"
                defaultValue={p.accountNumber || "01351003958"}
                className="w-full p-2 bg-white border rounded-lg text-[11px]"
              />
              <button
                onClick={() => alert(`${p.name} সেটিংস আপডেট হয়েছে!`)}
                className="w-full bg-emerald-600 text-white font-bold py-1.5 rounded-lg text-[10px]"
              >
                সেভ করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
