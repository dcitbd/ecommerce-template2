import React, { useState, useMemo } from "react";
import { ProductFilterSidebar, FilterState } from "@/components/product/ProductFilterSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { getColors } from "@/services/colorService";
import { getSizes } from "@/services/sizeService";

export const ProductsPage: React.FC<{
  initialCategory?: string;
  initialBrand?: string;
  initialOrderType?: string;
  navigate: (route: string) => void;
}> = ({ initialCategory = "", initialBrand = "", initialOrderType = "", navigate }) => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const colors = getColors();
  const sizes = getSizes();

  const [filters, setFilters] = useState<FilterState>({
    categoryId: initialCategory,
    subCategoryId: "",
    childCategoryId: "",
    minPrice: 0,
    maxPrice: 0,
    selectedBrands: initialBrand ? [initialBrand] : [],
    stockStatus: "in_stock", // Default "In Stock" selected as requested
    orderTypes: initialOrderType ? [initialOrderType] : [],
    minRating: 0,
    selectedColors: [],
    selectedSizes: [],
    manufacturerCountry: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // 30 products per page as requested

  // Multi-facet filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
      if (filters.subCategoryId && p.subCategoryId !== filters.subCategoryId) return false;
      if (filters.childCategoryId && p.childCategoryId !== filters.childCategoryId) return false;

      // Stock
      if (filters.stockStatus === "in_stock" && p.stock <= 0) return false;
      if (filters.stockStatus === "out_of_stock" && p.stock > 0) return false;

      // Order Types
      if (filters.orderTypes.length > 0 && !filters.orderTypes.some(t => p.orderTypes.includes(t as any))) {
        return false;
      }

      // Brands
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price Range
      const effectivePrice = p.prices.stockPrice || p.prices.preOrderPrice || p.prices.mrp;
      if (filters.minPrice > 0 && effectivePrice < filters.minPrice) return false;
      if (filters.maxPrice > 0 && effectivePrice > filters.maxPrice) return false;

      // Rating
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;

      // Colors
      if (filters.selectedColors.length > 0 && !filters.selectedColors.some(c => p.color.includes(c))) {
        return false;
      }

      // Sizes
      if (filters.selectedSizes.length > 0 && !filters.selectedSizes.some(s => p.sizeKit.includes(s))) {
        return false;
      }

      // Country
      if (filters.manufacturerCountry && p.manufacturerCountry !== filters.manufacturerCountry) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setFilters({
      categoryId: "",
      subCategoryId: "",
      childCategoryId: "",
      minPrice: 0,
      maxPrice: 0,
      selectedBrands: [],
      stockStatus: "all",
      orderTypes: [],
      minRating: 0,
      selectedColors: [],
      selectedSizes: [],
      manufacturerCountry: "",
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <span onClick={() => navigate("")} className="hover:text-indigo-600 cursor-pointer">হোম</span>
        <span>/</span>
        <span className="font-bold text-slate-800">প্রোডাক্ট’স ক্যাটালগ</span>
        <span className="ml-auto text-slate-400 font-mono">
          মোট {filteredProducts.length} টি পণ্য পাওয়া গেছে
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filter Sidebar */}
        <ProductFilterSidebar
          categories={categories}
          brands={brands}
          colors={colors}
          sizes={sizes}
          filters={filters}
          onChange={f => { setFilters(f); setCurrentPage(1); }}
          onReset={handleResetFilters}
        />

        {/* Right 4-Grid Products Display */}
        <div className="flex-1 w-full space-y-6">
          {currentItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="text-base font-bold text-slate-800">কোন প্রোডাক্ট মেলেনি</h3>
              <p className="text-xs text-slate-500 mb-4">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
              <button
                onClick={handleResetFilters}
                className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <>
              {/* 4-Column Grid as specified */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentItems.map(p => (
                  <ProductCard key={p.id} product={p} navigate={navigate} />
                ))}
              </div>

              {/* Pagination (<, 1, 2, 3 ... 14, >) */}
              <div className="pt-8 pb-4 flex items-center justify-center gap-1.5 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
