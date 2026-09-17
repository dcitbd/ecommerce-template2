import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { usePayment } from "@/hooks/usePayment";
import { calculateDeliveryFee } from "@/utils/deliveryCalculator";
import { calculateTotalWeight } from "@/utils/weightCalculator";
import { validateCheckoutForm } from "@/validations/orderValidation";
import { addOrder } from "@/services/orderService";
import { syncCustomerFromOrder } from "@/services/customerService";
import { sendOrderAlertSms } from "@/api/sms/otpService";
import { DeliveryArea, DeliveryMethod } from "@/types/order";

export const OrderCheckoutView: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user, login } = useAuth();
  const { paymentMethods } = usePayment();

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("Home delivery");
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>("Inside Dhaka");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);
  const [autoAccountInfo, setAutoAccountInfo] = useState<{ user: string; pass: string } | null>(null);

  const totalWeight = calculateTotalWeight(items);
  const deliveryCharge = calculateDeliveryFee(deliveryArea, deliveryMethod, totalWeight);
  const finalTotal = subtotal + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrors(["আপনার কার্ট খালি। অনুগ্রহ করে অন্তত একটি প্রোডাক্ট যোগ করুন।"]);
      return;
    }

    const val = validateCheckoutForm({
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryMethod,
    });

    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);

    try {
      // Sync customer CRM
      const cust = syncCustomerFromOrder(customerName, customerPhone, customerEmail, deliveryAddress);

      // Auto Account Creation if guest checkout
      let generatedAuth = null;
      if (!user) {
        const tempPassword = "tw" + Math.floor(100000 + Math.random() * 900000);
        login(customerPhone, "Customer", customerName);
        generatedAuth = { user: customerPhone, pass: tempPassword };
        setAutoAccountInfo(generatedAuth);
      }

      // Create Order
      const newOrder = addOrder({
        customerId: cust.id,
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: deliveryMethod === "Collect from Office" ? "টেকনো ওয়ার্ল্ড বিডি অফিস (আদর্শ সদর, কুমিল্লা)" : deliveryAddress,
        deliveryMethod,
        deliveryArea,
        deliveryCharge,
        totalWeightKg: totalWeight,
        items: items.map(i => ({
          productId: i.productId,
          productName: i.name,
          article: i.article,
          image: i.image,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize,
          orderType: i.orderType,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.unitPrice * i.quantity,
          weightKg: i.weightKg
        })),
        subtotal,
        totalAmount: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === "Cash on Delivery" ? "Unpaid" : "Paid",
        orderStatus: "Pending",
        orderType: items[0]?.orderType || "Stock",
        notes
      });

      // Send SMS notification
      await sendOrderAlertSms(customerPhone, newOrder.orderNumber, generatedAuth || undefined);

      clearCart();
      setSuccessOrderNumber(newOrder.orderNumber);
    } catch (err) {
      console.error(err);
      setErrors(["অর্ডার প্রসেস করতে একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successOrderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            ধন্যবাদ, <span className="font-bold text-slate-900">{customerName}</span>। আপনার অর্ডার নম্বর:
          </p>
          <div className="bg-slate-100 font-mono text-lg font-extrabold text-indigo-700 py-3 px-6 rounded-2xl inline-block mb-6 border border-slate-200 shadow-inner">
            {successOrderNumber}
          </div>

          {autoAccountInfo && (
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-left text-xs text-slate-700 mb-6">
              <div className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                <span>🔑</span> আপনার জন্য অটো কাস্টমার অ্যাকাউন্ট তৈরি করা হয়েছে:
              </div>
              <div>• ব্যবহারকারীর নাম (User): <span className="font-mono font-bold">{autoAccountInfo.user}</span></div>
              <div>• সাময়িক পাসওয়ার্ড: <span className="font-mono font-bold">{autoAccountInfo.pass}</span></div>
              <div className="text-[11px] text-slate-500 mt-1">
                (এই তথ্য আপনার মোবাইলে এসএমএস ও মেইলের মাধ্যমে পাঠিয়ে দেওয়া হয়েছে। কাস্টমার প্যানেল থেকে যেকোনো সময় পাসওয়ার্ড পরিবর্তন করতে পারবেন)
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(`track`)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow"
            >
              অর্ডার ট্র্যাক ও বাউচার দেখুন →
            </button>
            <button
              onClick={() => navigate("")}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-full"
            >
              হোমে ফিরে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">অর্ডার ও চেকআউট ফর্ম</h1>
        <p className="text-xs text-slate-500">আপনার সঠিক তথ্য প্রদান করে অর্ডার কনফার্ম করুন</p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs space-y-1">
          {errors.map((err, i) => <div key={i}>⚠️ {err}</div>)}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Product Items & Customer Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Products in Order */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>📦 অর্ডারের প্রোডাক্ট তালিকা ({items.length})</span>
              <button
                type="button"
                onClick={() => navigate("products")}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                + আরও যোগ করুন
              </button>
            </h3>

            {items.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                কার্টে কোনো প্রোডাক্ট নেই। প্রোডাক্ট পেইজ থেকে যোগ করুন।
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map(item => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono text-[10px]">{item.article}</span>
                        <span className="text-indigo-600 font-semibold">{item.orderType}</span>
                        <span>৳{item.unitPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div className="text-xs font-extrabold text-slate-900">
                        ৳{(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] text-rose-500 hover:underline"
                      >
                        মুছুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Customer Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              👤 কাস্টমার ও ডেলিভারি তথ্য
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="যেমন: Mahmudul Hasan"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  মোবাইল নম্বর * (১১ ডিজিট)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="01351003958"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ই-মেইল (ঐচ্ছিক)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ডেলিভারি পদ্ধতি (Delivery Method) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "Home delivery", label: "হোম ডেলিভারি (Home Delivery)", icon: "🚚" },
                  { id: "Collect from Office", label: "অফিস থেকে গ্রহণ (Free)", icon: "🏢" },
                  { id: "From collection Point", label: "কালেকশন পয়েন্ট (Point)", icon: "📍" },
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDeliveryMethod(m.id as DeliveryMethod)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left flex flex-col justify-between transition-all ${
                      deliveryMethod === m.id
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-base mb-1">{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Area Selection */}
            {deliveryMethod !== "Collect from Office" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ডেলিভারি এলাকা (Delivery Area) *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                    deliveryArea === "Inside Dhaka" ? "border-indigo-600 bg-indigo-50 text-indigo-900" : "border-slate-200"
                  }`}>
                    <input
                      type="radio"
                      name="area"
                      checked={deliveryArea === "Inside Dhaka"}
                      onChange={() => setDeliveryArea("Inside Dhaka")}
                      className="mr-2 text-indigo-600"
                    />
                    <span>ঢাকা সিটির ভেতরে (৳90 + ওজন)</span>
                  </label>
                  <label className={`p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                    deliveryArea === "Outside Dhaka" ? "border-indigo-600 bg-indigo-50 text-indigo-900" : "border-slate-200"
                  }`}>
                    <input
                      type="radio"
                      name="area"
                      checked={deliveryArea === "Outside Dhaka"}
                      onChange={() => setDeliveryArea("Outside Dhaka")}
                      className="mr-2 text-indigo-600"
                    />
                    <span>ঢাকার বাইরে / সারা দেশ (৳130 + ওজন)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Address */}
            {deliveryMethod !== "Collect from Office" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  বিস্তারিত ডেলিভারি ঠিকানা *
                </label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="বাড়ি নং, রোড নং, এলাকা, থানা, জেলা..."
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বিশেষ নোট (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="যেমন: দ্রুত ডেলিভারি দরকার / বিকালে ডেলিভারি করবেন"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Calculation & Payment Selection */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              💳 পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h3>

            <div className="space-y-2">
              {paymentMethods.filter(p => p.isActive).map(method => (
                <label
                  key={method.id}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === method.name
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method.name}
                      onChange={() => setPaymentMethod(method.name)}
                      className="text-indigo-600"
                    />
                    <span className="text-xs">{method.name}</span>
                  </div>
                  {method.accountNumber && (
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-mono">
                      {method.accountNumber}
                    </span>
                  )}
                </label>
              ))}
            </div>

            {deliveryMethod === "Collect from Office" && (
              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                🏢 অফিস কালেকশনে কোনো ডেলিভারি চার্জ নেই। অফিসে এসে ক্যাশ বা অনলাইনে পে করতে পারবেন।
              </p>
            )}
          </div>

          {/* Price Calculation Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-extrabold text-amber-400 pb-2 border-b border-slate-800">
              🧾 অর্ডারের মূল্য বিবরণী
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>পণ্য সাবটোটাল ({items.reduce((s, i) => s + i.quantity, 0)} পিস):</span>
                <span className="font-bold text-white">৳{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>মোট ওজন:</span>
                <span className="font-mono">{totalWeight.toFixed(2)} KG</span>
              </div>

              <div className="flex justify-between">
                <span>
                  ডেলিভারি চার্জ ({deliveryMethod === "Collect from Office" ? "অফিস পিকআপ" : deliveryArea}):
                </span>
                <span className="font-bold text-white">
                  {deliveryCharge === 0 ? "ফ্রি (৳০)" : `৳${deliveryCharge}`}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 border-l-2 border-amber-400 pl-2 py-0.5">
                * ১ কেজি পর্যন্ত বেস চার্জ (ঢাকা: ৯০৳, ঢাকার বাইরে: ১৩০৳), অতিরিক্ত প্রতি কেজিতে ২০৳ যোগ হবে।
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-200">সর্বমোট প্রদেয়:</span>
              <span className="text-2xl font-black text-amber-400">
                ৳{finalTotal.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-sm py-3 rounded-xl shadow-lg transition-all active:scale-98 text-center"
            >
              {isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : "অর্ডার কনফার্ম করুন (Confirm Order) →"}
            </button>

            {!user && (
              <p className="text-[10px] text-center text-slate-400 mt-2">
                🔒 অর্ডার সাবমিট করার সাথে সাথেই স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্ট তৈরি হবে।
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
