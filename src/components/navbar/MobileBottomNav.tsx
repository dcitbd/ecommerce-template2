import React from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";

export const MobileBottomNav: React.FC<{
  currentRoute: string;
  navigate: (route: string) => void;
}> = ({ currentRoute, navigate }) => {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user } = useAuth();

  const navItems = [
    { label: "হোম", icon: "🏠", route: "" },
    { label: "শপ", icon: "📷", route: "products" },
    { label: "কার্ট", icon: "🛒", route: "cart", badge: itemCount },
    { label: "উইশলিস্ট", icon: "❤️", route: "wishlist", badge: wishlistCount },
    {
      label: user ? "অ্যাকাউন্ট" : "লগইন",
      icon: "👤",
      route: user ? (["Super Admin", "Admin", "Manager", "Worker"].includes(user.role) ? "admin" : "customer") : "login"
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-2xl py-1.5 px-3 flex items-center justify-around">
      {navItems.map(item => {
        const isActive = currentRoute === item.route;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.route)}
            className={`flex flex-col items-center justify-center w-14 py-1 relative rounded-xl transition-all ${
              isActive ? "text-indigo-600 font-bold" : "text-slate-600"
            }`}
          >
            <span className="text-xl relative">
              {item.icon}
              {!!item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
