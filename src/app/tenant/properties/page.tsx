"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  ChevronDown,
  RotateCcw,
  Heart,
  Star
} from "lucide-react";
import Link from "next/link";

const AMENITY_OPTIONS = [
  { label: "High-speed WiFi", key: "wifi" },
  { label: "Private Pool",    key: "pool" },
  { label: "Fitness Center",  key: "gym"  },
  { label: "Smart Home Tech", key: "smart" },
];

export default function TenantPropertiesPage() {
  // ── Raw data from DB ──
  const [allProperties, setAllProperties] = useState<any[]>([]);

  // ── Filter state ──
  const [locationQuery, setLocationQuery]   = useState("");
  const [propertyType, setPropertyType]     = useState("All");
  const [bedrooms, setBedrooms]             = useState("Any");
  const [maxRent, setMaxRent]               = useState(50000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy]                 = useState("newest");

  // Fetch once — filter out RENTED in the client
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/properties");
        if (res.ok) {
          const data = await res.json();
          const available = data.filter(
            (p: any) => (p.availabilityStatus || "").toUpperCase() !== "RENTED"
          );
          setAllProperties(available);
          // Set max rent slider ceiling to highest rent in dataset
          const highest = Math.max(...available.map((p: any) => p.monthlyRent || 0), 50000);
          setMaxRent(highest);
        }
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    fetchProperties();
  }, []);

  // ── Toggle amenity checkbox ──
  const toggleAmenity = (key: string) => {
    setSelectedAmenities(prev =>
      prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]
    );
  };

  // ── Reset all filters ──
  const resetFilters = () => {
    setLocationQuery("");
    setPropertyType("All");
    setBedrooms("Any");
    setSelectedAmenities([]);
    const highest = Math.max(...allProperties.map((p: any) => p.monthlyRent || 0), 50000);
    setMaxRent(highest);
  };

  // ── Apply all filters + sort ──
  const filteredProperties = allProperties
    .filter(p => {
      // Location
      if (locationQuery.trim()) {
        const q = locationQuery.toLowerCase();
        const loc = `${p.city || ""} ${p.district || ""} ${p.address || ""}`.toLowerCase();
        if (!loc.includes(q)) return false;
      }
      // Property type
      if (propertyType !== "All") {
        if ((p.propertyType || "").toLowerCase() !== propertyType.toLowerCase()) return false;
      }
      // Bedrooms
      if (bedrooms !== "Any") {
        if (bedrooms === "4+") {
          if ((p.bedrooms || 0) < 4) return false;
        } else {
          if ((p.bedrooms || 0) !== parseInt(bedrooms)) return false;
        }
      }
      // Price (max rent slider)
      if ((p.monthlyRent || 0) > maxRent) return false;
      // Amenities 
      if (selectedAmenities.length > 0) {
        const propAmenities = (p.amenities || "").toLowerCase();
        if (!selectedAmenities.every(a => propAmenities.includes(a))) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") return (a.monthlyRent || 0) - (b.monthlyRent || 0);
      if (sortBy === "price_desc") return (b.monthlyRent || 0) - (a.monthlyRent || 0);
      // newest — higher id = newer
      return (b.id || 0) - (a.id || 0);
    });

  // Dynamic slider fill percentages
  const maxPossible = Math.max(...allProperties.map((p: any) => p.monthlyRent || 0), 50000);
  const sliderPct = maxPossible > 0 ? (maxRent / maxPossible) * 100 : 100;

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
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none flex items-center gap-2 bg-slate-100/80 hover:bg-slate-200 pl-4 pr-9 py-2.5 rounded-xl text-sm font-bold text-slate-800 transition-colors cursor-pointer outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <ChevronDown size={16} className="text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
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
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                placeholder="Where to?" 
                className="w-full pl-10 pr-4 py-3 bg-slate-100/60 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none placeholder:text-slate-500 text-slate-900"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
              <span className="text-slate-800">Max Price</span>
              <span className="text-slate-900 font-black normal-case text-sm tracking-normal">
                ${maxRent.toLocaleString()}
              </span>
            </div>
            <div className="relative h-2 bg-slate-200 rounded-full mt-4">
              <div
                className="absolute top-0 left-0 h-full bg-[#0b0f19] rounded-full"
                style={{ width: `${sliderPct}%` }}
              ></div>
              <input
                type="range"
                min={0}
                max={maxPossible}
                step={500}
                value={maxRent}
                onChange={e => setMaxRent(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#0b0f19] border-2 border-white rounded-full shadow pointer-events-none"
                style={{ left: `calc(${sliderPct}% - 8px)` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">
              <span>$0</span>
              <span>${maxPossible.toLocaleString()}</span>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Apartment', 'House', 'Villa', 'Penthouse', 'Studio', 'Loft'].map((type) => (
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
              {['Any', '1', '2', '3', '4+'].map((beds) => (
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
              {AMENITY_OPTIONS.map((amenity) => {
                const checked = selectedAmenities.includes(amenity.key);
                return (
                  <label key={amenity.key} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleAmenity(amenity.key)}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
                      checked ? 'bg-[#0b0f19] border-[#0b0f19]' : 'bg-white border-slate-300 group-hover:border-slate-400'
                    }`}>
                      {checked && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{amenity.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Results count + Reset */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 text-center mb-4">
              {filteredProperties.length} propert{filteredProperties.length === 1 ? "y" : "ies"} found
            </p>
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-900 transition-colors w-full justify-center"
            >
              Reset All Filters
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Right Content: Property Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProperties.length === 0 ? (
            <div className="col-span-2 py-20 text-center">
              <p className="text-2xl font-bold text-slate-300 mb-2">No properties found</p>
              <p className="text-sm font-semibold text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            filteredProperties.map((prop) => (
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

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</span>
                      <span className="text-2xl font-black text-slate-900">${prop.monthlyRent?.toLocaleString() || 0}</span>
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
            ))
          )}
        </div>

      </div>
    </div>
  );
}
