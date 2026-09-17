export function generateProductSlug(article: string, name: string): string {
  const combined = `${article}-${name}`.toLowerCase();
  return combined
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}
