"use client";

import React, { useState, useEffect } from "react";
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
  Search,
  Trash2
} from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [activeRole, setActiveRole] = useState("All");
  const [activeStatus, setActiveStatus] = useState("Any");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/users", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setUsers(await res.json());
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setDeletingId(userId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user.");
    } finally {
      setDeletingId(null);
    }
  };

  const getRoleStyle = (role: string) => {
    switch((role || "").toUpperCase()) {
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
      default: return "bg-green-50 text-green-600";
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case "Pending": return "bg-orange-500";
      case "Disabled": return "bg-slate-400";
      default: return "bg-green-500";
    }
  };

  // Filter + search
  const filtered = users.filter(u => {
    if (activeRole !== "All" && (u.role || "").toUpperCase() !== activeRole.toUpperCase()) return false;
    if (activeStatus !== "Any") {
      const s = u.status || "Active";
      if (s !== activeStatus) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !(u.fullName || "").toLowerCase().includes(q) &&
        !(u.email || "").toLowerCase().includes(q) &&
        !(u.phoneNo || "").toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Stats
  const totalUsers = users.length;
  const activeTenants = users.filter(u => (u.role || "").toUpperCase() === "TENANT").length;
  const propertyOwners = users.filter(u => (u.role || "").toUpperCase() === "OWNER").length;
  const pendingUsers = users.filter(u => (u.status || "") === "Pending").length;

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
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Users</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{totalUsers}</h2>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
              <Users size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-green-600 flex items-center gap-1">
            <TrendingUp size={12} /> Live from database
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tenants</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeTenants}</h2>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
              <Key size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400">Registered tenants</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Property Owners</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{propertyOwners}</h2>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 shrink-0">
              <Home size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-green-600 flex items-center gap-1">
            <TrendingUp size={12} /> Active owners
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Pending Verification</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{pendingUsers}</h2>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
              <ShieldAlert size={18} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-red-600">
            {pendingUsers > 0 ? "Requires action soon" : "All verified"}
          </p>
        </div>

      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search name, email..."
                className="pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900 placeholder:text-slate-400 w-52"
              />
            </div>

            <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
              <span>Role:</span>
              <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                {['All', 'Admin', 'Owner', 'Tenant'].map(role => (
                  <button 
                    key={role}
                    onClick={() => { setActiveRole(role); setCurrentPage(1); }}
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
                    onClick={() => { setActiveStatus(status); setCurrentPage(1); }}
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
          {loading ? (
            <div className="px-8 py-10 text-center text-sm font-medium text-slate-400">Loading users...</div>
          ) : paginated.length === 0 ? (
            <div className="px-8 py-10 text-center text-sm font-medium text-slate-400">No users found.</div>
          ) : (
            paginated.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors">
                
                {/* Name col */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {(user.fullName || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{user.fullName || "—"}</h4>
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
                  {user.phoneNo || "—"}
                </div>

                {/* Status col */}
                <div className="col-span-2 flex items-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(user.status || "Active")}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(user.status || "Active")}`}></div>
                    {user.status || "Active"}
                  </span>
                </div>

                {/* Actions col */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <Link 
                    href={`/admin/users/${user.id}`}
                    className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#0b0f19] hover:text-white transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deletingId === user.id}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                    title="Delete user"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-30"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${currentPage === page ? 'bg-[#0b0f19] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {page}
              </button>
            ))}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-30"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
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
        <div className="absolute right-0 top-0 bottom-0 w-1/3 min-w-[300px] pointer-events-none opacity-10 flex items-center justify-center">
          <Shield size={200} className="text-white translate-x-12" />
        </div>
      </div>

    </div>
  );
}
