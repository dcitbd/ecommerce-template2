import { Product } from "@/types/product";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Sony Alpha A7 IV Mirrorless Camera",
    slug: "sn-a7m4-sony-alpha-a7-iv-mirrorless-camera",
    article: "SN-A7M4",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-mirrorless",
    childCategoryId: "child-full-frame",
    brand: "Sony",
    color: ["Black"],
    sizeKit: ["Body Only", "28-70mm Kit Lens"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 275000,
      stockPrice: 248000,
      preOrderPrice: 232000,
      wholesalePrice: 220000,
      minWholesaleQty: 10
    },
    stock: 14,
    rating: 4.9,
    reviewsCount: 38,
    viewsCount: 1420,
    totalOrders: 64,
    totalWishlist: 110,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "33MP Full-Frame Exmor R CMOS",
      "Video": "4K 60p 10-Bit 4:2:2",
      "ISO": "100-51200",
      "Stabilization": "5-Axis SteadyShot Inside"
    },
    description: "দুবাই ও হংকং থেকে আমদানিকৃত ১০০% আসল সনি আলফা ৭৪ ক্যামেরা। দ্রুত অটোফোকাস এবং সিনেমাটিক ভিডিওর জন্য সেরা পছন্দ।",
    manufacturerCountry: "Japan",
    weightKg: 0.85,
    isActive: true,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-09-10T12:00:00Z"
  },
  {
    id: "prod-002",
    name: "Canon PowerShot G7 X Mark III",
    slug: "cn-g7x3-canon-powershot-g7-x-mark-iii",
    article: "CN-G7X3",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-compact",
    brand: "Canon",
    color: ["Black", "Silver"],
    sizeKit: ["Standard Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 95000,
      stockPrice: 84000,
      preOrderPrice: 77000,
      wholesalePrice: 72000,
      minWholesaleQty: 10
    },
    stock: 22,
    rating: 4.8,
    reviewsCount: 52,
    viewsCount: 2850,
    totalOrders: 115,
    totalWishlist: 240,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "20.1MP 1.0-inch Stacked CMOS",
      "Lens": "4.2x Optical Zoom (24-100mm f/1.8-2.8)",
      "Video": "4K 30p Without Crop",
      "Live Streaming": "Supported"
    },
    description: "ভ্লগার এবং কনটেন্ট ক্রিয়েটরদের জন্য জনপ্রিয় কমপ্যাক্ট ক্যামেরা। লাইভ স্ট্রিমিং ও ৪কে ভিডিও সাপোর্ট।",
    manufacturerCountry: "Japan",
    weightKg: 0.35,
    isActive: true,
    createdAt: "2026-07-15T09:00:00Z",
    updatedAt: "2026-09-12T14:00:00Z"
  },
  {
    id: "prod-003",
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    slug: "cn-r6m2-canon-eos-r6-mark-ii",
    article: "CN-R6M2",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-mirrorless",
    childCategoryId: "child-full-frame",
    brand: "Canon",
    color: ["Black"],
    sizeKit: ["Body Only", "24-105mm STM Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 290000,
      stockPrice: 265000,
      preOrderPrice: 245000,
      wholesalePrice: 235000,
      minWholesaleQty: 10
    },
    stock: 8,
    rating: 5.0,
    reviewsCount: 29,
    viewsCount: 1680,
    totalOrders: 42,
    totalWishlist: 95,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "24.2MP Full-Frame CMOS",
      "Continuous Shooting": "Up to 40 fps",
      "Video": "6K Over-sampled 4K 60p",
      "AF": "Dual Pixel CMOS AF II"
    },
    description: "ওয়াইল্ডলাইফ, স্পোর্টস এবং হাই-স্পিড ইভেন্ট ফটোগ্রাফির প্রিমিয়াম চয়েস।",
    manufacturerCountry: "Japan",
    weightKg: 0.9,
    isActive: true,
    createdAt: "2026-08-10T10:00:00Z",
    updatedAt: "2026-09-15T11:00:00Z"
  },
  {
    id: "prod-004",
    name: "Sony FE 24-70mm f/2.8 GM II Lens",
    slug: "sn-2470gm2-sony-fe-24-70mm-f2-8-gm-ii",
    article: "SN-2470GM2",
    categoryId: "cat-lenses",
    categoryName: "Camera Lenses",
    subCategoryId: "sub-zoom-lens",
    brand: "Sony",
    color: ["Black"],
    sizeKit: ["Standard Filter 82mm"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 235000,
      stockPrice: 215000,
      preOrderPrice: 198000,
      wholesalePrice: 189000,
      minWholesaleQty: 10
    },
    stock: 12,
    rating: 4.9,
    reviewsCount: 24,
    viewsCount: 1100,
    totalOrders: 35,
    totalWishlist: 67,
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Focal Length": "24 to 70mm",
      "Aperture": "f/2.8 to f/22",
      "Mount": "Sony E",
      "Filter Size": "82 mm"
    },
    description: "বিশ্বের অন্যতম জনপ্রিয় জি-মাস্টার স্ট্যান্ডার্ড জুম লেন্স। পোর্ট্রেট ও বিয়ের কাজের সেরা সমাধান।",
    manufacturerCountry: "Japan",
    weightKg: 0.695,
    isActive: true,
    createdAt: "2026-08-12T12:00:00Z",
    updatedAt: "2026-09-14T09:00:00Z"
  },
  {
    id: "prod-005",
    name: "Sigma 24-70mm f/2.8 DG DN Art Lens for Sony E",
    slug: "sg-2470art-sigma-24-70mm-f2-8-art-sony-e",
    article: "SG-2470ART",
    categoryId: "cat-lenses",
    categoryName: "Camera Lenses",
    subCategoryId: "sub-zoom-lens",
    brand: "Sigma",
    color: ["Black"],
    sizeKit: ["Standard Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 125000,
      stockPrice: 112000,
      preOrderPrice: 104000,
      wholesalePrice: 98000,
      minWholesaleQty: 10
    },
    stock: 18,
    rating: 4.8,
    reviewsCount: 45,
    viewsCount: 1950,
    totalOrders: 82,
    totalWishlist: 140,
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Focal Range": "24-70mm",
      "Maximum Aperture": "f/2.8",
      "Lens Construction": "19 elements in 15 groups"
    },
    description: "বাজেটের মধ্যে বেস্ট কোয়ালিটি আর্ট সিরিজ স্ট্যান্ডার্ড জুম লেন্স।",
    manufacturerCountry: "Japan",
    weightKg: 0.83,
    isActive: true,
    createdAt: "2026-07-20T11:00:00Z",
    updatedAt: "2026-09-12T15:00:00Z"
  },
  {
    id: "prod-006",
    name: "Nikon Z6 II Mirrorless Camera Body",
    slug: "nk-z6m2-nikon-z6-ii-mirrorless-camera",
    article: "NK-Z6M2",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-mirrorless",
    childCategoryId: "child-full-frame",
    brand: "Nikon",
    color: ["Black"],
    sizeKit: ["Body Only", "24-70mm f/4 Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 210000,
      stockPrice: 188000,
      preOrderPrice: 175000,
      wholesalePrice: 168000,
      minWholesaleQty: 10
    },
    stock: 6,
    rating: 4.7,
    reviewsCount: 19,
    viewsCount: 980,
    totalOrders: 28,
    totalWishlist: 55,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "24.5MP BSI CMOS",
      "Processors": "Dual EXPEED 6",
      "Video": "4K UHD 60p",
      "Card Slots": "Dual (CFexpress/XQD + SD)"
    },
    description: "নিকনের নির্ভরযোগ্য কালার সায়েন্স ও ডাবল প্রসেসর সমৃদ্ধ পারফর্মিং ফুল ফ্রেম ক্যামেরা।",
    manufacturerCountry: "Japan",
    weightKg: 0.705,
    isActive: true,
    createdAt: "2026-07-25T14:00:00Z",
    updatedAt: "2026-09-10T16:00:00Z"
  },
  {
    id: "prod-007",
    name: "Fujifilm X-T5 Mirrorless Digital Camera",
    slug: "fj-xt5-fujifilm-x-t5-mirrorless-camera",
    article: "FJ-XT5",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-mirrorless",
    brand: "Fujifilm",
    color: ["Black", "Silver"],
    sizeKit: ["Body Only", "16-80mm Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 205000,
      stockPrice: 189000,
      preOrderPrice: 178000,
      wholesalePrice: 170000,
      minWholesaleQty: 10
    },
    stock: 9,
    rating: 4.9,
    reviewsCount: 31,
    viewsCount: 1540,
    totalOrders: 47,
    totalWishlist: 102,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "40.2MP APS-C X-Trans CMOS 5 HR",
      "IBIS": "7-Stop In-Body Image Stabilization",
      "Video": "6.2K 30p 4:2:2 10-Bit"
    },
    description: "ক্লাসিক ডায়াল ডিজাইন ও ফুজিফিল্মের ম্যাজিকাল ফিল্ম সিমুলেশন সহ ৪০ মেগাপিক্সেল হাই-রেজোলিউশন ক্যামেরা।",
    manufacturerCountry: "Japan",
    weightKg: 0.557,
    isActive: true,
    createdAt: "2026-08-05T13:00:00Z",
    updatedAt: "2026-09-14T11:00:00Z"
  },
  {
    id: "prod-008",
    name: "DJI Osmo Pocket 3 Creator Combo",
    slug: "dji-op3-dji-osmo-pocket-3-creator-combo",
    article: "DJI-OP3",
    categoryId: "cat-gimbals",
    categoryName: "Gimbals & Action",
    subCategoryId: "sub-action-cams",
    brand: "DJI",
    color: ["Black"],
    sizeKit: ["Creator Combo"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 82000,
      stockPrice: 73500,
      preOrderPrice: 68000,
      wholesalePrice: 64000,
      minWholesaleQty: 10
    },
    stock: 35,
    rating: 5.0,
    reviewsCount: 68,
    viewsCount: 4200,
    totalOrders: 190,
    totalWishlist: 310,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "1-Inch CMOS",
      "Screen": "2-Inch Rotatable OLED Touchscreen",
      "Video": "4K 120fps & 10-Bit D-Log M",
      "Stabilization": "3-Axis Mechanical Gimbal"
    },
    description: "পকেট সাইজ ভ্লগিং ক্যামেরা। ১ ইঞ্চি সেন্সর ও ডিজেআই মাইক ২ সহ ক্রিয়েটরদের এক নম্বর পছন্দ।",
    manufacturerCountry: "China",
    weightKg: 0.179,
    isActive: true,
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-09-15T10:00:00Z"
  },
  {
    id: "prod-009",
    name: "GoPro HERO12 Black Action Camera",
    slug: "gp-hero12-gopro-hero-12-black",
    article: "GP-HERO12",
    categoryId: "cat-gimbals",
    categoryName: "Gimbals & Action",
    subCategoryId: "sub-action-cams",
    brand: "GoPro",
    color: ["Black"],
    sizeKit: ["Standard Pack"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 52000,
      stockPrice: 45000,
      preOrderPrice: 41000,
      wholesalePrice: 38500,
      minWholesaleQty: 10
    },
    stock: 28,
    rating: 4.8,
    reviewsCount: 41,
    viewsCount: 2100,
    totalOrders: 130,
    totalWishlist: 180,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Video": "5.3K 60p, 4K 120p",
      "Stabilization": "HyperSmooth 6.0",
      "Waterproof": "Up to 33ft (10m)",
      "HDR": "High Dynamic Range Video + Photo"
    },
    description: "এডভেঞ্চার ট্রাভেলার ও স্পোর্টস ভিডিওর জন্য অল-ওয়েদার ওয়াটারপ্রুফ একশন ক্যামেরা।",
    manufacturerCountry: "USA / Dubai",
    weightKg: 0.154,
    isActive: true,
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-09-11T12:00:00Z"
  },
  {
    id: "prod-010",
    name: "Godox V1 Round Head Camera Flash",
    slug: "gdx-v1-godox-v1-round-head-flash",
    article: "GDX-V1",
    categoryId: "cat-lighting",
    categoryName: "Studio & Lighting",
    subCategoryId: "sub-speedlight",
    brand: "Godox",
    color: ["Black"],
    sizeKit: ["For Sony", "For Canon", "For Nikon"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 29000,
      stockPrice: 24500,
      preOrderPrice: 22000,
      wholesalePrice: 20500,
      minWholesaleQty: 10
    },
    stock: 40,
    rating: 4.8,
    reviewsCount: 33,
    viewsCount: 1400,
    totalOrders: 94,
    totalWishlist: 88,
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Power": "76Ws Output",
      "Head": "Round Head for Soft Natural Light",
      "Battery": "Rechargeable Lithium-Ion"
    },
    description: "রাউন্ড হেড সফট লাইটিং ইফেক্ট সহ প্রিমিয়াম অন-ক্যামেরা স্পিডলাইট।",
    manufacturerCountry: "China",
    weightKg: 0.53,
    isActive: true,
    createdAt: "2026-08-15T15:00:00Z",
    updatedAt: "2026-09-13T10:00:00Z"
  },
  {
    id: "prod-011",
    name: "Sony Alpha 7C II Compact Full-Frame",
    slug: "sn-a7cm2-sony-alpha-7c-ii",
    article: "SN-A7CM2",
    categoryId: "cat-cameras",
    categoryName: "Digital Cameras",
    subCategoryId: "sub-mirrorless",
    childCategoryId: "child-full-frame",
    brand: "Sony",
    color: ["Silver", "Black"],
    sizeKit: ["Body Only", "28-60mm Kit"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 255000,
      stockPrice: 232000,
      preOrderPrice: 218000,
      wholesalePrice: 209000,
      minWholesaleQty: 10
    },
    stock: 7,
    rating: 4.9,
    reviewsCount: 22,
    viewsCount: 1800,
    totalOrders: 36,
    totalWishlist: 90,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Sensor": "33.0MP Full-Frame Exmor R",
      "AI Processing Unit": "Advanced Subject Recognition",
      "Weight": "Super Compact 514g"
    },
    description: "কমপ্যাক্ট বডিতে ফুলফ্রেমের সর্বোচ্চ ক্ষমতা এবং এআই ট্র্যাকিং টেকনোলজি।",
    manufacturerCountry: "Japan",
    weightKg: 0.514,
    isActive: true,
    createdAt: "2026-08-20T12:00:00Z",
    updatedAt: "2026-09-15T14:00:00Z"
  },
  {
    id: "prod-012",
    name: "Canon EF 70-200mm f/2.8L IS III USM Lens",
    slug: "cn-70200is3-canon-ef-70-200mm-f2-8l-is-iii",
    article: "CN-70200IS3",
    categoryId: "cat-lenses",
    categoryName: "Camera Lenses",
    subCategoryId: "sub-telephoto",
    brand: "Canon",
    color: ["White"],
    sizeKit: ["Standard with Collar"],
    condition: "Brand New",
    orderTypes: ["Stock", "Pre-Order", "WholeSale"],
    prices: {
      mrp: 240000,
      stockPrice: 219000,
      preOrderPrice: 205000,
      wholesalePrice: 198000,
      minWholesaleQty: 10
    },
    stock: 5,
    rating: 5.0,
    reviewsCount: 27,
    viewsCount: 1320,
    totalOrders: 31,
    totalWishlist: 76,
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80"
    ],
    specifications: {
      "Focal Length": "70 to 200mm",
      "Aperture": "f/2.8 Constant",
      "Stabilization": "3.5 Stops Optical IS",
      "Coating": "Air Sphere Coating (ASC)"
    },
    description: "টেলিফটো পোর্ট্রেট, স্পোর্টস ও ওয়েডিং ফটোগ্রাফির অবিসংবাদিত রাজা এল-সিরিজ লেন্স।",
    manufacturerCountry: "Japan",
    weightKg: 1.48,
    isActive: true,
    createdAt: "2026-08-22T10:00:00Z",
    updatedAt: "2026-09-14T17:00:00Z"
  }
];
