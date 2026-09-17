import { Category } from "@/types/category";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-cameras",
    name: "Digital Cameras",
    slug: "digital-cameras",
    productCount: 45,
    subCategories: [
      {
        id: "sub-mirrorless",
        name: "Mirrorless Cameras",
        slug: "mirrorless",
        categoryId: "cat-cameras",
        productCount: 30,
        children: [
          { id: "child-full-frame", name: "Full-Frame", slug: "full-frame", subCategoryId: "sub-mirrorless", productCount: 20 },
          { id: "child-aps-c", name: "APS-C Crop", slug: "aps-c", subCategoryId: "sub-mirrorless", productCount: 10 }
        ]
      },
      {
        id: "sub-dslr",
        name: "DSLR Cameras",
        slug: "dslr",
        categoryId: "cat-cameras",
        productCount: 10,
        children: []
      },
      {
        id: "sub-compact",
        name: "Compact & Vlogging",
        slug: "compact-vlogging",
        categoryId: "cat-cameras",
        productCount: 5,
        children: []
      }
    ]
  },
  {
    id: "cat-lenses",
    name: "Camera Lenses",
    slug: "camera-lenses",
    productCount: 65,
    subCategories: [
      {
        id: "sub-prime-lens",
        name: "Prime Lenses",
        slug: "prime-lenses",
        categoryId: "cat-lenses",
        productCount: 25,
        children: []
      },
      {
        id: "sub-zoom-lens",
        name: "Standard Zoom",
        slug: "standard-zoom",
        categoryId: "cat-lenses",
        productCount: 25,
        children: []
      },
      {
        id: "sub-telephoto",
        name: "Telephoto Zoom",
        slug: "telephoto-zoom",
        categoryId: "cat-lenses",
        productCount: 15,
        children: []
      }
    ]
  },
  {
    id: "cat-gimbals",
    name: "Gimbals & Action",
    slug: "gimbals-action",
    productCount: 28,
    subCategories: [
      { id: "sub-stabilizers", name: "Camera Stabilizers", slug: "camera-stabilizers", categoryId: "cat-gimbals", productCount: 14, children: [] },
      { id: "sub-action-cams", name: "Action & Pocket Cams", slug: "action-pocket", categoryId: "cat-gimbals", productCount: 14, children: [] }
    ]
  },
  {
    id: "cat-lighting",
    name: "Studio & Lighting",
    slug: "studio-lighting",
    productCount: 32,
    subCategories: [
      { id: "sub-speedlight", name: "Speedlights & Flashes", slug: "speedlights", categoryId: "cat-lighting", productCount: 16, children: [] },
      { id: "sub-led-lights", name: "Continuous Video Lights", slug: "led-lights", categoryId: "cat-lighting", productCount: 16, children: [] }
    ]
  },
  {
    id: "cat-audio",
    name: "Wireless Microphones",
    slug: "wireless-microphones",
    productCount: 20,
    subCategories: []
  },
  {
    id: "cat-drones",
    name: "Aerial Drones",
    slug: "aerial-drones",
    productCount: 12,
    subCategories: []
  }
];

const CAT_STORAGE_KEY = "twbd_categories";

export function getCategories(): Category[] {
  try {
    const raw = localStorage.getItem(CAT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]) {
  localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(categories));
}
