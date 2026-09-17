import React from "react";
import { useReviews } from "@/hooks/useReviews";

export const CompanyReviews: React.FC = () => {
  const { reviews } = useReviews();
  const approvedReviews = reviews.filter(r => r.isApproved);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          কাস্টমার রিভিউ
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
          আমাদের সম্মানিত গ্রাহকদের মতামত
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          দুবাই, হংকং ও রাশিয়া থেকে প্রি-অর্ডার ও নিয়মিত ডেলিভারিতে সন্তুষ্ট গ্রাহকদের রিভিউ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {approvedReviews.map(rev => (
          <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-2">
                {"⭐".repeat(rev.rating)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{rev.customerName}</div>
                <div className="text-[10px] text-indigo-600 font-semibold">{rev.productName}</div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                ভেরিফাইড পারচেজ
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
