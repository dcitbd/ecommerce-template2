export async function initiateBkashPayment(amount: number, orderNumber: string) {
  return { success: true, paymentUrl: `https://shop.bkash.com/payment?amount=${amount}&invoice=${orderNumber}` };
}
