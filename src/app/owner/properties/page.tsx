"use client";

import React, { useState } from "react";
import { 
  Plus, 
  ChevronDown, 
  LayoutGrid, 
  List as ListIcon, 
  Heart, 
  MapPin, 
  Eye, 
  Pencil,
  Home
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPropertiesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filters = ["All", "Active", "Pending", "Rented", "Inactive"];

  const properties = [
    {
      id: 1,
      title: "Azure Sky",
      type: "PENTHOUSE",
      location: "Downtown District, NY",
      rent: "4,200",
      status: "ACTIVE",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    {
      id: 2,
      title: "Lumina Garden",
      type: "VILLA",
      location: "Greenwich Village, NY",
      rent: "6,800",
      status: "PENDING",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    {
      id: 3,
      title: "Obsidian Loft",
      type: "LOFT",
      location: "Brooklyn Heights, NY",
      rent: "3,100",
      status: "RENTED",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=800&q=80",
    },
    {
      id: 4,
      title: "Metro Studio",
      type: "STUDIO",
      location: "Long Island City, NY",
      rent: "2,450",
      status: "ACTIVE",
      image: "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=800&q=80",
    },
    {
      id: 5,
      title: "The Mini",
      type: "APARTMENT",
      location: "Upper East Side, NY",
      rent: "5,200",
      status: "INACTIVE",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-500 text-white";
      case "PENDING": return "bg-orange-500 text-white";
      case "RENTED": return "bg-blue-500 text-white";
      case "INACTIVE": return "bg-slate-500 text-white";
      default: return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Properties</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage and monitor your premium real estate portfolio performance.</p>
        </div>
        <Link 
          href="/owner/add-property"
          className="flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shrink-0"
        >
          <Plus size={20} />
          Add New Property
        </Link>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-slate-100/50 p-2 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? "bg-[#0f172a] text-white shadow-md" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort and View Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-900">
              Newest First <ChevronDown size={16} className="text-slate-500" />
            </button>
          </div>
          
          <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-200">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {properties.map((property) => (
          <Link href={`/owner/properties/${property.id}`} key={property.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group block">
            {/* Image Container */}
            <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
                <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                  <Heart size={16} className="fill-current" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-2">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-slate-900 truncate">{property.title}</h3>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {property.type}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-slate-500 mb-6">
                <MapPin size={14} />
                <span className="text-sm font-medium">{property.location}</span>
              </div>

              <div className="flex items-end justify-between pt-5 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Rent</p>
                  <p className="text-xl font-bold text-slate-900">
                    ${property.rent}<span className="text-sm text-slate-500 font-medium">/mo</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/owner/properties/${property.id}/edit`);
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Add New Property Card Placeholder */}
        <Link href="/owner/add-property" className="border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
          <div className="w-14 h-14 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mb-6 relative">
            <Home size={24} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0f172a] text-white rounded-full flex items-center justify-center border-2 border-slate-50">
              <Plus size={14} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Add New<br/>Property</h3>
          <p className="text-sm text-slate-500 font-medium max-w-[180px]">Start listing another exclusive asset to your portfolio</p>
        </Link>
      </div>

      {/* Show More Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
          Show More Properties <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
}
