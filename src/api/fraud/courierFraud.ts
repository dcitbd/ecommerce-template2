import { FraudReport } from "@/types/fraud";
import { calculateRiskFromPercentage } from "@/constants/customerRisk";

export async function checkCourierFraudApi(phone: string): Promise<FraudReport> {
  // Deterministic calculation based on phone digits for consistent realistic demo
  const clean = phone.replace(/\D/g, "");
  const lastDigits = parseInt(clean.slice(-2) || "75", 10);
  const total = Math.max(2, Math.floor(lastDigits / 5) + 3);
  const returned = Math.floor((100 - lastDigits) / 25);
  const delivered = Math.max(0, total - returned);
  const successRate = Math.round((delivered / total) * 100);

  return {
    phone,
    totalParcels: total,
    deliveredParcels: delivered,
    returnedParcels: returned,
    successRate,
    riskRating: calculateRiskFromPercentage(successRate),
    courierReports: [
      { courier: "Steadfast", delivered: Math.ceil(delivered * 0.6), returned: Math.floor(returned * 0.5) },
      { courier: "Pathao", delivered: Math.floor(delivered * 0.4), returned: Math.ceil(returned * 0.5) },
      { courier: "RedX", delivered: 1, returned: 0 }
    ]
  };
}
