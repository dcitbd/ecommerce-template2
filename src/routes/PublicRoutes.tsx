import React from "react";
import { HomePage } from "@/pages/public/HomePage";
import { ProductsPage } from "@/pages/public/ProductsPage";
import { ProductDetailPage } from "@/pages/public/ProductDetailPage";
import { CartPage } from "@/pages/public/CartPage";
import { WishlistPage } from "@/pages/public/WishlistPage";
import { CheckoutPage } from "@/pages/public/CheckoutPage";
import { TrackingPage } from "@/pages/public/TrackingPage";

export const renderPublicRoute = (route: string, navigate: (r: string) => void) => {
  if (route === "" || route === "home") {
    return <HomePage navigate={navigate} />;
  }
  if (route.startsWith("products")) {
    const params = new URLSearchParams(route.includes("?") ? route.split("?")[1] : "");
    return (
      <ProductsPage
        initialCategory={params.get("category") || ""}
        initialBrand={params.get("brand") || ""}
        initialOrderType={params.get("orderType") || ""}
        navigate={navigate}
      />
    );
  }
  if (route.startsWith("product/")) {
    const slug = route.replace("product/", "").split("?")[0];
    return <ProductDetailPage slug={slug} navigate={navigate} />;
  }
  if (route === "cart") {
    return <CartPage navigate={navigate} />;
  }
  if (route === "wishlist") {
    return <WishlistPage navigate={navigate} />;
  }
  if (route === "checkout") {
    return <CheckoutPage navigate={navigate} />;
  }
  if (route === "track") {
    return <TrackingPage navigate={navigate} />;
  }
  return null;
};
