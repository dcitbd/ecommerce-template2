export function getFraudBadgeColor(rating: string): string {
  switch (rating) {
    case "Very High Risk": return "text-red-600 bg-red-50 border-red-200";
    case "Low Risk": return "text-amber-600 bg-amber-50 border-amber-200";
    case "No Risk": return "text-blue-600 bg-blue-50 border-blue-200";
    case "Verified": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "Gold Verified": return "text-yellow-700 bg-yellow-50 border-yellow-300";
    default: return "text-slate-600 bg-slate-50 border-slate-200";
  }
}
