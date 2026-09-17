export async function sendOtpSms(phone: string, code: string): Promise<{ success: boolean; message: string }> {
  console.log(`[SMS-GATEWAY] Sending OTP ${code} to ${phone}`);
  return { success: true, message: `OTP ${code} পাঠানো হয়েছে (${phone})` };
}

export async function sendOrderAlertSms(phone: string, orderNumber: string, userPass?: { user: string; pass: string }) {
  console.log(`[SMS-GATEWAY] Order confirmed ${orderNumber} for ${phone}`);
  if (userPass) {
    console.log(`[SMS-GATEWAY] Auto-account created. Username: ${userPass.user}, Pass: ${userPass.pass}`);
  }
  return { success: true };
}
