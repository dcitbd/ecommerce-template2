import { checkPhoneFraud } from "@/api/fraud/fraudFactory";

export async function executeFraudCheck(phone: string) {
  return await checkPhoneFraud(phone);
}
