import { getWishlistItems, saveWishlistItems } from "@/services/wishlistService";
import { WishlistItem } from "@/types/wishlist";
import { Product } from "@/types/product";

export const wishlistStore = {
  getItems: (): WishlistItem[] => getWishlistItems(),
  toggleWishlist: (product: Product) => {
    const items = getWishlistItems();
    const index = items.findIndex(i => i.productId === product.id);
    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push({
        productId: product.id,
        name: product.name,
        article: product.article,
        image: product.images[0] || "/public/images/default-product.webp",
        price: product.prices.stockPrice || product.prices.mrp,
        mrp: product.prices.mrp,
        stock: product.stock,
        orderTypes: product.orderTypes,
        addedAt: new Date().toISOString()
      });
    }
    saveWishlistItems(items);
    window.dispatchEvent(new Event("wishlist_updated"));
  },
  isInWishlist: (productId: string): boolean => {
    return getWishlistItems().some(i => i.productId === productId);
  },
  removeItem: (productId: string) => {
    const items = getWishlistItems().filter(i => i.productId !== productId);
    saveWishlistItems(items);
    window.dispatchEvent(new Event("wishlist_updated"));
  }
};
