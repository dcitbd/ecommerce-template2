export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  originCountry: string;
  subCategories?: string[];
  childCategories?: string[];
  productCount: number;
}
