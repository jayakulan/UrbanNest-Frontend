"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  MapPin, 
  ChevronDown,
  ClipboardCheck,
  History,
  Inbox,
  BedDouble,
  Droplets,
  Maximize,
  Star,
  RotateCw,
  Trash2
} from "lucide-react";

export default function AdminPropertiesPage() {
  const [activeTab, setActiveTab] = useState("ALL PROPERTIES");
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [ownerMap, setOwnerMap]         = useState<Record<number, any>>({});
  const [loading, setLoading]           = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<number, string>>({});

  const tabs = ["ALL PROPERTIES", "PENDING APPROVAL", "APPROVED", "REJECTED"];

  // ── Fetch all properties + enrich owner info ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    const load  = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const props: any[] = await res.json();
        setAllProperties(props);

        // Fetch unique owner details
        const ownerIds = [...new Set(props.map((p: any) => p.ownerId).filter(Boolean))];
        const owners: Record<number, any> = {};
        await Promise.all(
          ownerIds.map(async (oid: any) => {
            try {
              const uRes = await fetch(`http://localhost:8080/api/users/${oid}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (uRes.ok) owners[oid] = await uRes.json();
            } catch { /* skip */ }
          })
        );
        setOwnerMap(owners);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Update property status (approve / reject / re-evaluate) ──
  const updateStatus = async (propertyId: number, newStatus: string) => {
    setActionLoading(prev => ({ ...prev, [propertyId]: newStatus }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/properties/${propertyId}/status`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setAllProperties(prev =>
          prev.map(p => p.id === propertyId ? { ...p, availabilityStatus: updated.availabilityStatus } : p)
        );
      } else {
        alert("Failed to update property status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    } finally {
      setActionLoading(prev => ({ ...prev, [propertyId]: "" }));
    }
  };

  // ── Delete a property ──
  const deleteProperty = async (propertyId: number, title: string) => {
    if (!confirm(`Delete property "${title}"? This cannot be undone.`)) return;
    setActionLoading(prev => ({ ...prev, [propertyId]: "delete" }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/properties/${propertyId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setAllProperties(prev => prev.filter(p => p.id !== propertyId));
      } else {
        alert("Failed to delete property.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(prev => ({ ...prev, [propertyId]: "" }));
    }
  };

  // ── Helpers ──
  const getStatus = (p: any): string => {
    const s = (p.availabilityStatus || "").toUpperCase();
    if (s === "APPROVED") return "APPROVED";
    if (s === "REJECTED") return "REJECTED";
    if (s === "PENDING")  return "PENDING";
    // Treat RENTED / Available / null as APPROVED for display purposes in the all-properties grid
    return s === "RENTED" ? "APPROVED" : "APPROVED";
  };

  const getStatusBadge = (p: any) => {
    const s = getStatus(p);
    if (s === "APPROVED") return <span className="absolute top-4 left-4 bg-green-50 text-green-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">APPROVED</span>;
    if (s === "PENDING")  return <span className="absolute top-4 left-4 bg-orange-100 text-orange-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">PENDING</span>;
    if (s === "REJECTED") return <span className="absolute top-4 left-4 bg-red-100 text-red-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">REJECTED</span>;
    return null;
  };

  const isLoading = (id: number) => !!actionLoading[id];

  const renderCardActions = (p: any) => {
    const s = getStatus(p);
    if (s === "APPROVED") return (
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
        <button
          className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
        >
          VIEW DETAILS
        </button>
        <button
          disabled={isLoading(p.id)}
          onClick={() => deleteProperty(p.id, p.title)}
          className="py-2.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
        >
          <Trash2 size={12} /> {actionLoading[p.id] === "delete" ? "..." : "DELETE"}
        </button>
      </div>
    );
    if (s === "PENDING") return (
      <div className="flex flex-col mt-auto pt-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            disabled={isLoading(p.id)}
            onClick={() => updateStatus(p.id, "APPROVED")}
            className="py-2.5 bg-[#0b0f19] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {actionLoading[p.id] === "APPROVED" ? "..." : "APPROVE"}
          </button>
          <button
            disabled={isLoading(p.id)}
            onClick={() => updateStatus(p.id, "REJECTED")}
            className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {actionLoading[p.id] === "REJECTED" ? "..." : "REJECT"}
          </button>
        </div>
        <button className="text-[9px] font-black text-slate-500 hover:text-slate-900 tracking-widest uppercase transition-colors text-center">
          VIEW FULL SUBMISSION
        </button>
      </div>
    );
    if (s === "REJECTED") return (
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
        <button
          disabled={isLoading(p.id)}
          onClick={() => deleteProperty(p.id, p.title)}
          className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {actionLoading[p.id] === "delete" ? "..." : "DELETE"}
        </button>
        <button
          disabled={isLoading(p.id)}
          onClick={() => updateStatus(p.id, "APPROVED")}
          className="py-2.5 bg-[#475569] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
        >
          {actionLoading[p.id] === "APPROVED" ? "..." : "RE-EVALUATE"}
        </button>
      </div>
    );
    return null;
  };

  // ── Filter properties by active tab ──
  const filteredProperties = allProperties.filter(p => {
    const s = getStatus(p);
    if (activeTab === "ALL PROPERTIES")    return true;
    if (activeTab === "PENDING APPROVAL")  return s === "PENDING";
    if (activeTab === "APPROVED")          return s === "APPROVED";
    if (activeTab === "REJECTED")          return s === "REJECTED";
    return true;
  });

  const pendingCount = allProperties.filter(p => getStatus(p) === "PENDING").length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {activeTab === "PENDING APPROVAL" ? (
          <div className="flex items-center gap-10 w-full justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                <ClipboardCheck size={14} /> Verification Queue
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pending Approvals</h1>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">AVG. RESPONSE</p>
                  <p className="text-sm font-black text-slate-900 leading-none">4.2 Hours</p>
                </div>
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0b132c] text-white rounded-xl flex items-center justify-center">
                  <Inbox size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">IN QUEUE</p>
                  <p className="text-sm font-black text-slate-900 leading-none">{pendingCount} Properties</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Manage Properties</h1>
              <p className="text-sm font-medium text-slate-600">
                Curate and oversee the UrbanNest elite property portfolio.
              </p>
            </div>
            <button className="px-5 py-3 bg-[#0b0f19] text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Plus size={16} /> NEW PROPERTY
            </button>
          </>
        )}
      </div>

      {/* Filter and Tab Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex flex-wrap items-center bg-slate-100/80 p-1.5 rounded-2xl gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${
                activeTab === tab 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-black/5"
              }`}
            >
              {tab}{tab === "PENDING APPROVAL" && pendingCount > 0 ? ` (${pendingCount})` : ""}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-3 px-5 py-3 bg-slate-100/80 rounded-xl text-[10px] font-bold text-slate-700 hover:bg-slate-200 transition-colors uppercase tracking-widest">
          LATEST LISTINGS <ChevronDown size={14} className="text-slate-500" />
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-slate-400 font-medium py-20">Loading properties...</p>
      )}

      {/* Dynamic Content Grid */}
      {!loading && (
        <>
          {activeTab === "PENDING APPROVAL" ? (

            /* PENDING APPROVALS SPECIAL VIEW */
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
              {filteredProperties.length === 0 ? (
                <p className="col-span-2 text-center text-slate-400 font-medium py-20">No pending properties.</p>
              ) : (
                filteredProperties.map((prop) => {
                  const owner = ownerMap[prop.ownerId];
                  return (
                    <div key={prop.id} className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                      
                      {/* Left Image Side */}
                      <div className="sm:w-[220px] h-64 sm:h-auto shrink-0 relative bg-slate-900">
                        <img
                          src={prop.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=400&q=80"}
                          alt={prop.title}
                          className="w-full h-full object-cover mix-blend-overlay opacity-90"
                        />
                        <span className="absolute top-4 left-4 px-2.5 py-1 text-[8px] font-black rounded uppercase tracking-widest bg-[#0b0f19] text-white">
                          {prop.category || "NEW SUBMISSION"}
                        </span>
                      </div>

                      {/* Right Content Side */}
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        
                        {/* Header Row */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">{prop.title}</h3>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                              <MapPin size={12} className="text-slate-400" />
                              {prop.city ? `${prop.city}, ${prop.district || ""}`.trim().replace(/,$/, "") : prop.address || "—"}
                            </div>
                          </div>
                          <div className="text-right">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">
                              ${prop.monthlyRent?.toLocaleString()}/mo
                            </h3>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-right">
                              {prop.propertyType || "PROPERTY"}
                            </p>
                          </div>
                        </div>

                        {/* Specs Row */}
                        <div className="flex gap-2 mb-4">
                          <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                            <span className="flex items-center gap-1 text-[11px] font-black text-slate-800">
                              <BedDouble size={12}/>{prop.bedrooms ?? "—"}
                            </span>
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Beds</span>
                          </div>
                          <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                            <span className="flex items-center gap-1 text-[11px] font-black text-slate-800">
                              <Droplets size={12}/>{prop.bathrooms ?? "—"}
                            </span>
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Baths</span>
                          </div>
                          <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                            <span className="flex items-center gap-1 text-[11px] font-black text-slate-800">
                              <Maximize size={12}/>{prop.areaSize ? `${prop.areaSize}` : "—"}
                            </span>
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Sqft</span>
                          </div>
                        </div>

                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed mb-6 flex-1 min-h-[40px]">
                          {prop.description || "No description provided."}
                        </p>

                        {/* Owner and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-6 mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold flex items-center justify-center text-sm">
                              {(owner?.fullName || "O").charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-900 leading-none mb-1">
                                {owner?.fullName || `Owner #${prop.ownerId}`}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                4.8 <Star size={10} className="fill-yellow-400 text-yellow-400 -mt-0.5" />
                              </span>
                            </div>
                          </div>
                          <button className="text-[10px] font-bold text-slate-900 border-b border-slate-900 hover:text-slate-500 hover:border-slate-500 uppercase tracking-widest transition-colors">
                            View Full Details
                          </button>
                        </div>

                        {/* Approve / Reject Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            disabled={isLoading(prop.id)}
                            onClick={() => updateStatus(prop.id, "APPROVED")}
                            className="py-2.5 bg-[#0b0f19] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
                          >
                            {actionLoading[prop.id] === "APPROVED" ? "Approving..." : "Approve Listing"}
                          </button>
                          <button
                            disabled={isLoading(prop.id)}
                            onClick={() => updateStatus(prop.id, "REJECTED")}
                            className="py-2.5 bg-white border border-red-200 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {actionLoading[prop.id] === "REJECTED" ? "Rejecting..." : "Reject"}
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>

          ) : (

            /* DEFAULT ALL / APPROVED / REJECTED GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProperties.length === 0 ? (
                <p className="col-span-3 text-center text-slate-400 font-medium py-20">No properties found.</p>
              ) : (
                filteredProperties.map((property) => {
                  const owner = ownerMap[property.ownerId];
                  const initials = (owner?.fullName || "")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "?";
                  return (
                    <div key={property.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm shadow-slate-200/50 border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                      
                      {/* Image Block */}
                      <div className="h-56 relative w-full shrink-0 bg-slate-100">
                        <img
                          src={property.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=500&q=80"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {getStatusBadge(property)}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 text-sm font-black rounded-xl shadow-sm">
                          ${property.monthlyRent?.toLocaleString()}/mo
                        </div>
                      </div>

                      {/* Content Block */}
                      <div className="p-8 flex flex-col flex-1">
                        
                        {/* Title & Location */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">{property.title}</h3>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <MapPin size={14} className="text-slate-400" />
                            {property.city ? `${property.city}, ${property.district || ""}`.trim().replace(/,$/, "") : property.address || "—"}
                          </div>
                        </div>

                        {/* Owner and Specs Row */}
                        <div className="flex items-center justify-between mb-2">
                          
                          {/* Owner Mini-Profile */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                              {initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-900 leading-tight">
                                {(owner?.fullName || `Owner #${property.ownerId}`).split(" ")[0]}
                              </span>
                              <span className="text-[10px] font-bold text-slate-900 leading-tight">
                                {(owner?.fullName || "").split(" ").slice(1).join(" ")}
                              </span>
                            </div>
                          </div>

                          {/* Specs Pills */}
                          <div className="flex flex-wrap justify-end gap-1.5 pl-2 border-l border-slate-100">
                            {property.bedrooms && (
                              <span className="bg-blue-50/80 text-blue-800 px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase">
                                {property.bedrooms} BED
                              </span>
                            )}
                            {property.propertyType && (
                              <span className="bg-blue-50/80 text-blue-800 px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase">
                                {property.propertyType}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        {renderCardActions(property)}

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Bottom Load More */}
          <div className="text-center pb-8">
            {activeTab === "PENDING APPROVAL" ? (
              <button className="px-8 py-4 bg-slate-100 border-transparent text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mx-auto">
                <RotateCw size={14} /> LOAD MORE APPLICATIONS
              </button>
            ) : (
              <button className="px-8 py-4 bg-transparent border-2 border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors">
                LOAD MORE LISTINGS
              </button>
            )}
          </div>
        </>
      )}

    </div>
  );
}
