export function generateSitemapXml(productSlugs: string[]) {
  const urls = productSlugs.map(s => `<url><loc>https://technoworldbangladesh.com/#/product/${s}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset>\n${urls}\n</urlset>`;
}
