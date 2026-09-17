import { getCartItems, saveCartItems } from "@/services/cartService";
import { CartItem } from "@/types/cart";
import { Product, OrderType } from "@/types/product";

export const cartStore = {
  getItems: (): CartItem[] => getCartItems(),
  addItem: (product: Product, orderType: OrderType, quantity: number = 1, color?: string, size?: string) => {
    const items = getCartItems();
    const unitPrice =
      orderType === "WholeSale"
        ? (product.prices.wholesalePrice || product.prices.stockPrice || product.prices.mrp)
        : orderType === "Pre-Order"
        ? (product.prices.preOrderPrice || product.prices.stockPrice || product.prices.mrp)
        : (product.prices.stockPrice || product.prices.mrp);

    const minQty = orderType === "WholeSale" ? (product.prices.minWholesaleQty || 10) : 1;
    const finalQty = Math.max(quantity, minQty);

    const existingIndex = items.findIndex(
      i => i.productId === product.id && i.orderType === orderType && i.selectedColor === color && i.selectedSize === size
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += finalQty;
    } else {
      items.push({
        id: "cart-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        productId: product.id,
        name: product.name,
        article: product.article,
        image: product.images[0] || "/public/images/default-product.webp",
        selectedColor: color,
        selectedSize: size,
        orderType,
        unitPrice,
        quantity: finalQty,
        weightKg: product.weightKg || 0.5,
        minQty,
        stockAvailable: product.stock
      });
    }
    saveCartItems(items);
    window.dispatchEvent(new Event("cart_updated"));
  },
  updateQuantity: (id: string, quantity: number) => {
    const items = getCartItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (quantity < item.minQty) return;
    item.quantity = quantity;
    saveCartItems(items);
    window.dispatchEvent(new Event("cart_updated"));
  },
  removeItem: (id: string) => {
    const items = getCartItems().filter(i => i.id !== id);
    saveCartItems(items);
    window.dispatchEvent(new Event("cart_updated"));
  },
  clearCart: () => {
    saveCartItems([]);
    window.dispatchEvent(new Event("cart_updated"));
  }
};
