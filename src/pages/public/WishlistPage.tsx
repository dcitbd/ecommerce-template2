import React from "react";
import { WishlistView } from "@/components/wishlist/WishlistView";
export const WishlistPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <WishlistView navigate={navigate} />;
