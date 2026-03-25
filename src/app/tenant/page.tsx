"use client";

import React from "react";
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

export default function TenantDashboardPage() {
  const recentRequests = [
    {
      id: 1,
      name: "Skyline Penthouse",
      location: "Upper East Side, Manhattan",
      rent: "$4,500/mo",
      appliedOn: "Oct 24, 2023",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
      status: "REVIEWING",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      name: "The Harbor Suite",
      location: "Brooklyn Heights, NY",
      rent: "$3,200/mo",
      appliedOn: "Oct 20, 2023",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80",
      status: "ACTION NEEDED",
      statusColor: "bg-red-100 text-red-800",
      action: "Sign Lease"
    }
  ];

  const topPicks = [
    {
      id: 1,
      name: "Glass Pavilion",
      location: "West Hollywood, CA",
      rent: "$6,200",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      beds: 3,
      baths: 2,
      sqft: "2,400"
    },
    {
      id: 2,
      name: "Industrial Studio",
      location: "Wicker Park, Chicago",
      rent: "$2,800",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=600&q=80",
      beds: 1,
      baths: 1,
      sqft: "950"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-8 pb-24 font-sans">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">Welcome back, Alex</h1>
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
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">2</p>
            <p className="text-xs font-semibold text-slate-500">Active Bookings</p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-blue-100">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">1</p>
            <p className="text-xs font-semibold text-slate-500">Pending Requests</p>
          </div>
        </div>

        {/* Saved Properties */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-orange-100">
            <Heart size={20} className="fill-orange-600" />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">12</p>
            <p className="text-xs font-semibold text-slate-500">Saved Properties</p>
          </div>
        </div>

        {/* Past Rentals */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6 shrink-0 border border-slate-200">
            <History size={20} />
          </div>
          <div>
            <p className="text-4xl font-bold text-slate-900 tracking-tight mb-1">8</p>
            <p className="text-xs font-semibold text-slate-500">Past Rentals</p>
          </div>
        </div>
      </div>

      {/* Main Grid Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Booking Requests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Booking Requests</h2>
            <Link href="/tenant/bookings" className="text-sm font-bold text-slate-900 underline underline-offset-4 decoration-slate-300 hover:text-blue-600 transition-colors">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recentRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 relative hover:shadow-md transition-shadow">
                
                {/* Image */}
                <div className="w-full sm:w-40 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 py-1 pr-2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{req.name}</h3>
                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md ${req.statusColor}`}>
                      {req.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                    <MapPin size={14} />
                    <span className="text-xs font-semibold">{req.location}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="text-slate-400">Applied: {req.appliedOn}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-900">{req.rent}</span>
                    </div>
                    {req.action && (
                      <button className="px-5 py-2.5 bg-[#0b0f19] text-white text-xs font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors w-max shrink-0">
                        {req.action}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Top Picks */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Top Picks</h2>
          
          <div className="space-y-6">
            {topPicks.map((pick) => (
              <div key={pick.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                
                {/* Large Image Header */}
                <div className="h-64 relative overflow-hidden">
                  <img src={pick.image} alt={pick.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 z-10">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-sm hover:scale-110 transition-transform">
                      <Heart size={18} className="fill-slate-900" />
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{pick.name}</h3>
                    <p className="text-lg font-black text-slate-900">{pick.rent}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-500 mb-6">{pick.location}</p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                      <Bed size={14} />
                      {pick.beds}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                      <Bath size={14} />
                      {pick.baths}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">
                      <Maximize size={14} />
                      {pick.sqft}ft&sup2;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
