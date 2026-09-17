import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppRoutes } from "@/routes/AppRoutes";

export function App() {
  const getHashRoute = () => window.location.hash.replace(/^#\/?/, "");
  const [currentRoute, setCurrentRoute] = useState<string>(getHashRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getHashRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route ? `/${route}` : "/";
  };

  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <NotificationProvider>
                <AppRoutes currentRoute={currentRoute} navigate={navigate} />
              </NotificationProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
