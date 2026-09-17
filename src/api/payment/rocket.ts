export async function initiateRocketPayment(amount: number, orderNumber: string) {
  return { success: true, paymentUrl: `https://rocket.dutchbanglabank.com/pay?amount=${amount}&invoice=${orderNumber}` };
}
