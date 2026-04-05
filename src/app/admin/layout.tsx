"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  Calendar,
  Banknote,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Search
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (!token || role !== "ADMIN") {
          router.push("/login");
          return;
        }

        if (userId) {
          const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          if (res.ok) {
            const data = await res.json();
            setUserName(data.fullName || data.name || "Admin Profile");
          } else {
            setUserName("Admin Profile");
          }
        }
      } catch (err) {
        setUserName("Admin Profile");
      }
    };
    fetchUser();
  }, [router]);

  const navLinks: { name: string, href: string, icon: any, badge?: string }[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: Building },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Payments", href: "/admin/payments", icon: Banknote },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-slate-800 font-sans">

      {/* Sidebar */}
      <aside className="w-[280px] bg-[#f8f9fa] border-r border-slate-200 flex flex-col hidden md:flex shrink-0">

        {/* Logo Area */}
        <div className="px-8 py-8 mb-4">
          <h1 className="text-[26px] font-bold tracking-tight text-[#0b0f19]">
            UrbanNest
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <div className="px-4 flex-1 overflow-y-auto no-scrollbar">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-colors ${isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-100 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={18} className={isActive ? "text-slate-800" : "text-slate-400"} />
                    {link.name}
                  </div>
                  {link.badge && (
                    <span className={`w-6 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isActive ? "bg-[#0b0f19] text-white" : "bg-[#0b0f19] text-white"
                      }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Area */}
        <div className="p-6 border-t border-slate-200/60 mt-4">
          <div className="flex items-center justify-between gap-3">
            <Link href="/admin/profile" className="flex items-center gap-3 flex-1 min-w-0 group">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                alt="Alexander Vance"
                className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-300 shrink-0 border border-slate-200 group-hover:border-slate-400 transition-colors"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">{userName}</p>
                <p className="text-[10px] font-medium text-slate-500 truncate">Administrator</p>
              </div>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("userId");
                window.location.href = "/login";
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafafa]">

        {/* Optional Search Top Bar (Hidden on mockup, but keeping a clean whitespace buffer) */}
        <div className="h-12 shrink-0 md:h-16"></div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
