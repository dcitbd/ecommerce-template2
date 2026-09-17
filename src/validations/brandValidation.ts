export function validateBrandName(name: string): boolean {
  return !!name && name.trim().length >= 2;
}
