import { CustomerRiskLevel } from "@/types/customer";

export const calculateRiskFromPercentage = (pct: number): CustomerRiskLevel => {
  if (pct < 50) return 'Very High Risk';
  if (pct <= 60) return 'Low Risk';
  if (pct <= 70) return 'No Risk';
  if (pct <= 80) return 'Verified';
  return 'Gold Verified';
};

export const RISK_BADGES: Record<CustomerRiskLevel, { label: string; color: string }> = {
  "Very High Risk": { label: "খুব রিস্ক (<50%)", color: "bg-red-100 text-red-800 border-red-300" },
  "Low Risk": { label: "লো রিস্ক (50-60%)", color: "bg-amber-100 text-amber-800 border-amber-300" },
  "No Risk": { label: "নো রিস্ক (60-70%)", color: "bg-blue-100 text-blue-800 border-blue-300" },
  "Verified": { label: "ভেরিফাইড (70-80%)", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  "Gold Verified": { label: "গোল্ড-ভেরিফাইড (80-100%)", color: "bg-yellow-100 text-yellow-900 border-yellow-400" },
};
