export function validateCategoryName(name: string): boolean {
  return !!name && name.trim().length >= 2;
}
