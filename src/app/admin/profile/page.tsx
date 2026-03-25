"use client";

import React, { useState } from "react";
import { 
  Upload, 
  Pencil, 
  User, 
  Lock, 
  SlidersHorizontal,
  Monitor,
  Check
} from "lucide-react";

export default function AdminProfilePage() {
  // Toggle states based on mockup
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [browserPush, setBrowserPush] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-10 font-sans pb-32">

      {/* Top Profile Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8 justify-between">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" 
              alt="Julian Voss"
              className="w-32 h-32 rounded-3xl object-cover bg-slate-200 shadow-sm"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#0b0f19] text-white rounded-lg flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-transform">
              <Pencil size={14} />
            </button>
          </div>

          <div className="flex flex-col items-center md:items-start pt-2">
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Alexander Vance</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                SUPER ADMIN
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Account Status: Active
            </div>
            
            <p className="text-xs font-medium text-slate-400 italic">
              Member since January 2023
            </p>
          </div>
        </div>

        <button className="px-6 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2 shrink-0">
          <Upload size={16} /> Upload New Photo
        </button>

      </div>

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Column (Forms) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <User size={20} className="text-slate-900 font-bold" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alexander Vance"
                  className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 font-medium focus:ring-2 focus:ring-slate-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="a.vance@urbannest.com"
                  className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 font-medium focus:ring-2 focus:ring-slate-200 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Phone Number</label>
              <input 
                type="text" 
                defaultValue="+1 (555) 902-4857"
                className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 font-medium focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>
          </div>

          {/* Security & Password */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <Lock size={20} className="text-slate-900 font-bold" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Security & Password</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Current Password</label>
              <input 
                type="password" 
                defaultValue="••••••••••••••"
                className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 font-black tracking-widest focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 focus:ring-2 focus:ring-slate-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-100 border-transparent rounded-xl px-5 py-4 outline-none text-slate-900 focus:ring-2 focus:ring-slate-200 transition-all"
                />
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-400 leading-relaxed border-t border-slate-100 pt-6">
              Password must be at least 12 characters long and contain a mix of letters, numbers, and symbols to ensure administrative security levels are maintained.
            </p>
          </div>

        </div>

        {/* Right Column (Settings) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Preferences */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <SlidersHorizontal size={20} className="text-slate-900 font-bold" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Preferences</h2>
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Notification Channels</p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Email Notifications</span>
                <button 
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${emailNotif ? 'bg-[#0b0f19]' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform border ${emailNotif ? 'translate-x-7 border-slate-900' : 'translate-x-1 border-slate-300'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">SMS Alerts</span>
                <button 
                  onClick={() => setSmsNotif(!smsNotif)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${smsNotif ? 'bg-[#0b0f19]' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform border ${smsNotif ? 'translate-x-7 border-slate-900' : 'translate-x-1 border-slate-300'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Browser Push</span>
                <button 
                  onClick={() => setBrowserPush(!browserPush)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${browserPush ? 'bg-[#0b0f19]' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform border ${browserPush ? 'translate-x-7 border-slate-900' : 'translate-x-1 border-slate-300'}`}></div>
                </button>
              </div>
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-t border-slate-100 pt-8">Advanced Security</p>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-800 block mb-1">Two-Factor Auth</span>
                <span className="text-[10px] font-medium text-slate-400">Adds extra layer of login security</span>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${twoFactor ? 'bg-[#0b0f19]' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform border ${twoFactor ? 'translate-x-7 border-slate-900' : 'translate-x-1 border-slate-300'}`}></div>
              </button>
            </div>

          </div>

          {/* Login Activity */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Login Activity</p>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Monitor size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate mb-1">MacOS • Chrome</h4>
                <p className="text-[10px] font-medium text-slate-400 truncate">Current Session • London, UK</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div className="flex justify-end items-center gap-4 mb-16">
        <button className="px-6 py-3 text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors">
          Cancel
        </button>
        <button className="px-8 py-3 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2">
          <Check size={16} /> Save Changes
        </button>
      </div>

      {/* Final Meta Footer */}
      <div className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest pb-8">
        © 2024 URBANNEST ELITE MANAGEMENT SYSTEMS • CONFIDENTIAL ADMINISTRATIVE ACCESS
      </div>

    </div>
  );
}
