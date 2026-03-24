"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight,
  Info,
  Image as ImageIcon,
  Camera,
  AlignLeft,
  MapPin,
  Map,
  Sliders,
  Bed,
  Bath,
  Maximize,
  CheckCircle2,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Waves,
  Dog,
  SquareDashedBottom,
  Wind,
  Save,
  Check
} from "lucide-react";

export default function EditPropertyPage() {
  const [activeAmenities, setActiveAmenities] = useState<string[]>([
    "wifi", "parking", "gym", "security"
  ]);

  const toggleAmenity = (amenity: string) => {
    setActiveAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const amenitiesList = [
    { id: "wifi", label: "WIFI", icon: <Wifi size={16} /> },
    { id: "parking", label: "Private Parking", icon: <Car size={16} /> },
    { id: "gym", label: "Gym Access", icon: <Dumbbell size={16} /> },
    { id: "security", label: "24/7 Security", icon: <Shield size={16} /> },
    { id: "pool", label: "Swimming Pool", icon: <Waves size={16} /> },
    { id: "pets", label: "Pet Friendly", icon: <Dog size={16} /> },
    { id: "balcony", label: "Balcony", icon: <SquareDashedBottom size={16} /> },
    { id: "ac", label: "Air Conditioning", icon: <Wind size={16} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans pb-32">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wider">
        <Link href="/owner" className="hover:text-slate-900 transition-colors">Dashboard</Link>
        <ChevronRight size={14} />
        <Link href="/owner/properties" className="hover:text-slate-900 transition-colors">My Properties</Link>
        <ChevronRight size={14} />
        <span className="text-slate-900">Edit Property</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Edit Property Listing</h1>
          <p className="text-slate-500 font-medium">
            Update the details for <span className="text-slate-900 font-bold">Azure Sky Penthouse</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
            Live Listing
          </span>
          <span className="text-xs font-medium text-slate-500">
            Last updated: Oct 24, 2023
          </span>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Card 1: Property Basics */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <Info size={16} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Property Basics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Property Title</label>
              <input 
                type="text" 
                defaultValue="Azure Sky Penthouse"
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
              <select className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 appearance-none">
                <option>Penthouse</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Rent (£)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-medium">
                  £
                </div>
                <input 
                  type="text" 
                  defaultValue="4200"
                  className="w-full bg-slate-100 border-none rounded-xl pl-8 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Listing Tagline</label>
              <input 
                type="text" 
                defaultValue="Panoramic city views with bespoke architectural finishings"
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Property Gallery */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <ImageIcon size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Property Gallery</h2>
            </div>
            <span className="text-xs font-semibold text-slate-500"><span className="text-slate-900 font-bold">4</span> of 12 images used</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="Living Room" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=400&q=80" alt="Kitchen" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80" alt="Bedroom" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=400&q=80" alt="Balcony" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Camera size={20} className="mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Add More</span>
            </button>
          </div>
        </div>

        {/* Card 3: Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Detailed Description */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <AlignLeft size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Detailed Description</h2>
            </div>
            
            <textarea 
              className="w-full flex-1 bg-slate-100 border-none rounded-2xl p-6 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-slate-200 outline-none resize-none min-h-[250px] leading-relaxed"
              defaultValue={`This ultra-modern penthouse offers a rare combination of space and sophistication. Featuring triple-aspect windows, the property is bathed in natural light throughout the day. The open-plan living area transitions seamlessly onto a private 400 sq ft terrace with breathtaking views of the Thames and the London skyline. Recently renovated with bespoke Italian marble and smart-home integration.`}
            />
          </div>

          {/* Location Data */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Location Data</h2>
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Street Address</label>
                <input 
                  type="text" 
                  defaultValue="128 Cadogan Square"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                  <input 
                    type="text" 
                    defaultValue="London"
                    className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">District</label>
                  <input 
                    type="text" 
                    defaultValue="Chelsea"
                    className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
              </div>
              
              <div className="w-1/2 pr-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Postal Code</label>
                <input 
                  type="text" 
                  defaultValue="SW1X 0HX"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              
              {/* Map block */}
              <div className="flex-1 min-h-[140px] bg-slate-200 rounded-2xl flex flex-col items-center justify-center relative mt-2 border border-slate-300 overflow-hidden">
                <Map size={32} className="text-slate-500 mb-2 opacity-50" />
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 bg-white text-[10px] font-bold tracking-wider rounded border border-slate-200 uppercase shadow-sm">Map View</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Card 4: Property Specifications */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <Sliders size={16} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Property Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-slate-500">
                <Bed size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Bedrooms</p>
                <input type="text" defaultValue="3" className="w-full bg-transparent border-none p-0 text-xl font-bold text-slate-900 focus:ring-0 outline-none" />
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-slate-500">
                <Bath size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Bathrooms</p>
                <input type="text" defaultValue="2" className="w-full bg-transparent border-none p-0 text-xl font-bold text-slate-900 focus:ring-0 outline-none" />
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-slate-500">
                <Maximize size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Sq Ft</p>
                <input type="text" defaultValue="1800" className="w-full bg-transparent border-none p-0 text-xl font-bold text-slate-900 focus:ring-0 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Amenities */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Amenities</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {amenitiesList.map((amenity) => {
              const isActive = activeAmenities.includes(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 ${
                    isActive 
                      ? "bg-[#0b0f19] border-[#0b0f19] text-white shadow-md font-medium"
                      : "bg-white border-slate-300 text-slate-600 hover:border-slate-400 font-medium"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-500"}>
                    {amenity.icon}
                  </span>
                  {amenity.label}
                  {isActive && <Check size={14} className="ml-1 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 py-4 px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
            <CheckCircle2 size={16} className="text-green-500" />
            Auto-saving as draft...
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Cancel
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#0b0f19] text-white rounded-xl font-bold hover:bg-slate-800 shadow-md transition-colors">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
