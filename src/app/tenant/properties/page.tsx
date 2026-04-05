"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  ChevronDown,
  RotateCcw,
  Heart,
  Star
} from "lucide-react";
import Link from "next/link";

export default function TenantPropertiesPage() {
  const [propertyType, setPropertyType] = useState("Apartment");
  const [bedrooms, setBedrooms] = useState("2");
  
  const [properties, setProperties] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties");
        if(res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8 font-sans pb-24">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Curated Spaces</h1>
          <p className="text-slate-600 font-medium">Discover architectural masterpieces for your next stay.</p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500">Sort by:</span>
          <button className="flex items-center gap-2 bg-slate-100/80 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 transition-colors">
            Most Popular
            <ChevronDown size={16} className="text-slate-500" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Sidebar Filters */}
        <div className="w-full lg:w-72 shrink-0 space-y-8">
          
          {/* Location */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Location</h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <MapPin size={16} className="text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full pl-10 pr-4 py-3 bg-slate-100/60 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none placeholder:text-slate-500 text-slate-900"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
              <span className="text-slate-800">Price Range</span>
              <span className="text-slate-900 font-black normal-case text-sm tracking-normal">$2k - $15k</span>
            </div>
            
            {/* Custom slider visualization */}
            <div className="relative h-2 bg-slate-200 rounded-full mt-2">
              <div className="absolute top-0 left-[20%] right-[30%] h-full bg-[#0b0f19] rounded-full"></div>
              {/* Range thumb handles */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-4 h-4 bg-[#0b0f19] border-2 border-white rounded-full shadow cursor-pointer"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-[#0b0f19] border-2 border-white rounded-full shadow cursor-pointer"></div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {['Apartment', 'House', 'Villa'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    propertyType === type 
                      ? 'bg-[#0b0f19] text-white' 
                      : 'bg-blue-50 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Bedrooms</h3>
            <div className="flex gap-2">
              {['1', '2', '3', '4+'].map((beds) => (
                <button 
                  key={beds}
                  onClick={() => setBedrooms(beds)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                    bedrooms === beds 
                      ? 'bg-[#0b0f19] border-[#0b0f19] text-white' 
                      : 'bg-white border-slate-300 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {beds}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Amenities</h3>
            <div className="space-y-4">
              {[
                { label: 'High-speed WiFi', checked: true },
                { label: 'Private Pool', checked: false },
                { label: 'Fitness Center', checked: false },
                { label: 'Smart Home Tech', checked: true }
              ].map((amenity, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
                    amenity.checked ? 'bg-[#0b0f19] border-[#0b0f19]' : 'bg-white border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {amenity.checked && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors mt-8 pt-6 w-full justify-center">
            Reset All Filters
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Right Content: Property Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100 overflow-hidden flex flex-col group cursor-pointer">
              
              {/* Image Section */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden">
                <img 
                  src={prop.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=800&q=80"} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-slate-900 z-10">
                  <Heart size={18} className="fill-slate-900" />
                </button>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#0b0f19]/90 backdrop-blur-sm text-white">
                    {prop.availabilityStatus || "AVAILABLE NOW"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{prop.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400 mb-0.5" />
                    <span className="font-bold text-slate-900 text-sm">4.9</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 mb-5">
                  <MapPin size={16} />
                  <span className="text-sm font-semibold">{prop.city ? `${prop.city}, ${prop.district}` : prop.address}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-700 rounded-full">
                    {prop.bedrooms || 0} BEDROOMS
                  </span>
                  <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-700 rounded-full">
                    {prop.propertyType || "PROPERTY"}
                  </span>
                </div>

                <div className="border-t border-slate-100 my-4 line-hidden hidden"></div>

                {/* Footer Section (Pushed to bottom using mt-auto) */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</span>
                    <span className="text-2xl font-black text-slate-900">${prop.monthlyRent || 0}</span>
                  </div>
                  <Link 
                    href={`/tenant/properties/${prop.id}`}
                    className="px-5 py-2.5 bg-[#0b0f19] text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm inline-block"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
