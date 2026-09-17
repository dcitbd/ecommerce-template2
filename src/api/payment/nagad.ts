export async function initiateNagadPayment(amount: number, orderNumber: string) {
  return { success: true, paymentUrl: `https://payment.nagad.com.bd/checkout?amount=${amount}&invoice=${orderNumber}` };
}
