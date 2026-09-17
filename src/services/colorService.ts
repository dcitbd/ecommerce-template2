import { ColorItem } from "@/types/color";

export const INITIAL_COLORS: ColorItem[] = [
  { id: "c-black", name: "Black", hexCode: "#111827", productCount: 180 },
  { id: "c-silver", name: "Silver", hexCode: "#E5E7EB", productCount: 45 },
  { id: "c-white", name: "White", hexCode: "#FFFFFF", productCount: 15 },
  { id: "c-grey", name: "Space Grey", hexCode: "#4B5563", productCount: 28 },
  { id: "c-red", name: "Red", hexCode: "#EF4444", productCount: 8 }
];

export function getColors(): ColorItem[] {
  try {
    const raw = localStorage.getItem("twbd_colors");
    return raw ? JSON.parse(raw) : INITIAL_COLORS;
  } catch {
    return INITIAL_COLORS;
  }
}

export function saveColors(colors: ColorItem[]) {
  localStorage.setItem("twbd_colors", JSON.stringify(colors));
}
