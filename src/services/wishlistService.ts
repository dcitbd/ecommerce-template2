import { WishlistItem } from "@/types/wishlist";

const WISHLIST_KEY = "twbd_wishlist_items";

export function getWishlistItems(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWishlistItems(items: WishlistItem[]): void {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}
