import React from "react";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CustomerLayout } from "@/layouts/CustomerLayout";
import { renderPublicRoute } from "./PublicRoutes";
import { renderAuthRoute } from "./AuthRoutes";
import { renderCustomerRoute } from "./CustomerRoutes";
import { renderAdminRoute } from "./AdminRoutes";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { useAuth } from "@/hooks/useAuth";

export const AppRoutes: React.FC<{
  currentRoute: string;
  navigate: (route: string) => void;
}> = ({ currentRoute, navigate }) => {
  const { user } = useAuth();

  // Admin section routing
  if (currentRoute.startsWith("admin")) {
    const isStaff = user && ["Super Admin", "Admin", "Manager", "Worker"].includes(user.role);
    if (!isStaff) {
      // Redirect to login if unauthorized
      return (
        <PublicLayout currentRoute="login" navigate={navigate}>
          <div className="max-w-md mx-auto py-12 px-4 text-center">
            <div className="p-6 bg-white rounded-3xl border shadow-lg space-y-4">
              <div className="text-3xl">🔒</div>
              <h2 className="font-extrabold text-slate-900 text-sm">অ্যাডমিন প্যানেল সুরক্ষিত</h2>
              <p className="text-xs text-slate-500">প্রবেশের জন্য অ্যাডমিন রোল সম্পন্ন অ্যাকাউন্ট দিয়ে লগইন করুন।</p>
              <button
                onClick={() => navigate("login")}
                className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
              >
                লগইন পেইজে যান
              </button>
            </div>
          </div>
        </PublicLayout>
      );
    }
    return (
      <AdminLayout currentSection={currentRoute} navigate={navigate}>
        {renderAdminRoute(currentRoute, navigate) || <NotFoundPage navigate={navigate} />}
      </AdminLayout>
    );
  }

  // Customer section routing
  if (currentRoute.startsWith("customer")) {
    if (!user) {
      return (
        <PublicLayout currentRoute="login" navigate={navigate}>
          <div className="max-w-md mx-auto py-12 px-4 text-center">
            <div className="p-6 bg-white rounded-3xl border shadow-lg space-y-4">
              <div className="text-3xl">👤</div>
              <h2 className="font-extrabold text-slate-900 text-sm">কাস্টমার ড্যাশবোর্ড সুরক্ষিত</h2>
              <p className="text-xs text-slate-500">আপনার অর্ডার ও প্রোফাইল দেখতে আগে লগইন করুন।</p>
              <button
                onClick={() => navigate("login")}
                className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
              >
                লগইন করুন
              </button>
            </div>
          </div>
        </PublicLayout>
      );
    }
    return (
      <CustomerLayout currentRoute={currentRoute} navigate={navigate}>
        {renderCustomerRoute(currentRoute, navigate) || <NotFoundPage navigate={navigate} />}
      </CustomerLayout>
    );
  }

  // Auth routes (Login, Register)
  const authComponent = renderAuthRoute(currentRoute, navigate);
  if (authComponent) {
    return (
      <PublicLayout currentRoute={currentRoute} navigate={navigate}>
        {authComponent}
      </PublicLayout>
    );
  }

  // Public store routes (Home, Products, Details, Cart, Wishlist, Checkout, Tracking)
  const publicComponent = renderPublicRoute(currentRoute, navigate);
  if (publicComponent) {
    return (
      <PublicLayout currentRoute={currentRoute} navigate={navigate}>
        {publicComponent}
      </PublicLayout>
    );
  }

  return (
    <PublicLayout currentRoute={currentRoute} navigate={navigate}>
      <NotFoundPage navigate={navigate} />
    </PublicLayout>
  );
};
