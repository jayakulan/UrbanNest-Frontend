"use client";

import React from "react";
import Link from "next/link";
import { 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Pencil, 
  ShieldCheck, 
  Ban, 
  Trash2,
  Ticket,
  Banknote,
  Star,
  ChevronRight,
  Filter,
  Download,
  LogIn,
  Home,
  UserCog,
  KeyRound,
  AlertCircle,
  ChevronDown
} from "lucide-react";

export default function AdminUserDetailsPage({ params }: { params: { id: string } }) {
  // Hardcoded layout based on mockup
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-8">
        <Link href="/admin/users" className="hover:text-slate-900 transition-colors font-bold text-slate-800">User Details</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">Alexander Vance</span>
      </div>

      {/* Top Split Panel */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left: User Profile Card */}
        <div className="flex-1 bg-white rounded-3xl p-8 relative overflow-hidden shadow-sm border border-slate-100/50 flex flex-col sm:flex-row gap-8 items-start">
          {/* Decorative Shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          {/* Avatar Container */}
          <div className="relative shrink-0 z-10">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" 
              alt="Alexander Vance"
              className="w-32 h-32 rounded-2xl object-cover shadow-sm bg-slate-200"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
              <CheckCircle2 size={16} className="fill-green-600 text-white" />
            </div>
          </div>

          <div className="flex-1 z-10 mt-2">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Alexander Vance</h1>
              <span className="bg-[#0b0f19] text-white px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest">
                Owner
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-green-100/50 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 uppercase">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Active
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 max-w-md">
              Experienced property owner specializing in luxury penthouses and high-end lofts in Manhattan. Currently managing a portfolio of premium urban residences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-400" />
                <span className="truncate">a.vance@urbannest.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-slate-400" />
                <span>+1 555 987 6543</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <span>123 Park Avenue, NY</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-slate-400" />
                <span>Member Since Oct 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Admin Management Card */}
        <div className="w-full lg:w-[320px] shrink-0 bg-[#0b132c] rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-sm">
          <div className="relative z-10 mb-8">
            <h2 className="text-lg font-bold text-white tracking-tight mb-2">Admin Management</h2>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
              Account level administrative actions for this user.
            </p>
          </div>

          <div className="relative z-10 space-y-3 mt-auto">
            <button className="w-full py-3.5 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Pencil size={16} /> Edit Details
            </button>
            <button className="w-full py-3.5 bg-white/10 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm border border-white/5">
              <ShieldCheck size={16} /> Verify Account
            </button>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold shadow-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-red-200">
                <Ban size={14} /> Disable
              </button>
              <button className="py-3 bg-white/5 text-red-500 border border-white/10 rounded-xl text-xs font-bold shadow-sm hover:bg-white/10 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Building size={18} />
            </div>
            <span className="text-[10px] font-bold text-green-600 tracking-wider">+2 this mo</span>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Properties</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">12</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Ticket size={18} />
            </div>
            <span className="text-[10px] font-bold text-green-600 tracking-wider">+18%</span>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">145</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Banknote size={18} />
            </div>
            <span className="text-[10px] font-bold text-green-600 tracking-wider">Top 5%</span>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue Generated</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">$240,000</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-900">
              <Star size={18} className="fill-slate-900" />
            </div>
            <div className="flex items-center gap-0.5">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Average Rating</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">4.9</h3>
          </div>
        </div>
      </div>

      {/* Bottom Split Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Properties Listed */}
        <div className="lg:col-span-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Properties Listed</h2>
            <Link href="#" className="text-[11px] font-bold text-slate-900 border-b border-slate-900 hover:text-slate-500 hover:border-slate-500 transition-colors uppercase tracking-wider">
              View All Portfolio
            </Link>
          </div>
          
          <div className="space-y-4">
            {/* Property 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
              <img src="https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=150&q=80" alt="Obsidian" className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate pr-2">The Obsidian Suite</h4>
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase shrink-0">ACTIVE</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mb-3">Tribeca, New York</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900">$12,500 <span className="text-[9px] font-bold text-slate-400">/ mo</span></span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=150&q=80" alt="Loft" className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate pr-2">Minimalist Loft</h4>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase shrink-0">RENTED</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mb-3">SoHo, New York</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900">$8,200 <span className="text-[9px] font-bold text-slate-400">/ mo</span></span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&q=80" alt="Villa" className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate pr-2">Azure Horizon Villa</h4>
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase shrink-0">ACTIVE</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mb-3">Hamptons, NY</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900">$24,000 <span className="text-[9px] font-bold text-slate-400">/ mo</span></span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Account History / Audit Log */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Account History / Audit Log</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                <Filter size={14} />
              </button>
              <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                <Download size={14} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col">
            
            <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-800 uppercase tracking-widest">
              <div className="col-span-4">Event Description</div>
              <div className="col-span-3">Date & Time</div>
              <div className="col-span-3">IP Address</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <div className="divide-y divide-slate-50 flex-1">
              
              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <LogIn size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Account<br/>Logged In</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  May 12, 2024 •<br/>10:45 AM
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  192.168.1.12
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">SUCCESS</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Home size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Property Listed:<br/>The Obsidian</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  May 10, 2024 •<br/>02:15 PM
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  192.168.1.12
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">SUCCESS</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <UserCog size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Profile<br/>Updated</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  May 05, 2024 •<br/>09:30 AM
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  104.22.45.189
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">SUCCESS</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <KeyRound size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Password<br/>Changed</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  Apr 28, 2024 •<br/>04:00 PM
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  192.168.1.12
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">SUCCESS</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <AlertCircle size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Failed Login<br/>Attempt</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  Apr 28, 2024 •<br/>03:55 PM
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  45.2.110.23
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">FAILED</span>
                </div>
              </div>

            </div>

            <button className="w-full py-4 bg-slate-50 text-[10px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 border-t border-slate-100">
              Load More History <ChevronDown size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
