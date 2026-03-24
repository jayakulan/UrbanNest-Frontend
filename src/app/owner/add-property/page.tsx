"use client";

import React, { useState } from "react";
import {
  Info,
  MapPin,
  FileText,
  List,
  Image as ImageIcon,
  Camera,
  Banknote,
  Bed,
  Bath,
  Maximize,
  Wifi,
  Car,
  Sofa,
  Shield,
  Wind,
  SquareDashedBottom,
  Dog,
  Rocket
} from "lucide-react";

export default function AddPropertyPage() {
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setActiveAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const amenitiesList = [
    { id: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
    { id: "parking", label: "Parking", icon: <Car size={16} /> },
    { id: "furnished", label: "Furnished", icon: <Sofa size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "ac", label: "Air Conditioning", icon: <Wind size={16} /> },
    { id: "balcony", label: "Balcony", icon: <SquareDashedBottom size={16} /> },
    { id: "pets", label: "Pet Friendly", icon: <Dog size={16} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 pb-32 relative">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Property</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 cursor-pointer">Draft</span>
            <span className="text-sm font-medium text-slate-400 hover:text-slate-600 cursor-pointer">Preview</span>
            <span className="text-sm font-medium text-slate-400 hover:text-slate-600 cursor-pointer">Analytics</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <Info size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Title</label>
              <input
                type="text"
                placeholder="e.g. Modern Penthouse with Skyline View"
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
                <select className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 appearance-none">
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <select className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 appearance-none">
                  <option>Luxury</option>
                  <option>Standard</option>
                  <option>Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Rent</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Banknote size={16} />
                  </div>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Availability Status</label>
                <select className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 appearance-none">
                  <option>Available Now</option>
                  <option>Rented</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <MapPin size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Location Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Address</label>
              <input
                type="text"
                placeholder="Street Name, Building No."
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">District</label>
                <input
                  type="text"
                  placeholder="District"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zip Code</label>
                <input
                  type="text"
                  placeholder="Zip"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <FileText size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Property Description</h2>
          </div>

          <div className="space-y-6">
            <textarea
              rows={4}
              placeholder="Describe the unique features, view, and atmosphere of the property..."
              className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900 resize-none"
            ></textarea>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Bed size={16} />
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bathrooms</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Bath size={16} />
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Area Size (Sq Ft)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Maximize size={16} />
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <List size={18} />
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-slate-900 border-slate-900 text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-900"}>{amenity.icon}</span>
                  {amenity.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <Camera size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Media</h2>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Camera className="text-slate-900" size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Upload Photos</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">Drag and drop images here, or click to browse files</p>
            <div className="flex gap-4 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Max file size: 10MB</span>
              <span>Formats: JPG, PNG, WEBP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 flex justify-end gap-4 transform translate-y-0 transition-transform">
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-colors">
          Save Draft
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-md transition-colors">
          Publish Property <Rocket size={18} />
        </button>
      </div>
    </div>
  );
}
