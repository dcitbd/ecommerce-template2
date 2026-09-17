import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/cart";
import { cartStore } from "@/store/cartStore";
import { Product, OrderType } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, orderType: OrderType, quantity?: number, color?: string, size?: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

  const refreshCart = () => setItems(cartStore.getItems());

  useEffect(() => {
    window.addEventListener("cart_updated", refreshCart);
    return () => window.removeEventListener("cart_updated", refreshCart);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem: cartStore.addItem,
        updateQuantity: cartStore.updateQuantity,
        removeItem: cartStore.removeItem,
        clearCart: cartStore.clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
