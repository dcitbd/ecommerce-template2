export function validateProductRows(rows: any[]) {
  const errors = [];
  for (const r of rows) {
    if (!r.article) errors.push(`Missing article for product ${r.name}`);
  }
  return { isValid: errors.length === 0, errors };
}
