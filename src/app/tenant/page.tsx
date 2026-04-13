"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  ClipboardCheck, 
  Heart, 
  History, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize 
} from "lucide-react";
import Link from "next/link";

// ── helpers ───────────────────────────────────────────────────────────────────
function fmtRent(n: number | null | undefined) {
  if (!n) return "—";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "/mo";
}
function fmtDate(s: string | null | undefined) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return s; }
}
function statusStyle(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED")  return "bg-green-100 text-green-800";
  if (s === "PENDING")   return "bg-blue-100 text-blue-800";
  if (s === "REJECTED")  return "bg-red-100 text-red-800";
  if (s === "COMPLETED") return "bg-slate-100 text-slate-700";
  return "bg-blue-100 text-blue-800";
}
function statusLabel(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED")  return "APPROVED";
  if (s === "REJECTED")  return "REJECTED";
  if (s === "COMPLETED") return "COMPLETED";
  return "REVIEWING";
}

export default function TenantDashboardPage() {

  const [tenantId, setTenantId]         = useState<number>(0);
  const [token, setToken]               = useState<string>("");
  const [tenantName, setTenantName]     = useState<string>("there");

  const [bookings, setBookings]         = useState<any[]>([]);
  const [topPicks, setTopPicks]         = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);

  // 1. Read localStorage client-side only
  useEffect(() => {
    setTenantId(parseInt(localStorage.getItem("userId") || "0"));
    setToken(localStorage.getItem("token") || "");
    setTenantName(localStorage.getItem("fullName") || localStorage.getItem("userName") || "there");
  }, []);

  // 2. Fetch data once tenantId is ready
  useEffect(() => {
    if (!tenantId || !token) return;
    const h = { "Authorization": `Bearer ${token}` };

    const load = async () => {
      try {
        // Tenant bookings + available properties (top picks) in parallel
        const [bookingsRes, propsRes, userRes] = await Promise.all([
          fetch(`http://localhost:8080/api/bookings/tenant/${tenantId}`, { headers: h }),
          fetch("http://localhost:8080/api/properties", { headers: h }),
          fetch(`http://localhost:8080/api/users/${tenantId}`, { headers: h }),
        ]);

        // Tenant name from DB
        if (userRes.ok) {
          const u = await userRes.json();
          if (u.fullName) setTenantName(u.fullName.split(" ")[0]);
        }

        // Bookings — enrich with property details
        if (bookingsRes.ok) {
          const raw: any[] = await bookingsRes.json();
          // For each booking, fetch property info
          const enriched = await Promise.all(raw.map(async (b: any) => {
            let propName = `Property #${b.propertyId}`;
            let propPhoto = "";
            let location = "";
            let monthlyRent = b.monthlyRent;
            try {
              const pRes = await fetch(`http://localhost:8080/api/properties/${b.propertyId}`, { headers: h });
              if (pRes.ok) {
                const p = await pRes.json();
                propName    = p.title || propName;
                propPhoto   = p.photos || "";
                location    = [p.city, p.district].filter(Boolean).join(", ") || p.address || "";
                monthlyRent = monthlyRent || p.monthlyRent;
              }
            } catch { /* skip */ }
            return { ...b, propName, propPhoto, location, monthlyRent };
          }));
          setBookings(enriched);
        }

        // Top picks — available properties not already booked by this tenant
        if (propsRes.ok) {
          const props: any[] = await propsRes.json();
          const available = props.filter(
            (p: any) => (p.availabilityStatus || "").toLowerCase() === "available"
          );
          // Shuffle slightly then take top 2
          setTopPicks(available.slice(0, 2));
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tenantId, token]);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const activeBookings    = bookings.filter(b => (b.status || "").toUpperCase() === "APPROVED").length;
  const pendingRequests   = bookings.filter(b => (b.status || "").toUpperCase() === "PENDING").length;
  const pastRentals       = bookings.filter(b => (b.status || "").toUpperCase() === "COMPLETED").length;
  const recentBookings    = [...bookings].sort((a, b) => b.id - a.id).slice(0, 2);

  return (
    <div className="max-w-[1200px] mx-auto px-8 pb-24 font-sans">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Welcome back, {loading ? "..." : tenantName}
        </h1>
        <p className="text-slate-600 font-medium">Here is what is happening with your rentals today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        {/* Active Bookings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">Live</span>
          </div>
          <div className="w-12 h-12 bg-slate-50 text-slate-800 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-slate-100">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
              {loading ? "—" : activeBookings}
            </p>
            <p className="text-xs font-semibold text-slate-500">Active Bookings</p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-blue-100">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
              {loading ? "—" : pendingRequests}
            </p>
            <p className="text-xs font-semibold text-slate-500">Pending Requests</p>
          </div>
        </div>

        {/* Saved Properties — static (no saved/wishlist entity yet) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-orange-100">
            <Heart size={20} className="fill-orange-600" />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
              {loading ? "—" : topPicks.length}
            </p>
            <p className="text-xs font-semibold text-slate-500">Available Picks</p>
          </div>
        </div>

        {/* Past Rentals */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-slate-200">
            <History size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
              {loading ? "—" : pastRentals}
            </p>
            <p className="text-xs font-semibold text-slate-500">Past Rentals</p>
          </div>
        </div>
      </div>

      {/* Main Grid Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Recent Booking Requests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Booking Requests</h2>
            <Link href="/tenant/bookings" className="text-sm font-bold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:text-blue-600 transition-colors">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-slate-400 py-4">Loading bookings...</p>
            ) : recentBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                <p className="text-slate-400 font-medium text-sm">No bookings yet.</p>
                <Link href="/tenant/properties" className="inline-block mt-4 px-5 py-2.5 bg-[#0b0f19] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Browse Properties
                </Link>
              </div>
            ) : (
              recentBookings.map((b: any) => (
                <div key={b.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 relative hover:shadow-md transition-shadow">
                  
                  {/* Image */}
                  <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    {b.propPhoto ? (
                      <img src={b.propPhoto} alt={b.propName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-500 text-2xl font-bold">
                        {(b.propName || "P").charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-1 pr-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{b.propName}</h3>
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md ${statusStyle(b.status)}`}>
                        {statusLabel(b.status)}
                      </span>
                    </div>
                    
                    {b.location && (
                      <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                        <MapPin size={14} />
                        <span className="text-xs font-semibold">{b.location}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-slate-400">Applied: {fmtDate(b.moveInDate)}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-900">{fmtRent(b.monthlyRent)}</span>
                      </div>
                      {(b.status || "").toUpperCase() === "APPROVED" && (
                        <Link
                          href="/tenant/bookings"
                          className="px-5 py-2.5 bg-[#0b0f19] text-white text-xs font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors w-max shrink-0"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Top Picks (available properties) */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Top Picks</h2>
          
          <div className="space-y-6">
            {loading ? (
              <p className="text-sm text-slate-400 py-4">Loading properties...</p>
            ) : topPicks.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                <p className="text-slate-400 font-medium text-sm">No available properties right now.</p>
              </div>
            ) : (
              topPicks.map((pick: any) => (
                <Link href="/tenant/properties" key={pick.id} className="block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                  
                  {/* Large Image Header */}
                  <div className="h-64 relative overflow-hidden bg-slate-100">
                    {pick.photos ? (
                      <img src={pick.photos} alt={pick.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-4xl font-bold">
                        {(pick.title || "P").charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-sm hover:scale-110 transition-transform">
                        <Heart size={18} className="fill-slate-900" />
                      </button>
                    </div>
                  </div>

                  {/* Details Footer */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{pick.title}</h3>
                      <p className="text-lg font-black text-slate-900">
                        {pick.monthlyRent ? "$" + Number(pick.monthlyRent).toLocaleString() : "—"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mb-6">
                      {[pick.city, pick.district].filter(Boolean).join(", ") || pick.address || "—"}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                        <Bed size={14} />
                        {pick.bedrooms ?? "—"}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                        <Bath size={14} />
                        {pick.bathrooms ?? "—"}
                      </div>
                      {pick.areaSize && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                          <Maximize size={14} />
                          {Number(pick.areaSize).toLocaleString()}ft²
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
