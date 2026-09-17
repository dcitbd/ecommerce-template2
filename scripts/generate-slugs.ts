export function generateMissingSlugs(products: any[]) {
  return products.map(p => ({
    ...p,
    slug: `${p.article.toLowerCase()}-${p.name.toLowerCase().replace(/\s+/g, "-")}`
  }));
}
