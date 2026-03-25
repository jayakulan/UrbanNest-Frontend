"use client";

import React from "react";
import { 
  TrendingUp, 
  Home, 
  Users, 
  ShoppingCart, 
  UserPlus, 
  Headset, 
  Gauge
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Portfolio Overview</h1>
        <p className="text-sm font-medium text-slate-600">
          Welcome back, Alexander. Here's what's happening with UrbanNest today.
        </p>
      </div>

      {/* Top Value Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center text-blue-800">
              <TrendingUp size={20} />
            </div>
            <span className="bg-green-50 text-green-600 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              +12.5%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Revenue</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">$2,482,900</h2>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center text-blue-800">
              <Home size={20} />
            </div>
            <span className="bg-green-50 text-green-600 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              +4.2%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Active Listings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">842</h2>
          </div>
        </div>

        {/* User Base */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 bg-slate-200/50 rounded-xl flex items-center justify-center text-slate-700">
              <Users size={20} />
            </div>
            <span className="bg-slate-100 text-slate-500 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider">
              Stable
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">User Base</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">12,402</h2>
          </div>
        </div>

      </div>

      {/* Main Structural Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Heavy Image Widget (Col Span 5) */}
        <div className="lg:col-span-5 h-full min-h-[500px] relative rounded-3xl overflow-hidden shadow-sm shadow-slate-200 group">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
            alt="The Glass Pavilion" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full z-10">
            <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider rounded-lg mb-4 shadow-sm">
              Property of the Month
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">The Glass Pavilion</h3>
            <p className="text-sm font-medium text-slate-300 leading-relaxed pr-8">
              Our highest performing listing in the premium sector this quarter.
            </p>
          </div>
        </div>

        {/* Right Flow Modules (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Recent Transactions List Block */}
          <div className="bg-white rounded-3xl p-8 py-10 shadow-sm border border-slate-100/50 flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
              <Link href="/admin/payments" className="text-[10px] font-bold text-slate-900 border-b-2 border-slate-900 uppercase tracking-widest hover:text-slate-500 hover:border-slate-500 transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-8">
              {/* Payment Item */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 shrink-0 shadow-sm group-hover:bg-slate-200 transition-colors">
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">Payment received from #8291</h4>
                    <span className="text-[11px] font-medium text-slate-500">2 minutes ago</span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-4">
                  <span className="text-sm font-bold text-slate-900 block">+$12,400</span>
                </div>
              </div>

              {/* Host Register Item */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 shrink-0 shadow-sm group-hover:bg-slate-200 transition-colors">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">New host registered: Elena Rossi</h4>
                    <span className="text-[11px] font- medium text-slate-500">45 minutes ago</span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-4">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 text-[9px] font-black rounded-md tracking-wider uppercase">
                    New
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Module Split Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-48">
            
            <div className="bg-[#0b0f19] rounded-3xl text-white p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer h-full">
              <Headset size={24} className="text-white relative z-10" />
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Open Tickets</p>
                <h2 className="text-4xl font-black text-white tracking-tight">14</h2>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            <div className="bg-[#e0e7ff] rounded-3xl text-indigo-900 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer h-full">
              <Gauge size={24} className="text-indigo-900 relative z-10" />
              <div className="relative z-10 mt-auto">
                <p className="text-[10px] font-bold text-indigo-900/60 uppercase tracking-widest mb-1.5">System Health</p>
                <h2 className="text-4xl font-black text-indigo-900 tracking-tight">99%</h2>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/30 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
