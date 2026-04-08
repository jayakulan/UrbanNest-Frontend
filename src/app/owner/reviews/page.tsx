"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Star, 
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send
} from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ownerProperties, setOwnerProperties] = useState<any[]>([]);
  const [filterProperty, setFilterProperty] = useState("All Properties");
  const [filterRating, setFilterRating] = useState("All Ratings");
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [replyOpen, setReplyOpen] = useState<number | null>(null);
  const [replySubmitting, setReplySubmitting] = useState<number | null>(null);

  useEffect(() => {
    const ownerId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!ownerId) return;

    const load = async () => {
      try {
        // 1. Owner properties (for filter dropdown)
        const pRes = await fetch(`http://localhost:8080/api/properties/owner/${ownerId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (pRes.ok) {
          const props = await pRes.json();
          setOwnerProperties(props);
        }

        // 2. All reviews for this owner's properties
        const rRes = await fetch(`http://localhost:8080/api/reviews/owner/${ownerId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (rRes.ok) {
          setReviews(await rRes.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleReply = async (reviewId: number) => {
    const text = replyText[reviewId]?.trim();
    if (!text) return;
    setReplySubmitting(reviewId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/reviews/${reviewId}/reply`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reply: text })
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews(prev => prev.map(r => r.id === reviewId ? updated : r));
        setReplyOpen(null);
        setReplyText(prev => ({ ...prev, [reviewId]: "" }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReplySubmitting(null);
    }
  };

  // Filtered list
  const filteredReviews = reviews.filter(r => {
    if (filterProperty !== "All Properties" && r.propertyName !== filterProperty) return false;
    if (filterRating !== "All Ratings") {
      const stars = parseInt(filterRating);
      if (r.rating !== stars) return false;
    }
    return true;
  });

  // Stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, percentage };
  });

  const renderStars = (rating: number) => (
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
          <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">{avgRating}</div>
          <div className="flex items-center gap-1.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className={i < Math.round(parseFloat(avgRating)) ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"} />
            ))}
          </div>
          <p className="text-sm font-medium text-slate-500">Based on {totalReviews} total review{totalReviews !== 1 ? "s" : ""}</p>
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
                  <div
                    className="h-full rounded-full bg-[#0f172a] transition-all duration-500"
                    style={{ width: `${row.percentage}%` }}
                  ></div>
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
            <select
              value={filterProperty}
              onChange={e => setFilterProperty(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-4 pr-10 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer"
            >
              <option>All Properties</option>
              {ownerProperties.map(p => (
                <option key={p.id}>{p.title}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rating level</span>
          <div className="relative">
            <select
              value={filterRating}
              onChange={e => setFilterRating(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-4 pr-10 py-3 w-48 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm cursor-pointer"
            >
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Stars</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </label>

        <span className="text-sm font-semibold text-slate-400 pb-3">
          {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-12">
        {loading ? (
          <p className="text-slate-400 text-center py-12 font-medium">Loading reviews...</p>
        ) : filteredReviews.length === 0 ? (
          <p className="text-slate-400 text-center py-12 font-medium">No reviews found.</p>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
              
              {/* Review Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 shadow-sm shrink-0">
                    {(review.tenantName || "T").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{review.tenantName || `Tenant #${review.tenantId}`}</h3>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/80 rounded-md border border-blue-100/50 w-fit">
                      <Building2 size={12} className="text-blue-600" />
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                        {review.propertyName || `Property #${review.propertyId}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex justify-end mb-1.5">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-xs font-semibold text-slate-400">{review.reviewDate}</p>
                </div>
              </div>

              {/* Review Body */}
              <div className="pl-4 border-l-4 border-slate-200/60 mb-6">
                <p className="text-slate-600 text-sm italic leading-relaxed font-medium">
                  &quot;{review.content}&quot;
                </p>
              </div>

              {/* Owner's existing reply */}
              {review.ownerReply && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 flex gap-3 text-sm">
                  <div className="mt-0.5 text-slate-400">
                    <MessageSquare size={16} />
                  </div>
                  <p className="text-slate-700 font-medium">
                    <span className="font-bold text-slate-900 mr-1">You replied:</span>
                    &quot;{review.ownerReply}&quot;
                  </p>
                </div>
              )}

              {/* Reply input (toggle) */}
              {replyOpen === review.id && (
                <div className="mb-6 flex gap-3">
                  <input
                    type="text"
                    value={replyText[review.id] || ""}
                    onChange={e => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                    placeholder={`Reply to ${review.tenantName?.split(" ")[0] || "tenant"}...`}
                    className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-900 placeholder:text-slate-400"
                    onKeyDown={e => { if (e.key === "Enter") handleReply(review.id); }}
                  />
                  <button
                    onClick={() => handleReply(review.id)}
                    disabled={replySubmitting === review.id}
                    className="px-4 py-2.5 bg-[#0b0f19] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-60"
                  >
                    {replySubmitting === review.id ? "..." : <Send size={15} />}
                  </button>
                  <button
                    onClick={() => setReplyOpen(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 text-xs font-bold mt-2">
                {!review.ownerReply && (
                  <button
                    onClick={() => setReplyOpen(replyOpen === review.id ? null : review.id)}
                    className="text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {replyOpen === review.id ? "Cancel Reply" : `Reply to ${review.tenantName?.split(" ")[0] || "Tenant"}`}
                  </button>
                )}
                {review.ownerReply && (
                  <button
                    onClick={() => setReplyOpen(review.id)}
                    className="text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Edit Reply
                  </button>
                )}
                <div className="w-px h-3 bg-slate-300"></div>
                <button className="text-slate-500 hover:text-slate-900 transition-colors">
                  Flag Review
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Pagination (static structure preserved) */}
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
        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      
    </div>
  );
}
