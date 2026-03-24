"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Home, 
  MoreHorizontal, 
  Eye, 
  Hourglass, 
  CheckCircle2, 
  TrendingUp,
  Star
} from "lucide-react";

export default function BookingRequestsPage() {
  const [activeTab, setActiveTab] = useState("All Requests");
  const tabs = ["All Requests", "Pending", "Approved", "Rejected", "Completed"];

  const requests = [
    {
      id: 1,
      tenant: {
        name: "Eleanor May",
        rating: "4.9",
        reviews: 12,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        online: true
      },
      property: {
        name: "Skyline Penthouse",
        location: "Unit 402 • Upper East Side, NY",
        rent: "$4,500",
        icon: <Building2 className="text-blue-600" size={20} />
      },
      contract: {
        moveIn: "Oct 12, 2023",
        duration: "12 Months",
        total: "$54,000"
      },
      status: "PENDING REVIEW",
      statusColor: "bg-orange-100 text-orange-700"
    },
    {
      id: 2,
      tenant: {
        name: "Julian Vance",
        rating: "4.7",
        reviews: 0,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
        online: false
      },
      property: {
        name: "Glass House Loft",
        location: "Unit 12B • Chelsea, NY",
        rent: "$3,800",
        icon: <Home className="text-slate-700" size={20} />
      },
      contract: {
        moveIn: "Sep 28, 2023",
        duration: "24 Months",
        total: null
      },
      status: "APPROVED",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      id: 3,
      tenant: {
        name: "Sarah Jenkins",
        rating: "5.0",
        reviews: 0,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        online: false
      },
      property: {
        name: "Urban Garden Villa",
        location: "Private Wing • Brooklyn, NY",
        rent: "$6,200",
        icon: <Home className="text-slate-700" size={20} />
      },
      contract: {
        moveIn: "Nov 01, 2023",
        duration: "12 Months",
        total: null
      },
      status: "NEW REQUEST",
      statusColor: "bg-blue-50 text-blue-600"
    }
  ];

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
        {requests.map((req) => (
          <div key={req.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col xl:flex-row gap-8 relative hover:shadow-md transition-shadow">
            
            {/* Status Pill (Absolute on Top Right on large screens, standard flow on small) */}
            <div className="absolute top-8 right-8 hidden xl:block">
              <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg ${req.statusColor}`}>
                {req.status}
              </span>
            </div>
            
            {/* Tenant Info */}
            <div className="flex xl:flex-col gap-4 items-center xl:items-start xl:w-48 xl:border-r border-slate-100 xl:pr-8 shrink-0">
              <div className="relative">
                <img 
                  src={req.tenant.avatar} 
                  alt={req.tenant.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                />
                {req.tenant.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 break-words">{req.tenant.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-slate-900">{req.tenant.rating}</span>
                  {req.tenant.reviews > 0 && (
                    <span className="text-xs text-slate-400 font-medium">({req.tenant.reviews} Reviews)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Content area */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Property Info */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Property Information</p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-center shrink-0">
                    {req.property.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{req.property.name}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1 mb-2">
                      {req.property.location}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold text-slate-900">{req.property.rent}</span>
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
                    <p className="text-sm font-bold text-slate-900">{req.contract.moveIn}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Duration</p>
                    <p className="text-sm font-bold text-slate-900">{req.contract.duration}</p>
                  </div>
                  {req.contract.total && (
                    <div className="col-span-2">
                      <p className="text-xs font-medium text-slate-500 mb-1">Total Contract</p>
                      <p className="text-sm font-bold text-slate-900">{req.contract.total}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="xl:w-64 flex flex-col justify-end gap-3 shrink-0">
              {/* Mobile status pill */}
              <div className="xl:hidden mb-4">
                <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg ${req.statusColor}`}>
                  {req.status}
                </span>
              </div>
                
              {req.status === "PENDING REVIEW" && (
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

              {req.status === "APPROVED" && (
                <div className="mt-auto">
                  <button className="w-full py-3.5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    <Eye size={18} />
                    View Lease
                  </button>
                </div>
              )}

              {req.status === "NEW REQUEST" && (
                <>
                  <button className="w-full py-3.5 bg-[#0b0f19] text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md">
                    Review Now
                  </button>
                  <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors text-sm">
                    Archive
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-slate-50/50 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-100">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
            <Hourglass className="text-slate-900" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Average Response</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">4.2 Hours</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-slate-50/50 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-100">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
            <CheckCircle2 className="text-slate-900" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Approval Rate</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">87%</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#0b0f19] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-lg relative overflow-hidden text-white">
          <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5 flex items-center justify-center shrink-0 relative z-10">
            <TrendingUp className="text-blue-400" size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Projected Revenue</p>
            <p className="text-3xl font-bold tracking-tight">
              $142.8k <span className="text-base font-medium text-slate-400">/ yr</span>
            </p>
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-30"></div>
        </div>

      </div>
    </div>
  );
}
