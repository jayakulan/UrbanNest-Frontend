"use client";

import React, { useState, use } from "react";
import { 
  MapPin, 
  Star, 
  Share,
  Wifi,
  ConciergeBell,
  Dumbbell,
  Car,
  ThermometerSnowflake,
  Shirt,
  Sun,
  Wine,
  ShieldCheck,
  CalendarDays,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

export default function TenantPropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [guests, setGuests] = useState(2);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);
        if(res.ok) {
          const data = await res.json();
          setProperty(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="p-8">Loading details...</div>;
  if (!property) return <div className="p-8">Property not found.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 font-sans pb-32">
      
      {/* Top Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative shadow-sm">
          <img 
            src={property.photos || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=1200&q=80"} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 h-[400px] md:h-[500px]">
          <div className="flex-1 rounded-3xl overflow-hidden shadow-sm relative">
            <img 
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" 
              alt="Kitchen" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 rounded-3xl overflow-hidden shadow-sm relative">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
              alt="Bedroom" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Two Column Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Main Content */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                {property.availabilityStatus || "AVAILABLE NOW"}
              </span>
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-slate-900 text-sm">
                  4.9 <span className="text-slate-500 font-medium ml-1">(124 reviews)</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-slate-600 font-semibold mb-8">
              <MapPin size={18} />
              <span>{property.city ? `${property.city}, ${property.district}` : property.address}</span>
            </div>
            
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">About this Residence</h2>
              <p className="whitespace-pre-wrap">{property.description || "Experience a premier boutqiue lifestyle..."}</p>
            </div>
          </div>

          {/* Modern Amenities Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Modern Amenities</h2>
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Wifi size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Ultra-Fast<br/>WiFi</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <ConciergeBell size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">24/7<br/>Concierge</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Dumbbell size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Private<br/>Gym</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Car size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Secure<br/>Valet</span>
              </div>
              
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <ThermometerSnowflake size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Climate<br/>Control</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Shirt size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Laundry<br/>Service</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Sun size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Private<br/>Terrace</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm h-36">
                <Wine size={24} className="text-slate-700" />
                <span className="text-xs font-bold text-slate-800 leading-tight">Wine<br/>Cellar</span>
              </div>

            </div>
          </div>

          {/* Architectural Features */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Architectural Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-slate-100 rounded-3xl p-8 bg-white shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Sustainable Design</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">LEED Gold certified with smart glass technology and renewable energy systems integrated into the facade.</p>
              </div>
              <div className="border border-slate-100 rounded-3xl p-8 bg-white shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Italian Stonework</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">Hand-picked Nero Marquina marble from Northern Spain featured in the kitchen and primary bath.</p>
              </div>
            </div>
          </div>

          {/* Host Info */}
          <div className="bg-[#0b0f19] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" 
                alt="Alexander Vance"
                className="w-16 h-16 rounded-xl object-cover bg-slate-800 border border-slate-700"
              />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Alexander Vance</h3>
                <p className="text-slate-400 text-xs font-medium mb-3">Premium Host • Hosting since 2015</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider rounded">VERIFIED</span>
                  <span className="px-2 py-1 bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider rounded">SUPERHOST</span>
                </div>
              </div>
            </div>
            
            <button className="relative z-10 w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Quick Contact
            </button>
            
            {/* Dark background glow element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          </div>

          {/* Neighborhood Map */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">The Neighborhood</h2>
            <div className="w-full h-[400px] bg-slate-300 rounded-3xl relative overflow-hidden group shadow-sm">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" alt="Map Area" className="w-full h-full object-cover mix-blend-multiply opacity-50 absolute inset-0 grayscale" />
              <div className="absolute inset-0 bg-slate-800/20 mix-blend-overlay"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0b0f19] text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10 hover:scale-110 transition-transform cursor-pointer">
                <MapPin size={16} className="fill-white" />
              </div>

              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl w-64 shadow-lg z-10">
                <h4 className="text-sm font-bold text-slate-900 mb-2">Prime Financial District</h4>
                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">Walking distance to World Trade Center, Brookfield Place, and the Battery Park waterfront.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar (Booking Widget) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            
            {/* Booking Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Rent</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">${property.monthlyRent || 0}<span className="text-base font-semibold text-slate-400">/mo</span></p>
                </div>
                <button className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-900">
                  <Share size={18} />
                </button>
              </div>

              {/* Form Grid */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                <div className="flex border-b border-slate-200">
                  <div className="flex-1 p-3 pl-4 border-r border-slate-200">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Move-In</p>
                    <p className="text-sm font-semibold text-slate-400">Add date</p>
                  </div>
                  <div className="flex-1 p-3 pl-4">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Move-Out</p>
                    <p className="text-sm font-semibold text-slate-400">Add date</p>
                  </div>
                </div>
                <div className="p-3 pl-4 flex justify-between items-center cursor-pointer">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Guests</p>
                    <p className="text-sm font-bold text-slate-900">{guests} Guests</p>
                  </div>
                  <ChevronDown size={16} className="text-slate-400 pr-2" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pt-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500 underline underline-offset-4 decoration-slate-300">${property.monthlyRent || 0} x 1 month</span>
                  <span className="text-slate-900">${property.monthlyRent || 0}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500 underline underline-offset-4 decoration-slate-300">Service Fee</span>
                  <span className="text-slate-900">$420.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500 underline underline-offset-4 decoration-slate-300">Cleaning Fee</span>
                  <span className="text-slate-900">$350.00</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mb-8 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">${((property.monthlyRent || 0) + 420 + 350).toLocaleString()}</span>
              </div>

              {property.availabilityStatus?.toUpperCase() === "RENTED" ? (
                <>
                  <div className="w-full py-4 bg-slate-100 border-2 border-slate-200 text-slate-500 rounded-xl text-base font-bold mb-4 flex items-center justify-center gap-2 cursor-not-allowed select-none">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                    Currently Rented — Not Available
                  </div>
                  <p className="text-center text-xs font-semibold text-slate-400 mb-8">
                    This property has been booked by another tenant
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href={`/tenant/properties/${id}/book`}
                    className="w-full py-4 bg-[#0b0f19] text-white rounded-xl text-base font-bold shadow-md hover:bg-slate-800 transition-colors mb-4 flex items-center justify-center cursor-pointer"
                  >
                    Request to Book
                  </Link>
                  <p className="text-center text-xs font-semibold text-slate-400 mb-8">
                    You won't be charged yet
                  </p>
                </>
              )}

              {/* Trust Badge */}
              <div className="flex items-center gap-3 justify-center text-slate-600 bg-slate-50 py-3 rounded-lg border border-slate-100">
                <ShieldCheck size={18} className="text-[#0b0f19] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">UrbanNest Elite Protected Booking</span>
              </div>

            </div>

            {/* Flexible Terms Info */}
            <div className="bg-blue-50 border border-blue-100/50 rounded-2xl p-6 flex gap-4">
              <CalendarDays size={20} className="text-blue-700 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Flexible Terms</h4>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">This property offers 3, 6, and 12-month lease options with easy extensions.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
