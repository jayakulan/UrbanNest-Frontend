"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Calendar,
  Wallet,
  Mail,
  Star,
  PlusSquare,
  Settings,
  Bell,
  MessageSquare,
  LogOut,
  Search,
} from "lucide-react";

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 flex flex-col hidden md:flex">
        {/* Logo Area */}
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            UrbanNest
          </h1>
          <p className="text-sm font-medium text-slate-500">Premium Host</p>
        </div>

        {/* Navigation */}
        <div className="px-4 flex-1">
          <nav className="space-y-1">
            {[
              { name: "Dashboard", href: "/owner", icon: LayoutDashboard },
              { name: "Add Property", href: "/owner/add-property", icon: PlusSquare },
              { name: "My Properties", href: "/owner/properties", icon: Building },
              { name: "Booking Requests", href: "/owner/bookings", icon: Calendar },
              { name: "Earnings", href: "/owner/earnings", icon: Wallet },
              { name: "Messages", href: "/owner/messages", icon: Mail },
              { name: "Reviews", href: "/owner/reviews", icon: Star },
            ].map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/owner" && pathname?.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                      ? "bg-white text-slate-900 shadow-sm border border-slate-100"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                    }`}
                >
                  <Icon size={20} className={isActive ? "text-slate-700" : ""} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area */}
        <div className="p-4 border-t border-slate-200">
          <button className="w-full bg-[#0f172a] text-white py-3 px-4 rounded-xl font-medium mb-6 hover:bg-slate-800 transition-colors">
            List New Property
          </button>

          <Link href="/owner/profile" className="flex items-center gap-3 px-2 cursor-pointer hover:bg-slate-50 transition-colors p-2 rounded-xl">
            <img
              src="https://i.pravatar.cc/150?u=julian"
              alt="Julian Thorne"
              className="w-10 h-10 rounded-full bg-slate-200"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Julian Thorne</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Settings size={18} />
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              localStorage.removeItem('userId');
              window.location.href = '/login';
            }}
            className="flex items-center gap-3 px-4 mt-2 py-2.5 w-full text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut size={20} className="text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f6f8]">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
          {/* Search */}
          <div className="w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all"
                placeholder="Search properties or bookings..."
              />
            </div>
          </div>

          {/* Right Header */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-500">
              <button className="hover:text-slate-900 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <button className="hover:text-slate-900">
                <MessageSquare size={20} />
              </button>
              <button className="hover:text-slate-900">
                <Settings size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <span className="text-sm font-semibold text-slate-900">Owner Portal</span>
              <img
                src="https://i.pravatar.cc/150?u=julian"
                alt="Profile"
                className="w-8 h-8 rounded-full ring-2 ring-white border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
