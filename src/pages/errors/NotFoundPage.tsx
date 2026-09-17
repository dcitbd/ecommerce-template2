import React from "react";
export const NotFoundPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => (
  <div className="max-w-md mx-auto py-24 text-center px-4">
    <div className="text-6xl mb-4">404</div>
    <h2 className="text-xl font-bold text-slate-800 mb-2">পৃষ্ঠাটি পাওয়া যায়নি!</h2>
    <p className="text-xs text-slate-500 mb-6">আপনি যে লিংকটি খুঁজছেন তা স্থানান্তরিত বা মুছে ফেলা হতে পারে।</p>
    <button onClick={() => navigate("")} className="bg-indigo-600 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow">হোমে ফিরে যান</button>
  </div>
);
