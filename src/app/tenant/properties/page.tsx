"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  ChevronDown,
  RotateCcw,
  Heart,
  Star,
  Bot,
  X,
  Send,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const AMENITY_OPTIONS = [
  { label: "High-speed WiFi", key: "wifi" },
  { label: "Private Pool",    key: "pool" },
  { label: "Fitness Center",  key: "gym"  },
  { label: "Smart Home Tech", key: "smart" },
];

// ── AI Chat Popup Component ─────────────────────────────────────────────────
interface AiMsg {
  role: "user" | "ai";
  content: string;
}

function AiChatPopup({ onClose, token }: { onClose: () => void; token: string }) {
  const [messages, setMessages] = useState<AiMsg[]>([
    { role: "ai", content: "Hi! 👋 I'm UrbanNest AI. Ask me anything about available properties — location, price, bedrooms, amenities, and more!" }
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const endRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", content: data.reply || "Sorry, I couldn't get a response." }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "AI is temporarily unavailable. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "Find 2-bedroom house under $30,000",
    "Available apartments in Colombo?",
    "Which properties have a pool?",
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[360px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
         style={{ maxHeight: "520px" }}>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b0f19] to-slate-700 px-5 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">UrbanNest AI</p>
            <p className="text-white/60 text-[10px] font-medium mt-0.5">Smart Property Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50" style={{ minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-[#0b0f19] text-white rounded-tr-sm"
                : "bg-white text-slate-800 rounded-tl-sm border border-slate-100 shadow-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Example prompts — show only at start */}
        {messages.length === 1 && !loading && (
          <div className="space-y-2 pt-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Try asking:</p>
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setInput(ex); }}
                className="w-full text-left text-xs font-semibold text-slate-600 bg-white hover:bg-violet-50 hover:text-violet-700 border border-slate-100 rounded-xl px-3 py-2 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask about properties..."
            className="flex-1 bg-transparent outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-8 h-8 bg-[#0b0f19] text-white rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors disabled:opacity-40 shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-400 font-medium mt-2">Powered by OpenAI • UrbanNest</p>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
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

  // ── AI popup ──
  const [aiOpen, setAiOpen]   = useState(false);
  const [token, setToken]     = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

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

      {/* ── Floating AI Chat Button ── */}
      <button
        onClick={() => setAiOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bold text-sm transition-all duration-300 ${
          aiOpen
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-gradient-to-r from-[#0b0f19] to-slate-700 hover:scale-105"
        }`}
      >
        {aiOpen ? (
          <>
            <X size={18} />
            Close AI
          </>
        ) : (
          <>
            <Sparkles size={18} className="text-yellow-300" />
            Ask AI
          </>
        )}
      </button>

      {/* ── AI Chat Popup ── */}
      {aiOpen && <AiChatPopup onClose={() => setAiOpen(false)} token={token} />}
    </div>
  );
}
