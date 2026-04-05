"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MoreHorizontal, 
  Eye, 
  Hourglass, 
  CheckCircle2, 
  TrendingUp,
  Star
} from "lucide-react";

export default function BookingRequestsPage() {
  const [activeTab, setActiveTab] = useState("All Requests");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["All Requests", "Pending", "Approved", "Rejected", "Completed"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // 1. Get all properties owned by this owner
        const propRes = await fetch(`http://localhost:8080/api/properties/owner/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!propRes.ok) return;
        const properties: any[] = await propRes.json();

        // 2. For each property, fetch its bookings, then enrich with tenant info
        const allBookings: any[] = [];
        await Promise.all(
          properties.map(async (prop: any) => {
            try {
              const bRes = await fetch(`http://localhost:8080/api/bookings/property/${prop.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (!bRes.ok) return;
              const bookings: any[] = await bRes.json();

              await Promise.all(
                bookings.map(async (b: any) => {
                  let tenantName = `Tenant #${b.tenantId}`;
                  try {
                    const uRes = await fetch(`http://localhost:8080/api/users/${b.tenantId}`, {
                      headers: { "Authorization": `Bearer ${token}` }
                    });
                    if (uRes.ok) {
                      const uData = await uRes.json();
                      tenantName = uData.fullName || uData.name || tenantName;
                    }
                  } catch { /* keep fallback name */ }

                  allBookings.push({
                    ...b,
                    tenantName,
                    property: prop
                  });
                })
              );
            } catch { /* skip failed property */ }
          })
        );

        setRequests(allBookings);
      } catch (err) {
        console.error("Failed to fetch booking requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    const s = (status || "").toUpperCase();
    if (s === "PENDING") return "bg-orange-100 text-orange-700";
    if (s === "APPROVED") return "bg-green-100 text-green-700";
    if (s === "REJECTED") return "bg-red-100 text-red-700";
    if (s === "COMPLETED") return "bg-slate-100 text-slate-700";
    return "bg-blue-50 text-blue-600";
  };

  const filteredRequests = activeTab === "All Requests"
    ? requests
    : requests.filter(r => (r.status || "").toUpperCase() === activeTab.toUpperCase());

  // Stats
  const pendingCount = requests.filter(r => r.status?.toUpperCase() === "PENDING").length;
  const approvedCount = requests.filter(r => r.status?.toUpperCase() === "APPROVED").length;
  const totalRevenue = requests
    .filter(r => r.status?.toUpperCase() === "APPROVED")
    .reduce((sum, r) => sum + (r.totalAmount || 0), 0);

  return (
    <div className="max-w-[1400px] mx-auto p-8 font-sans pb-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Booking Requests</h1>
          <p className="text-slate-500 font-medium">
            Manage and review incoming tenant applications for your portfolio.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="bg-slate-100/50 p-1.5 rounded-2xl flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-6 mb-12">
        {loading ? (
          <p className="text-slate-500 font-medium py-10 text-center">Loading booking requests...</p>
        ) : filteredRequests.length === 0 ? (
          <p className="text-slate-400 font-medium py-10 text-center">No booking requests found.</p>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-8 relative hover:shadow-md transition-shadow">
              
              {/* Status Pill */}
              <div className="absolute top-8 right-8 hidden xl:block">
                <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg ${getStatusColor(req.status)}`}>
                  {req.status || "PENDING"}
                </span>
              </div>
              
              {/* Tenant Info */}
              <div className="flex xl:flex-col gap-4 items-center xl:items-start xl:w-48 xl:border-r border-slate-100 xl:pr-8 shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600 shadow-sm">
                    {(req.tenantName || "T").charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 break-words">{req.tenantName}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-900">4.8</span>
                  </div>
                </div>
              </div>

              {/* Middle Content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Property Info */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Property Information</p>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{req.property?.title || `Property #${req.propertyId}`}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-1 mb-2">
                        {req.property?.city ? `${req.property.city}, ${req.property.district}` : req.property?.address || "—"}
                      </p>
                      <p className="text-sm">
                        <span className="font-bold text-slate-900">${req.monthlyRent?.toLocaleString() || 0}</span>
                        <span className="text-slate-400 font-medium whitespace-pre"> / month</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contract Info */}
                <div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 lg:mt-9">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">Move-in Date</p>
                      <p className="text-sm font-bold text-slate-900">{req.moveInDate || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">Duration</p>
                      <p className="text-sm font-bold text-slate-900">{req.rentalDuration || "—"}</p>
                    </div>
                    {req.totalAmount && (
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Amount</p>
                        <p className="text-sm font-bold text-slate-900">${req.totalAmount?.toLocaleString()}</p>
                      </div>
                    )}
                    {req.message && (
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-slate-500 mb-1">Message</p>
                        <p className="text-xs text-slate-700 font-medium italic line-clamp-2">&quot;{req.message}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="xl:w-64 flex flex-col justify-end gap-3 shrink-0">
                {/* Mobile status pill */}
                <div className="xl:hidden mb-4">
                  <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg ${getStatusColor(req.status)}`}>
                    {req.status || "PENDING"}
                  </span>
                </div>
                  
                {(req.status?.toUpperCase() === "PENDING" || !req.status) && (
                  <>
                    <button className="w-full py-3.5 bg-[#0b0f19] text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md">
                      Approve
                    </button>
                    <div className="flex gap-3 text-sm">
                      <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                        Reject
                      </button>
                      <button className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </>
                )}

                {req.status?.toUpperCase() === "APPROVED" && (
                  <div className="mt-auto">
                    <button className="w-full py-3.5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <Eye size={18} />
                      View Lease
                    </button>
                  </div>
                )}

                {req.status?.toUpperCase() === "COMPLETED" && (
                  <>
                    <button className="w-full py-3.5 bg-[#333b4d] text-white rounded-xl font-bold hover:bg-[#1a1f2b] transition-colors shadow-sm">
                      View Record
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-slate-50/50 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-100">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
            <Hourglass className="text-slate-900" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Requests</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{pendingCount}</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-slate-50/50 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-100">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
            <CheckCircle2 className="text-slate-900" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Approved</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{approvedCount}</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#0b0f19] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-lg relative overflow-hidden text-white">
          <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5 flex items-center justify-center shrink-0 relative z-10">
            <TrendingUp className="text-blue-400" size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Total Revenue</p>
            <p className="text-3xl font-bold tracking-tight">
              ${totalRevenue.toLocaleString()} <span className="text-base font-medium text-slate-400">/ bookings</span>
            </p>
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-30"></div>
        </div>

      </div>
    </div>
  );
}
