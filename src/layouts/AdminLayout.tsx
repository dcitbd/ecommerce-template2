import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";

export const AdminLayout: React.FC<{
  currentSection: string;
  navigate: (route: string) => void;
  children: React.ReactNode;
}> = ({ currentSection, navigate, children }) => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuGroups = [
    {
      title: "প্রধান মেনু",
      items: [
        { id: "admin", label: "ড্যাশবোর্ড", icon: "📊" },
      ]
    },
    {
      title: "প্রোডাক্ট ক্যাটালগ",
      items: [
        { id: "admin/products", label: "প্রোডাক্ট ম্যানেজমেন্ট", icon: "📷" },
        { id: "admin/add-product", label: "+ নতুন প্রোডাক্ট অ্যাড", icon: "➕" },
        { id: "admin/bulk-upload", label: "বাল্ক আপলোড (Excel/CSV)", icon: "📑" },
        { id: "admin/categories", label: "ক্যাটাগরি ট্রি", icon: "🗂️" },
        { id: "admin/brands", label: "ব্র্যান্ড ম্যানেজমেন্ট", icon: "🏷️" },
        { id: "admin/colors", label: "কালার তালিকা", icon: "🎨" },
        { id: "admin/sizes", label: "সাইজ / কিট", icon: "📏" },
        { id: "admin/banners", label: "ব্যানার স্লাইডার", icon: "🖼️" },
      ]
    },
    {
      title: "অর্ডার ও গ্রাহক",
      items: [
        { id: "admin/orders", label: "সকল অর্ডার", icon: "📦" },
        { id: "admin/incomplete-orders", label: "ইনকমপ্লিট অর্ডার", icon: "⏳" },
        { id: "admin/returns", label: "রিটার্ন অর্ডার", icon: "🔄" },
        { id: "admin/reviews", label: "কাস্টমার রিভিউ", icon: "⭐" },
        { id: "admin/customers", label: "কাস্টমার লিস্ট (CRM)", icon: "👥" },
      ]
    },
    {
      title: "ইন্টিগ্রেশন ও সিকিউরিটি",
      items: [
        { id: "admin/partners", label: "কুরিয়ার ও পেমেন্ট পার্টনার", icon: "🔌" },
        { id: "admin/fraud", label: "ফ্রড চেক টুল", icon: "🛡️" },
        { id: "admin/users", label: "ইউজার ও স্টাফ রোল", icon: "👤" },
        { id: "admin/activity", label: "অ্যাক্টিভ হিস্ট্রি (লগ)", icon: "📜" },
        { id: "admin/settings", label: "শপ সেটিংস", icon: "⚙️" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white h-16 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-xl p-1.5 hover:bg-slate-800 rounded-lg"
          >
            ☰
          </button>
          <div
            onClick={() => navigate("admin")}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm">
              TW
            </div>
            <div className="font-extrabold text-sm tracking-wide">
              ADMIN CONTROL PANEL
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Public Store */}
          <button
            onClick={() => navigate("")}
            className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
          >
            <span>🌐</span> শপ দেখুন
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifs(!showNotifs); if (unreadCount > 0) markAllRead(); }}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            >
              <span>🔔</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-slide-down">
                <div className="flex items-center justify-between pb-2 border-b text-xs font-bold text-slate-800">
                  <span>বিজ্ঞপ্তি সমূহ ({notifications.length})</span>
                  <button onClick={markAllRead} className="text-[10px] text-indigo-600">সব পঠিত</button>
                </div>
                <div className="divide-y max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2 text-xs">
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold leading-tight">{user?.name}</div>
              <div className="text-[10px] text-amber-400 font-semibold">{user?.role}</div>
            </div>
            <button
              onClick={() => { logout(); navigate("login"); }}
              className="bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-all"
              title="লগআউট"
            >
              লগআউট
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 p-4 space-y-6 overflow-y-auto transition-transform duration-200 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {menuGroups.map(grp => (
            <div key={grp.title} className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider mb-1">
                {grp.title}
              </div>
              {grp.items.map(item => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
