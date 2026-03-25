"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin,
  CalendarDays,
  Clock,
  Users,
  Receipt,
  ShieldCheck,
  Headphones,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

export default function CompleteRequestPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8 font-sans pb-32">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3">
            <Link href="/tenant/properties" className="hover:text-slate-900 transition-colors">Properties</Link>
            <span>›</span>
            <span className="text-slate-900">Request Rental</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Complete Your Request</h1>
        </div>
        
        <div className="mt-6 md:mt-0 text-right">
          <p className="text-sm font-semibold text-slate-500 mb-1">Need help?</p>
          <button className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-300">
            Contact Concierge
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Property Card */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            
            <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" 
                alt="Azure Sky Penthouse" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 py-2 w-full pr-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  PENTHOUSE
                </span>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  <CheckCircle2 size={12} className="text-green-600" />
                  Verified
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Azure Sky Penthouse</h2>
              
              <div className="flex items-center gap-1.5 text-slate-500 mb-6">
                <MapPin size={16} />
                <span className="text-sm font-semibold">Upper East Side, Manhattan</span>
              </div>
              
              <div className="flex justify-between items-center text-left pt-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">BEDS</p>
                  <p className="text-sm font-bold text-slate-900">3 Rooms</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">BATHS</p>
                  <p className="text-sm font-bold text-slate-900">2.5 Units</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">AREA</p>
                  <p className="text-sm font-bold text-slate-900">2,450 sqft</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Rental Details Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#0b0f19] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Rental Details</h3>
            </div>
            
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2">Move-in Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <CalendarDays size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Select Date" 
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 placeholder:text-slate-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2">Rental Duration</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Clock size={18} />
                    </div>
                    <select className="w-full pl-11 pr-10 py-3.5 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 appearance-none cursor-pointer">
                      <option>1 year (Recommended)</option>
                      <option>6 months</option>
                      <option>2 years</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Number of Occupants</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Users size={18} />
                  </div>
                  <input 
                    type="number" 
                    defaultValue="1" 
                    min="1"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-100/80 border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Message to Owner</label>
                <textarea 
                  placeholder="Tell the owner a bit about yourself, your profession, and any specific requirements..." 
                  className="w-full p-4 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 placeholder:text-slate-500 resize-none h-32 leading-relaxed"
                ></textarea>
              </div>

            </div>
          </div>
          
        </div>

        {/* Right Column Area (Sticky Widget) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            
            {/* Widget Card */}
            <div className="bg-[#0b0f19] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden text-slate-200">
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-xl font-bold text-white tracking-tight">Rental Summary</h3>
                <Receipt size={24} className="text-slate-400" />
              </div>

              <div className="space-y-5 mb-8 text-sm font-semibold relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Rent</span>
                  <span className="text-white font-bold">$12,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Service Fee</span>
                  <span className="text-white font-bold">$450</span>
                </div>
                <div className="flex justify-between items-start pt-2">
                  <span className="text-slate-400">Security Deposit</span>
                  <div className="text-right">
                    <span className="text-white font-bold block mb-0.5">$12,500</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Refundable</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-8 mb-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">TOTAL TO PAY</span>
                  </div>
                  <span className="text-4xl font-black text-white tracking-tight">$25,450</span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 leading-relaxed max-w-[200px]">
                  Initial payment covers first month + deposit + fees
                </p>
              </div>

              <button className="w-full py-4 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-md hover:bg-slate-100 transition-colors mb-6 flex justify-between items-center px-6 relative z-10">
                Submit Rental Request
                <ArrowRight size={18} />
              </button>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex gap-3 relative z-10">
                <ShieldCheck size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[10px] font-semibold text-slate-300 leading-relaxed">
                  Your application is protected by UrbanNest Secure. No funds will be transferred until the lease is signed.
                </p>
              </div>

              {/* Decorative faint glow */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-slate-700/30 blur-[60px] rounded-full pointer-events-none"></div>

            </div>

            {/* Support List Features below the widget */}
            <div className="px-2 space-y-6 pt-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                  <Headphones size={18} className="text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">24/7 Support</h4>
                  <p className="text-[10px] font-medium text-slate-500">Direct line to property manager</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                  <Lock size={18} className="text-slate-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Encrypted Documents</h4>
                  <p className="text-[10px] font-medium text-slate-500">Standard legal-grade encryption</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
