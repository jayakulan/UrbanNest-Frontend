"use client";

import React from "react";
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

export default function AdminReportsPage() {

  const topProperties = [
    {
      id: 1,
      name: "The Azure Penthouse",
      location: "Midtown Manhattan, NY",
      revenue: "$45,200",
      occupancy: 94,
      trend: "up",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"
    },
    {
      id: 2,
      name: "Oakridge Manor",
      location: "Beverly Hills, CA",
      revenue: "$38,150",
      occupancy: 88,
      trend: "up",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=100&q=80"
    },
    {
      id: 3,
      name: "Crystal Bay Villa",
      location: "Miami Beach, FL",
      revenue: "$32,900",
      occupancy: 72,
      trend: "flat",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&q=80"
    }
  ];

  const activeUsers = [
    {
      id: 1,
      name: "Elena Rodriguez",
      type: "PREMIUM HOST",
      score: "98/100",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      id: 2,
      name: "James Chen",
      type: "CORPORATE AGENT",
      score: "94/100",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      id: 3,
      name: "Sarah Miller",
      type: "POWER USER",
      score: "92/100",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Platform Reports & Analytics</h1>
          <p className="text-sm font-medium text-slate-600">
            Real-time performance metrics and growth insights for UrbanNest properties.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Time Filter Pill */}
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
          
          {/* Date Range Dropdown */}
          <button className="px-5 py-2 flex items-center gap-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors h-12">
            <Calendar size={16} className="text-slate-500" />
            <span className="text-left leading-tight text-[11px]">
              <span className="block">Jan 2023 -</span>
              <span className="block">Dec 2023</span>
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
              <TrendingUp size={12} /> 12.5%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Users</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">24,592</h2>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center shrink-0">
              <Home size={18} />
            </div>
            <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingUp size={12} /> 8.2%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Listings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">1,842</h2>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <span className="bg-red-50 text-red-500 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingDown size={12} /> 2.4%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Bookings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">12,408</h2>
          </div>
        </div>

        {/* Gross Revenue */}
        <div className="bg-[#0b132c] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
              <Banknote size={18} />
            </div>
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest border border-green-500/20">
              <TrendingUp size={12} /> 18.7%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gross Revenue</p>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none">$4,281,900</h2>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
        </div>

      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8 overflow-hidden">
        
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Revenue & Booking Trends</h3>
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

        {/* Chart CSS Simulation */}
        <div className="relative h-64 w-full flex items-end justify-between px-2 pt-6">
          
          {/* Y-Axis Lines & Labels */}
          <div className="absolute inset-x-2 inset-y-0 flex flex-col justify-between pointer-events-none">
            {['500K', '400K', '300K', '200K', '100K', '0K'].map((label, index) => (
              <div key={index} className="flex items-center w-full relative">
                <span className="text-[8px] font-bold text-slate-300 w-8 absolute -left-2 -translate-y-1/2">{label}</span>
                <div className="w-full h-px border-t border-slate-100 ml-6"></div>
              </div>
            ))}
          </div>

          {/* Bar Data (Simulated Heights for aesthetic match) */}
          <div className="relative z-10 w-full flex justify-between h-full ml-6 pl-2 pr-4 pb-[1px]">
            {/* JAN */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[30%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">JAN</span>
            </div>
            {/* FEB */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[45%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">FEB</span>
            </div>
            {/* MAR */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[35%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">MAR</span>
            </div>
            {/* APR */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[55%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">APR</span>
            </div>
            {/* MAY */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[70%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">MAY</span>
            </div>
            {/* JUN */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[60%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">JUN</span>
            </div>
            {/* JUL (Active/Highlighted) */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#cbd5e1] h-[75%] rounded-t-sm border-2 border-[#0b0f19] transition-all"></div>
              <span className="absolute -bottom-6 text-[10px] font-black text-slate-900">JUL</span>
            </div>
            {/* AUG */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[65%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">AUG</span>
            </div>
            {/* SEP */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[55%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">SEP</span>
            </div>
            {/* OCT */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[70%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">OCT</span>
            </div>
            {/* NOV */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[80%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">NOV</span>
            </div>
            {/* DEC */}
            <div className="w-[6%] flex flex-col items-center justify-end relative group">
              <div className="w-full bg-[#e2e8f0] h-[65%] rounded-t-sm transition-colors group-hover:bg-slate-300"></div>
              <span className="absolute -bottom-6 text-[9px] font-bold text-slate-400">DEC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* User Growth */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-[280px]">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-6">User Growth</h3>
            
            {/* Mini bar chart */}
            <div className="flex-1 flex items-end justify-between px-2 gap-2 mb-6">
              <div className="w-full bg-blue-100 h-[20%] rounded-t-sm"></div>
              <div className="w-full bg-blue-100 h-[35%] rounded-t-sm"></div>
              <div className="w-full bg-blue-200 h-[60%] rounded-t-sm"></div>
              <div className="w-full bg-blue-100 h-[50%] rounded-t-sm"></div>
              <div className="w-full bg-[#0b0f19] h-[85%] rounded-t-sm border-b-2 border-black"></div>
              <div className="w-full bg-blue-100 h-[70%] rounded-t-sm"></div>
              <div className="w-full bg-blue-200 h-[80%] rounded-t-sm"></div>
            </div>

            <div className="flex justify-between items-end border-t border-slate-100 pt-4">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">NEW SIGNUPS</p>
                <h4 className="text-xl font-black text-slate-900 leading-none">+1,280</h4>
              </div>
              <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">
                ↑ 14% vs LW
              </span>
            </div>
          </div>

          {/* Property Types Donut Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col flex-1 h-[280px]">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">Property Types</h3>
            
            {/* Fake Donut SVG */}
            <div className="relative w-32 h-32 mx-auto my-auto flex items-center justify-center mb-6 mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="16" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dbeafe" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="125" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0b0f19" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="150" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                 <span className="text-[10px] font-bold text-slate-400">Total</span>
                 <span className="text-sm font-black text-slate-900">1.8k</span>
              </div>
            </div>

            <div className="space-y-3 px-2">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-[#0b0f19]"></div> Luxury Villas
                </div>
                <span className="text-slate-900">45%</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-blue-100"></div> Modern Lofts
                </div>
                <span className="text-slate-900">32%</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div> Penthouse
                </div>
                <span className="text-slate-900">23%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Performing Properties */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 flex flex-col h-[280px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight">Top Performing Properties</h3>
              <Link href="#" className="text-[10px] font-bold text-slate-900 hover:text-slate-500 transition-colors uppercase tracking-widest border-b border-slate-900 pb-0.5">
                View All
              </Link>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <div className="col-span-4">Property Name</div>
                <div className="col-span-3">Monthly Revenue</div>
                <div className="col-span-4">Occupancy</div>
                <div className="col-span-1 text-right">Trend</div>
              </div>

              <div className="flex-1 flex flex-col justify-around py-2 min-h-0">
                {topProperties.map((prop) => (
                  <div key={prop.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3 pr-2">
                       <img src={prop.image} alt={prop.name} className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm" />
                       <div className="min-w-0">
                         <h4 className="text-[11px] font-bold text-slate-900 truncate">{prop.name}</h4>
                         <p className="text-[9px] font-medium text-slate-400 truncate mt-0.5">{prop.location}</p>
                       </div>
                    </div>
                    
                    <div className="col-span-3">
                      <span className="text-sm font-black text-slate-900">{prop.revenue}</span>
                    </div>

                    <div className="col-span-4 flex items-center gap-3 pr-4">
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-[#0b0f19] rounded-full" style={{ width: `${prop.occupancy}%` }}></div>
                       </div>
                       <span className="text-[10px] font-bold text-slate-700 w-8">{prop.occupancy}%</span>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      {prop.trend === "up" ? (
                        <ArrowUpRight size={16} className="text-green-500" />
                      ) : (
                        <ArrowRight size={16} className="text-orange-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inner Grid Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            
            {/* Most Active Users */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 h-[280px] flex flex-col">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight mb-6">Most Active Users</h3>
              <div className="flex-1 flex flex-col justify-around min-h-0 py-2">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{user.name}</h4>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{user.type}</p>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[9px] font-black tracking-widest">
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupancy Rates */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 h-[280px] flex flex-col">
              <h3 className="text-sm lg:text-base font-bold text-slate-900 tracking-tight mb-6">Occupancy Rates</h3>
              <div className="flex-1 flex flex-col justify-around min-h-0 py-2">
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                     <span className="text-slate-700">North East</span>
                     <span className="text-slate-900">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#0b0f19] rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                     <span className="text-slate-700">South West</span>
                     <span className="text-slate-900">78%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#0b0f19] rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                     <span className="text-slate-700">Central Coast</span>
                     <span className="text-slate-900">84%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#0b0f19] rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
