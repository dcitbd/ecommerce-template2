import React from "react";

export const DeliveryCards: React.FC = () => {
  const cards = [
    {
      icon: "✈️",
      title: "দুবাই / হংকং / রাশিয়া সোর্স",
      desc: "সরাসরি আন্তর্জাতিক বাজার থেকে ১০০% নতুন ও ইনটেক্ট প্যাকেজ ইমপোর্ট।"
    },
    {
      icon: "⚡",
      title: "১০–১৫ দিনে দ্রুত ডেলিভারি",
      desc: "প্রি-অর্ডার কনফার্মেশনের পর সুনির্দিষ্ট সময়সীমার মধ্যে নিরাপদে পণ্য পৌঁছানো হয়।"
    },
    {
      icon: "🛡️",
      title: "২ সপ্তাহ ওয়ারেন্টি",
      desc: "পণ্য হাতে পাওয়ার পর যেকোনো টেকনিক্যাল ত্রুটিতে ১৪ দিনের রিপ্লেসমেন্ট ওয়ারেন্টি।"
    },
    {
      icon: "🚚",
      title: "সারা বাংলাদেশে হোম ডেলিভারি",
      desc: "ঢাকা সিটিতে ৯০ টাকা এবং ঢাকার বাইরে ১৩০ টাকা থেকে ওজনভিত্তিক ডেলিভারি।"
    },
    {
      icon: "🤝",
      title: "চুক্তির মাধ্যমে পাইকারি কাজ",
      desc: "হোলসেল ও কর্পোরেট অর্ডারের জন্য লিখিত চুক্তি ও ব্যাংক / ডলার পেমেন্ট সুবিধা।"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-indigo-300 transition-colors"
          >
            <div className="text-3xl mb-2">{c.icon}</div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">{c.title}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
