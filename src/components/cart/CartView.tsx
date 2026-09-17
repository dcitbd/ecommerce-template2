import React from "react";
import { useCart } from "@/hooks/useCart";

export const CartView: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>🛒</span> আপনার শপিং কার্ট
          </h1>
          <p className="text-xs text-slate-500">নির্বাচিত প্রোডাক্টসমূহ পর্যালোচনা করুন</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            সব খালি করুন
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-5xl mb-3">🛒</div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">আপনার কার্ট বর্তমানে খালি!</h2>
          <p className="text-xs text-slate-500 mb-6">আমাদের আকর্ষণীয় ক্যামেরা ও লেন্সের কালেকশন দেখুন।</p>
          <button
            onClick={() => navigate("products")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow"
          >
            প্রোডাক্ট ব্রাউজ করুন →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm divide-y divide-slate-100">
            {items.map(item => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono text-[10px]">{item.article}</span>
                      <span className="text-indigo-600 font-semibold">{item.orderType}</span>
                      {item.selectedColor && <span>রং: {item.selectedColor}</span>}
                      {item.selectedSize && <span>সাইজ: {item.selectedSize}</span>}
                    </div>
                    <div className="text-xs font-bold text-emerald-600 mt-1">
                      ৳{item.unitPrice.toLocaleString()} / পিস
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900">
                      ৳{(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-rose-500 hover:underline"
                    >
                      রিমুভ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              অর্ডার সামারি
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>মোট আইটেম:</span>
                <span className="font-bold">{items.reduce((s, i) => s + i.quantity, 0)} পিস</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>সাবটোটাল:</span>
                <span className="text-indigo-600">৳{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("checkout")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all text-center block"
            >
              চেকআউটে এগিয়ে যান →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
