import React from "react";
import { CategoryBannerCarousel } from "@/components/home/CategoryBannerCarousel";
import { BrandCards } from "@/components/home/BrandCards";
import { PopularProducts } from "@/components/home/PopularProducts";
import { CategorySections } from "@/components/home/CategorySections";
import { CompanyReviews } from "@/components/home/CompanyReviews";
import { SocialMarketplaceSection } from "@/components/home/SocialMarketplaceSection";
import { DeliveryCards } from "@/components/home/DeliveryCards";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { useProducts } from "@/hooks/useProducts";

export const HomePage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { products } = useProducts();

  return (
    <div className="space-y-4 pb-12">
      {/* 20% Category / 80% 10 Sliding Banners */}
      <CategoryBannerCarousel categories={categories} navigate={navigate} />

      {/* Round Brand Cards */}
      <BrandCards brands={brands} navigate={navigate} />

      {/* Popular Products: 2 * 6 = 12 Product Cards */}
      <PopularProducts products={products} navigate={navigate} />

      {/* Category-wise Sections: 2 * 6 = 12 Product Cards each + See All */}
      <CategorySections categories={categories} products={products} navigate={navigate} />

      {/* Company Reviews */}
      <CompanyReviews />

      {/* Social & Marketplace Channels */}
      <SocialMarketplaceSection />

      {/* Delivery Cards */}
      <DeliveryCards />
    </div>
  );
};
