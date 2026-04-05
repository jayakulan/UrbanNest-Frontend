"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  CalendarDays, 
  Clock, 
  Banknote, 
  ListFilter, 
  SlidersHorizontal,
  Star
} from "lucide-react";
import Link from "next/link";

export default function TenantBookingsPage() {
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["All Bookings", "Pending", "Approved", "Completed", "Rejected"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // Fetch all bookings for this tenant
        const res = await fetch(`http://localhost:8080/api/bookings/tenant/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          const data: any[] = await res.json();

          // Enrich each booking with property details
          const enriched = await Promise.all(
            data.map(async (b: any) => {
              try {
                const pRes = await fetch(`http://localhost:8080/api/properties/${b.propertyId}`);
                const prop = pRes.ok ? await pRes.json() : null;
                return { ...b, property: prop };
              } catch {
                return { ...b, property: null };
              }
            })
          );
          setBookings(enriched);
        }
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusStyle = (status: string) => {
    const s = (status || "").toUpperCase();
    if (s === "APPROVED" || s === "CONFIRMED") return "bg-[#0b0f19] text-white";
    if (s === "PENDING") return "bg-white/80 backdrop-blur-md text-slate-800";
    if (s === "COMPLETED") return "bg-white/90 backdrop-blur-md text-slate-800";
    if (s === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-white/80 text-slate-800";
  };

  const filteredBookings = activeTab === "All Bookings"
    ? bookings
    : bookings.filter(b => (b.status || "").toUpperCase() === activeTab.toUpperCase());

  // Summary stats
  const nextBooking = bookings.find(b => b.status?.toUpperCase() === "PENDING" || b.status?.toUpperCase() === "APPROVED");
  const totalInvestment = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8 font-sans pb-32">
      
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Booking History</h1>
        <p className="text-slate-500 font-medium">Manage and track your rental requests and bookings in real-time.</p>
      </div>

      {/* Top Hero Cards */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        
        {/* Next Move-In Card */}
        <div className="flex-1 bg-[#0b0f19] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Next Move-In</span>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {nextBooking?.property?.title || "No Upcoming Booking"}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-300 mb-8 font-medium text-sm">
              <MapPin size={16} />
              <span>
                {nextBooking?.property
                  ? `${nextBooking.property.city || ""}, ${nextBooking.property.district || ""}`.trim().replace(/^,|,$/, "") || nextBooking.property.address
                  : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between relative z-10 w-full">
            <div className="flex gap-12">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</span>
                <span className="text-lg font-bold">{nextBooking?.moveInDate || "—"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className="text-lg font-bold capitalize">{nextBooking?.status || "—"}</span>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-md hover:bg-slate-100 transition-colors">
              View Itinerary
            </button>
          </div>

          {/* Decorative faint glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Total Investment Card */}
        <div className="w-full lg:w-72 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center shrink-0">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <Banknote size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Investment</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            ${totalInvestment.toLocaleString()}
          </h2>
          <p className="text-[10px] italic font-semibold text-slate-400">All active bookings</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4 border-b border-slate-200">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap ${
                activeTab === tab 
                  ? "text-slate-900" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-slate-900 rounded-t-sm"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 pb-3 shrink-0">
          <button className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <ListFilter size={16} />
          </button>
          <button className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-slate-500 font-medium py-10 text-center">Loading your bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-slate-400 font-medium py-10 text-center">No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              
              {/* Image Box */}
              <div className="w-full md:w-80 h-64 md:h-auto rounded-2xl overflow-hidden relative shrink-0">
                <img 
                  src={booking.property?.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=500&q=80"} 
                  alt={booking.property?.title || "Property"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-md shadow-sm ${getStatusStyle(booking.status)}`}>
                    {booking.status || "PENDING"}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="flex-1 py-4 pr-6 flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                      {booking.property?.title || `Property #${booking.propertyId}`}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                      <MapPin size={16} />
                      <span>
                        {booking.property
                          ? `${booking.property.city || ""}, ${booking.property.district || ""}`.trim().replace(/^,|,$/, "") || booking.property.address
                          : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1 justify-end">
                      ${booking.monthlyRent?.toLocaleString() || 0}<span className="text-sm font-semibold text-slate-400">/mo</span>
                    </p>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-2 gap-8 mb-auto mt-4">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">MOVE-IN DATE</p>
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <CalendarDays size={16} />
                      {booking.moveInDate || "—"}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">DURATION</p>
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Clock size={16} />
                      {booking.rentalDuration || "—"}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6"></div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-auto">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-50/80 text-blue-700 text-[9px] font-black uppercase tracking-wider rounded-full">
                      {booking.property?.bedrooms || 0} BEDROOMS
                    </span>
                    <span className="px-3 py-1 bg-blue-50/80 text-blue-700 text-[9px] font-black uppercase tracking-wider rounded-full">
                      {booking.property?.propertyType || "PROPERTY"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button className="text-slate-900 font-bold text-sm bg-transparent hover:underline px-5 py-2.5 rounded-lg transition-colors">
                      Contact Owner
                    </button>
                    <Link 
                      href={`/tenant/properties/${booking.propertyId}`}
                      className="px-5 py-2.5 rounded-lg transition-colors text-xs font-bold block text-center bg-[#0b0f19] text-white shadow-md hover:bg-slate-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
