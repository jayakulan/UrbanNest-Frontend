"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Home, 
  Calendar, 
  Banknote,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// ── helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return "$" + (n / 1_000).toFixed(0)     + "K";
  return "$" + n.toFixed(0);
}
function fmtFull(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

const MONTHS_SHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export default function AdminReportsPage() {

  // ── state ─────────────────────────────────────────────────────────────────
  const [users, setUsers]           = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings]     = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const h = { "Authorization": `Bearer ${token}` };
    Promise.all([
      fetch("http://localhost:8080/api/users",      { headers: h }).then(r => r.ok ? r.json() : []),
      fetch("http://localhost:8080/api/properties", { headers: h }).then(r => r.ok ? r.json() : []),
      fetch("http://localhost:8080/api/bookings",   { headers: h }).then(r => r.ok ? r.json() : []),
    ]).then(([u, p, b]) => {
      setUsers(u);
      setProperties(p);
      setBookings(b);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── KPI computations ──────────────────────────────────────────────────────
  const totalUsers    = users.length;
  const activeListings = properties.filter(p => (p.availabilityStatus || "").toLowerCase() === "available").length;
  const totalBookings  = bookings.length;
  const grossRevenue   = bookings.reduce((s: number, b: any) => s + (b.totalAmount || 0), 0);

  // ── Monthly revenue chart (12 months) ────────────────────────────────────
  const monthlyRevenue = Array(12).fill(0);
  const monthlyBookings = Array(12).fill(0);
  bookings.forEach((b: any) => {
    if (!b.moveInDate) return;
    try {
      const m = new Date(b.moveInDate).getMonth(); // 0-11
      monthlyRevenue[m]  += (b.totalAmount  || 0);
      monthlyBookings[m] += 1;
    } catch { /* skip */ }
  });
  const maxRev = Math.max(...monthlyRevenue, 1);
  const highestMonth = monthlyRevenue.indexOf(Math.max(...monthlyRevenue));

  // ── Top performing properties (by total booking revenue) ─────────────────
  const propRevMap: Record<number, number> = {};
  const propBookingCount: Record<number, number> = {};
  bookings.forEach((b: any) => {
    propRevMap[b.propertyId]        = (propRevMap[b.propertyId] || 0) + (b.totalAmount || 0);
    propBookingCount[b.propertyId]  = (propBookingCount[b.propertyId] || 0) + 1;
  });
  const topProperties = properties
    .map(p => ({ ...p, revenue: propRevMap[p.id] || 0, bookingCount: propBookingCount[p.id] || 0 }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  // Occupancy % per property = approved bookings / total bookings
  const approvedPerProp: Record<number, number> = {};
  bookings.filter((b: any) => ["APPROVED","COMPLETED"].includes((b.status || "").toUpperCase()))
    .forEach((b: any) => { approvedPerProp[b.propertyId] = (approvedPerProp[b.propertyId] || 0) + 1; });
  const occupancyForProp = (propId: number) => {
    const total = propBookingCount[propId] || 0;
    if (total === 0) return 0;
    return Math.round(((approvedPerProp[propId] || 0) / total) * 100);
  };

  // ── Most active users (owners with most properties) ────────────────────────
  const ownerPropCount: Record<number, number> = {};
  properties.forEach(p => {
    if (p.ownerId) ownerPropCount[p.ownerId] = (ownerPropCount[p.ownerId] || 0) + 1;
  });
  const activeUsers = users
    .map(u => ({ ...u, propCount: ownerPropCount[u.id] || 0 }))
    .sort((a, b) => b.propCount - a.propCount)
    .slice(0, 3);

  // ── User growth chart bars (sign-up count per month if createdAt exists, else by index) ──
  const userGrowthBars = (() => {
    const counts = Array(7).fill(1); // fallback uniform
    const usersWithDate = users.filter(u => u.createdAt);
    if (usersWithDate.length > 0) {
      usersWithDate.forEach(u => {
        try {
          const m = new Date(u.createdAt).getMonth() % 7;
          counts[m]++;
        } catch { /* skip */ }
      });
      const max = Math.max(...counts, 1);
      return counts.map(c => Math.max(10, Math.round((c / max) * 85)));
    }
    return [20, 35, 60, 50, 85, 70, 80];
  })();

  // ── Property type breakdown ────────────────────────────────────────────────
  const propTypeCount: Record<string, number> = {};
  properties.forEach(p => {
    const t = p.propertyType || p.type || "Other";
    propTypeCount[t] = (propTypeCount[t] || 0) + 1;
  });
  const propTypeEntries = Object.entries(propTypeCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const totalProps = properties.length || 1;
  const propTypeColors = ["#0b0f19", "#dbeafe", "#e2e8f0"];

  // Donut chart: top 3 types as SVG arc percentages
  const donutSegments = (() => {
    const circumference = 2 * Math.PI * 40; // r=40
    let offset = 0;
    return propTypeEntries.map(([, count], i) => {
      const pct   = count / totalProps;
      const dash  = pct * circumference;
      const gap   = circumference - dash;
      const seg   = { color: propTypeColors[i], dash, gap, offset };
      offset      += dash;
      return seg;
    });
  })();

  // ── Occupancy by city/district ─────────────────────────────────────────────
  const cityOccMap: Record<string, { total: number; approved: number }> = {};
  properties.forEach(p => {
    const city = p.city || p.district || "Other";
    if (!cityOccMap[city]) cityOccMap[city] = { total: 0, approved: 0 };
    cityOccMap[city].total++;
  });
  bookings.forEach((b: any) => {
    const prop = properties.find((p: any) => p.id === b.propertyId);
    if (!prop) return;
    const city = prop.city || prop.district || "Other";
    if (!cityOccMap[city]) return;
    if (["APPROVED","COMPLETED"].includes((b.status || "").toUpperCase())) {
      cityOccMap[city].approved++;
    }
  });
  const cityOccupancy = Object.entries(cityOccMap)
    .map(([city, { total, approved }]) => ({
      city,
      pct: total > 0 ? Math.round((approved / total) * 100) : 0
    }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  // ── New signups this week (last 7 days) ────────────────────────────────────
  const weekAgo   = new Date(Date.now() - 7 * 86400000);
  const newSignups = users.filter(u => {
    if (!u.createdAt) return false;
    try { return new Date(u.createdAt) >= weekAgo; } catch { return false; }
  }).length;

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Platform Reports &amp; Analytics</h1>
          <p className="text-sm font-medium text-slate-600">
            Real-time performance metrics and growth insights for UrbanNest properties.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm h-12">
            <button className="px-5 py-2 bg-[#0b0f19] text-white rounded-lg text-[11px] font-bold transition-colors h-full">
              Last 12 Months
            </button>
            <button className="px-5 py-2 text-slate-600 hover:text-slate-900 rounded-lg text-[11px] font-bold transition-colors h-full">
              Last 30 Days
            </button>
            <button className="px-5 py-2 text-slate-600 hover:text-slate-900 rounded-lg text-[11px] font-bold transition-colors h-full">
              Custom Range
            </button>
          </div>
          
          <button className="px-5 py-2 flex items-center gap-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors h-12">
            <Calendar size={16} className="text-slate-500" />
            <span className="text-left leading-tight text-[11px]">
              <span className="block">All Time</span>
              <span className="block text-slate-400">Live Data</span>
            </span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Users */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
              <Users size={18} />
            </div>
            <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingUp size={12} /> LIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Users</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {loading ? "—" : totalUsers.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center shrink-0">
              <Home size={18} />
            </div>
            <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingUp size={12} /> LIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Listings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {loading ? "—" : activeListings.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <span className="bg-blue-50 text-blue-500 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingDown size={12} /> LIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Bookings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {loading ? "—" : totalBookings.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Gross Revenue */}
        <div className="bg-[#0b132c] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
              <Banknote size={18} />
            </div>
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest border border-green-500/20">
              <TrendingUp size={12} /> LIVE
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gross Revenue</p>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none">
              {loading ? "—" : fmtFull(grossRevenue)}
            </h2>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
        </div>

      </div>

      {/* Main Chart Card — Revenue & Booking Trends */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Revenue &amp; Booking Trends</h3>
            <p className="text-[11px] font-medium text-slate-500">Monthly performance comparison for the current fiscal year.</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5 text-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0b0f19]"></div> Revenue
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-100"></div> Bookings
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full flex items-end justify-between px-2 pt-6">
          
          {/* Y-Axis Lines */}
          <div className="absolute inset-x-2 inset-y-0 flex flex-col justify-between pointer-events-none">
            {['500K', '400K', '300K', '200K', '100K', '0K'].map((label, index) => (
              <div key={index} className="flex items-center w-full relative">
                <span className="text-[8px] font-bold text-slate-300 w-8 absolute -left-2 -translate-y-1/2">{label}</span>
                <div className="w-full h-px border-t border-slate-100 ml-6"></div>
              </div>
            ))}
          </div>

          {/* 12 monthly bars */}
          <div className="relative z-10 w-full flex justify-between h-full ml-6 pl-2 pr-4 pb-[1px]">
            {MONTHS_SHORT.map((mon, i) => {
              const pct       = Math.max(5, Math.round((monthlyRevenue[i] / maxRev) * 90));
              const isHighest = i === highestMonth;
              return (
                <div key={mon} className="w-[6%] flex flex-col items-center justify-end relative group">
                  <div
                    className={`w-full rounded-t-sm transition-all ${
                      isHighest ? "bg-[#cbd5e1] border-2 border-[#0b0f19]" : "bg-[#e2e8f0] group-hover:bg-slate-300"
                    }`}
                    style={{ height: `${pct}%` }}
                  ></div>

                  {isHighest && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0b0f19] text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap z-20 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-[5px] after:border-transparent after:border-t-[#0b0f19]">
                      {fmt(monthlyRevenue[i])}
                    </div>
                  )}

                  <span className={`absolute -bottom-6 text-[9px] font-bold ${isHighest ? "text-slate-900 font-black" : "text-slate-400"}`}>
                    {mon}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* User Growth */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-[280px]">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-6">User Growth</h3>
            
            <div className="flex-1 flex items-end justify-between px-2 gap-2 mb-6">
              {userGrowthBars.map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm transition-all ${i === 4 ? "bg-[#0b0f19] border-b-2 border-black" : i % 2 === 0 ? "bg-blue-200" : "bg-blue-100"}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-slate-100 pt-4">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">NEW SIGNUPS</p>
                <h4 className="text-xl font-black text-slate-900 leading-none">
                  +{loading ? "—" : (newSignups > 0 ? newSignups : totalUsers).toLocaleString()}
                </h4>
              </div>
              <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">
                ↑ LIVE
              </span>
            </div>
          </div>

          {/* Property Types Donut Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col flex-1 h-[280px]">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">Property Types</h3>
            
            <div className="relative w-32 h-32 mx-auto my-auto flex items-center justify-center mb-6 mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="16" />
                {loading || donutSegments.length === 0 ? (
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dbeafe" strokeWidth="16"
                    strokeDasharray="125.6 125.6" strokeDashoffset="0" />
                ) : (
                  donutSegments.map((seg, i) => (
                    <circle key={i} cx="50" cy="50" r="40" fill="transparent"
                      stroke={seg.color} strokeWidth="16"
                      strokeDasharray={`${seg.dash} ${seg.gap}`}
                      strokeDashoffset={-seg.offset}
                    />
                  ))
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <span className="text-[10px] font-bold text-slate-400">Total</span>
                <span className="text-sm font-black text-slate-900">{loading ? "—" : properties.length}</span>
              </div>
            </div>

            <div className="space-y-3 px-2">
              {loading || propTypeEntries.length === 0 ? (
                <p className="text-xs text-slate-400 text-center">No property type data</p>
              ) : (
                propTypeEntries.map(([type, count], i) => (
                  <div key={type} className="flex justify-between items-center text-[11px] font-bold">
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full" style={{ background: propTypeColors[i] }}></div>
                      <span className="truncate max-w-[100px]">{type}</span>
                    </div>
                    <span className="text-slate-900">{Math.round((count / totalProps) * 100)}%</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Performing Properties */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 flex flex-col h-[280px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight">Top Performing Properties</h3>
              <Link href="/admin/properties" className="text-[10px] font-bold text-slate-900 hover:text-slate-500 transition-colors uppercase tracking-widest border-b border-slate-900 pb-0.5">
                View All
              </Link>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <div className="col-span-4">Property Name</div>
                <div className="col-span-3">Total Revenue</div>
                <div className="col-span-4">Occupancy</div>
                <div className="col-span-1 text-right">Trend</div>
              </div>

              <div className="flex-1 flex flex-col justify-around py-2 min-h-0">
                {loading ? (
                  <p className="text-xs text-slate-400 text-center py-4">Loading...</p>
                ) : topProperties.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No property data</p>
                ) : (
                  topProperties.map((prop, idx) => {
                    const occ = occupancyForProp(prop.id);
                    return (
                      <div key={prop.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 flex items-center gap-3 pr-2">
                          {prop.photos ? (
                            <img src={prop.photos} alt={prop.title} className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 shrink-0 shadow-sm flex items-center justify-center text-slate-500 text-xs font-bold">
                              {(prop.title || "P").charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-900 truncate">{prop.title}</h4>
                            <p className="text-[9px] font-medium text-slate-400 truncate mt-0.5">
                              {prop.city || prop.district || prop.address || "—"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="col-span-3">
                          <span className="text-sm font-black text-slate-900">{fmtFull(prop.revenue)}</span>
                        </div>

                        <div className="col-span-4 flex items-center gap-3 pr-4">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0b0f19] rounded-full transition-all duration-700" style={{ width: `${occ}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 w-8">{occ}%</span>
                        </div>

                        <div className="col-span-1 flex justify-end">
                          {idx === 0 ? (
                            <ArrowUpRight size={16} className="text-green-500" />
                          ) : (
                            <ArrowRight size={16} className="text-orange-400" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Inner Grid Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            
            {/* Most Active Users */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 h-[280px] flex flex-col">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight mb-6">Most Active Users</h3>
              <div className="flex-1 flex flex-col justify-around min-h-0 py-2">
                {loading ? (
                  <p className="text-xs text-slate-400 text-center">Loading...</p>
                ) : activeUsers.map((user, i) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                        {(user.fullName || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{user.fullName}</h4>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          {user.role || "USER"}
                        </p>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[9px] font-black tracking-widest">
                      {user.propCount} props
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupancy Rates by City */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 h-[280px] flex flex-col">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight mb-6">Occupancy Rates</h3>
              <div className="flex-1 flex flex-col justify-around min-h-0 py-2">
                {loading ? (
                  <p className="text-xs text-slate-400 text-center">Loading...</p>
                ) : cityOccupancy.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center">No data available</p>
                ) : (
                  cityOccupancy.map(({ city, pct }) => (
                    <div key={city} className="flex flex-col gap-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-700 truncate max-w-[120px]">{city}</span>
                        <span className="text-slate-900">{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0b0f19] rounded-full transition-all duration-700" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
