"use client";

import React, { useState } from "react";
import { 
  MessageSquareQuote, 
  ChevronDown, 
  Star,
  Send
} from "lucide-react";

export default function TenantReviewsPage() {
  const pastReviews = [
    {
      id: 1,
      propertyName: "The Obsidian Suite",
      date: "Oct 12, 2023",
      rating: 5,
      content: "An absolutely breathtaking property with world-class amenities. The brutalist architecture combined with warm interior textures creates a unique living experience. Highly recommend the sunset view from the balcony.",
      image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=300&q=80"
    },
    {
      id: 2,
      propertyName: "Minimalist Loft Haven",
      date: "Aug 24, 2023",
      rating: 5,
      content: "The kitchen design is a dream for any home chef. Smooth check-in process and the concierge was extremely helpful. Only minor issue was the morning light in the guest room.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&q=80"
    },
    {
      id: 3,
      propertyName: "The Ivory Retreat",
      date: "June 05, 2023",
      rating: 5,
      content: "Serenity redefined. The use of natural light in the morning is masterfully done. It felt like living inside a modern art gallery. Can't wait to return.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8 font-sans pb-32">
      
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Reviews & Feedback</h1>
        <p className="text-slate-600 font-medium">Share your experiences and manage your architectural journey history.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Submit a Review Widget */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            
            <div className="flex items-center gap-3 mb-8">
              <MessageSquareQuote size={20} className="text-[#0b0f19] fill-[#0b0f19]" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Submit a Review</h2>
            </div>

            <form className="space-y-6">
              
              {/* Property Select */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Property to Review</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-3.5 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 appearance-none cursor-pointer">
                    <option value="" disabled selected>Select a recent stay</option>
                    <option value="1">The Obsidian Suite</option>
                    <option value="2">Minimalist Loft Haven</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-3">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="text-[#0b0f19] hover:scale-110 transition-transform">
                      <Star size={24} className="fill-[#0b0f19]" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Detailed Feedback</label>
                <textarea 
                  placeholder="Tell us about your stay, the architecture, and the amenities..." 
                  className="w-full p-4 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 placeholder:text-slate-400 resize-none h-32 leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="w-full py-4 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                SUBMIT REVIEW <Send size={16} className="-mr-1" />
              </button>

            </form>

          </div>
        </div>

        {/* Right Column: Your History */}
        <div className="flex-1 space-y-6">
          
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Your History</h2>
            <span className="bg-blue-100/50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              Total 12 Reviews
            </span>
          </div>

          <div className="space-y-6">
            {pastReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                
                {/* Review Image */}
                <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                  <img src={review.image} alt={review.propertyName} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 py-2 pr-4 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{review.propertyName}</h3>
                    <span className="text-xs font-semibold text-slate-500">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#0b0f19] text-[#0b0f19]" />
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-slate-600 italic leading-relaxed mb-6">
                    "{review.content}"
                  </p>

                  <div className="mt-auto flex justify-end gap-6 pt-2">
                    <button className="text-[10px] font-bold text-slate-900 uppercase tracking-wider hover:text-slate-600 transition-colors">
                      Edit
                    </button>
                    <button className="text-[10px] font-bold text-red-600 uppercase tracking-wider hover:text-red-700 transition-colors">
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <button className="w-full py-4 mt-2 bg-transparent border-2 border-dashed border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-colors">
            Load Previous Feedback
          </button>

        </div>

      </div>

    </div>
  );
}
