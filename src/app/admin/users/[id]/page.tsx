"use client";

import React, { useState, useEffect, use } from "react";
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
  ChevronDown,
  Save,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminUserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ fullName: "", email: "", phoneNo: "", address: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAll = async () => {
      try {
        // 1. User details
        const uRes = await fetch(`http://localhost:8080/api/users/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!uRes.ok) { setLoading(false); return; }
        const userData = await uRes.json();
        setUser(userData);
        setEditData({
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNo: userData.phoneNo || "",
          address: userData.address || ""
        });

        // 2. Properties (only for OWNER role)
        if ((userData.role || "").toUpperCase() === "OWNER") {
          const pRes = await fetch(`http://localhost:8080/api/properties/owner/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (pRes.ok) setProperties(await pRes.json());
        }

        // 3. Bookings (tenant or owner)
        const bEndpoint = (userData.role || "").toUpperCase() === "TENANT"
          ? `http://localhost:8080/api/bookings/tenant/${id}`
          : null;
        if (bEndpoint) {
          const bRes = await fetch(bEndpoint, { headers: { "Authorization": `Bearer ${token}` } });
          if (bRes.ok) setBookings(await bRes.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const handleSaveEdit = async () => {
    setActionLoading("edit");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(editData)
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setEditMode(false);
      } else {
        alert("Failed to update user.");
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(""); }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete user ${user?.fullName}? This cannot be undone.`)) return;
    setActionLoading("delete");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        router.push("/admin/users");
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) { console.error(err); }
    finally { setActionLoading(""); }
  };

  const getStatusBadge = () => {
    const s = user?.status || "Active";
    if (s === "Disabled") return "bg-slate-100 text-slate-500";
    if (s === "Pending") return "bg-orange-100/50 text-orange-700";
    return "bg-green-100/50 text-green-700";
  };

  const getStatusDot = () => {
    const s = user?.status || "Active";
    if (s === "Disabled") return "bg-slate-400";
    if (s === "Pending") return "bg-orange-500";
    return "bg-green-500";
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans flex items-center justify-center min-h-screen">
        <p className="text-slate-400 font-medium">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans">
        <p className="text-red-500 font-medium">User not found.</p>
        <Link href="/admin/users" className="text-slate-900 font-bold underline mt-4 inline-block">← Back to Users</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-8">
        <Link href="/admin/users" className="hover:text-slate-900 transition-colors font-bold text-slate-800">User Details</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">{user.fullName}</span>
      </div>

      {/* Top Split Panel */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left: User Profile Card */}
        <div className="flex-1 bg-white rounded-3xl p-8 relative overflow-hidden shadow-sm border border-slate-100/50 flex flex-col sm:flex-row gap-8 items-start">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          {/* Avatar */}
          <div className="relative shrink-0 z-10">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-5xl font-bold shadow-sm">
              {(user.fullName || "U").charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
              <CheckCircle2 size={16} className="fill-green-600 text-white" />
            </div>
          </div>

          <div className="flex-1 z-10 mt-2">
            {editMode ? (
              /* Edit Form */
              <div className="space-y-3 mb-4">
                <input
                  value={editData.fullName}
                  onChange={e => setEditData(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900"
                  placeholder="Full Name"
                />
                <input
                  value={editData.email}
                  onChange={e => setEditData(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900"
                  placeholder="Email"
                />
                <input
                  value={editData.phoneNo}
                  onChange={e => setEditData(p => ({ ...p, phoneNo: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900"
                  placeholder="Phone"
                />
                <input
                  value={editData.address}
                  onChange={e => setEditData(p => ({ ...p, address: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900"
                  placeholder="Address"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    disabled={actionLoading === "edit"}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0b0f19] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-60"
                  >
                    <Save size={15} /> {actionLoading === "edit" ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    <X size={15} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{user.fullName}</h1>
                  <span className="bg-[#0b0f19] text-white px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest">
                    {user.role}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 uppercase ${getStatusBadge()}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot()}`}></div>
                    {user.status || "Active"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-semibold text-slate-600">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-slate-400" />
                    <span>{user.phoneNo || "—"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-slate-400" />
                    <span>{user.address || "—"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-slate-400" />
                    <span>ID: {user.id}</span>
                  </div>
                </div>
              </>
            )}
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
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-3.5 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Pencil size={16} /> Edit Details
            </button>
            <button className="w-full py-3.5 bg-white/10 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm border border-white/5">
              <ShieldCheck size={16} /> Verify Account
            </button>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold shadow-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5">
                <Ban size={14} /> Disable
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading === "delete"}
                className="py-3 bg-white/5 text-red-500 border border-white/10 rounded-xl text-xs font-bold shadow-sm hover:bg-white/10 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <Trash2 size={14} /> {actionLoading === "delete" ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Building size={18} />
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Properties</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{properties.length}</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Ticket size={18} />
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{bookings.length}</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Banknote size={18} />
            </div>
            <span className="text-[10px] font-bold text-green-600 tracking-wider">Total</span>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue / Spent</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              ${bookings.reduce((s, b) => s + (b.totalAmount || 0), 0).toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-900">
              <Star size={18} className="fill-slate-900" />
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{user.role}</h3>
          </div>
        </div>
      </div>

      {/* Bottom Split Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Properties Listed */}
        <div className="lg:col-span-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {(user.role || "").toUpperCase() === "OWNER" ? "Properties Listed" : "Booking History"}
            </h2>
            <Link href="#" className="text-[11px] font-bold text-slate-900 border-b border-slate-900 hover:text-slate-500 hover:border-slate-500 transition-colors uppercase tracking-wider">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {(user.role || "").toUpperCase() === "OWNER" ? (
              properties.length === 0 ? (
                <p className="text-slate-400 text-sm font-medium">No properties listed yet.</p>
              ) : (
                properties.slice(0, 3).map(prop => (
                  <div key={prop.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow group">
                    <img
                      src={prop.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=150&q=80"}
                      alt={prop.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate pr-2">{prop.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase shrink-0 ${
                          (prop.availabilityStatus || "").toUpperCase() === "RENTED"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-green-50 text-green-600"
                        }`}>
                          {prop.availabilityStatus || "ACTIVE"}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-400 mb-3">{prop.city || ""}{prop.district ? `, ${prop.district}` : ""}</p>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-black text-slate-900">${prop.monthlyRent?.toLocaleString()} <span className="text-[9px] font-bold text-slate-400">/ mo</span></span>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              bookings.length === 0 ? (
                <p className="text-slate-400 text-sm font-medium">No bookings found.</p>
              ) : (
                bookings.slice(0, 3).map(b => (
                  <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Home size={24} className="text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold text-slate-900">Property #{b.propertyId}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${
                          (b.status || "").toUpperCase() === "APPROVED" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                        }`}>
                          {b.status || "PENDING"}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-400 mb-2">Move-in: {b.moveInDate || "—"}</p>
                      <span className="text-sm font-black text-slate-900">${b.monthlyRent?.toLocaleString()} <span className="text-[9px] font-bold text-slate-400">/ mo</span></span>
                    </div>
                  </div>
                ))
              )
            )}
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
              <div className="col-span-3">Details</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <div className="divide-y divide-slate-50 flex-1">
              
              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <LogIn size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Account<br/>Created</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  User #{user.id}
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  {user.email}
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
                  <span className="text-xs font-bold text-slate-900 leading-tight">Role<br/>Assigned</span>
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                  System
                </div>
                <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                  {user.role}
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">SUCCESS</span>
                </div>
              </div>

              {bookings.slice(0, 2).map(b => (
                <div key={b.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <KeyRound size={14} />
                    </div>
                    <span className="text-xs font-bold text-slate-900 leading-tight">Booking<br/>#{b.id}</span>
                  </div>
                  <div className="col-span-3 text-[10px] font-semibold text-slate-500 leading-tight">
                    {b.moveInDate || "—"}
                  </div>
                  <div className="col-span-3 text-[10px] font-semibold text-slate-400 font-mono tracking-tighter">
                    Prop #{b.propertyId}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${(b.status || "").toUpperCase() === "APPROVED" ? "text-green-600" : "text-orange-500"}`}>
                      {b.status || "PENDING"}
                    </span>
                  </div>
                </div>
              ))}

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
