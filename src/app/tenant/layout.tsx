"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Calendar,
  Mail,
  LogOut,
  Search,
  Bell,
  Star
} from "lucide-react";

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define explicitly with an optional badge to keep TS happy
  const mainLinks: Array<{ name: string; href: string; icon: any; badge?: string }> = [
    { name: "Dashboard", href: "/tenant", icon: LayoutDashboard },
    { name: "Properties", href: "/tenant/properties", icon: Building },
    { name: "Booking History", href: "/tenant/bookings", icon: Calendar },
    { name: "Messages", href: "/tenant/messages", icon: Mail },
    { name: "Reviews", href: "/tenant/reviews", icon: Star },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">

        {/* Logo Area */}
        <div className="p-6 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#0b0f19]">
            UrbanNest
          </h1>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tenant Portal</p>
        </div>

        {/* Navigation */}
        <div className="px-4 flex-1 overflow-y-auto">
          <nav className="space-y-1 mb-8">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/tenant" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                    ? "bg-[#0b0f19] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                    {link.name}
                  </div>
                  {link.badge && (
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Profile & Sign Out */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <Link href="/tenant/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors flex-1 min-w-0">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
              alt="Alex Rivera"
              className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900 truncate">Alex Rivera</p>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Premium Tenant</p>
            </div>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("userId");
              window.location.href = "/login";
            }}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafafa]">

        {/* Top Header */}
        <header className="h-24 px-8 flex items-center justify-between shrink-0 bg-[#fafafa]">
          {/* Empty left side to balance right side */}
          <div></div>

          <div className="flex items-center gap-6">
            <div className="relative w-80">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-4 pr-10 py-3 bg-slate-100/80 border-transparent rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors font-medium text-slate-900"
                placeholder="Search properties..."
              />
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#fafafa]"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
