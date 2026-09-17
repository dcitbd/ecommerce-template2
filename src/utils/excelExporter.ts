import { exportToCSV } from "./csvExporter";

export function exportToExcel(filename: string, rows: Record<string, any>[]): void {
  // Generates spreadsheet-compatible CSV with UTF-8 BOM
  exportToCSV(`${filename}-spreadsheet`, rows);
}
