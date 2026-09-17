export function generateBarcodeDataUrl(code: string): string {
  // Lightweight SVG barcode generation
  const encoded = btoa(code);
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50"><text x="10" y="30" font-family="monospace" font-size="18">||| | |||| | ${code} ||</text></svg>`;
}
