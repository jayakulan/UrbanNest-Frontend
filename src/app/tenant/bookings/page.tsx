"use client";

import React, { useState } from "react";
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

  const tabs = ["All Bookings", "Pending", "Approved", "Completed", "Rejected"];

  const bookings = [
    {
      id: 1,
      title: "Azure Sky Penthouse",
      location: "Upper East Side, Manhattan",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=500&q=80",
      status: "CONFIRMED",
      statusStyle: "bg-[#0b0f19] text-white",
      price: "$12,500",
      priceSubtext: "SECURITY DEPOSIT PAID",
      meta1Label: "CHECK-IN",
      meta1Value: "June 15, 2024",
      meta1Icon: <CalendarDays size={16} />,
      meta2Label: "DURATION",
      meta2Value: "12 Months (Fixed)",
      meta2Icon: <Clock size={16} />,
      tags: ["3 BEDROOMS", "POOL ACCESS"],
      actions: [
        { label: "Contact Owner", style: "text-slate-900 font-bold text-sm bg-transparent hover:underline" },
        { label: "View Details", style: "bg-[#0b0f19] text-white shadow-md hover:bg-slate-800" }
      ]
    },
    {
      id: 2,
      title: "The Obsidian Suite",
      location: "SoHo, Manhattan",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&q=80",
      status: "PENDING REVIEW",
      statusStyle: "bg-white/80 backdrop-blur-md text-slate-800",
      price: "$8,900",
      priceSubtext: "",
      meta1Label: "REQUESTED START",
      meta1Value: "August 01, 2024",
      meta1Icon: <CalendarDays size={16} />,
      meta2Label: "STATUS UPDATE",
      meta2Value: "Awaiting Approval",
      meta2Icon: <Clock size={16} />,
      tags: ["STUDIO LOFT", "CONCIERGE"],
      actions: [
        { label: "Withdraw Request", style: "text-slate-900 font-bold text-sm bg-transparent hover:underline" },
        { label: "Details", style: "bg-slate-200 text-slate-800 hover:bg-slate-300" }
      ]
    },
    {
      id: 3,
      title: "The Glass Pavilion",
      location: "Scarsdale, NY",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
      status: "COMPLETED",
      statusStyle: "bg-white/90 backdrop-blur-md text-slate-800",
      price: "$15,200",
      priceSubtext: "",
      meta1Label: "TENANCY END",
      meta1Value: "May 30, 2024",
      meta1Icon: <CalendarDays size={16} />,
      meta2Label: "REVIEW",
      meta2Value: "5 stars",
      meta2Icon: null,
      tags: ["ESTATE", "PRIVATE FOREST"],
      actions: [
        { label: "Re-book Space", style: "bg-[#333b4d] text-white hover:bg-[#1a1f2b] shadow-sm" }
      ]
    }
  ];

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
            <h2 className="text-3xl font-bold tracking-tight mb-2">Azure Sky Penthouse</h2>
            <div className="flex items-center gap-1.5 text-slate-300 mb-8 font-medium text-sm">
              <MapPin size={16} />
              <span>Upper East Side, Manhattan</span>
            </div>
          </div>

          <div className="flex items-end justify-between relative z-10 w-full">
            <div className="flex gap-12">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</span>
                <span className="text-lg font-bold">June 15, 2024</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className="text-lg font-bold">Confirmed</span>
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
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">$42,800</h2>
          <p className="text-[10px] italic font-semibold text-slate-400">Last 12 months active bookings</p>
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
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
            
            {/* Image Box */}
            <div className="w-full md:w-80 h-64 md:h-auto rounded-2xl overflow-hidden relative shrink-0">
              <img 
                src={booking.image} 
                alt={booking.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-md shadow-sm ${booking.statusStyle}`}>
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Content Box */}
            <div className="flex-1 py-4 pr-6 flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">{booking.title}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                    <MapPin size={16} />
                    <span>{booking.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1 justify-end">
                    {booking.price}<span className="text-sm font-semibold text-slate-400">/mo</span>
                  </p>
                  {booking.priceSubtext && (
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                      {booking.priceSubtext}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-8 mb-auto mt-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{booking.meta1Label}</p>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    {booking.meta1Icon}
                    {booking.meta1Value}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{booking.meta2Label}</p>
                  
                  {booking.meta2Label === "REVIEW" ? (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className="fill-slate-300 text-slate-300" />
                      ))}
                      {/* Note: since template shows empty stars waiting for review, filled logic maps according to dynamic data */}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      {booking.meta2Icon}
                      {booking.meta2Value}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 my-6"></div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  {booking.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50/80 text-blue-700 text-[9px] font-black uppercase tracking-wider rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {booking.actions.map((action, idx) => {
                    const isLink = action.label === "View Details" || action.label === "Details";
                    if (isLink) {
                      return (
                        <Link 
                          key={idx} 
                          href={`/tenant/bookings/${booking.id}`}
                          className={`px-5 py-2.5 rounded-lg transition-colors text-xs font-bold block text-center ${action.style}`}
                        >
                          {action.label}
                        </Link>
                      );
                    }
                    return (
                      <button 
                        key={idx} 
                        className={`px-5 py-2.5 rounded-lg transition-colors text-xs font-bold ${action.style}`}
                      >
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
