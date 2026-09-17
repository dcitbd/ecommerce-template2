import { SiteSettings } from "@/types/settings";
import { SITE_CONFIG } from "@/config/siteConfig";

const SETTINGS_KEY = "twbd_site_settings";

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: SITE_CONFIG.name,
  slogan: "সেরা দামে ক্যামেরা, লেন্স ও প্রিমিয়াম প্রি-অর্ডার গ্যাজেট",
  logoUrl: "/public/logo.svg",
  watermarkUrl: "/public/watermark.svg",
  phone: SITE_CONFIG.phone,
  whatsapp: SITE_CONFIG.whatsapp,
  telegram: SITE_CONFIG.telegram,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  wholesaleMinPieces: SITE_CONFIG.wholesaleMinPieces,
  warrantyDays: 14,
  deliveryDays: SITE_CONFIG.deliveryDuration,
  socialLinks: SITE_CONFIG.socialLinks,
  marketplaces: SITE_CONFIG.marketplaces
};

export function getSiteSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_SETTINGS;
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
