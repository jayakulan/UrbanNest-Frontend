"use client";

import React, { useState, useEffect } from "react";
import { 
  Download, 
  Calendar, 
  ChevronDown, 
  Filter, 
  RotateCw,
  TrendingUp,
  Banknote,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PAGE_SIZE = 10;

export default function AdminBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [allBookings, setAllBookings]   = useState<any[]>([]);
  const [enriched, setEnriched]         = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);
  const [currentPage, setCurrentPage]   = useState(1);

  // ── Fetch all bookings then enrich with tenant, property, owner data ──
  useEffect(() => {
    const token = localStorage.getItem("token");

    const load = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/bookings", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const bookings: any[] = await res.json();
        setAllBookings(bookings);

        // Enrich each booking with tenant, property, and owner details
        const enrichedList = await Promise.all(
          bookings.map(async (b: any) => {
            let tenant   = null;
            let property = null;
            let owner    = null;

            // 1. Tenant
            try {
              const tRes = await fetch(`http://localhost:8080/api/users/${b.tenantId}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (tRes.ok) tenant = await tRes.json();
            } catch { /* skip */ }

            // 2. Property
            try {
              const pRes = await fetch(`http://localhost:8080/api/properties/${b.propertyId}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (pRes.ok) property = await pRes.json();
            } catch { /* skip */ }

            // 3. Owner (from property.ownerId)
            if (property?.ownerId) {
              try {
                const oRes = await fetch(`http://localhost:8080/api/users/${property.ownerId}`, {
                  headers: { "Authorization": `Bearer ${token}` }
                });
                if (oRes.ok) owner = await oRes.json();
              } catch { /* skip */ }
            }

            return { ...b, tenant, property, owner };
          })
        );

        setEnriched(enrichedList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ── Helpers ──
  const normalizeStatus = (s: string) => {
    if (!s) return "Pending";
    const u = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return u; // e.g. "Pending", "Approved", "Rejected", "Completed"
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Approved":  return "bg-blue-100/80 text-blue-700";
      case "Completed": return "bg-green-100/80 text-green-700";
      case "Pending":   return "bg-slate-200/80 text-slate-700";
      case "Rejected":  return "bg-red-100/80 text-red-700";
      default:          return "bg-slate-100 text-slate-700";
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch { return dateStr; }
  };

  const calcNights = (moveIn: string, moveOut: string) => {
    try {
      const diff = new Date(moveOut).getTime() - new Date(moveIn).getTime();
      const nights = Math.round(diff / (1000 * 60 * 60 * 24));
      return `${nights} Night${nights !== 1 ? "s" : ""}`;
    } catch { return "—"; }
  };

  // Avatar fallback — first initial in coloured circle
  const InitialAvatar = ({ name, size = "w-10 h-10", text = "text-sm" }: { name: string; size?: string; text?: string }) => (
    <div className={`${size} rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center shrink-0 ${text}`}>
      {(name || "?").charAt(0).toUpperCase()}
    </div>
  );

  // ── Filter + paginate ──
  const filtered = enriched.filter(b => {
    const s = normalizeStatus(b.status);
    if (activeFilter === "All") return true;
    return s === activeFilter;
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated   = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // ── Stats ──
  const totalRevenue    = enriched.reduce((acc, b) => acc + (b.totalAmount || b.monthlyRent || 0), 0);
  const approvedCount   = enriched.filter(b => normalizeStatus(b.status) === "Approved").length;
  const pendingCount    = enriched.filter(b => normalizeStatus(b.status) === "Pending").length;
  const occupancyRate   = enriched.length > 0 ? Math.round((approvedCount / enriched.length) * 100) : 0;

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Booking Management</h1>
          <p className="text-sm font-medium text-slate-600">
            Monitor and oversee all rental transactions and platform bookings.
          </p>
        </div>
        <button className="px-5 py-3 bg-[#0b0f19] text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Filters Top Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          
          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Status Filter</label>
            <div className="flex flex-wrap items-center bg-slate-50 p-1.5 rounded-2xl gap-1">
              {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === filter 
                      ? 'bg-white shadow-sm text-slate-900' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-black/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range and Actions */}
          <div className="flex flex-wrap items-end gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Date Range</label>
              <button className="w-full lg:w-auto flex items-center justify-between gap-4 px-5 py-4 bg-slate-100/80 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-500" /> All Time
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="w-12 h-[52px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Filter size={18} />
              </button>
              <button
                onClick={() => { setCurrentPage(1); }}
                className="w-12 h-[52px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <RotateCw size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-white border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <div className="col-span-3">Tenant</div>
          <div className="col-span-3">Property</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-1">Dates</div>
          <div className="col-span-2">Pricing</div>
          <div className="col-span-1">Status</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-8 py-12 text-center text-sm font-medium text-slate-400">
              Loading bookings...
            </div>
          ) : paginated.length === 0 ? (
            <div className="px-8 py-12 text-center text-sm font-medium text-slate-400">
              No bookings found.
            </div>
          ) : (
            paginated.map((booking) => {
              const status         = normalizeStatus(booking.status);
              const tenantName     = booking.tenant?.fullName || `Tenant #${booking.tenantId}`;
              const tenantEmail    = booking.tenant?.email || "—";
              const propertyName   = booking.property?.title || `Property #${booking.propertyId}`;
              const propertyLoc    = booking.property?.city
                ? `${booking.property.city}${booking.property.district ? ", " + booking.property.district : ""}`
                : booking.property?.address || "—";
              const propertyPhoto  = booking.property?.photos;
              const ownerName      = booking.owner?.fullName || `Owner #${booking.property?.ownerId || "?"}`;
              const totalAmount    = booking.totalAmount || booking.monthlyRent || 0;
              const perMonth       = booking.monthlyRent || 0;

              return (
                <div key={booking.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-slate-50/50 transition-colors bg-white">
                  
                  {/* Tenant */}
                  <div className="col-span-3 flex items-center gap-4 pr-4">
                    <InitialAvatar name={tenantName} />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">{tenantName}</h4>
                      <p className="text-[11px] font-medium text-slate-500 truncate">{tenantEmail}</p>
                    </div>
                  </div>

                  {/* Property */}
                  <div className="col-span-3 flex items-center gap-4 pr-4">
                    <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm border border-slate-200/50 relative">
                      {propertyPhoto ? (
                        <img src={propertyPhoto} alt={propertyName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                      )}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">{propertyName}</h4>
                      <p className="text-[11px] font-medium text-slate-400 truncate">{propertyLoc}</p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="col-span-2 flex items-center gap-3 pr-4">
                    <InitialAvatar name={ownerName} size="w-8 h-8" text="text-xs" />
                    <h4 className="text-xs font-bold text-slate-900 truncate">{ownerName}</h4>
                  </div>

                  {/* Dates */}
                  <div className="col-span-1 flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {formatDate(booking.moveInDate)}<br/>
                      <span className="text-slate-400 font-normal ml-0.5">—</span><br/>
                      {formatDate(booking.moveOutDate)}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1">
                      {calcNights(booking.moveInDate, booking.moveOutDate)}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="col-span-2 flex flex-col pr-4">
                    <span className="text-sm font-black text-slate-900">
                      ${totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                      ${perMonth.toLocaleString()}/mo
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ${getStatusBadge(status)}`}>
                      {status}
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Pagination Toolbar */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <p className="text-xs font-bold text-slate-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} bookings
          </p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${currentPage === page ? 'bg-[#0b0f19] text-white' : 'text-slate-600 hover:bg-slate-100 transition-colors'}`}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Data Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#0b132c] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Occupancy Rate</p>
          <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-6">
            {occupancyRate}%
          </h2>
          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
            <TrendingUp size={14} className="text-slate-300" />
            {approvedCount} active bookings
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Revenue</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-6">
            ${totalRevenue.toLocaleString()}
          </h2>
          <div className="text-[10px] font-bold text-green-600 flex items-center gap-2">
            <Banknote size={14} /> All processed successfully
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Pending Bookings</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-6">
            {String(pendingCount).padStart(2, "0")}
          </h2>
          <div className="text-[10px] font-bold text-red-500 flex items-center gap-2">
            <AlertCircle size={14} />
            <span className="text-red-600">
              {pendingCount > 0 ? `${pendingCount} require review` : "All clear"}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
