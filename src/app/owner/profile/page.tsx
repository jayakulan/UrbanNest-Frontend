"use client";

import React, { useState } from "react";
import { 
  Pencil, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  CheckCircle2
} from "lucide-react";

export default function OwnerProfilePage() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto p-8 font-sans pb-24">
      {/* Banner Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden mb-8 gap-6">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-slate-50 rounded-full opacity-50 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 w-full md:w-auto">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" 
              alt="Alexander Vance"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-sm border border-slate-100"
            />
            <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#0b0f19] text-white flex items-center justify-center border-4 border-white shadow-sm hover:bg-slate-800 transition-colors">
              <Pencil size={14} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Alexander Vance</h1>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                Elite Partner
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-semibold text-slate-500 mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>London, UK</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>Member Since Oct 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center sm:justify-end gap-4 relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
          <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-3 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Forms) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alexander Vance"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue="alexander.v@vanceproperties.com"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue="+44 20 7946 0123"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                <input 
                  type="text" 
                  defaultValue="12 Knightsbridge, London"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Short Bio</label>
              <textarea 
                defaultValue="Specializing in high-end residential properties across Mayfair and Chelsea. Dedicated to providing premium living experiences for modern urban professionals."
                className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 resize-none min-h-[120px] leading-relaxed"
              ></textarea>
            </div>
          </section>

          {/* Business Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-t border-slate-200 pt-8">Business Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                <input 
                  type="text" 
                  defaultValue="Vance Properties"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tax ID</label>
                <input 
                  type="text" 
                  defaultValue="GB 123 4567 89"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Business Address</label>
              <input 
                type="text" 
                defaultValue="Suite 400, Canary Wharf Financial Centre, London"
                className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
              />
            </div>
          </section>

        </div>

        {/* Right Column (Side Cards) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Verification Status */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900">Verification Status</h3>
              <ShieldCheck size={20} className="text-green-500" />
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <CheckCircle2 size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-900 mb-0.5">Identity Verified</p>
                <p className="text-xs font-semibold text-green-700/70">Verified on Sep 12, 2021</p>
              </div>
            </div>
            
            <button className="text-xs font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 transition-colors w-full text-center">
              View Verification Documents
            </button>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <Lock size={18} />
              <h3 className="text-sm font-bold">Security</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 font-mono tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                <input 
                  type="password" 
                  defaultValue="newpass123"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 font-mono tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  defaultValue="newpass123"
                  className="w-full bg-slate-100/80 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 font-mono tracking-widest"
                />
              </div>
              
              <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors mt-2">
                Update Password
              </button>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Two-Factor Auth</span>
                <button 
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${twoFactorAuth ? 'bg-[#0b0f19] justify-end' : 'bg-slate-200 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Login Alerts</span>
                <button 
                  onClick={() => setLoginAlerts(!loginAlerts)}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${loginAlerts ? 'bg-[#0b0f19] justify-end' : 'bg-slate-200 justify-start'}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Owner Statistics */}
          <div className="bg-[#0b0f19] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <h3 className="text-sm font-bold mb-6 relative z-10">Owner Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Managed</p>
                <p className="text-3xl font-bold">14</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Trust Rating</p>
                <p className="text-3xl font-bold">4.9/5</p>
              </div>
            </div>
            
            {/* Decorative background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
          </div>

        </div>

      </div>
    </div>
  );
}
