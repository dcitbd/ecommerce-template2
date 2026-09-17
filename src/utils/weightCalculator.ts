export function calculateTotalWeight(items: { weightKg: number; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + (item.weightKg || 0.5) * item.quantity, 0);
}
