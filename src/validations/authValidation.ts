export function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, "");
  return /^01[3-9]\d{8}$/.test(clean);
}

export function validateEmail(email: string): boolean {
  if (!email) return true; // optional in some cases
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
