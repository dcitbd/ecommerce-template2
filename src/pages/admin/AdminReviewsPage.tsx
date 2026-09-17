import React, { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { saveReviews } from "@/services/reviewService";

export const AdminReviewsPage: React.FC = () => {
  const { reviews, refreshReviews } = useReviews();

  const handleToggleApprove = (reviewId: string) => {
    const updated = reviews.map(r => r.id === reviewId ? { ...r, isApproved: !r.isApproved } : r);
    saveReviews(updated);
    refreshReviews();
  };

  const handleDelete = (reviewId: string) => {
    const updated = reviews.filter(r => r.id !== reviewId);
    saveReviews(updated);
    refreshReviews();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">⭐ কাস্টমার রিভিউ মডারেশন</h1>
          <p className="text-xs text-slate-500">অনুমোদন দেওয়ার পরেই রিভিউ পাবলিক সাইটে দেখা যাবে</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y">
        {reviews.map(rev => (
          <div key={rev.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{rev.customerName}</span>
                <span className="text-amber-500">{"⭐".repeat(rev.rating)}</span>
                <span className="text-indigo-600 font-semibold">• {rev.productName}</span>
              </div>
              <p className="text-slate-700 mt-1 italic">"{rev.comment}"</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleApprove(rev.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                  rev.isApproved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {rev.isApproved ? "✓ অনুমোদিত" : "পেন্ডিং (অনুমোদন দিন)"}
              </button>
              <button onClick={() => handleDelete(rev.id)} className="text-rose-500 font-bold px-2">
                মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
