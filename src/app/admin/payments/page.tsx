"use client";

import React, { useState, useEffect } from "react";
import { 
  Download, 
  Plus, 
  ChevronDown, 
  Calendar, 
  MoreVertical,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PAGE_SIZE = 10;

interface EnrichedBooking {
  id: number;
  propertyName: string;
  propertyPhoto: string | null;
  tenantName: string;
  ownerName: string;
  totalAmount: number | null;
  monthlyRent: number | null;
  moveInDate: string | null;
  status: string;
}

function fmt(n: number | null | undefined) {
  if (!n) return "$0.00";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(s: string | null | undefined) {
  if (!s) return ["—", ""];
  try {
    const d = new Date(s);
    return [
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      d.toLocaleDateString("en-US", { year: "numeric" })
    ];
  } catch { return [s, ""]; }
}

function statusLabel(s: string) {
  if (!s) return "Pending";
  const u = s.toUpperCase();
  if (u === "APPROVED") return "Completed";
  if (u === "COMPLETED") return "Completed";
  if (u === "PENDING")   return "Pending";
  if (u === "REJECTED")  return "Failed";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function getStatusBadge(s: string) {
  const label = statusLabel(s);
  if (label === "Completed") return "bg-green-100/80 text-green-700";
  if (label === "Pending")   return "bg-orange-100/80 text-orange-700";
  if (label === "Failed")    return "bg-red-100/80 text-red-700";
  return "bg-slate-100 text-slate-700";
}

// Bar chart heights from monthly data
function computeBars(bookings: EnrichedBooking[]) {
  const months = [...new Set(bookings.map(b => b.moveInDate?.slice(0, 7)).filter(Boolean) as string[])].sort().slice(-6);
  if (months.length === 0) return { heights: [45, 55, 40, 75, 65, 95], labels: ["MAY","JUN","JUL","AUG","SEP","OCT"] };
  const sums = months.map(m => bookings.filter(b => b.moveInDate?.startsWith(m)).reduce((acc, b) => acc + (b.totalAmount || b.monthlyRent || 0), 0));
  const max = Math.max(...sums, 1);
  const heights = sums.map(v => Math.max(10, Math.round((v / max) * 90)));
  const labels = months.map(m => new Date(m + "-01").toLocaleString("en-US", { month: "short" }).toUpperCase());
  return { heights, labels };
}

export default function AdminPaymentsPage() {
  const [allBookings, setAllBookings]   = useState<EnrichedBooking[]>([]);
  const [loading, setLoading]           = useState(true);
  const [currentPage, setCurrentPage]   = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const load = async () => {
      try {
        // 1. Fetch all bookings
        const bRes = await fetch("http://localhost:8080/api/bookings", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!bRes.ok) return;
        const bookings: any[] = await bRes.json();

        // 2. Enrich each booking with property + tenant + owner details
        const enriched: EnrichedBooking[] = await Promise.all(
          bookings.map(async (b: any) => {
            let propertyName  = `Property #${b.propertyId}`;
            let propertyPhoto: string | null = null;
            let ownerName     = "—";
            let tenantName    = `Tenant #${b.tenantId}`;

            // Property
            try {
              const pRes = await fetch(`http://localhost:8080/api/properties/${b.propertyId}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (pRes.ok) {
                const p = await pRes.json();
                propertyName  = p.title || propertyName;
                propertyPhoto = p.photos || null;

                // Owner from property.ownerId
                if (p.ownerId) {
                  const oRes = await fetch(`http://localhost:8080/api/users/${p.ownerId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                  });
                  if (oRes.ok) {
                    const o = await oRes.json();
                    ownerName = o.fullName || ownerName;
                  }
                }
              }
            } catch { /* skip */ }

            // Tenant
            try {
              const tRes = await fetch(`http://localhost:8080/api/users/${b.tenantId}`, {
                headers: { "Authorization": `Bearer ${token}` }
              });
              if (tRes.ok) {
                const t = await tRes.json();
                tenantName = t.fullName || tenantName;
              }
            } catch { /* skip */ }

            return {
              id:           b.id,
              propertyName,
              propertyPhoto,
              tenantName,
              ownerName,
              totalAmount:  b.totalAmount,
              monthlyRent:  b.monthlyRent,
              moveInDate:   b.moveInDate,
              status:       b.status || "PENDING",
            };
          })
        );

        setAllBookings(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalRevenue  = allBookings.reduce((s, b) => s + (b.totalAmount || 0), 0);
  const monthlyRev    = allBookings.reduce((s, b) => s + (b.monthlyRent || 0), 0);
  const pendingItems  = allBookings.filter(b => (b.status || "").toUpperCase() === "PENDING");
  const pendingAmt    = pendingItems.reduce((s, b) => s + (b.monthlyRent || 0), 0);
  const completedCount = allBookings.filter(b => ["APPROVED","COMPLETED"].includes((b.status || "").toUpperCase())).length;

  // ── Filter + Paginate ──────────────────────────────────────────────────────
  const filtered = allBookings.filter(b => {
    if (statusFilter === "All") return true;
    return statusLabel(b.status) === statusFilter;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // ── Chart data ────────────────────────────────────────────────────────────
  const { heights: barHeights, labels: barLabels } = computeBars(allBookings);
  const highestIdx = barHeights.indexOf(Math.max(...barHeights));

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 font-sans pb-32">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Financial Oversight</h1>
          <p className="text-sm font-medium text-slate-600">
            Real-time monitoring of UrbanNest's global transaction flows.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
          <button className="px-5 py-3 bg-[#0b0f19] text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Revenue (Dark Card) */}
        <div className="bg-[#0b132c] text-white rounded-3xl p-6 shadow-sm border border-[#1a2542] flex flex-col justify-between h-40 relative overflow-hidden group">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Revenue</p>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">
              {loading ? "—" : fmt(totalRevenue)}
            </h2>
            <div className="flex items-center gap-3">
              <span className="bg-[#0b132c] border border-green-500/30 text-green-400 px-2.5 py-1 rounded-[4px] text-[9px] font-black tracking-widest uppercase">
                LIVE
              </span>
              <span className="text-[10px] text-slate-400 font-medium">all time</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Monthly Revenue</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {loading ? "—" : fmt(monthlyRev)}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Sum of all monthly rents
            </p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pending Payments</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {loading ? "—" : fmt(pendingAmt)}
            </h2>
            <p className="text-[10px] text-orange-600 font-bold tracking-wide">
              {loading ? "—" : `${pendingItems.length} invoice${pendingItems.length !== 1 ? "s" : ""} outstanding`}
            </p>
          </div>
        </div>

        {/* Completed Transactions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Completed Transactions</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {loading ? "—" : completedCount.toLocaleString()}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Global volume</p>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Revenue Trends Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Trends</h3>
            <button className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">
              Last 6 Months
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between relative h-48 pb-6 px-4 before:content-[''] before:absolute before:inset-0 before:border-b-2 before:border-slate-50 after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:border-b-2 after:border-slate-50">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className={`relative w-[10%] rounded-t-sm group ${i === highestIdx ? "bg-[#0b0f19]" : "bg-[#f1f5f9]"}`}
                style={{ height: `${h}%` }}
              >
                <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold ${i === highestIdx ? "text-slate-900 font-black" : "text-slate-400"}`}>
                  {barLabels[i]}
                </span>
                {i === highestIdx && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0b0f19] text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-[5px] after:border-transparent after:border-t-[#0b0f19]">
                    {fmt(allBookings.filter(b => b.moveInDate?.startsWith(
                      [...new Set(allBookings.map(x => x.moveInDate?.slice(0, 7)).filter(Boolean) as string[])].sort().slice(-6)[i]
                    )).reduce((s, b) => s + (b.totalAmount || 0), 0))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div className="lg:col-span-4 bg-[#111827] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-8">Channel Performance</h3>
            
            <div className="space-y-6">
              {/* Status breakdown as channel proxy */}
              {(() => {
                const total = allBookings.length || 1;
                const pct = (count: number) => Math.round((count / total) * 100);
                const comp = allBookings.filter(b => ["APPROVED","COMPLETED"].includes((b.status||"").toUpperCase())).length;
                const pend = allBookings.filter(b => (b.status||"").toUpperCase() === "PENDING").length;
                const rej  = allBookings.filter(b => (b.status||"").toUpperCase() === "REJECTED").length;
                return [
                  { label: "Completed", count: pct(comp) },
                  { label: "Pending",   count: pct(pend) },
                  { label: "Rejected",  count: pct(rej)  },
                ];
              })().map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>{row.label}</span>
                    <span className="text-white">{row.count}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-100 rounded-full transition-all duration-700" style={{ width: `${row.count}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-slate-700/50 pt-6">
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2">Portfolio Insight</p>
            <p className="text-xs font-medium text-slate-400 italic leading-relaxed">
              {loading
                ? "Loading financial data..."
                : `${allBookings.length} total transactions processed across ${new Set(allBookings.map(b => b.propertyName)).size} properties.`
              }
            </p>
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
          
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="appearance-none px-4 py-2 pr-8 bg-slate-100 rounded-lg text-slate-700 text-[10px] font-bold hover:bg-slate-200 transition-colors cursor-pointer outline-none"
                >
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
                <ChevronDown size={14} className="text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Period:</span>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-4">
                All Time <Calendar size={14} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-widest">
          <div className="col-span-3">Property</div>
          <div className="col-span-2">Tenant</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Method</div>
          <div className="col-span-1 flex justify-between pr-2">
            <span>Status</span>
            <span>Action</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-8 py-12 text-center text-sm text-slate-400 font-medium">
              Loading transactions...
            </div>
          ) : paginated.length === 0 ? (
            <div className="px-8 py-12 text-center text-sm text-slate-400 font-medium">
              No transactions found.
            </div>
          ) : (
            paginated.map((txn) => {
              const [datePart, yearPart] = fmtDate(txn.moveInDate);
              return (
                <div key={txn.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors bg-white group">
                  
                  {/* Property */}
                  <div className="col-span-3 flex items-center gap-3 pr-2">
                    {txn.propertyPhoto ? (
                      <img src={txn.propertyPhoto} alt={txn.propertyName} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-200 border border-slate-200/50" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 shrink-0 border border-slate-200/50 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {(txn.propertyName || "P").charAt(0)}
                      </div>
                    )}
                    <h4 className="text-xs font-bold text-slate-900 truncate pr-2">{txn.propertyName}</h4>
                  </div>

                  {/* Tenant */}
                  <div className="col-span-2">
                    <span className="text-[11px] font-bold text-slate-700">{txn.tenantName}</span>
                  </div>

                  {/* Owner */}
                  <div className="col-span-2">
                    <span className="text-[11px] font-bold text-slate-500">{txn.ownerName}</span>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <span className="text-sm font-black text-slate-900">
                      {fmt(txn.totalAmount || txn.monthlyRent)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-1 flex flex-col text-[10px] font-semibold text-slate-500 leading-tight">
                    <span>{datePart}</span>
                    <span>{yearPart}</span>
                  </div>

                  {/* Method */}
                  <div className="col-span-1 flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <CreditCard size={14} className="text-slate-400" />
                    <span className="truncate">Rental</span>
                  </div>

                  {/* Status & Action */}
                  <div className="col-span-1 flex items-center justify-between">
                    <span className={`inline-block px-2.5 py-1 rounded-[4px] text-[8px] font-black uppercase tracking-widest ${getStatusBadge(txn.status)}`}>
                      {statusLabel(txn.status)}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100 pr-2">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-between items-center px-2">
        <p className="text-xs font-semibold text-slate-500">
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-5 py-2.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold transition-colors hover:bg-slate-200 flex items-center gap-2 disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 bg-[#0b0f19] text-white rounded-lg text-xs font-bold transition-colors hover:bg-slate-800 shadow-sm flex items-center gap-2 disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
