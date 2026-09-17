import { checkCourierFraudApi } from "./courierFraud";

export async function checkPhoneFraud(phone: string) {
  return await checkCourierFraudApi(phone);
}
