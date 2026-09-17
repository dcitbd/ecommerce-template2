export async function initiateSslCommerzPayment(amount: number, orderNumber: string) {
  return { success: true, paymentUrl: `https://securepay.sslcommerz.com/gwprocess/v4/api.php` };
}
