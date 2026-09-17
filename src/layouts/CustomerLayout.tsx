import React from "react";
import { TopBar } from "@/components/navbar/TopBar";
import { MainNavbar } from "@/components/navbar/MainNavbar";
import { MobileBottomNav } from "@/components/navbar/MobileBottomNav";
import { Footer } from "@/components/footer/Footer";

export const CustomerLayout: React.FC<{
  currentRoute: string;
  navigate: (route: string) => void;
  children: React.ReactNode;
}> = ({ currentRoute, navigate, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TopBar />
      <MainNavbar currentRoute={currentRoute} navigate={navigate} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer navigate={navigate} />
      <MobileBottomNav currentRoute={currentRoute} navigate={navigate} />
    </div>
  );
};
