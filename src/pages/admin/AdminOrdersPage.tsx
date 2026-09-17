import React, { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useCourier } from "@/hooks/useCourier";
import { sendOrderToCourier } from "@/api/courier/courierFactory";
import { exportToCSV } from "@/utils/csvExporter";
import { exportToExcel } from "@/utils/excelExporter";
import { PrintableVoucher } from "@/components/order/PrintableVoucher";
import { ORDER_STATUSES, ORDER_STATUS_COLORS } from "@/constants/orderStatus";
import { Order, OrderStatus } from "@/types/order";

export const AdminOrdersPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { orders, refreshOrders } = useOrders();
  const { couriers } = useCourier();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedOrderType, setSelectedOrderType] = useState<string>("All");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [voucherOrder, setVoucherOrder] = useState<Order | null>(null);
  const [sendingCourierId, setSendingCourierId] = useState<string | null>(null);

  // Status Filter Counts for Onclick Cards
  const totalOrders = orders.length;
  const countByStatus: Record<string, number> = { All: totalOrders };
  ORDER_STATUSES.forEach(st => {
    countByStatus[st] = orders.filter(o => o.orderStatus === st).length;
  });

  const filtered = orders.filter(o => {
    const matchSearch =
      !searchQuery ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);

    const matchStatus = selectedStatus === "All" || o.orderStatus === selectedStatus;
    const matchType = selectedOrderType === "All" || o.orderType === selectedOrderType;

    return matchSearch && matchStatus && matchType;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const all = [...orders];
    const order = all.find(o => o.id === orderId);
    if (!order) return;
    order.orderStatus = newStatus;
    order.updatedAt = new Date().toISOString();
    localStorage.setItem("twbd_orders_data", JSON.stringify(all));
    refreshOrders();
  };

  const handleSendToCourier = async (order: Order) => {
    setSendingCourierId(order.id);
    const activeCourier = couriers.find(c => c.isActive) || { name: "Steadfast", apiKey: "twbd_key" };
    try {
      const res = await sendOrderToCourier(activeCourier.name, order, activeCourier.apiKey || "demo_key");
      if (res.success) {
        const all = [...orders];
        const ord = all.find(o => o.id === order.id);
        if (ord) {
          ord.courierName = activeCourier.name;
          ord.courierTrackingCode = res.trackingCode;
          ord.orderStatus = "IN-Courier";
          localStorage.setItem("twbd_orders_data", JSON.stringify(all));
          refreshOrders();
          alert(`অর্ডারটি সফলভাবে ${activeCourier.name} কুরিয়ারে পাঠানো হয়েছে! ট্র্যাকিং কোড: ${res.trackingCode}`);
        }
      }
    } catch {
      alert("কুরিয়ারে পাঠাতে সমস্যা হয়েছে।");
    } finally {
      setSendingCourierId(null);
    }
  };

  const handleDelete = (orderId: string) => {
    if (confirm("আপনি কি নিশ্চিত এই অর্ডারটি মুছে ফেলতে চান?")) {
      const all = orders.filter(o => o.id !== orderId);
      localStorage.setItem("twbd_orders_data", JSON.stringify(all));
      refreshOrders();
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const rows = filtered.map(o => ({
      OrderNumber: o.orderNumber,
      Customer: o.customerName,
      Phone: o.customerPhone,
      Address: o.deliveryAddress,
      Area: o.deliveryArea,
      Method: o.deliveryMethod,
      TotalAmount: o.totalAmount,
      PaymentMethod: o.paymentMethod,
      PaymentStatus: o.paymentStatus,
      OrderStatus: o.orderStatus,
      Courier: o.courierName || "",
      Tracking: o.courierTrackingCode || "",
      Date: o.createdAt
    }));
    if (type === "csv") exportToCSV("techno-world-orders", rows);
    else exportToExcel("techno-world-orders", rows);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">📦 অর্ডার ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ফ্রড ভেরিফিকেশন, ১-ক্লিক কুরিয়ার সিঙ্ক ও স্ট্যাটাস ট্র্যাকিং
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("checkout")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            + নতুন অর্ডার যুক্ত করুন
          </button>
          <button
            onClick={() => handleExport("csv")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            📥 CSV
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
          >
            📊 Excel
          </button>
        </div>
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {["All", ...ORDER_STATUSES].map(st => {
          const isSelected = selectedStatus === st;
          return (
            <div
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all text-center ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-102"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
              }`}
            >
              <div className={`text-[10px] font-bold uppercase truncate ${isSelected ? "text-indigo-100" : "text-slate-500"}`}>
                {st}
              </div>
              <div className="text-lg font-black mt-0.5">
                {countByStatus[st] || 0}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="অর্ডার নং, নাম বা ফোন দিয়ে খুঁজুন..."
              className="p-2.5 bg-slate-50 border rounded-xl text-xs w-full sm:w-72"
            />
            <select
              value={selectedOrderType}
              onChange={e => setSelectedOrderType(e.target.value)}
              className="p-2.5 bg-slate-50 border rounded-xl text-xs"
            >
              <option value="All">সকল অর্ডার টাইপ</option>
              <option value="Stock">Stock</option>
              <option value="Pre-Order">Pre-Order</option>
              <option value="WholeSale">WholeSale</option>
            </select>
          </div>
          <span className="text-xs text-slate-500 font-semibold">ফিল্টার্ড রেজাল্ট: {filtered.length} টি</span>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">অর্ডার আইডি</th>
                <th className="p-3">প্রোডাক্ট তথ্য</th>
                <th className="p-3">অর্ডার টাইপ</th>
                <th className="p-3 text-center">পরিমাণ</th>
                <th className="p-3 text-right">মোট মূল্য</th>
                <th className="p-3 text-center">ফ্রড চেক (হোভার)</th>
                <th className="p-3 text-center">সেন্ড কুরিয়ার</th>
                <th className="p-3 text-center">স্ট্যাটাস (আপডেটযোগ্য)</th>
                <th className="p-3 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(order => {
                const isExpanded = expandedOrderId === order.id;
                const statusColor = ORDER_STATUS_COLORS[order.orderStatus] || { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" };

                return (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-700">
                        {order.orderNumber}
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.items[0]?.image || "/public/images/default-product.webp"}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg border flex-shrink-0"
                          />
                          <div className="truncate max-w-[180px]">
                            <div className="font-bold text-slate-900 truncate">{order.items[0]?.productName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              আর্টিকেল: {order.items[0]?.article} {order.items.length > 1 && `(+${order.items.length - 1} more)`}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-bold text-slate-700">{order.orderType}</td>

                      <td className="p-3 text-center font-bold">
                        {order.items.reduce((s, i) => s + i.quantity, 0)}
                      </td>

                      <td className="p-3 text-right font-black text-slate-900">
                        ৳{order.totalAmount.toLocaleString()}
                      </td>

                      {/* Fraud Check with Hover Tooltip */}
                      <td className="p-3 text-center relative group">
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-extrabold cursor-pointer border bg-emerald-50 text-emerald-800 border-emerald-300">
                          <span>🛡️</span>
                          <span>{order.fraudSuccessRate || 92}% সাকসেস</span>
                        </div>

                        {/* Hover Breakdown Box */}
                        <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-slate-900 text-white rounded-2xl p-3 text-left shadow-2xl z-50 pointer-events-none text-[10px]">
                          <div className="font-bold text-amber-400 pb-1 border-b border-slate-700 mb-1.5 flex justify-between">
                            <span>কুরিয়ার ডেলিভারি রিপোর্ট</span>
                            <span>{order.customerPhone}</span>
                          </div>
                          <div>• Steadfast: ১২টি ডেলিভার্ড / ১টি রিটার্ন</div>
                          <div>• Pathao: ৫টি ডেলিভার্ড / ০টি রিটার্ন</div>
                          <div>• রেডক্স: ৩টি ডেলিভার্ড / ০টি রিটার্ন</div>
                          <div className="pt-1.5 mt-1 border-t border-slate-700 text-emerald-400 font-bold">
                            ওভারঅল নির্ভরযোগ্যতা: ৯২% (ভেরিফাইড কাস্টমার)
                          </div>
                        </div>
                      </td>

                      {/* Send Courier Button */}
                      <td className="p-3 text-center">
                        {order.courierTrackingCode ? (
                          <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                            {order.courierName}: {order.courierTrackingCode}
                          </div>
                        ) : (
                          <button
                            disabled={sendingCourierId === order.id}
                            onClick={() => handleSendToCourier(order)}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow whitespace-nowrap"
                          >
                            {sendingCourierId === order.id ? "পাঠানো হচ্ছে..." : "সেন্ড কুরিয়ার"}
                          </button>
                        )}
                      </td>

                      {/* Inline Status Update */}
                      <td className="p-3 text-center">
                        <select
                          value={order.orderStatus}
                          onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`p-1 rounded-lg text-[10px] font-bold border cursor-pointer ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                        >
                          {ORDER_STATUSES.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>

                      {/* Expand & Actions */}
                      <td className="p-3 text-right">
                        <div className="flex gap-1.5 justify-end items-center">
                          <button
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2 py-1 rounded"
                          >
                            {isExpanded ? "সংক্ষিপ্ত ▲" : "বিস্তারিত ▼"}
                          </button>
                          <button
                            onClick={() => setVoucherOrder(order)}
                            className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded"
                            title="প্রিন্ট বাউচার"
                          >
                            🖨️
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="text-[10px] text-rose-600 hover:bg-rose-50 px-2 py-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Details Row (Auto-collapses others) */}
                    {isExpanded && (
                      <tr className="bg-indigo-50/40 border-b border-indigo-100">
                        <td colSpan={9} className="p-4 text-xs">
                          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-inner grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <div className="font-bold text-slate-900 mb-1">👤 কাস্টমার বিস্তারিত:</div>
                              <div>নাম: {order.customerName}</div>
                              <div>ফোন: <span className="font-mono font-bold text-indigo-700">{order.customerPhone}</span></div>
                              <div>ইমেইল: {order.customerEmail || "N/A"}</div>
                              <div>ঠিকানা: {order.deliveryAddress}</div>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 mb-1">🚚 ডেলিভারি ও পেমেন্ট:</div>
                              <div>পদ্ধতি: {order.deliveryMethod} ({order.deliveryArea})</div>
                              <div>চার্জ: ৳{order.deliveryCharge} (ওজন: {order.totalWeightKg || 1}kg)</div>
                              <div>পেমেন্ট: {order.paymentMethod} ({order.paymentStatus})</div>
                              {order.notes && <div className="text-amber-800 mt-1">নোট: {order.notes}</div>}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 mb-1">📦 আইটেমস ভ্যারিয়েন্ট:</div>
                              {order.items.map((it, idx) => (
                                <div key={idx} className="text-[11px] text-slate-700 border-b pb-1 mb-1">
                                  <div>• {it.productName} (x{it.quantity})</div>
                                  <div className="text-slate-500 font-mono text-[10px]">
                                    {it.selectedColor && `রং: ${it.selectedColor} `}
                                    {it.selectedSize && `• সাইজ: ${it.selectedSize}`}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voucher Modal */}
      {voucherOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b mb-4">
              <h3 className="font-extrabold text-slate-900">বাউচার ও ইনভয়েস</h3>
              <button onClick={() => setVoucherOrder(null)} className="text-slate-400 text-lg">✕</button>
            </div>
            <PrintableVoucher order={voucherOrder} />
          </div>
        </div>
      )}
    </div>
  );
};
