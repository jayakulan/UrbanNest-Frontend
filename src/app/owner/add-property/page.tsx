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
  Rocket,
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function AddPropertyPage() {
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "Apartment",
    category: "Luxury",
    monthlyRent: "",
    availabilityStatus: "Available Now",
    address: "",
    city: "",
    district: "",
    zipCode: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    areaSize: "",
    photos: ""
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatusMsg({ text: "", type: "" });
    
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      if (!token || !userId) {
        setStatusMsg({ text: "Authentication Error. Please log in.", type: "error" });
        setIsPublishing(false);
        return;
      }
      
      // Map to exact JPA Entity parameters expecting explicit typed JSON serialization
      const payload = {
        ownerId: parseInt(userId, 10),
        title: formData.title,
        propertyType: formData.propertyType,
        category: formData.category,
        monthlyRent: parseFloat(formData.monthlyRent) || 0.0,
        availabilityStatus: formData.availabilityStatus,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        zipCode: formData.zipCode,
        description: formData.description,
        bedrooms: parseInt(formData.bedrooms, 10) || 0,
        bathrooms: parseInt(formData.bathrooms, 10) || 0,
        areaSize: parseFloat(formData.areaSize) || 0.0,
        amenities: activeAmenities.join(","), // Converting array -> encoded comma separated db string map
        photos: formData.photos // Optional Base64 implementation or URL structure
      };

      const res = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatusMsg({ text: "Property published successfully!", type: "success" });
        // Optional form reset after true payload logic success 
        setFormData({
            title: "", propertyType: "Apartment", category: "Luxury", monthlyRent: "", 
            availabilityStatus: "Available Now", address: "", city: "", district: "",
            zipCode: "", description: "", bedrooms: "", bathrooms: "", areaSize: "", photos: ""
        });
        setActiveAmenities([]);
      } else {
        setStatusMsg({ text: "Failed to publish property.", type: "error" });
      }
      
    } catch(err) {
       setStatusMsg({ text: "Connection to server failed.", type: "error" });
    } finally {
       setIsPublishing(false);
       setTimeout(() => setStatusMsg({ text: "", type: "" }), 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pb-32 relative text-slate-900">
      
      {/* Toast Integration Notification */}
      {statusMsg.text && (
        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between font-bold text-sm shadow-sm border ${
          statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : null }
            {statusMsg.text}
          </div>
        </div>
      )}

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Property</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-semibold border-b-2 border-slate-900 pb-1 cursor-pointer">Draft</span>
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
            <h2 className="text-lg font-bold">Basic Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Modern Penthouse with Skyline View"
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
                <select 
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none appearance-none"
                >
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none appearance-none"
                >
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
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Availability Status</label>
                <select 
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleInputChange}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none appearance-none"
                >
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
            <h2 className="text-lg font-bold">Location Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street Name, Building No."
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="District"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip"
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
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
            <h2 className="text-lg font-bold">Property Description</h2>
          </div>

          <div className="space-y-6">
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the unique features, view, and atmosphere of the property..."
              className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none resize-none"
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
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
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
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
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
                    name="areaSize"
                    value={formData.areaSize}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none"
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
            <h2 className="text-lg font-bold">Amenities</h2>
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
            <h2 className="text-lg font-bold">Media</h2>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 transition-colors py-16 flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Camera className="text-slate-400" size={24} />
            </div>
            <h3 className="font-bold text-slate-500 mb-1">Upload Photos</h3>
            <p className="text-sm text-slate-400 font-medium mb-4">Media uploads have been successfully bypassed. Photos are structurally marked as optional.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 flex justify-end gap-4 transform translate-y-0 transition-transform">
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-colors">
          Save Draft
        </button>
        <button 
           onClick={handlePublish}
           disabled={isPublishing}
           className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-md transition-colors"
        >
          {isPublishing ? <Loader2 size={18} className="animate-spin" /> : "Publish Property"}
          {isPublishing ? null : <Rocket size={18} />}
        </button>
      </div>
    </div>
  );
}
