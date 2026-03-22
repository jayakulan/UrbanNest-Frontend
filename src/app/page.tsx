"use client";

import React from "react";
import Link from "next/link";
import { 
  Search, MapPin, ChevronDown, CheckCircle, Wifi, 
  Calendar, ShieldCheck, Map, Bed, Bath, Expand
} from "lucide-react";

export default function LandingPage() {
  const featuredProperties = [
    {
      id: 1,
      title: "Azure Skyline Suite",
      location: "Downtown District, NY",
      price: "$2,400",
      badge: "FEATURED",
      badgeColor: "bg-black text-white",
      beds: 3,
      baths: 2,
      sqft: "1,200 sqft",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "The Glass Pavilion",
      location: "Beverly Hills, CA",
      price: "$4,850",
      badge: "POPULAR",
      badgeColor: "bg-blue-600 text-white",
      beds: 4,
      baths: 4,
      sqft: "3,500 sqft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Urban Loft 402",
      location: "East Village, NY",
      price: "$1,950",
      badge: "NEW",
      badgeColor: "bg-black text-white",
      beds: 2,
      baths: 1,
      sqft: "850 sqft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-48 md:pt-36 md:pb-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient masking at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F8F9FA] to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight drop-shadow-lg">
            Find Your Perfect Home with UrbanNest
          </h1>
          <p className="mt-4 text-base md:text-lg text-white max-w-2xl mx-auto mb-12 font-medium drop-shadow-md">
            Browse rental properties, connect with owners, and book visits easily.
          </p>

          {/* Search Component */}
          <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md p-2 rounded-lg">
            <div className="bg-white rounded flex flex-col md:flex-row gap-2 items-center p-2 shadow-sm">
              
              <div className="flex-1 w-full flex items-center px-4 py-2 border-r border-gray-100">
                <MapPin size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium placeholder-gray-500"
                />
              </div>

              <div className="flex-1 w-full flex items-center justify-between px-4 py-2 border-r border-gray-100 cursor-pointer">
                <div className="flex items-center text-gray-600 font-medium text-sm">
                  <span className="w-4 h-4 mr-2 border border-gray-400 rounded-sm flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  </span>
                  Property Type
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>

              <div className="flex-1 w-full flex items-center justify-between px-4 py-2 cursor-pointer">
                <div className="flex items-center text-gray-600 font-medium text-sm">
                  <span className="w-4 h-4 mr-2 border border-gray-400 rounded-sm flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </span>
                  Price Range
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              
              <button className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-3 rounded text-sm flex items-center justify-center gap-2 transition-colors w-full md:w-auto mt-2 md:mt-0">
                <Search size={16} strokeWidth={2.5} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 -mt-24 relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight inline-block relative border-b-2 border-black pb-1">
                Featured Properties
              </h2>
            </div>
            <Link href="/properties" className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1">
              View all listings <span className="text-lg leading-none">+</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className={`absolute top-4 left-4 ${prop.badgeColor} px-3 py-1 rounded text-xs font-bold tracking-wider`}>
                    {prop.badge}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{prop.title}</h3>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{prop.price}</span>
                      <span className="text-xs text-gray-500 font-medium">/mo</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-6">
                    <MapPin size={12} className="mr-1" />
                    <span className="text-xs font-medium">{prop.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-500 text-xs font-medium bg-[#F8F9FA] rounded-md py-3 px-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Bed size={14} className="text-gray-400" />
                      <span>{prop.beds} Beds</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={14} className="text-gray-400" />
                      <span>{prop.baths} Baths</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                      <Expand size={14} className="text-gray-400" />
                      <span>{prop.sqft}</span>
                    </div>
                  </div>

                  <button className="w-full mt-auto bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-800 font-semibold py-3 rounded transition-colors text-sm border border-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              We provide the most streamlined and secure rental experience in the city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CheckCircle className="text-blue-600" size={24} />,
                title: "Verified Listings",
                desc: "Every property undergoes a rigorous 10-point verification process."
              },
              {
                icon: <Wifi className="text-blue-600" size={24} />,
                title: "Trusted Owners",
                desc: "Connect with vetted landlords and professional property managers."
              },
              {
                icon: <Calendar className="text-blue-600" size={24} />,
                title: "Easy Booking",
                desc: "Schedule visits and sign leases digitally in just a few clicks."
              },
              {
                icon: <ShieldCheck className="text-blue-600" size={24} />,
                title: "Secure Platform",
                desc: "Encryption and secure payment gateways for your peace of mind."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore properties on the map */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg relative h-[450px]">
            {/* Left Content */}
            <div className="w-full md:w-1/3 bg-[#0a192f] p-10 flex flex-col justify-center h-full z-10">
              <h2 className="text-2xl font-bold text-white mb-4 pr-10 leading-snug">
                Explore properties on the map
              </h2>
              <p className="text-[#8892b0] text-sm mb-8 leading-relaxed font-medium pr-6">
                See exact locations, weigh the local amenities, and find the transit options in real-time.
              </p>
              <button className="bg-[#4d6b9f] hover:bg-[#5b7eb5] text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 w-max transition-colors">
                <Map size={16} />
                View on Map
              </button>
            </div>
            
            {/* Right Map Image (Simplified via standard asset for recreation) */}
            <div className="w-full md:w-2/3 h-full relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Map Background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#fbf8f1]/30 mix-blend-multiply"></div>
              
              {/* Map Markers Overlay */}
              <div className="absolute top-[30%] left-[40%] flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white z-10">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded shadow-md -mt-2 z-20">$3,400</div>
              </div>
              
              <div className="absolute top-[60%] left-[70%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white z-10">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded shadow-md -mt-2 z-20">$1,950</div>
              </div>
              
              <div className="absolute top-[40%] left-[80%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white z-10">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded shadow-md -mt-2 z-20">$4,850</div>
              </div>
              
              <div className="absolute top-[80%] left-[25%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white z-10">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>

              <div className="absolute top-[10%] left-[55%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg border-2 border-white z-10">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 text-center bg-white rounded-3xl p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Start Your Home Journey Today</h2>
          <p className="text-sm text-gray-500 mb-10 font-medium max-w-xl mx-auto leading-relaxed">
            Join thousands of happy renters who found their urban sanctuary through UrbanNest.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-black text-white rounded font-semibold text-sm hover:bg-gray-800 transition-colors">
              Create an Account
            </Link>
            <Link href="/owners" className="px-8 py-3 bg-white text-black border border-gray-300 rounded font-semibold text-sm hover:bg-gray-50 transition-colors">
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
