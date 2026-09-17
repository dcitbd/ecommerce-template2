import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { useCustomer } from "@/hooks/useCustomer";

export const AdminDashboardPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { customers } = useCustomer();

  const totalSales = orders.filter(o => o.orderStatus !== "Cancelled").reduce((s, o) => s + o.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === "Pending");
  const confirmedOrders = orders.filter(o => o.orderStatus === "Confirmed");
  const deliveredOrders = orders.filter(o => o.orderStatus === "Delivered");
  const wholesaleOrders = orders.filter(o => o.orderType === "WholeSale");

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900">
            📊 টেকনো ওয়ার্ল্ড বিডি — সেন্ট্রাল অ্যাডমিন ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            দুবাই, হংকং, রাশিয়া প্রি-অর্ডার ও শপ ইনভেন্টরি পারফরম্যান্স
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("admin/add-product")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-all"
          >
            + প্রোডাক্ট যোগ করুন
          </button>
          <button
            onClick={() => navigate("admin/orders")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200"
          >
            অর্ডার তালিকা
          </button>
        </div>
      </div>

      {/* Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">মোট বিক্রয় রেভিনিউ</span>
            <span className="text-lg">💰</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ৳{totalSales.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            সক্রিয় অর্ডার থেকে অর্জিত
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">মোট অর্ডার</span>
            <span className="text-lg">📦</span>
          </div>
          <div className="text-2xl font-black text-indigo-700">
            {orders.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            পেন্ডিং: {pendingOrders.length} | ডেলিভার্ড: {deliveredOrders.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">লাইভ প্রোডাক্ট ক্যাটালগ</span>
            <span className="text-lg">📷</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {products.length}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            ইন স্টক: {products.filter(p => p.stock > 0).length} টি
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">নিবন্ধিত কাস্টমার (CRM)</span>
            <span className="text-lg">👥</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {customers.length}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            হোলসেলার: {wholesaleOrders.length} জন সক্রিয়
          </div>
        </div>
      </div>

      {/* Analytics & Progress Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Orders by Status Breakdown */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b flex items-center justify-between">
            <span>📈 অর্ডার স্ট্যাটাস ব্রেকডাউন ও অ্যানালিটিক্স</span>
            <span className="text-xs text-indigo-600 font-normal">রিয়েল-টাইম সিঙ্ক</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>পেন্ডিং (Pending Processing)</span>
                <span className="font-bold">{pendingOrders.length} টি</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(pendingOrders.length / (orders.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>কনফার্মড ও কুরিয়ারে প্রেরণ (Confirmed / Sent)</span>
                <span className="font-bold">{confirmedOrders.length} টি</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full"
                  style={{ width: `${(confirmedOrders.length / (orders.length || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>সফল ডেলিভারি (Delivered)</span>
                <span className="font-bold">{deliveredOrders.length} টি</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(deliveredOrders.length / (orders.length || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Order Tracker */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b">
            🔍 দ্রুত অর্ডার ও ফ্রড ভেরিফিকেশন
          </h3>
          <p className="text-xs text-slate-500">
            অর্ডার ট্র্যাকিং বা কুরিয়ার হিস্ট্রি যাচাই করতে ফোন নম্বর দিন:
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="017xxxxxxxx"
              id="dash-fraud-input"
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <button
              onClick={() => {
                const inp = (document.getElementById("dash-fraud-input") as HTMLInputElement)?.value;
                if (inp) navigate(`admin/fraud?phone=${inp}`);
              }}
              className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
            >
              ফ্রড চেক
            </button>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold">⚡ ইন্টিগ্রেশন স্ট্যাটাস:</div>
            <div>• Steadfast &amp; Pathao API সক্রিয়</div>
            <div>• বিকাশ ও নগদ অটো-পেমেন্ট গেটওয়ে রেডি</div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="text-sm font-extrabold text-slate-900">
            🕒 সাম্প্রতিক অর্ডারসমূহ (Recent Orders)
          </h3>
          <button
            onClick={() => navigate("admin/orders")}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            সব অর্ডার দেখুন →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">অর্ডার নং</th>
                <th className="p-3">গ্রাহকের নাম ও ফোন</th>
                <th className="p-3">প্রোডাক্ট</th>
                <th className="p-3">টাইপ</th>
                <th className="p-3 text-right">মূল্য</th>
                <th className="p-3 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-indigo-700">{o.orderNumber}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{o.customerName}</div>
                    <div className="text-slate-500 font-mono text-[10px]">{o.customerPhone}</div>
                  </td>
                  <td className="p-3 truncate max-w-xs">{o.items[0]?.productName}</td>
                  <td className="p-3 font-semibold text-indigo-600">{o.orderType}</td>
                  <td className="p-3 text-right font-black">৳{o.totalAmount.toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border">
                      {o.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
