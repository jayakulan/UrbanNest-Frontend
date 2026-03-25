"use client";

import React, { useState } from "react";
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
  RotateCw
} from "lucide-react";

export default function AdminPropertiesPage() {
  const [activeTab, setActiveTab] = useState("ALL PROPERTIES");

  const tabs = ["ALL PROPERTIES", "PENDING APPROVAL", "APPROVED", "REJECTED"];

  // Data for "ALL PROPERTIES" View
  const properties = [
    {
      id: 1,
      title: "The Obsidian Suite",
      location: "Tribeca, New York",
      price: "$12,500/mo",
      status: "APPROVED",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=500&q=80",
      ownerInitials: "AV",
      ownerName: "Alexander Vance",
      specs: ["3 Bed", "2.5 Bath"]
    },
    {
      id: 2,
      title: "Villa Marisol",
      location: "Malibu, California",
      price: "$24,000/mo",
      status: "PENDING",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
      ownerInitials: "SC",
      ownerName: "Sophia Chen",
      specs: ["5 Bed", "Pool"]
    },
    {
      id: 3,
      title: "The Heights Estate",
      location: "Aspen, Colorado",
      price: "$8,900/mo",
      status: "REJECTED",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80",
      ownerInitials: "MK",
      ownerName: "Marcus Kross",
      specs: ["Ski-In"]
    },
    {
      id: 4,
      title: "Azure Bay Mansion",
      location: "Miami Beach, Florida",
      price: "$35,000/mo",
      status: "APPROVED",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
      ownerInitials: "JD",
      ownerName: "Julianna Drake",
      specs: ["8 Bed", "Private Dock"]
    },
    {
      id: 5,
      title: "The Glass Pavilion",
      location: "Austin, Texas",
      price: "$18,200/mo",
      status: "PENDING",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
      ownerInitials: "EL",
      ownerName: "Elena Lund",
      specs: ["2 Bed", "Studio"]
    },
    {
      id: 6,
      title: "Heritage Loft",
      location: "Soho, London",
      price: "$6,800/mo",
      status: "APPROVED",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80",
      ownerInitials: "OW",
      ownerName: "Oliver Wright",
      specs: ["1 Bed", "Duplex"]
    }
  ];

  // Data for "PENDING APPROVAL" View
  const pendingProperties = [
    {
      id: 101,
      title: "Modern Glass Villa",
      price: "$12,000/mo",
      location: "Beverly Hills, CA",
      tag: "PREMIUM LISTING",
      badge: "URGENT REVIEW",
      badgeStyle: "bg-[#0b0f19] text-white",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
      beds: "5",
      baths: "4",
      sqft: "4,200",
      description: "A masterpiece of contemporary architecture featuring floor-to-ceiling glass walls...",
      ownerName: "Marcus Thorne",
      ownerRating: "4.9",
      ownerProperties: "12",
      ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
    },
    {
      id: 102,
      title: "Skyline Loft",
      price: "$8,500/mo",
      location: "Downtown Miami, FL",
      tag: "URBAN COLLECTION",
      badge: "NEW SUBMISSION",
      badgeStyle: "bg-slate-400 text-white",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
      beds: "2",
      baths: "2",
      sqft: "1,850",
      description: "Industrial chic meets luxury living. Open-concept floor plan with panoramic city views...",
      ownerName: "Sarah Jenkins",
      ownerRating: "5.0",
      ownerProperties: "3",
      ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      id: 103,
      title: "Azure Bay Retreat",
      price: "$25,000/mo",
      location: "Malibu, CA",
      tag: "ELITE WATERFRONT",
      badge: "PENDING DOCS",
      badgeStyle: "bg-[#0b0f19] text-white",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
      beds: "6",
      baths: "6",
      sqft: "6,500",
      description: "Breathtaking oceanfront estate with private beach access and state-of-the-art security.",
      ownerName: "David Sterling",
      ownerRating: "4.8",
      ownerProperties: "45",
      ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      id: 104,
      title: "The Nordic Cabin",
      price: "$15,500/mo",
      location: "Aspen, CO",
      tag: "SEASONAL LUXURY",
      badge: "NEW SUBMISSION",
      badgeStyle: "bg-slate-400 text-white",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      beds: "4",
      baths: "3",
      sqft: "3,200",
      description: "A retreat of silence and warmth. Minimalist Scandinavian design nestled perfectly...",
      ownerName: "Elena Moretti",
      ownerRating: "4.7",
      ownerProperties: "8",
      ownerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "APPROVED":
        return <span className="absolute top-4 left-4 bg-green-50 text-green-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">APPROVED</span>;
      case "PENDING":
        return <span className="absolute top-4 left-4 bg-orange-100 text-orange-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">PENDING</span>;
      case "REJECTED":
        return <span className="absolute top-4 left-4 bg-red-100 text-red-700 px-3 py-1 text-[10px] font-black rounded-full tracking-widest uppercase shadow-sm">REJECTED</span>;
      default:
        return null;
    }
  };

  const renderCardActions = (status: string) => {
    switch(status) {
      case "APPROVED":
        return (
          <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
            <button className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
              VIEW DETAILS
            </button>
            <button className="py-2.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors">
              DELETE
            </button>
          </div>
        );
      case "PENDING":
        return (
          <div className="flex flex-col mt-auto pt-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="py-2.5 bg-[#0b0f19] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-800 transition-colors">
                APPROVE
              </button>
              <button className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                REJECT
              </button>
            </div>
            <button className="text-[9px] font-black text-slate-500 hover:text-slate-900 tracking-widest uppercase transition-colors text-center">
              VIEW FULL SUBMISSION
            </button>
          </div>
        );
      case "REJECTED":
        return (
          <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
            <button className="py-2.5 bg-slate-100/80 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
              EDIT
            </button>
            <button className="py-2.5 bg-[#475569] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm">
              RE-EVALUATE
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Dynamic Header Area Based on Selection */}
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
                  <p className="text-sm font-black text-slate-900 leading-none">12 Properties</p>
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
        
        {/* Left Tabs */}
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
              {tab}
            </button>
          ))}
        </div>

        {/* Right Dropdown */}
        <button className="flex items-center gap-3 px-5 py-3 bg-slate-100/80 rounded-xl text-[10px] font-bold text-slate-700 hover:bg-slate-200 transition-colors uppercase tracking-widest">
          LATEST LISTINGS <ChevronDown size={14} className="text-slate-500" />
        </button>
      </div>

      {/* Dynamic Content Grid */}
      {activeTab === "PENDING APPROVAL" ? (
        
        /* PENDING APPROVALS SPECIAL VIEW */
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {pendingProperties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row hover:shadow-md transition-shadow">
              
              {/* Left Image Side */}
              <div className="sm:w-[220px] h-64 sm:h-auto shrink-0 relative bg-slate-900">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover mix-blend-overlay opacity-90" />
                <span className={`absolute top-4 left-4 px-2.5 py-1 text-[8px] font-black rounded uppercase tracking-widest ${prop.badgeStyle}`}>
                  {prop.badge}
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
                      {prop.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">{prop.price}</h3>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-right">{prop.tag}</p>
                  </div>
                </div>

                {/* Specs Row */}
                <div className="flex gap-2 mb-4">
                  <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                    <span className="flex items-center gap-1 text-[11px] font-black text-slate-800"><BedDouble size={12}/>{prop.beds}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Beds</span>
                  </div>
                  <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                    <span className="flex items-center gap-1 text-[11px] font-black text-slate-800"><Droplets size={12}/>{prop.baths}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Baths</span>
                  </div>
                  <div className="bg-slate-100/80 px-3 py-2 rounded-lg flex flex-col items-center flex-1">
                    <span className="flex items-center gap-1 text-[11px] font-black text-slate-800"><Maximize size={12}/>{prop.sqft}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Sqft</span>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-slate-500 leading-relaxed mb-6 flex-1 min-h-[40px]">
                  {prop.description}
                </p>

                {/* Owner and Actions Split Layout */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <img src={prop.ownerAvatar} alt="Owner" className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 leading-none mb-1">{prop.ownerName}</span>
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                        {prop.ownerRating} <Star size={10} className="fill-yellow-400 text-yellow-400 -mt-0.5" />
                        ({prop.ownerProperties} properties)
                      </span>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-slate-900 border-b border-slate-900 hover:text-slate-500 hover:border-slate-500 uppercase tracking-widest transition-colors">
                    View Full Details
                  </button>
                </div>

                {/* Actions Row */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-[#0b0f19] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-800 transition-colors">
                    Approve Listing
                  </button>
                  <button className="py-2.5 bg-white border border-red-200 text-red-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors">
                    Reject
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      ) : (

        /* DEFAULT ALL PROPERTIES / OTHER TABS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.filter(p => activeTab === "ALL PROPERTIES" ? true : p.status === activeTab).map((property) => (
            <div key={property.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm shadow-slate-200/50 border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              
              {/* Image Block */}
              <div className="h-56 relative w-full shrink-0 bg-slate-100">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                {getStatusBadge(property.status)}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 text-sm font-black rounded-xl shadow-sm">
                  {property.price}
                </div>
              </div>

              {/* Content Block */}
              <div className="p-8 flex flex-col flex-1">
                
                {/* Title & Location */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">{property.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    {property.location}
                  </div>
                </div>

                {/* Owner and Specs Row */}
                <div className="flex items-center justify-between mb-2">
                  
                  {/* Owner Mini-Profile */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                      {property.ownerInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-900 leading-tight">
                        {property.ownerName.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-bold text-slate-900 leading-tight">
                        {property.ownerName.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  </div>

                  {/* Specs Pills */}
                  <div className="flex flex-wrap justify-end gap-1.5 pl-2 border-l border-slate-100">
                    {property.specs.map((spec, idx) => (
                      <span key={idx} className="bg-blue-50/80 text-blue-800 px-2 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase">
                        {spec}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Actions */}
                {renderCardActions(property.status)}

              </div>
            </div>
          ))}
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

    </div>
  );
}
