export function isArticleUnique(article: string, currentProductId: string | null, allProducts: { id: string; article: string }[]): boolean {
  if (!article) return false;
  const clean = article.trim().toUpperCase();
  return !allProducts.some(p => p.id !== currentProductId && p.article.trim().toUpperCase() === clean);
}
