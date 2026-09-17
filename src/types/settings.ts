export interface MarketplaceLink {
  platform: string;
  url: string;
  accountPhone?: string;
  status: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  logoUrl: string;
  watermarkUrl: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  email: string;
  address: string;
  wholesaleMinPieces: number;
  warrantyDays: number;
  deliveryDays: string;
  socialLinks: SocialLink[];
  marketplaces: MarketplaceLink[];
}
