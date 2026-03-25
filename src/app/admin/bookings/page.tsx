"use client";

import React, { useState } from "react";
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

export default function AdminBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const bookings = [
    {
      id: 1,
      tenant: { 
        name: "Julianne Devis", 
        email: "julianne.d@example.com", 
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" 
      },
      property: { 
        name: "Skyline Penthouse", 
        location: "Manhattan, NY", 
        image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=100&q=80" 
      },
      owner: { 
        name: "Regina O'Neill", 
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
      },
      dates: { 
        start: "Oct 12", 
        end: "Nov 12", 
        nights: "31 Nights" 
      },
      pricing: { 
        total: "$4,500.00", 
        perNight: "$145/night" 
      },
      status: "Approved"
    },
    {
      id: 2,
      tenant: { 
        name: "Arthur Morgan", 
        email: "arthur.m@redmail.com", 
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" 
      },
      property: { 
        name: "Brutalist Garden Villa", 
        location: "Austin, TX", 
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80" 
      },
      owner: { 
        name: "Steven Burnet", 
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" 
      },
      dates: { 
        start: "Oct 15", 
        end: "Oct 20", 
        nights: "5 Nights" 
      },
      pricing: { 
        total: "$1,250.00", 
        perNight: "$250/night" 
      },
      status: "Pending"
    },
    {
      id: 3,
      tenant: { 
        name: "Kylie Walker", 
        email: "walker.k@domain.com", 
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" 
      },
      property: { 
        name: "Eco-Luxe Forest Cabin", 
        location: "Portland, OR", 
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&q=80" 
      },
      owner: { 
        name: "Tom Lowery", 
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" 
      },
      dates: { 
        start: "Sep 28", 
        end: "Oct 05", 
        nights: "7 Nights" 
      },
      pricing: { 
        total: "$1,890.00", 
        perNight: "$270/night" 
      },
      status: "Completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Approved":
        return "bg-blue-100/80 text-blue-700";
      case "Completed":
        return "bg-green-100/80 text-green-700";
      case "Pending":
        return "bg-slate-200/80 text-slate-700";
      case "Rejected":
        return "bg-red-100/80 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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
                  onClick={() => setActiveFilter(filter)}
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
                  <Calendar size={16} className="text-slate-500" /> Oct 01, 2023 - Oct 31, 2023
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="w-12 h-[52px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Filter size={18} />
              </button>
              <button className="w-12 h-[52px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
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
          {bookings.map((booking) => (
            <div key={booking.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-slate-50/50 transition-colors bg-white">
              
              {/* Tenant */}
              <div className="col-span-3 flex items-center gap-4 pr-4">
                <img src={booking.tenant.avatar} alt={booking.tenant.name} className="w-10 h-10 rounded-full object-cover shrink-0 bg-slate-200 shadow-sm" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">{booking.tenant.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{booking.tenant.email}</p>
                </div>
              </div>

              {/* Property */}
              <div className="col-span-3 flex items-center gap-4 pr-4">
                <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm border border-slate-200/50 relative">
                   <img src={booking.property.image} alt={booking.property.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">{booking.property.name}</h4>
                  <p className="text-[11px] font-medium text-slate-400 truncate">{booking.property.location}</p>
                </div>
              </div>

              {/* Owner */}
              <div className="col-span-2 flex items-center gap-3 pr-4">
                <img src={booking.owner.avatar} alt={booking.owner.name} className="w-8 h-8 rounded-full object-cover shrink-0 bg-slate-200 shadow-sm" />
                <h4 className="text-xs font-bold text-slate-900 truncate">{booking.owner.name}</h4>
              </div>

              {/* Dates */}
              <div className="col-span-1 flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {booking.dates.start}<br/><span className="text-slate-400 font-normal ml-0.5">—</span><br/>{booking.dates.end}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1">{booking.dates.nights}</span>
              </div>

              {/* Pricing */}
              <div className="col-span-2 flex flex-col pr-4">
                <span className="text-sm font-black text-slate-900">{booking.pricing.total}</span>
                <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{booking.pricing.perNight}</span>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Toolbar */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <p className="text-xs font-bold text-slate-500">
            Showing 1 to 10 of 248 bookings
          </p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0b0f19] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">25</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Data Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#0b132c] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Occupancy Rate</p>
          <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-6">92.4%</h2>
          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
            <TrendingUp size={14} className="text-slate-300" /> +4.2% from last month
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Revenue (MTD)</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-6">$142,500.00</h2>
          <div className="text-[10px] font-bold text-green-600 flex items-center gap-2">
            <Banknote size={14} /> All processed successfully
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Active Issues</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-6">08</h2>
          <div className="text-[10px] font-bold text-red-500 flex items-center gap-2">
            <AlertCircle size={14} /> <span className="text-red-600">3 require immediate action</span>
          </div>
        </div>

      </div>

    </div>
  );
}
