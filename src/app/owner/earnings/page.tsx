"use client";

import React, { useState, useEffect } from "react";
import { 
  Download, 
  Plus, 
  Wallet, 
  BarChart3, 
  Clock, 
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Calendar,
  Filter,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

const PAGE_SIZE = 10;

interface Transaction {
  bookingId: number;
  propertyId: number;
  propertyName: string;
  propertyPhoto: string | null;
  tenantName: string;
  moveInDate: string;
  monthlyRent: number;
  totalAmount: number;
  status: string;
}

function formatCurrency(n: number | null | undefined) {
  if (!n) return "$0.00";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(s: string | null | undefined) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return s; }
}

function statusStyle(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED" || s === "COMPLETED") return "bg-green-50 text-green-700 border-green-100";
  if (s === "PENDING")  return "bg-orange-50 text-orange-700 border-orange-100";
  if (s === "REJECTED") return "bg-red-50 text-red-700 border-red-100";
  return "bg-slate-50 text-slate-600 border-slate-100";
}

function statusLabel(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED") return "COMPLETED";
  return s || "PENDING";
}

export default function EarningsPage() {
  const [revenuePeriod, setRevenuePeriod] = useState("6 Months");
  const [transactions, setTransactions]   = useState<Transaction[]>([]);
  const [loading, setLoading]             = useState(true);
  const [currentPage, setCurrentPage]     = useState(1);
  const [ownerId, setOwnerId]             = useState<number>(0);
  const [token, setToken]                 = useState<string>("");

  // Read localStorage client-side only
  useEffect(() => {
    setOwnerId(parseInt(localStorage.getItem("userId") || "0"));
    setToken(localStorage.getItem("token") || "");
  }, []);

  // Fetch earnings once ownerId is ready
  useEffect(() => {
    if (!ownerId || !token) return;
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/bookings/owner/${ownerId}/earnings`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setTransactions(await res.json());
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, [ownerId, token]);

  // ── Computed stats ────────────────────────────────────────────────────────
  const totalEarnings       = transactions.reduce((s, t) => s + (t.totalAmount || 0), 0);
  const completedTx         = transactions.filter(t => ["APPROVED","COMPLETED"].includes((t.status||"").toUpperCase()));
  const pendingTx           = transactions.filter(t => (t.status||"").toUpperCase() === "PENDING");
  const pendingAmount        = pendingTx.reduce((s, t) => s + (t.monthlyRent || 0), 0);
  const monthlyRevenue      = transactions.reduce((s, t) => s + (t.monthlyRent || 0), 0);

  // Top performing property
  const propRevMap: Record<string, number> = {};
  transactions.forEach(t => {
    propRevMap[t.propertyName] = (propRevMap[t.propertyName] || 0) + (t.totalAmount || 0);
  });
  const topProperty = Object.entries(propRevMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  // Chart bars — group monthly rent by property for bar heights
  const barHeights = (() => {
    const months = [...new Set(transactions.map(t => t.moveInDate?.slice(0, 7)).filter(Boolean))].slice(-6);
    if (months.length === 0) return [20, 35, 30, 50, 45, 60];
    const max = Math.max(...months.map(m =>
      transactions.filter(t => t.moveInDate?.startsWith(m)).reduce((s, t) => s + (t.monthlyRent || 0), 0)
    ));
    return months.map(m => {
      const val = transactions.filter(t => t.moveInDate?.startsWith(m)).reduce((s, t) => s + (t.monthlyRent || 0), 0);
      return max > 0 ? Math.max(10, Math.round((val / max) * 90)) : 20;
    });
  })();

  // Chart X-axis month labels
  const chartMonths = (() => {
    const months = [...new Set(transactions.map(t => t.moveInDate?.slice(0, 7)).filter(Boolean))].slice(-6);
    if (months.length === 0) return ['JAN','FEB','MAR','APR','MAY','JUN'];
    return months.map(m => {
      const d = new Date(m + "-01");
      return d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    });
  })();

  // Goal progress (total earned vs target of 2× total)
  const target    = Math.max(totalEarnings * 1.2, 1);
  const goalPct   = Math.min(100, Math.round((totalEarnings / target) * 100));

  // Pagination
  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const paginated  = transactions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="max-w-[1400px] mx-auto p-8 font-sans pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Earnings &amp; Payments</h1>
          <p className="text-slate-500 font-medium">
            Track your luxury portfolio performance and financial health.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors">
            <Download size={18} />
            Export Statement
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0b0f19] text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md">
            <Plus size={18} />
            Request Payout
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Wallet size={20} />
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wider rounded-md">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? "—" : formatCurrency(totalEarnings)}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <BarChart3 size={20} />
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wider rounded-md">
              LIVE
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? "—" : formatCurrency(monthlyRevenue)}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Payments</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? "—" : formatCurrency(pendingAmount)}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Completed Transactions</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? "—" : completedTx.length}
            </h3>
          </div>
        </div>

      </div>

      {/* Middle Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-bold text-slate-900">Revenue Growth</h2>
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button 
                onClick={() => setRevenuePeriod("6 Months")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${revenuePeriod === "6 Months" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              >
                6 Months
              </button>
              <button 
                onClick={() => setRevenuePeriod("1 Year")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${revenuePeriod === "1 Year" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              >
                1 Year
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end min-h-[250px] relative mt-4">
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
              {barHeights.map((h, i) => (
                <div key={i} className="w-[10%] bg-gradient-to-t from-blue-100/50 to-blue-50 relative rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between px-8 border-t border-slate-100 pt-4 relative z-10 w-full mt-auto">
              {chartMonths.map(m => (
                <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings Goal */}
        <div className="lg:col-span-1 bg-[#0b0f19] rounded-3xl p-8 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-3">Earnings Goal</h2>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-[260px]">
              {loading
                ? "Loading your earnings data..."
                : `You've reached ${goalPct}% of your target. ${goalPct < 100 ? "Keep growing your portfolio!" : "Target achieved! 🎉"}`
              }
            </p>
          </div>

          <div className="mt-12 relative z-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-bold text-white">Target</span>
              <span className="text-xl font-bold text-white">{formatCurrency(target)}</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner mb-8">
              <div
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700"
                style={{ width: `${goalPct}%` }}
              ></div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 text-blue-300">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Top Performer</p>
                <p className="text-sm font-bold text-white truncate max-w-[140px]">{loading ? "—" : topProperty}</p>
              </div>
            </div>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 -m-16 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Table Header & Controls */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
              All Properties <ChevronDown size={16} className="text-slate-400" />
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
              Last 30 Days <Calendar size={16} className="text-slate-400" />
            </button>
            <button className="p-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center text-sm font-medium text-slate-400">
                    Loading transactions...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center text-sm font-medium text-slate-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => (
                  <tr key={tx.bookingId} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {tx.propertyPhoto ? (
                          <img
                            src={tx.propertyPhoto}
                            alt={tx.propertyName}
                            className="w-10 h-10 rounded-lg object-cover shadow-sm border border-slate-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                            {(tx.propertyName || "P").charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-sm text-slate-900">{tx.propertyName || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                      <div className="w-24 whitespace-normal break-words leading-tight">
                        {tx.tenantName || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                      <div className="w-20 whitespace-normal break-words leading-tight">
                        {formatDate(tx.moveInDate)}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-sm text-slate-900">
                      {formatCurrency(tx.totalAmount || tx.monthlyRent)}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-slate-500 mt-0.5" />
                        <span className="text-sm font-medium text-slate-600 w-24 whitespace-normal leading-tight">
                          Rental Payment
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${statusStyle(tx.status)}`}>
                        {statusLabel(tx.status)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:shadow-sm hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500">
            Showing {transactions.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, transactions.length)} of {transactions.length} transactions
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border font-bold text-xs transition-colors ${
                  currentPage === p
                    ? "border-[#0b0f19] bg-[#0b0f19] text-white shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
