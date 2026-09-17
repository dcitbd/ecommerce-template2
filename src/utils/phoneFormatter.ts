export function formatBdPhone(phone: string): string {
  let clean = phone.replace(/[^0-9]/g, "");
  if (clean.startsWith("88")) {
    clean = clean.slice(2);
  }
  if (!clean.startsWith("0") && clean.length === 10) {
    clean = "0" + clean;
  }
  return clean;
}
