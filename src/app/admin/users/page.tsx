"use client";

import React, { useState } from "react";
import { 
  Download, 
  UserPlus, 
  Users, 
  Key, 
  Home, 
  ShieldAlert, 
  TrendingUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [activeRole, setActiveRole] = useState("All");
  const [activeStatus, setActiveStatus] = useState("Any");

  const users = [
    {
      id: 1,
      name: "Marcus Chen",
      email: "marcus.c@urbanest.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      role: "ADMIN",
      phone: "+1 (555) 234-8901",
      status: "Active"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      email: "s.jenkins@gmail.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      role: "OWNER",
      phone: "+1 (555) 912-4432",
      status: "Active"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      email: "elena.rod@icloud.com",
      avatar: null,
      initials: "EL",
      role: "TENANT",
      phone: "+1 (555) 722-0019",
      status: "Pending"
    },
    {
      id: 4,
      name: "David Miller",
      email: "miller.prop@outlook.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      role: "TENANT",
      phone: "+1 (555) 434-5512",
      status: "Disabled"
    },
    {
      id: 5,
      name: "Sophia Bloom",
      email: "sophia.bloom@urbanest.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "OWNER",
      phone: "+1 (555) 881-2209",
      status: "Active"
    }
  ];

  const getRoleStyle = (role: string) => {
    switch(role) {
      case "ADMIN": return "bg-blue-100 text-blue-700 font-bold";
      case "OWNER": return "bg-indigo-100/70 text-indigo-700 font-bold";
      case "TENANT": return "bg-slate-100 text-slate-600 font-bold";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-50 text-green-600";
      case "Pending": return "bg-orange-50 text-orange-600";
      case "Disabled": return "bg-slate-100 text-slate-500";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-500";
      case "Pending": return "bg-orange-500";
      case "Disabled": return "bg-slate-400";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Manage Users</h1>
          <p className="text-sm font-medium text-slate-600">
            Directory of tenants, property owners, and administrative staff.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2.5 bg-[#e0e7ff] text-indigo-700 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-100 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Data
          </button>
          <button className="px-5 py-2.5 bg-[#0b0f19] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2">
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Users */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Users</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">2,841</h2>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
              <Users size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-green-600 flex items-center gap-1">
            <TrendingUp size={12} /> 12% increase this month
          </p>
        </div>

        {/* Active Tenants */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Active Tenants</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">1,420</h2>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
              <Key size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400">
            98% occupancy rate
          </p>
        </div>

        {/* Property Owners */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Property Owners</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">642</h2>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 shrink-0">
              <Home size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-green-600 flex items-center gap-1">
            <TrendingUp size={12} /> 5 new joined today
          </p>
        </div>

        {/* Pending Verification */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Pending Verification</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">28</h2>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
              <ShieldAlert size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-red-600">
            Requires action soon
          </p>
        </div>

      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
              <span>Role:</span>
              <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                {['All', 'Admin', 'Owner', 'Tenant'].map(role => (
                  <button 
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-4 py-1.5 rounded-lg text-xs transition-colors ${activeRole === role ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
              <span>Status:</span>
              <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                {['Any', 'Active', 'Pending'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-4 py-1.5 rounded-lg text-xs transition-colors ${activeStatus === status ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span>Sort by:</span>
            <button className="flex items-center gap-2 text-slate-900">
              Recently Joined <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3">Phone Number</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors">
              
              {/* Name col */}
              <div className="col-span-4 flex items-center gap-4">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
                    {user.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{user.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Role col */}
              <div className="col-span-2">
                <span className={`inline-block px-3 py-1 rounded-md text-[9px] uppercase tracking-wider ${getRoleStyle(user.role)}`}>
                  {user.role}
                </span>
              </div>

              {/* Phone col */}
              <div className="col-span-3 text-sm font-bold text-slate-700">
                {user.phone}
              </div>

              {/* Status col */}
              <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(user.status)}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(user.status)}`}></div>
                  {user.status}
                </span>
              </div>

              {/* Actions col */}
              <div className="col-span-1 text-right">
                <Link 
                  href={`/admin/users/${user.id}`}
                  className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#0b0f19] hover:text-white transition-colors"
                >
                  View
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-500">
            Showing 1-10 of 2,841 users
          </p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0b0f19] text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">285</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="bg-[#0b132c] rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-3">Security & Verification Audit</h2>
          <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">
            Last account security sweep was conducted 2 days ago. All high-level admin accounts are currently secured with 2FA.
          </p>
          <button className="px-6 py-3.5 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-md hover:bg-slate-50 transition-colors">
            Run Security Scan
          </button>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 min-w-[300px] pointer-events-none opacity-10 flex items-center justify-center">
          <Shield size={200} className="text-white translate-x-12" />
        </div>
      </div>

    </div>
  );
}
