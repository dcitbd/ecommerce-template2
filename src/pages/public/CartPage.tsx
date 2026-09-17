import React from "react";
import { CartView } from "@/components/cart/CartView";
export const CartPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <CartView navigate={navigate} />;
