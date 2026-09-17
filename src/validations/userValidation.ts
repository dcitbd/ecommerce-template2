import { validatePhone } from "./authValidation";

export function validateStaffUser(user: { name: string; phone: string; role: string }) {
  const errors: string[] = [];
  if (!user.name) errors.push("ব্যবহারকারীর নাম দিন।");
  if (!validatePhone(user.phone)) errors.push("সঠিক মোবাইল নম্বর দিন।");
  if (!user.role) errors.push("ব্যবহারকারীর রোল নির্বাচন করুন।");
  return { isValid: errors.length === 0, errors };
}
