"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Eye,
  CalendarCheck,
  Wallet,
  Users,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

// ── helpers ───────────────────────────────────────────────────────────────────
function fmtCurrency(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000)     return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}
function fmtDate(s: string | null | undefined) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch { return s; }
}
function initials(name: string) {
  return (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0].toUpperCase())
    .join("");
}
function statusBadge(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED")  return "bg-green-50 text-green-700";
  if (s === "PENDING")   return "bg-orange-50 text-orange-700";
  if (s === "REJECTED")  return "bg-red-50 text-red-700";
  if (s === "COMPLETED") return "bg-slate-100 text-slate-600";
  return "bg-slate-100 text-slate-600";
}
function statusLabel(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED")  return "Confirmed";
  if (s === "PENDING")   return "Pending";
  if (s === "REJECTED")  return "Rejected";
  if (s === "COMPLETED") return "Completed";
  return status || "Unknown";
}

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export default function OwnerDashboard() {

  const [ownerId, setOwnerId]       = useState<number>(0);
  const [token, setToken]           = useState<string>("");
  const [ownerName, setOwnerName]   = useState<string>("Julian");

  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings]     = useState<any[]>([]);   // enriched
  const [loading, setLoading]       = useState(true);

  // 1. Read localStorage client-side
  useEffect(() => {
    setOwnerId(parseInt(localStorage.getItem("userId") || "0"));
    setToken(localStorage.getItem("token") || "");
  }, []);

  // 2. Fetch once ownerId ready
  useEffect(() => {
    if (!ownerId || !token) return;
    const h = { "Authorization": `Bearer ${token}` };

    const load = async () => {
      try {
        const [propsRes, userRes] = await Promise.all([
          fetch(`http://localhost:8080/api/properties/owner/${ownerId}`, { headers: h }),
          fetch(`http://localhost:8080/api/users/${ownerId}`, { headers: h }),
        ]);

        // Owner name
        if (userRes.ok) {
          const u = await userRes.json();
          if (u.fullName) setOwnerName(u.fullName.split(" ")[0]);
        }

        if (!propsRes.ok) { setLoading(false); return; }
        const props: any[] = await propsRes.json();
        setProperties(props);

        // Fetch bookings for each property
        const allBookings: any[] = [];
        await Promise.all(props.map(async (p: any) => {
          try {
            const bRes = await fetch(
              `http://localhost:8080/api/bookings/property/${p.id}`, { headers: h }
            );
            if (bRes.ok) {
              const bList: any[] = await bRes.json();
              // Enrich with tenant name + property info
              const enriched = await Promise.all(bList.map(async (b: any) => {
                let tenantName = `Tenant #${b.tenantId}`;
                try {
                  const tRes = await fetch(
                    `http://localhost:8080/api/users/${b.tenantId}`, { headers: h }
                  );
                  if (tRes.ok) {
                    const t = await tRes.json();
                    tenantName = t.fullName || tenantName;
                  }
                } catch { /* skip */ }
                return {
                  ...b,
                  tenantName,
                  propertyName:  p.title,
                  propertyPhoto: p.photos,
                  propCity:      p.city || p.district || "",
                };
              }));
              allBookings.push(...enriched);
            }
          } catch { /* skip */ }
        }));

        setBookings(allBookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ownerId, token]);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const totalProps     = properties.length;
  const activeListings = properties.filter(
    p => (p.availabilityStatus || "").toLowerCase() === "available"
  ).length;
  const pendingCount   = bookings.filter(
    b => (b.status || "").toUpperCase() === "PENDING"
  ).length;
  const monthlyEarnings = bookings.reduce(
    (s: number, b: any) => s + (b.monthlyRent || 0), 0
  );
  const totalTenants   = new Set(bookings.map((b: any) => b.tenantId)).size;

  // Occupancy % of top property
  const topProperty = (() => {
    const propRevMap: Record<number, number> = {};
    const propBookCount: Record<number, number> = {};
    const propApprovedCount: Record<number, number> = {};
    bookings.forEach((b: any) => {
      propRevMap[b.propertyId]       = (propRevMap[b.propertyId] || 0) + (b.totalAmount || 0);
      propBookCount[b.propertyId]    = (propBookCount[b.propertyId] || 0) + 1;
      if (["APPROVED","COMPLETED"].includes((b.status||"").toUpperCase())) {
        propApprovedCount[b.propertyId] = (propApprovedCount[b.propertyId] || 0) + 1;
      }
    });
    const topId = Object.entries(propRevMap).sort(([,a],[,b])=>b-a)[0]?.[0];
    const top   = topId ? properties.find(p => String(p.id) === topId) : properties[0];
    if (!top) return null;
    const bookCount  = propBookCount[top.id]    || 0;
    const approved   = propApprovedCount[top.id] || 0;
    const occupancy  = bookCount > 0 ? Math.round((approved / bookCount) * 100) : 0;
    return { ...top, bookingCount: bookCount, occupancy };
  })();

  // Recent bookings (last 4 sorted desc by id)
  const recentBookings = [...bookings].sort((a,b) => b.id - a.id).slice(0, 4);

  // ── Revenue chart bars (last 6 months from real moveInDate) ───────────────
  const chartBars = (() => {
    const now = new Date();
    const monthKeys: string[] = [];
    const monthLabels: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthKeys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      monthLabels.push(MONTHS[d.getMonth()]);
    }
    const sums = monthKeys.map(key =>
      bookings.filter(b => (b.moveInDate || "").startsWith(key))
              .reduce((s, b) => s + (b.monthlyRent || 0), 0)
    );
    const max = Math.max(...sums, 1);
    const heights = sums.map(v => Math.max(8, Math.round((v / max) * 90)));
    return { heights, labels: monthLabels, sums };
  })();

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Portfolio Overview
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Welcome back, {loading ? "..." : ownerName}. Here is what&apos;s happening with your properties today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        {/* Total Properties */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Properties</p>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "—" : totalProps}</h3>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
              {loading || totalProps === 0 ? "—" : `${Math.round((activeListings / totalProps) * 100)}% Active`}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Listings</p>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "—" : activeListings}</h3>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-md">
              {loading ? "—" : pendingCount > 0 ? "Action Required" : "All Clear"}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Bookings</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {loading ? "—" : String(pendingCount).padStart(2, "0")}
            </h3>
          </div>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Earnings</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {loading ? "—" : fmtCurrency(monthlyEarnings)}
            </h3>
          </div>
        </div>

        {/* Total Tenants */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
              Stable
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tenants</p>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "—" : totalTenants}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Revenue Trends Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revenue Trends</h2>
                <p className="text-slate-500 mt-1 font-medium">Earnings growth over the last 6 months</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Last 6 Months <ChevronDown size={16} />
              </button>
            </div>

            <div className="h-64 relative flex items-end justify-between px-4">
              {/* Bar chart from real data */}
              {chartBars.heights.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-4 w-1/6">
                  <div
                    className="w-12 bg-gradient-to-t from-blue-100 to-blue-500 rounded-t-sm opacity-70 transition-all duration-500"
                    style={{ height: `${h}%` }}
                    title={chartBars.sums[i] > 0 ? fmtCurrency(chartBars.sums[i]) : "No data"}
                  ></div>
                </div>
              ))}

              {/* Decorative SVG line */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                  d={`M 5 ${100 - chartBars.heights[0]} Q 20 ${100 - chartBars.heights[1]} 35 ${100 - chartBars.heights[2]} T 55 ${100 - chartBars.heights[3]} T 75 ${100 - chartBars.heights[4]} T 95 ${100 - chartBars.heights[5]}`}
                  fill="none" stroke="#2563eb" strokeWidth="2"
                  vectorEffect="non-scaling-stroke" strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ownerGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* X Axis labels */}
              <div className="absolute bottom-[-32px] left-0 w-full flex justify-between px-8">
                {chartBars.labels.map((month, i) => (
                  <span key={i} className="text-xs font-bold text-slate-400">{month}</span>
                ))}
              </div>
            </div>
            <div className="h-8"></div>
          </div>

          {/* Recent Booking Requests Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Recent Booking Requests</h2>
              <Link href="/owner/bookings" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[240px]">Guest</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Earnings</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-8 text-center text-sm text-slate-400">
                        Loading bookings...
                      </td>
                    </tr>
                  ) : recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-8 text-center text-sm text-slate-400">
                        No bookings yet.
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((b: any) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                              {initials(b.tenantName)}
                            </div>
                            <span className="font-semibold text-slate-900">{b.tenantName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">
                          {b.propertyName || `Property #${b.propertyId}`}
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">
                          {fmtDate(b.moveInDate)}
                        </td>
                        <td className="px-8 py-5 font-bold text-slate-900">
                          {b.monthlyRent ? fmtCurrency(b.monthlyRent) : "—"}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${statusBadge(b.status)}`}>
                            {statusLabel(b.status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* Top Performer Property */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="relative h-48 bg-slate-200">
              {topProperty?.photos ? (
                <img
                  src={topProperty.photos}
                  alt={topProperty.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-4xl font-bold">
                  {(topProperty?.title || "—").charAt(0)}
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-full shadow-sm">
                  Top Performer
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900">
                {loading ? "—" : topProperty?.title || "No properties yet"}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1 mb-8">
                {loading ? "" : topProperty?.city || topProperty?.district || topProperty?.address || "—"}
              </p>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-semibold text-slate-700">Occupancy Rate</span>
                  <span className="text-lg font-bold text-slate-900">
                    {loading ? "—" : `${topProperty?.occupancy ?? 0}%`}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0f172a] rounded-full transition-all duration-700"
                    style={{ width: `${topProperty?.occupancy ?? 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Bookings</p>
                  <p className="text-xl font-bold text-slate-900 text-center">
                    {loading ? "—" : topProperty?.bookingCount ?? 0}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">Properties</p>
                  <p className="text-xl font-bold text-slate-900 text-center">
                    {loading ? "—" : totalProps}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Support */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-8 relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-bold mb-3 relative z-10">Premium Support</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium relative z-10">
              As an Elite Host, you have a dedicated portfolio manager available 24/7 for consultation.
            </p>
            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors relative z-10">
              Contact Manager
            </button>
          </div>

          {/* Service Status */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Service Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm font-semibold text-slate-700">Listing Visibility: Online</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm font-semibold text-slate-700">Payment Processing: Active</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`block w-2.5 h-2.5 rounded-full ${pendingCount > 0 ? "bg-orange-500" : "bg-green-500"}`}></span>
                <span className="text-sm font-semibold text-slate-700">
                  {pendingCount > 0 ? `${pendingCount} Booking${pendingCount > 1 ? "s" : ""} Awaiting Review` : "All Bookings Reviewed"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
