import React, { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { PrintableVoucher } from "@/components/order/PrintableVoucher";
import { Order } from "@/types/order";

export const OrderTrackingView: React.FC<{ navigate: (route: string) => void }> = () => {
  const { orders } = useOrders();
  const [searchInput, setSearchInput] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const clean = searchInput.trim().toLowerCase();
    const found = orders.find(
      o => o.orderNumber.toLowerCase() === clean || o.customerPhone.includes(clean)
    );
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps = ["Pending", "Confirmed", "Sent", "IN-Courier", "Delivered"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center max-w-lg mx-auto mb-8">
        <span className="text-2xl mb-2 block">📍</span>
        <h1 className="text-2xl font-black text-slate-900">আপনার অর্ডার ট্র্যাক করুন</h1>
        <p className="text-xs text-slate-500 mt-1">
          অর্ডার নম্বর (যেমন: TWBD-260915-8821) বা মোবাইল নম্বর দিয়ে বর্তমান অবস্থা জানুন
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="অর্ডার নম্বর বা ১১ ডিজিটের ফোন নম্বর দিন..."
            className="flex-1 p-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow transition-all"
          >
            ট্র্যাক করুন →
          </button>
        </div>
      </form>

      {/* Tracking Result */}
      {hasSearched && (
        <div>
          {!searchedOrder ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
              ⚠️ কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার নম্বর অথবা ফোন নম্বর দিয়েছেন কিনা যাচাই করুন।
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Pipeline */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div>
                    <span className="text-xs text-slate-400">অর্ডার নম্বর:</span>
                    <h3 className="text-base font-black text-indigo-700 font-mono">
                      {searchedOrder.orderNumber}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">বর্তমান স্ট্যাটাস:</span>
                    <div className="text-sm font-extrabold text-emerald-600">
                      {searchedOrder.orderStatus}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                  {steps.map((step, idx) => {
                    const currentIdx = steps.indexOf(searchedOrder.orderStatus);
                    const isDone = currentIdx >= idx;
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 font-bold ${
                          isDone ? "bg-indigo-600 text-white shadow" : "bg-slate-100 text-slate-400"
                        }`}>
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <span className={isDone ? "text-indigo-900" : "text-slate-400"}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Voucher View & Print */}
              <PrintableVoucher order={searchedOrder} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
