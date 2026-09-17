export function printElement(elementId: string): void {
  const elem = document.getElementById(elementId);
  if (!elem) return;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Order Voucher - Techno World BD</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #111; }
          .voucher-box { border: 2px solid #333; padding: 25px; position: relative; }
          .watermark { position: absolute; top: 30%; left: 25%; opacity: 0.08; transform: rotate(-30deg); font-size: 60px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        ${elem.innerHTML}
        <script>
          window.onload = function() { window.print(); window.close(); };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
