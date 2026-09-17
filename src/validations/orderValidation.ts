import { validatePhone } from "./authValidation";

export function validateCheckoutForm(data: {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryMethod: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.push("কাস্টমারের পুরো নাম আবশ্যক।");
  }
  if (!validatePhone(data.customerPhone)) {
    errors.push("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01351003958)।");
  }
  if (data.deliveryMethod !== "Collect from Office" && (!data.deliveryAddress || data.deliveryAddress.trim().length < 5)) {
    errors.push("ডেলিভারির জন্য বিস্তারিত ঠিকানা আবশ্যক।");
  }
  return { isValid: errors.length === 0, errors };
}
