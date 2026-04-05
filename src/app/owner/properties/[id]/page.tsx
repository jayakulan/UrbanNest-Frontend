"use client";

import React, { use } from "react";
import { 
  MapPin, 
  Pencil, 
  Ban, 
  Eye, 
  Trash2,
  Wifi,
  Car,
  Wind,
  Shield,
  Waves,
  Dumbbell,
  Calendar,
  User
} from "lucide-react";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [property, setProperty] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/properties/${resolvedParams.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        }
      } catch (err) {
        console.error("Failed to fetch property details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="p-8 text-slate-500 font-bold">Loading property details...</div>;
  }

  if (!property) {
    return <div className="p-8 text-red-500 font-bold">Property not found.</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto p-8 font-sans pb-24">
      {/* Top Section - Image & Summary */}
      <div className="flex flex-col xl:flex-row gap-8 mb-8">
        
        {/* Left Image Section */}
        <div className="relative flex-1 h-[400px] rounded-3xl overflow-hidden shadow-sm bg-slate-900">
          <img 
            src={property.photos || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"} 
            alt={property.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/90 text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                {property.availabilityStatus || "ACTIVE"}
              </span>
              <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Verified Listing
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-white/80 font-medium">
              <MapPin size={16} />
              <span>{property.city ? `${property.city}, ${property.district}` : property.address}</span>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[400px] bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Monthly Rent</p>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">${property.monthlyRent || 0}</h2>
          
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl uppercase">
              {property.propertyType || "PROPERTY"}
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl">
              {property.bedrooms || 0} Bedrooms
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl uppercase">
              {property.category || "Standard"}
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-semibold text-slate-600">Occupancy Rate</span>
              <span className="text-lg font-bold text-slate-900">95%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-900 w-[95%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors">
          <Pencil size={18} />
          Edit Property
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm">
          <Ban size={18} />
          Mark as Unavailable
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm">
          <Eye size={18} />
          View Public Listing
        </button>
        
        <div className="flex-1"></div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-500 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">
          <Trash2 size={18} />
          Delete Listing
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* About this Property */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">About this Property</h2>
            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
              {property.description || "No description provided for this listing."}
            </p>
          </div>

          {/* Building Amenities */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-8">Building Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Wifi size={20} />
                </div>
                <span className="font-semibold text-slate-700">High-speed WiFi</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Car size={20} />
                </div>
                <span className="font-semibold text-slate-700">Secured Parking</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Wind size={20} />
                </div>
                <span className="font-semibold text-slate-700">Climate Control</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Shield size={20} />
                </div>
                <span className="font-semibold text-slate-700">24/7 Security</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Waves size={20} />
                </div>
                <span className="font-semibold text-slate-700">Rooftop Pool</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 border border-slate-100">
                  <Dumbbell size={20} />
                </div>
                <span className="font-semibold text-slate-700">Private Gym</span>
              </div>

            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-8">Specifications</h2>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Area</p>
                <p className="text-base font-bold text-slate-900">{property.areaSize || 0} sq ft</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bathrooms</p>
                <p className="text-base font-bold text-slate-900">{property.bathrooms || 0}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Zip Code</p>
                <p className="text-base font-bold text-slate-900">{property.zipCode || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amenities</p>
                <p className="text-base font-bold text-slate-900 capitalize text-wrap">{property.amenities ? property.amenities.split(",").join(", ") : "N/A"}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Market Performance */}
          <div className="bg-[#0b0f19] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
            <h2 className="text-xl font-bold mb-8 relative z-10">Market Performance</h2>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Total Views</p>
                <p className="text-3xl font-bold">1,240</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                <Eye size={20} className="text-white/80" />
              </div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs font-bold text-blue-400 mb-1">Bookings <span className="text-slate-400">(Monthly)</span></p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                <Calendar size={20} className="text-white/80" />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 -m-20 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h2>
            
            <div className="bg-slate-50 rounded-xl p-5 border-l-[4px] border-slate-900 mb-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Tenant</p>
              <p className="text-base font-bold text-slate-900 leading-tight">Alexander Wright</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Aug 15 - Sept 15</p>
            </div>
            
            <div className="rounded-xl p-5 border border-slate-200 bg-white shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Upcoming</p>
              <p className="text-base font-bold text-slate-700 leading-tight">Elena Rodriguez</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Sept 20 - Oct 05</p>
            </div>
          </div>

          {/* Inquiries */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Inquiries</h2>
              <button className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-wider">
                View All
              </button>
            </div>
            
            <div className="space-y-6">
              
              {/* Inquiry 1 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Sarah Jenkins</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1 leading-relaxed">
                    "Interested in viewing for lon...
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">
                    2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-100"></div>

              {/* Inquiry 2 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Michael Chen</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1 leading-relaxed">
                    "Is the parking space large...
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">
                    Yesterday
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
