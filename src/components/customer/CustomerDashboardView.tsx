import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { PrintableVoucher } from "@/components/order/PrintableVoucher";
import { Order, OrderStatus } from "@/types/order";

export const CustomerDashboardView: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { user, logout } = useAuth();
  const { orders, refreshOrders } = useOrders();
  const { count: wishlistCount } = useWishlist();
  const { itemCount: cartCount } = useCart();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "settings">("overview");
  const [selectedOrderForVoucher, setSelectedOrderForVoucher] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter orders belonging to this customer
  const myOrders = orders.filter(
    o => o.customerPhone === user?.phone || o.customerId === user?.id
  );

  const pendingCount = myOrders.filter(o => o.orderStatus === "Pending").length;
  const successCount = myOrders.filter(o => o.orderStatus === "Delivered").length;
  const cancelledCount = myOrders.filter(o => o.orderStatus === "Cancelled").length;

  // Filtered orders
  const filteredOrders = myOrders.filter(o => {
    const matchStatus = statusFilter === "All" || o.orderStatus === statusFilter;
    const matchSearch =
      !searchQuery ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some(i => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const handleCancelOrder = (orderId: string) => {
    if (confirm("আপনি কি নিশ্চিত এই পেন্ডিং অর্ডারটি বাতিল করতে চান?")) {
      const allOrders = JSON.parse(localStorage.getItem("twbd_orders_data") || "[]");
      const updated = allOrders.map((o: Order) => o.id === orderId ? { ...o, orderStatus: "Cancelled" } : o);
      localStorage.setItem("twbd_orders_data", JSON.stringify(updated));
      refreshOrders();
    }
  };

  // Membership age calculation
  const memberSince = "2026-03-01";
  const daysMember = Math.floor((Date.now() - new Date(memberSince).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black shadow-lg">
            {user?.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-black">{user?.name}</h1>
            <div className="text-xs text-indigo-300">📞 {user?.phone} | ✉️ {user?.email}</div>
            <div className="text-[11px] text-amber-400 mt-1 font-semibold">
              ⭐ সদস্যতার বয়স: {daysMember} দিন | রোল: {user?.role}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("products")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            শপ ব্রাউজ করুন
          </button>
          <button
            onClick={() => { logout(); navigate(""); }}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
          >
            লগআউট
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          {[
            { id: "overview", label: "📊 ড্যাশবোর্ড সামারি", icon: "📊" },
            { id: "orders", label: `📦 আমার অর্ডারসমূহ (${myOrders.length})`, icon: "📦" },
            { id: "settings", label: "⚙️ অ্যাকাউন্ট সেটিংস", icon: "⚙️" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-1">
            <button
              onClick={() => navigate("wishlist")}
              className="w-full p-3 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>❤️ পছন্দের তালিকা</span>
              <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded-full">{wishlistCount}</span>
            </button>
            <button
              onClick={() => navigate("cart")}
              className="w-full p-3 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
            >
              <span>🛒 শপিং কার্ট</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full">{cartCount}</span>
            </button>
            <button
              onClick={() => navigate("track")}
              className="w-full p-3 rounded-xl text-left text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <span>📍 ট্র্যাক অর্ডার</span>
            </button>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 font-semibold mb-1">মোট অর্ডার</div>
                  <div className="text-2xl font-black text-slate-900">{myOrders.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-amber-600 font-semibold mb-1">পেন্ডিং অর্ডার</div>
                  <div className="text-2xl font-black text-amber-600">{pendingCount}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-emerald-600 font-semibold mb-1">ডেলিভার্ড</div>
                  <div className="text-2xl font-black text-emerald-600">{successCount}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-rose-600 font-semibold mb-1">বাতিল অর্ডার</div>
                  <div className="text-2xl font-black text-rose-600">{cancelledCount}</div>
                </div>
              </div>

              {/* Graphical Activity summary */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 mb-4">
                  📈 অর্ডার এক্টিভিটি ও অগ্রগতি
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>সফল ডেলিভারি অনুপাত</span>
                      <span className="text-emerald-600 font-bold">
                        {myOrders.length ? Math.round((successCount / myOrders.length) * 100) : 100}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${myOrders.length ? (successCount / myOrders.length) * 100 : 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS LIST WITH CANCEL & VOUCHER */}
          {activeTab === "orders" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">
                  📦 আমার অর্ডারসমূহ ({filteredOrders.length})
                </h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="অর্ডার নং বা নাম..."
                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs flex-1 sm:w-48"
                  />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="All">সকল স্ট্যাটাস</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Sent">Sent</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  কোনো অর্ডার পাওয়া যায়নি।
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="py-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {order.orderNumber}
                          </span>
                          <span className="text-slate-400">|</span>
                          <span className="text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            {order.orderStatus}
                          </span>
                          <span className="font-extrabold text-slate-900">
                            ৳{order.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-slate-700">
                            <div className="flex items-center gap-2">
                              <img src={item.image} alt="" className="w-8 h-8 rounded object-cover border" />
                              <span className="font-medium truncate max-w-xs">{item.productName}</span>
                              <span className="text-slate-400 font-mono text-[10px]">x{item.quantity}</span>
                            </div>
                            <span className="font-bold">৳{item.totalPrice.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2">
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg transition-all"
                          >
                            অর্ডার বাতিল করুন (Cancel)
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedOrderForVoucher(order)}
                          className="text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                        >
                          <span>📄</span> বাউচার প্রিন্ট
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">
                ⚙️ কাস্টমার প্রোফাইল ও নিরাপত্তা সেটিংস
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">নাম</label>
                  <input type="text" defaultValue={user?.name} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর (ওটিপি যাচাইকৃত)</label>
                  <input type="tel" defaultValue={user?.phone} readOnly className="w-full p-2.5 bg-slate-100 border rounded-xl text-slate-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">ডেলিভারি ঠিকানা</label>
                  <textarea rows={2} defaultValue="House 12, Road 4, Sector 7, Uttara, Dhaka" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!")}
                className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
              >
                তথ্য সংরক্ষণ করুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Printable Voucher Modal */}
      {selectedOrderForVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-extrabold text-slate-900">অফিসিয়াল অর্ডার বাউচার</h3>
              <button onClick={() => setSelectedOrderForVoucher(null)} className="text-slate-400 hover:text-slate-700 text-lg">✕</button>
            </div>
            <PrintableVoucher order={selectedOrderForVoucher} />
          </div>
        </div>
      )}
    </div>
  );
};
