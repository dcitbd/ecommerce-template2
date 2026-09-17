import { Brand } from "@/types/brand";

export const INITIAL_BRANDS: Brand[] = [
  { id: "b-sony", name: "Sony", slug: "sony", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 42 },
  { id: "b-canon", name: "Canon", slug: "canon", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 38 },
  { id: "b-nikon", name: "Nikon", slug: "nikon", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 26 },
  { id: "b-fuji", name: "Fujifilm", slug: "fujifilm", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 20 },
  { id: "b-sigma", name: "Sigma", slug: "sigma", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 25 },
  { id: "b-tamron", name: "Tamron", slug: "tamron", logo: "/public/images/default-brand.webp", originCountry: "Japan", productCount: 18 },
  { id: "b-dji", name: "DJI", slug: "dji", logo: "/public/images/default-brand.webp", originCountry: "China", productCount: 30 },
  { id: "b-godox", name: "Godox", slug: "godox", logo: "/public/images/default-brand.webp", originCountry: "China", productCount: 22 },
  { id: "b-gopro", name: "GoPro", slug: "gopro", logo: "/public/images/default-brand.webp", originCountry: "USA", productCount: 15 },
  { id: "b-rode", name: "Rode", slug: "rode", logo: "/public/images/default-brand.webp", originCountry: "Australia", productCount: 14 }
];

export function getBrands(): Brand[] {
  try {
    const raw = localStorage.getItem("twbd_brands");
    return raw ? JSON.parse(raw) : INITIAL_BRANDS;
  } catch {
    return INITIAL_BRANDS;
  }
}

export function saveBrands(brands: Brand[]) {
  localStorage.setItem("twbd_brands", JSON.stringify(brands));
}
