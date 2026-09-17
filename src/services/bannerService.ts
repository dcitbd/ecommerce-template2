export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  link: string;
  categoryId?: string;
  order: number;
  isActive: boolean;
}

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: "ban-1",
    title: "দুবাই থেকে সেরা দামে প্রি-অর্ডার",
    subtitle: "সনি, ক্যানন ও নিকন ক্যামেরায় বাজারের সর্বোচ্চ ছাড়! ১০–১৫ দিনে ১০০% জেনুইন ডেলিভারি।",
    badge: "🔥 হট ডিল — দুবাই ডাইরেক্ট ইমপোর্ট",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
    link: "/products?orderType=Pre-Order",
    order: 1,
    isActive: true
  },
  {
    id: "ban-2",
    title: "হোলসেল ও রিটেইল পাইকারি অফার",
    subtitle: "ন্যূনতম ১০ পিসে স্পেশাল হোলসেল রেট। চুক্তির মাধ্যমে ক্যাশ ও ব্যাংক পেমেন্ট সুবিধা।",
    badge: "📦 হোলসেল প্রিমিয়াম ডিলারশিপ",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
    link: "/products?orderType=WholeSale",
    order: 2,
    isActive: true
  },
  {
    id: "ban-3",
    title: "Sony A7 IV & A7C II ইন স্টক!",
    subtitle: "ফুল-ফ্রেম হাইব্রিড ক্যামেরার সাথে ২ সপ্তাহের রিপ্লেসমেন্ট ওয়ারেন্টি।",
    badge: "🚀 রেডি স্টক",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1400&q=80",
    link: "/products?brand=Sony",
    order: 3,
    isActive: true
  }
];

export function getBanners(): BannerItem[] {
  try {
    const raw = localStorage.getItem("twbd_banners");
    return raw ? JSON.parse(raw) : INITIAL_BANNERS;
  } catch {
    return INITIAL_BANNERS;
  }
}

export function saveBanners(banners: BannerItem[]) {
  localStorage.setItem("twbd_banners", JSON.stringify(banners));
}
