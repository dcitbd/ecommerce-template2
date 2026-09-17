export interface ChildCategory {
  id: string;
  name: string;
  slug: string;
  subCategoryId: string;
  productCount: number;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  productCount: number;
  children: ChildCategory[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  productCount: number;
  subCategories: SubCategory[];
}
