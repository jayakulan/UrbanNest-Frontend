"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Home, 
  Users, 
  ShoppingCart, 
  UserPlus, 
  Headset, 
  Gauge
} from "lucide-react";
import Link from "next/link";

function fmtCurrency(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000)     return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}

function timeAgo(dateStr: string | undefined) {
  if (!dateStr) return "recently";
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days  = Math.floor(hours / 24);
    if (mins < 1)   return "just now";
    if (mins < 60)  return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } catch { return "recently"; }
}

export default function AdminDashboardPage() {
  const [totalRevenue, setTotalRevenue]       = useState<number | null>(null);
  const [activeListings, setActiveListings]   = useState<number | null>(null);
  const [userBase, setUserBase]               = useState<number | null>(null);
  const [pendingBookings, setPendingBookings] = useState<number>(0);
  const [recentBookings, setRecentBookings]   = useState<any[]>([]);
  const [recentUsers, setRecentUsers]         = useState<any[]>([]);
  const [topProperty, setTopProperty]         = useState<any>(null);
  const [loading, setLoading]                 = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const h = { "Authorization": `Bearer ${token}` };

    const load = async () => {
      try {
        const [usersRes, propsRes, bookingsRes] = await Promise.all([
          fetch("http://localhost:8080/api/users",      { headers: h }),
          fetch("http://localhost:8080/api/properties", { headers: h }),
          fetch("http://localhost:8080/api/bookings",   { headers: h }),
        ]);

        const users    = usersRes.ok    ? await usersRes.json()    : [];
        const props    = propsRes.ok    ? await propsRes.json()    : [];
        const bookings = bookingsRes.ok ? await bookingsRes.json() : [];

        // ── KPI: Total Revenue ─────────────────────────────────────────
        const rev = bookings.reduce((s: number, b: any) => s + (b.totalAmount || 0), 0);
        setTotalRevenue(rev);

        // ── KPI: Active Listings ───────────────────────────────────────
        const available = props.filter(
          (p: any) => (p.availabilityStatus || "").toLowerCase() === "available"
        ).length;
        setActiveListings(available);

        // ── KPI: User Base ─────────────────────────────────────────────
        setUserBase(users.length);

        // ── Pending bookings → Open Tickets widget ─────────────────────
        const pending = bookings.filter(
          (b: any) => (b.status || "").toUpperCase() === "PENDING"
        ).length;
        setPendingBookings(pending);

        // ── Recent Transactions (last 2 bookings) ──────────────────────
        const sorted = [...bookings].sort((a: any, b: any) => b.id - a.id);
        setRecentBookings(sorted.slice(0, 2));

        // ── Recent Users (last 2 registered) ──────────────────────────
        const sortedUsers = [...users].sort((a: any, b: any) => b.id - a.id);
        setRecentUsers(sortedUsers.slice(0, 2));

        // ── Top Property: highest total booking revenue ────────────────
        const propRevMap: Record<number, number> = {};
        bookings.forEach((b: any) => {
          propRevMap[b.propertyId] = (propRevMap[b.propertyId] || 0) + (b.totalAmount || 0);
        });
        const topId = Object.entries(propRevMap)
          .sort(([, a], [, b]) => b - a)[0]?.[0];
        const top = topId ? props.find((p: any) => String(p.id) === String(topId)) : props[0];
        setTopProperty(top || null);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Portfolio Overview</h1>
        <p className="text-sm font-medium text-slate-600">
          Welcome back, Admin. Here&apos;s what&apos;s happening with UrbanNest today.
        </p>
      </div>

      {/* Top Value Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center text-blue-800">
              <TrendingUp size={20} />
            </div>
            <span className="bg-green-50 text-green-600 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Revenue</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? "—" : fmtCurrency(totalRevenue ?? 0)}
            </h2>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center text-blue-800">
              <Home size={20} />
            </div>
            <span className="bg-green-50 text-green-600 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Active Listings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? "—" : (activeListings ?? 0).toLocaleString()}
            </h2>
          </div>
        </div>

        {/* User Base */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-slate-200/50 rounded-xl flex items-center justify-center text-slate-700">
              <Users size={20} />
            </div>
            <span className="bg-slate-100 text-slate-500 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              {loading ? "—" : userBase === 1 ? "Stable" : "Growing"}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">User Base</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? "—" : (userBase ?? 0).toLocaleString()}
            </h2>
          </div>
        </div>

      </div>

      {/* Main Structural Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left — Top Property Spotlight */}
        <div className="lg:col-span-5 h-full min-h-[500px] relative rounded-3xl overflow-hidden shadow-sm shadow-slate-200 group">
          {topProperty?.photos ? (
            <img
              src={topProperty.photos}
              alt={topProperty.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full z-10">
            <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider rounded-lg mb-4 shadow-sm">
              {loading ? "Loading..." : "Top Earning Property"}
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              {loading ? "—" : (topProperty?.title || "No Properties Yet")}
            </h3>
            <p className="text-sm font-medium text-slate-300 leading-relaxed pr-8">
              {loading
                ? ""
                : topProperty
                ? `${topProperty.city || topProperty.district || ""} — ${topProperty.propertyType || "Property"} · ${topProperty.bedrooms ?? "—"} beds`
                : "Add properties to see your top performer here."
              }
            </p>
          </div>
        </div>

        {/* Right Flow Modules */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Recent Transactions List Block */}
          <div className="bg-white rounded-3xl p-8 py-10 shadow-sm border border-slate-100/50 flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
              <Link href="/admin/payments" className="text-[10px] font-bold text-slate-900 border-b-2 border-slate-900 uppercase tracking-widest hover:text-slate-500 hover:border-slate-500 transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-8">
              {/* Recent bookings */}
              {loading ? (
                <p className="text-sm text-slate-400">Loading transactions...</p>
              ) : recentBookings.length === 0 ? (
                <p className="text-sm text-slate-400">No transactions yet.</p>
              ) : (
                recentBookings.map((b: any) => (
                  <div key={b.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 shrink-0 shadow-sm group-hover:bg-slate-200 transition-colors">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {b.tenantName
                            ? `Payment from ${b.tenantName}`
                            : `Booking #${b.id}`}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-500">
                          {b.propertyName || `Property #${b.propertyId}`} · {(b.status || "").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-4">
                      <span className="text-sm font-bold text-slate-900 block">
                        +{b.totalAmount ? fmtCurrency(b.totalAmount) : "—"}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Most recently registered users */}
              {!loading && recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 shrink-0 shadow-sm group-hover:bg-slate-200 transition-colors">
                      <UserPlus size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        New user registered: {u.fullName}
                      </h4>
                      <span className="text-[11px] font-medium text-slate-500">
                        {u.role || "USER"} · {u.email}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 text-[9px] font-black rounded-md tracking-wider uppercase">
                      New
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Module Split — Pending Bookings + System Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-48">
            
            <Link href="/admin/bookings" className="bg-[#0b0f19] rounded-3xl text-white p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer h-full">
              <Headset size={24} className="text-white relative z-10" />
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pending Bookings</p>
                <h2 className="text-4xl font-black text-white tracking-tight">
                  {loading ? "—" : pendingBookings}
                </h2>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
            </Link>

            <div className="bg-[#e0e7ff] rounded-3xl text-indigo-900 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer h-full">
              <Gauge size={24} className="text-indigo-900 relative z-10" />
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] font-bold text-indigo-900/60 uppercase tracking-widest mb-1.5">System Health</p>
                <h2 className="text-4xl font-black text-indigo-900 tracking-tight">99%</h2>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/30 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
