"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquareQuote, 
  ChevronDown, 
  Star,
  Send,
  Trash2
} from "lucide-react";

export default function TenantReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [bookedProperties, setBookedProperties] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Form state
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    const tenantId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!tenantId) return;

    // 1. Load existing reviews for this tenant
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/reviews/tenant/${tenantId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setReviews(await res.json());
      } catch (err) { console.error(err); }
    };

    // 2. Load booked properties so dropdown only shows real bookings
    const fetchBookedProperties = async () => {
      try {
        const bRes = await fetch(`http://localhost:8080/api/bookings/tenant/${tenantId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!bRes.ok) return;
        const bookings: any[] = await bRes.json();

        const enriched = await Promise.all(
          bookings.map(async (b: any) => {
            try {
              const pRes = await fetch(`http://localhost:8080/api/properties/${b.propertyId}`);
              const prop = pRes.ok ? await pRes.json() : null;
              return prop ? { id: prop.id, title: prop.title } : null;
            } catch { return null; }
          })
        );
        // Unique properties only
        const unique = enriched.filter(Boolean).filter(
          (p, idx, self) => idx === self.findIndex(x => x?.id === p?.id)
        );
        setBookedProperties(unique);
      } catch (err) { console.error(err); }
    };

    fetchReviews();
    fetchBookedProperties();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPropertyId || rating === 0 || !content.trim()) {
      alert("Please select a property, set a rating, and write your review.");
      return;
    }
    setSubmitting(true);
    try {
      const tenantId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const payload = {
        tenantId: parseInt(tenantId || "0"),
        propertyId: parseInt(selectedPropertyId),
        rating,
        content
      };
      const res = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setReviews(prev => [saved, ...prev]);
        // Reset form
        setSelectedPropertyId("");
        setRating(0);
        setContent("");
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (!confirm("Delete this review?")) return;
    setDeleting(reviewId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== reviewId));
      } else {
        alert("Failed to delete review.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

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

            <div className="space-y-6">
              
              {/* Property Select */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Property to Review</label>
                <div className="relative">
                  <select
                    value={selectedPropertyId}
                    onChange={e => setSelectedPropertyId(e.target.value)}
                    className="w-full pl-4 pr-10 py-3.5 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a recent stay</option>
                    {bookedProperties.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Rating — interactive stars */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-3">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        size={24}
                        className={
                          star <= (hoverRating || rating)
                            ? "fill-[#0b0f19] text-[#0b0f19]"
                            : "fill-slate-200 text-slate-200"
                        }
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-xs font-bold text-slate-500 ml-2">{rating}/5</span>
                  )}
                </div>
              </div>

              {/* Detailed Feedback */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">Detailed Feedback</label>
                <textarea 
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Tell us about your stay, the architecture, and the amenities..." 
                  className="w-full p-4 bg-slate-100/80 border-transparent rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors text-slate-900 placeholder:text-slate-400 resize-none h-32 leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-4 bg-[#0b0f19] text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : <>SUBMIT REVIEW <Send size={16} className="-mr-1" /></>}
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Your History */}
        <div className="flex-1 space-y-6">
          
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Your History</h2>
            <span className="bg-blue-100/50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              Total {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-slate-400 font-medium text-center py-12">No reviews yet. Submit your first review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                  
                  {/* Review Image */}
                  <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={review.propertyPhoto || "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=300&q=80"} 
                      alt={review.propertyName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-2 pr-4 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{review.propertyName || `Property #${review.propertyId}`}</h3>
                      <span className="text-xs font-semibold text-slate-500">{review.reviewDate}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#0b0f19] text-[#0b0f19]" />
                      ))}
                    </div>

                    <p className="text-xs font-semibold text-slate-600 italic leading-relaxed mb-4">
                      &quot;{review.content}&quot;
                    </p>

                    {/* Owner reply */}
                    {review.ownerReply && (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 text-xs text-slate-600 font-medium italic">
                        <span className="font-bold text-slate-900 not-italic">Owner replied: </span>
                        &quot;{review.ownerReply}&quot;
                      </div>
                    )}

                    <div className="mt-auto flex justify-end gap-6 pt-2">
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={deleting === review.id}
                        className="flex items-center gap-1 text-[10px] font-bold text-red-600 uppercase tracking-wider hover:text-red-700 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={12} />
                        {deleting === review.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More placeholder */}
          <button className="w-full py-4 mt-2 bg-transparent border-2 border-dashed border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-colors">
            Load Previous Feedback
          </button>

        </div>

      </div>

    </div>
  );
}
