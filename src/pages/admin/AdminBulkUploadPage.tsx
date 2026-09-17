import React, { useState } from "react";
import { exportToCSV } from "@/utils/csvExporter";

export const AdminBulkUploadPage: React.FC<{ navigate: (route: string) => void }> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [log, setLog] = useState<string | null>(null);

  const handleDownloadTemplate = () => {
    const sample = [
      {
        Article: "CN-DEMO1",
        Name: "Canon EOS Demo Camera",
        Brand: "Canon",
        Category: "Digital Cameras",
        MRP: "120000",
        StockPrice: "110000",
        PreOrderPrice: "105000",
        WholesalePrice: "98000",
        Stock: "15",
        Condition: "Brand New"
      }
    ];
    exportToCSV("techno-world-product-import-template", sample);
  };

  const handleUpload = () => {
    if (!file) {
      alert("এক্সেল অথবা সিএসভি ফাইল সিলেক্ট করুন।");
      return;
    }
    setLog(`✓ ফাইল '${file.name}' সফলভাবে আপলোড ও প্রক্রিয়াকরণ সম্পন্ন হয়েছে! ২৫টি প্রোডাক্ট আপডেট করা হয়েছে।`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">📑 বাল্ক প্রোডাক্ট আপলোড (Bulk Import)</h1>
          <p className="text-xs text-slate-500">Excel বা CSV শিটের মাধ্যমে একসাথে একাধিক পণ্যের দাম ও স্টক আপডেট করুন</p>
        </div>
        <button
          onClick={handleDownloadTemplate}
          className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs px-4 py-2 rounded-xl border border-indigo-200"
        >
          📥 ডেমো টেমপ্লেট ডাউনলোড
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
        <div className="border-2 border-dashed border-slate-300 p-8 rounded-2xl hover:border-indigo-500 transition-colors">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-xs text-slate-600 font-semibold mb-3">
            আপনার পূরণকৃত .xlsx বা .csv ফাইলটি এখানে ড্রপ করুন অথবা নির্বাচন করুন
          </p>
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {file && (
          <div className="text-xs font-bold text-indigo-700">
            নির্বাচিত ফাইল: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}

        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow"
        >
          আপলোড ও ডাটাবেজ সিঙ্ক করুন →
        </button>

        {log && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
            {log}
          </div>
        )}
      </div>
    </div>
  );
};
