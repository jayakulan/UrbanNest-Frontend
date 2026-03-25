"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  MessageSquare, 
  FileText, 
  CalendarDays, 
  Banknote,
  CheckCircle2,
  Lock,
  XCircle,
  Pencil,
  Clock,
  ShieldCheck,
  Star
} from "lucide-react";

export default function TenantBookingDetailsPage({ params }: { params: { id: string } }) {
  // Hardcoded for demo to match template
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 font-sans pb-32">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-8">
        <Link href="/tenant/bookings" className="hover:text-slate-900 transition-colors">Booking History</Link>
        <span>›</span>
        <span className="text-slate-900 font-bold">Azure Sky Penthouse</span>
      </div>

      {/* Hero Property Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row mb-12">
        {/* Left Image */}
        <div className="w-full md:w-[45%] h-64 md:h-80 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=800&q=80" 
            alt="Azure Sky Penthouse" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Info */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
          
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1.5 bg-green-50 text-green-700 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
              <CheckCircle2 size={12} className="text-green-600" />
              Confirmed
            </span>
            <span className="text-xs font-bold text-slate-500 tracking-wider">
              Booking ID: UN-882910
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-none">
            Azure Sky Penthouse
          </h1>
          
          <div className="flex items-center gap-2 text-slate-600 font-semibold mb-8">
            <MapPin size={18} />
            <span className="text-sm">725 Fifth Avenue, Upper East Side, Manhattan, NY</span>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <button className="px-6 py-3.5 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2">
              <MessageSquare size={16} />
              Contact Owner
            </button>
            <button className="px-6 py-3.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-100 transition-colors flex items-center gap-2">
              View Contract
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Lease Information */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <CalendarDays size={20} className="text-slate-700" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Lease Information</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Rental Period</p>
                <p className="text-base font-bold text-slate-900 mb-1">Jun 15, 2024 —<br/>Jun 15, 2025</p>
                <p className="text-[10px] font-medium text-slate-500">12 Month Fixed-Term</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Check-in</p>
                <p className="text-base font-bold text-slate-900 mb-1">14:00 PM</p>
                <p className="text-[10px] font-medium text-slate-500">Key pickup at concierge</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Occupancy</p>
                <p className="text-base font-bold text-slate-900 mb-1">2 Adults</p>
                <p className="text-[10px] font-medium text-slate-500">Registered residents only</p>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <Banknote size={20} className="text-slate-700" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Financial Breakdown</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-600">Monthly Rent (Net)</span>
                <span className="text-slate-900 font-bold">$8,500.00</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-600">Service & Amenity Fee</span>
                <span className="text-slate-900 font-bold">$450.00</span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <span className="text-slate-600 text-sm font-semibold block mb-0.5">Security Deposit</span>
                  <span className="text-[9px] font-bold text-slate-400">Held in escrow account</span>
                </div>
                <span className="text-slate-900 font-bold text-sm">$17,000.00</span>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-6 pt-6 flex justify-between items-end">
              <span className="text-base font-bold text-slate-900">Total Initial Payment</span>
              <div className="text-right">
                <span className="text-3xl font-black text-slate-900 block mb-1">$25,950.00</span>
                <span className="text-[10px] font-bold text-green-600 flex items-center justify-end gap-1">
                  <CheckCircle2 size={12} /> PAID IN FULL
                </span>
              </div>
            </div>
          </div>

          {/* My Notes & Application Message */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={20} className="text-slate-700" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Notes & Application Message</h2>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 relative">
              <p className="text-sm font-medium text-slate-600 italic leading-relaxed mb-6">
                "We are looking for a quiet, high-floor residence for our stay in New York. We are professional couple relocating from London and prioritize a building with 24/7 security and a dedicated home office space. We hope to maintain the apartment to the highest standards."
              </p>
              
              <div className="text-right mt-2">
                <button className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 justify-end w-full hover:text-slate-900 transition-colors">
                  <Pencil size={12} /> Edit Note
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Booking Journey Timeline */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-8 tracking-tight">Booking Journey</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[9px] before:-top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              
              <div className="relative z-10 flex gap-4">
                <div className="w-5 h-5 rounded-full bg-[#0b0f19] flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-4 ring-slate-50">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5 -mt-0.5">Booking Confirmed</h4>
                  <p className="text-[10px] font-medium text-slate-400">June 12, 2024</p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5 -mt-0.5">Payment Processed</h4>
                  <p className="text-[10px] font-medium text-slate-400">June 10, 2024</p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5 -mt-0.5">Owner Approved</h4>
                  <p className="text-[10px] font-medium text-slate-400">June 08, 2024</p>
                </div>
              </div>

              <div className="relative z-10 flex gap-4">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5 -mt-0.5">Request Submitted</h4>
                  <p className="text-[10px] font-medium text-slate-400">June 06, 2024</p>
                </div>
              </div>

            </div>
          </div>

          {/* Host Profile Box */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" 
                alt="Alexander Vance"
                className="w-20 h-20 rounded-full object-cover shadow-sm bg-slate-200"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0b0f19] rounded-full border-2 border-white flex items-center justify-center text-white">
                <ShieldCheck size={10} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Alexander Vance</h3>
            
            <div className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-600">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md uppercase tracking-wider text-[9px]">Superhost</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-slate-400 text-slate-400 mb-0.5" />
                <span>4.98 (124 reviews)</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <button className="w-full py-3 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
                Send Message
              </button>
              <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                View Host Profile
              </button>
            </div>
          </div>

          {/* Actions below Host Box */}
          <div className="px-2 space-y-6">
            <div>
              <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                <MessageSquare size={16} />
                Leave Review (Locked)
              </button>
              <p className="text-center text-[9px] font-semibold text-slate-400 mt-2 italic px-4 leading-relaxed">
                Reviews can only be posted 48 hours after the lease commencement date.
              </p>
            </div>
            
            <button className="w-full py-2 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors text-xs font-bold uppercase tracking-wider">
              <XCircle size={14} />
              Request Cancellation
            </button>
          </div>

        </div>

      </div>

      {/* Recommended Similar Properties Area */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Nearby UrbanNest Luxuries</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="group cursor-pointer">
            <div className="h-48 rounded-2xl overflow-hidden mb-4 relative shadow-sm">
              <img src="https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=500&q=80" alt="Obsidian Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="text-base font-bold text-slate-900 tracking-tight mb-1">The Obsidian Suite</h4>
            <p className="text-xs font-semibold text-slate-500">SoHo, Manhattan • $7,200/mo</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="h-48 rounded-2xl overflow-hidden mb-4 relative shadow-sm">
              <img src="https://images.unsplash.com/photo-1628102491629-77858c63c46b?w=500&q=80" alt="Marble Arch Loft" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="text-base font-bold text-slate-900 tracking-tight mb-1">Marble Arch Loft</h4>
            <p className="text-xs font-semibold text-slate-500">Chelsea, Manhattan • $9,100/mo</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="h-48 rounded-2xl overflow-hidden mb-4 relative shadow-sm">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80" alt="Crystal Heights" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="text-base font-bold text-slate-900 tracking-tight mb-1">Crystal Heights Residence</h4>
            <p className="text-xs font-semibold text-slate-500">Upper West Side, NY • $12,500/mo</p>
          </div>

        </div>
      </div>

    </div>
  );
}
