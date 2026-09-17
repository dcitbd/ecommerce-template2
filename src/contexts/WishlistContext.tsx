import React, { createContext, useContext, useState, useEffect } from "react";
import { WishlistItem } from "@/types/wishlist";
import { wishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types/product";

interface WishlistContextType {
  items: WishlistItem[];
  count: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(wishlistStore.getItems());

  const refreshWishlist = () => setItems(wishlistStore.getItems());

  useEffect(() => {
    window.addEventListener("wishlist_updated", refreshWishlist);
    return () => window.removeEventListener("wishlist_updated", refreshWishlist);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        toggleWishlist: wishlistStore.toggleWishlist,
        isInWishlist: wishlistStore.isInWishlist,
        removeItem: wishlistStore.removeItem
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlistContext must be used within WishlistProvider");
  return ctx;
};
