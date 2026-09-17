import { initiateBkashPayment } from "./bkash";
import { initiateNagadPayment } from "./nagad";
import { initiateRocketPayment } from "./rocket";
import { initiateSslCommerzPayment } from "./sslcommerz";

export async function processPaymentGateway(method: string, amount: number, orderNumber: string) {
  const m = method.toLowerCase();
  if (m.includes("bkash")) return await initiateBkashPayment(amount, orderNumber);
  if (m.includes("nagad")) return await initiateNagadPayment(amount, orderNumber);
  if (m.includes("rocket")) return await initiateRocketPayment(amount, orderNumber);
  if (m.includes("ssl")) return await initiateSslCommerzPayment(amount, orderNumber);
  return { success: true, note: "Offline or direct payment method" };
}
