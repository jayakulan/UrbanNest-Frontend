"use client";

import React, { useState } from "react";
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
  Landmark,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

export default function EarningsPage() {
  const [revenuePeriod, setRevenuePeriod] = useState("6 Months");

  const transactions = [
    {
      id: 1,
      property: {
        name: "Azure Sky Penthouse",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"
      },
      tenant: "Sarah Jenkins",
      date: "Oct 12, 2023",
      amount: "$4,200.00",
      method: "Credit Card",
      methodIcon: <CreditCard size={14} className="text-slate-500" />,
      status: "COMPLETED",
      statusColor: "bg-green-50 text-green-700 border-green-100"
    },
    {
      id: 2,
      property: {
        name: "Marble Arch Villa",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80"
      },
      tenant: "Marcus Thorne",
      date: "Oct 10, 2023",
      amount: "$8,500.00",
      method: "Bank Transfer",
      methodIcon: <Landmark size={14} className="text-slate-500" />,
      status: "PENDING",
      statusColor: "bg-orange-50 text-orange-700 border-orange-100"
    },
    {
      id: 3,
      property: {
        name: "Oak Ridge Manor",
        image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=100&q=80"
      },
      tenant: "Elena Rodriguez",
      date: "Oct 05, 2023",
      amount: "$3,100.00",
      method: "Credit Card",
      methodIcon: <CreditCard size={14} className="text-slate-500" />,
      status: "OVERDUE",
      statusColor: "bg-red-50 text-red-700 border-red-100"
    },
    {
      id: 4,
      property: {
        name: "Riverfront Estates",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=100&q=80"
      },
      tenant: "David Chen",
      date: "Sep 28, 2023",
      amount: "$6,200.00",
      method: "Digital Wallet",
      methodIcon: <Smartphone size={14} className="text-slate-500" />,
      status: "COMPLETED",
      statusColor: "bg-green-50 text-green-700 border-green-100"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-8 font-sans pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Earnings & Payments</h1>
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
        {/* Stat 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Wallet size={20} />
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wider rounded-md">
              +12.5%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">$124,500.00</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <BarChart3 size={20} />
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-wider rounded-md">
              +8.2%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">$12,400.00</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Payments</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">$3,800.00</h3>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Completed Transactions</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">156</h3>
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
            {/* Extremely simple pure css visual chart mockup for the visual empty state */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
              {[30, 45, 40, 75, 60, 95].map((h, i) => (
                <div key={i} className="w-[10%] bg-gradient-to-t from-blue-100/50 to-blue-50 relative rounded-t-sm" style={{height: `${h}%`}}></div>
              ))}
            </div>
            
            {/* X-axis tags */}
            <div className="flex justify-between px-8 border-t border-slate-100 pt-4 relative z-10 w-full mt-auto">
              {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map(m => (
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
              You've reached 83% of your Q4 target. List one more property to exceed your goals.
            </p>
          </div>

          <div className="mt-12 relative z-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-bold text-white">Q4 Target</span>
              <span className="text-xl font-bold text-white">$150,000</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner mb-8">
              <div className="h-full bg-white w-[83%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-md">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 text-blue-300">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Top Performer</p>
                <p className="text-sm font-bold text-white">Azure Sky Penthouse</p>
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
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={tx.property.image} alt={tx.property.name} className="w-10 h-10 rounded-lg object-cover shadow-sm border border-slate-100" />
                      <span className="font-bold text-sm text-slate-900">{tx.property.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    <div className="w-24 whitespace-normal break-words leading-tight">{tx.tenant}</div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    <div className="w-20 whitespace-normal break-words leading-tight">{tx.date}</div>
                  </td>
                  <td className="px-6 py-5 font-bold text-sm text-slate-900">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex item-center gap-2">
                      <div className="mt-0.5">{tx.methodIcon}</div>
                      <span className="text-sm font-medium text-slate-600 w-24 whitespace-normal leading-tight">{tx.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:shadow-sm hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500">Showing 1 to 10 of 156 transactions</p>
          
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#0b0f19] bg-[#0b0f19] text-white font-bold text-xs shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
