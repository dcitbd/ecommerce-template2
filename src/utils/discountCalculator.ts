export function calculateDiscountPercentage(mrp: number, currentPrice: number): number {
  if (!mrp || mrp <= currentPrice) return 0;
  return Math.round(((mrp - currentPrice) / mrp) * 100);
}
