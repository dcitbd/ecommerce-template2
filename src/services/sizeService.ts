import { SizeKitItem } from "@/types/size";

export const INITIAL_SIZES: SizeKitItem[] = [
  { id: "sz-body", name: "Body Only", productCount: 65 },
  { id: "sz-kit-24-70", name: "24-70mm Kit", productCount: 30 },
  { id: "sz-kit-28-70", name: "28-70mm Kit", productCount: 22 },
  { id: "sz-kit-18-135", name: "18-135mm Kit", productCount: 18 },
  { id: "sz-creator-combo", name: "Creator Combo", productCount: 25 },
  { id: "sz-standard", name: "Standard Pack", productCount: 75 }
];

export function getSizes(): SizeKitItem[] {
  try {
    const raw = localStorage.getItem("twbd_sizes");
    return raw ? JSON.parse(raw) : INITIAL_SIZES;
  } catch {
    return INITIAL_SIZES;
  }
}

export function saveSizes(sizes: SizeKitItem[]) {
  localStorage.setItem("twbd_sizes", JSON.stringify(sizes));
}
