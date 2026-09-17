export function calculateCustomerRating(successCount: number, totalCount: number): number {
  if (totalCount === 0) return 100;
  return Math.round((successCount / totalCount) * 100);
}
