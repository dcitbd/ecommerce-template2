import { validatePhone, validateEmail } from "./authValidation";

export function validateCustomerProfile(data: { name: string; phone: string; email?: string; address?: string }) {
  const errors: string[] = [];
  if (!data.name) errors.push("নাম আবশ্যক।");
  if (!validatePhone(data.phone)) errors.push("সঠিক ফোন নম্বর আবশ্যক।");
  if (data.email && !validateEmail(data.email)) errors.push("ইমেইল ফরম্যাট সঠিক নয়।");
  return { isValid: errors.length === 0, errors };
}
