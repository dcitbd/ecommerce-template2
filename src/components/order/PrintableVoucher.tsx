import React from "react";
import { Order } from "@/types/order";
import { generateBarcodeDataUrl } from "@/utils/barcodeGenerator";
import { printElement } from "@/utils/printHelper";
import { SITE_CONFIG } from "@/config/siteConfig";

export const PrintableVoucher: React.FC<{ order: Order }> = ({ order }) => {
  const voucherId = `voucher-${order.orderNumber}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => printElement(voucherId)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-2"
        >
          <span>🖨️</span> বাউচার প্রিন্ট / ডাউনলোড করুন
        </button>
      </div>

      {/* Printable Container */}
      <div
        id={voucherId}
        className="voucher-box bg-white border-2 border-slate-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden text-slate-900 shadow-md"
      >
        {/* Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
          <div className="text-center transform -rotate-25">
            <div className="text-7xl font-extrabold tracking-widest text-indigo-950">TECHNO WORLD BD</div>
            <div className="text-2xl font-bold uppercase mt-2">Official Authentic Order Voucher</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-800 pb-4 gap-4 relative z-10">
          <div>
            <div className="text-2xl font-black tracking-tight text-indigo-950">
              {SITE_CONFIG.name}
            </div>
            <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">
              {SITE_CONFIG.bengaliName} • {SITE_CONFIG.sources} Wholesale Import
            </div>
            <div className="text-xs text-slate-600 mt-1">
              📍 {SITE_CONFIG.address} | 📞 {SITE_CONFIG.phone}
            </div>
            <div className="text-xs text-slate-600">
              🌐 {SITE_CONFIG.domain}
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <img
              src={generateBarcodeDataUrl(order.orderNumber)}
              alt="Barcode"
              className="h-10 mb-1"
            />
            <div className="text-xs font-mono font-bold text-slate-800">
              অর্ডার নং: {order.orderNumber}
            </div>
            <div className="text-[11px] text-slate-500">
              তারিখ: {new Date(order.createdAt).toLocaleDateString("bn-BD")}
            </div>
          </div>
        </div>

        {/* Customer & Delivery Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs relative z-10">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
              কাস্টমার তথ্য:
            </span>
            <div className="font-bold text-sm text-slate-900">{order.customerName}</div>
            <div className="text-slate-700">মোবাইল: {order.customerPhone}</div>
            {order.customerEmail && <div className="text-slate-600">ইমেইল: {order.customerEmail}</div>}
            <div className="text-slate-700 mt-1">ঠিকানা: {order.deliveryAddress}</div>
          </div>

          <div className="sm:text-right">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
              ডেলিভারি ও পেমেন্ট তথ্য:
            </span>
            <div><span className="font-semibold">পদ্ধতি:</span> {order.deliveryMethod}</div>
            <div><span className="font-semibold">এরিয়া:</span> {order.deliveryArea}</div>
            <div><span className="font-semibold">পেমেন্ট মেথড:</span> {order.paymentMethod}</div>
            <div>
              <span className="font-semibold">স্ট্যাটাস:</span>{" "}
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{order.orderStatus}</span>
            </div>
            {order.courierTrackingCode && (
              <div className="mt-1 text-emerald-700 font-bold">
                কুরিয়ার ট্র্যাকিং: {order.courierName} ({order.courierTrackingCode})
              </div>
            )}
          </div>
        </div>

        {/* Product Items Table */}
        <div className="py-4 relative z-10">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
              <tr>
                <th className="p-2.5">নং</th>
                <th className="p-2.5">প্রোডাক্ট বিবরণ</th>
                <th className="p-2.5">আর্টিকেল</th>
                <th className="p-2.5">টাইপ</th>
                <th className="p-2.5 text-right">একক মূল্য</th>
                <th className="p-2.5 text-center">পরিমাণ</th>
                <th className="p-2.5 text-right">মোট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5">{idx + 1}</td>
                  <td className="p-2.5">
                    <div className="font-bold text-slate-900">{item.productName}</div>
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="text-[10px] text-slate-500">
                        {item.selectedColor && `রং: ${item.selectedColor} `}
                        {item.selectedSize && `• সাইজ: ${item.selectedSize}`}
                      </div>
                    )}
                  </td>
                  <td className="p-2.5 font-mono">{item.article}</td>
                  <td className="p-2.5 font-medium text-indigo-700">{item.orderType}</td>
                  <td className="p-2.5 text-right">৳{item.unitPrice.toLocaleString()}</td>
                  <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">৳{item.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="flex justify-end text-xs pt-2 pb-4 border-b border-slate-200 relative z-10">
          <div className="w-64 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>সাবটোটাল:</span>
              <span className="font-bold">৳{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডেলিভারি চার্জ (ওজন: {order.totalWeightKg || 1}kg):</span>
              <span className="font-bold">৳{order.deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-2 border-t border-slate-300">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="text-indigo-600">৳{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Terms & Footer Note */}
        <div className="pt-4 text-[11px] text-slate-500 leading-relaxed flex flex-col sm:flex-row justify-between items-end gap-4 relative z-10">
          <div>
            <p className="font-bold text-slate-700 mb-0.5">শর্তাবলী ও ওয়ারেন্টি নীতি:</p>
            <p>১. পণ্য হস্তান্তরের পর ২ সপ্তাহের (১৪ দিন) রিপ্লেসমেন্ট ওয়ারেন্টি প্রযোজ্য।</p>
            <p>২. প্রি-অর্ডার পণ্যের ডেলিভারি সময় সাধারণত ১০-১৫ কার্যদিবস।</p>
            <p>৩. বাউচারটি সংরক্ষণ করুন এবং ডেলিভারিম্যানের সামনে পণ্য চেক করে গ্রহণ করুন।</p>
          </div>
          <div className="text-center border-t border-slate-400 pt-2 px-6">
            <div className="font-bold text-slate-800 text-xs">টেকনো ওয়ার্ল্ড বিডি</div>
            <div className="text-[10px]">অনুমোদিত স্বাক্ষর ও সিল</div>
          </div>
        </div>
      </div>
    </div>
  );
};
