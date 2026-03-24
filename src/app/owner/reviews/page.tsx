"use client";

import React from "react";
import { 
  Building2, 
  Star, 
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      property: "Azure Sky Penthouse",
      date: "October 12, 2023",
      rating: 5,
      content: "An absolutely stunning property with breathtaking views. The host was very responsive and professional. Every detail in the Azure Sky Penthouse was thoughtfully curated. We'll definitely be returning for our next corporate retreat.",
      reply: null
    },
    {
      id: 2,
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      property: "The Gilded Villa",
      date: "September 28, 2023",
      rating: 4,
      content: "The architecture of the Gilded Villa is unparalleled. We were impressed by the seamless integration of smart home features. Minor delay with the concierge check-in, but the property quality more than made up for it. Exceptionally clean.",
      reply: null
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
      property: "Harbor Light Suite",
      date: "August 15, 2023",
      rating: 5,
      content: "Exceeded all expectations. The morning light in the Harbor Suite is a photographer's dream. Julian and his team provide a level of service that rivals 5-star hotels. Highly recommend for anyone looking for true luxury.",
      reply: "Thank you Elena, we loved having you!"
    }
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 82, fillClass: "bg-[#0f172a] w-[82%]" },
    { stars: 4, percentage: 12, fillClass: "bg-[#0f172a] w-[12%]" },
    { stars: 3, percentage: 4, fillClass: "bg-slate-300 w-[4%]" },
    { stars: 2, percentage: 1, fillClass: "bg-slate-300 w-[1%]" },
    { stars: 1, percentage: 1, fillClass: "bg-slate-300 w-[1%]" }
  ];

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-100 text-slate-200"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto p-8 font-sans pb-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Reviews</h1>
        <p className="text-slate-500 font-medium">
          Insights into your property performance and tenant satisfaction.
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Overall Score */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Score</p>
          <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">4.8</div>
          <div className="flex items-center gap-1.5 mb-4">
            <Star size={24} className="fill-yellow-400 text-yellow-400" />
            <Star size={24} className="fill-yellow-400 text-yellow-400" />
            <Star size={24} className="fill-yellow-400 text-yellow-400" />
            <Star size={24} className="fill-yellow-400 text-yellow-400" />
            <Star size={24} className="fill-yellow-400 text-yellow-400" />
            {/* Keeping it simple with 5 full stars, a half star would need custom SVG or masked star */}
          </div>
          <p className="text-sm font-medium text-slate-500">Based on 156 total reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Rating Distribution</h2>
          <div className="space-y-4">
            {ratingDistribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-4">
                <div className="w-12 text-sm font-bold text-slate-600 shrink-0">
                  {row.stars} Star
                </div>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.fillClass}`}></div>
                </div>
                <div className="w-10 text-right text-sm font-bold text-slate-900 shrink-0">
                  {row.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-end gap-6 mb-8">
        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Filter by property</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-4 pr-10 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer">
              <option>All Properties</option>
              <option>Azure Sky Penthouse</option>
              <option>The Gilded Villa</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rating level</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-4 pr-10 py-3 w-48 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </label>

        <button className="bg-[#0f172a] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm">
          Apply Filters
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-12">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
            
            {/* Review Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{review.name}</h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/80 rounded-md border border-blue-100/50 w-fit">
                    <Building2 size={12} className="text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">{review.property}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex justify-end mb-1.5">
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs font-semibold text-slate-400">{review.date}</p>
              </div>
            </div>

            {/* Review Body */}
            <div className="pl-4 border-l-4 border-slate-200/60 mb-6">
              <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                "{review.content}"
              </p>
            </div>

            {/* Owner Reply Block */}
            {review.reply && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 flex gap-3 text-sm">
                <div className="mt-0.5 text-slate-400">
                  <MessageSquare size={16} />
                </div>
                <p className="text-slate-700 font-medium">
                  <span className="font-bold text-slate-900 mr-1">You replied:</span>
                  "{review.reply}"
                </p>
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center gap-4 text-xs font-bold mt-2">
              <button className="text-slate-900 hover:text-blue-600 transition-colors">
                Reply to {review.name.split(" ")[0]}
              </button>
              <div className="w-px h-3 bg-slate-300"></div>
              <button className="text-slate-500 hover:text-slate-900 transition-colors">
                Flag Review
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pb-8">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0f172a] border border-[#0f172a] text-white font-bold text-sm shadow-sm">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
          3
        </button>
        <div className="w-6 flex items-center justify-center text-slate-400 font-bold tracking-widest leading-none">
          ...
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
          12
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      
    </div>
  );
}
