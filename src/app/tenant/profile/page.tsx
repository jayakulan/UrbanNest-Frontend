"use client";

import React from "react";
import { 
  Camera, 
  Pencil, 
  Search, 
  Bell, 
  UserCircle 
} from "lucide-react";

export default function TenantProfilePage() {
  return (
    <div className="max-w-[1000px] mx-auto px-8 py-8 font-sans pb-32">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 mb-12 relative overflow-hidden">
        
        {/* Avatar Area */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-900 shadow-md border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" 
              alt="Alexander Sterling" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#0b0f19] text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm hover:scale-105 transition-transform">
            <Camera size={14} />
          </button>
        </div>

        {/* Text Area */}
        <div className="text-center md:text-left flex-1 z-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Alex Rivera</h2>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
              PREMIUM TENANT
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">Member since Oct 2021</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 w-full md:w-auto mt-4 md:mt-0">
          <button className="w-full md:w-auto py-3 px-6 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            <Pencil size={16} /> Edit Profile
          </button>
        </div>
        
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        
        {/* Left Column: Personal Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personal Information</h3>
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-8 space-y-6 border border-slate-100/50">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">FULL NAME</label>
              <input 
                type="text" 
                defaultValue="Alex Rivera" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">EMAIL ADDRESS</label>
              <input 
                type="email" 
                defaultValue="alex.rivera@estates.com" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">PHONE NUMBER</label>
              <input 
                type="text" 
                defaultValue="+1 (555) 782-9012" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">CURRENT ADDRESS</label>
              <input 
                type="text" 
                defaultValue="Penthouse B, 42nd Floor, The Glass Tower, Manhattan, NY" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Security */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Security</h3>
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-8 space-y-6 border border-slate-100/50">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">CURRENT PASSWORD</label>
              <input 
                type="password" 
                defaultValue="••••••••" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">NEW PASSWORD</label>
              <input 
                type="password" 
                placeholder="Enter new password" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">CONFIRM NEW PASSWORD</label>
              <input 
                type="password" 
                placeholder="Verify new password" 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow shadow-sm"
              />
            </div>
            
            <button className="w-full py-3.5 mt-2 bg-transparent border-2 border-slate-900 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-colors">
              Update Security
            </button>
          </div>
        </div>

      </div>

      {/* Preferences & Privacy Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Preferences & Privacy</h3>
        </div>

        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100/50 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Notification Channels */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-6">
              <Bell size={16} /> Notification Channels
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-[#0b0f19] text-white rounded-full text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="w-4 flex justify-center">✉</span> Email
              </button>
              <button className="px-5 py-2.5 bg-[#0b0f19] text-white rounded-full text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="w-4 flex justify-center">💬</span> SMS
              </button>
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold shadow-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                <span className="w-4 flex justify-center">🔔</span> Push
              </button>
            </div>
          </div>

          {/* Security & Visibility */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-6">
              <ShieldCheck size={16} className="text-slate-900" /> Security & Visibility
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Public Profile</h4>
                  <p className="text-[10px] font-medium text-slate-500">Allow other tenants to see your verified status</p>
                </div>
                {/* Custom Toggle Switch (ON) */}
                <div className="w-10 h-6 bg-[#0b0f19] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Share Activity</h4>
                  <p className="text-[10px] font-medium text-slate-500">Anonymously share rental trends for community insights</p>
                </div>
                {/* Custom Toggle Switch (OFF) */}
                <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-slate-200 pt-8 flex justify-end items-center gap-6">
        <button className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
          Cancel
        </button>
        <button className="px-8 py-3.5 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">
          Save Changes
        </button>
      </div>

    </div>
  );
}

// To use a shield icon check for the visibility header since ShieldCheck was not imported initially in this scope.
// Just ensuring no errors.
function ShieldCheck({ size, className }: { size: number, className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
