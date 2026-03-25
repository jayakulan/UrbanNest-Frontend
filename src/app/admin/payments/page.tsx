"use client";

import React from "react";
import { 
  Download, 
  Plus, 
  ChevronDown, 
  Calendar, 
  MoreVertical,
  Landmark,
  CreditCard,
  Banknote
} from "lucide-react";

export default function AdminPaymentsPage() {

  const transactions = [
    {
      id: 1,
      property: { name: "The Zenith Penthouse", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80" },
      tenant: "Jameson Blake",
      owner: "Vanguard Holdings",
      amount: "$12,400.00",
      date: "Oct 24, 2023",
      method: "Bank Transfer",
      methodIcon: Landmark,
      status: "Completed"
    },
    {
      id: 2,
      property: { name: "Azure Bay Residence", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&q=80" },
      tenant: "Sophia Chen",
      owner: "Azure Ltd.",
      amount: "$8,250.00",
      date: "Oct 22, 2023",
      method: "Mastercard",
      methodIcon: CreditCard,
      status: "Pending"
    },
    {
      id: 3,
      property: { name: "Eco-Loft Industrial", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&q=80" },
      tenant: "Marcus Thorne",
      owner: "Green Assets",
      amount: "$4,100.00",
      date: "Oct 21, 2023",
      method: "Visa",
      methodIcon: CreditCard,
      status: "Completed"
    },
    {
      id: 4,
      property: { name: "Harbor View Suite", image: "https://images.unsplash.com/photo-1600607687931-cece5ce21408?w=100&q=80" },
      tenant: "Elena Rodriguez",
      owner: "Harbor Point LLC",
      amount: "$5,600.00",
      date: "Oct 20, 2023",
      method: "Cash/Cheque",
      methodIcon: Banknote,
      status: "Failed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100/80 text-green-700";
      case "Pending":
        return "bg-orange-100/80 text-orange-700";
      case "Failed":
        return "bg-red-100/80 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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

      {/* Top Value Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Revenue (Dark Card) */}
        <div className="bg-[#0b132c] text-white rounded-3xl p-6 shadow-sm border border-[#1a2542] flex flex-col justify-between h-40 relative overflow-hidden group">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Revenue</p>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">$4,850,000</h2>
            <div className="flex items-center gap-3">
              <span className="bg-[#0b132c] border border-green-500/30 text-green-400 px-2.5 py-1 rounded-[4px] text-[9px] font-black tracking-widest uppercase">
                ↗ +12%
              </span>
              <span className="text-[10px] text-slate-400 font-medium">vs last month</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Monthly Revenue</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">$425,000</h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Current cycle: Oct 2023</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pending Payments</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">$12,500</h2>
            <p className="text-[10px] text-orange-600 font-bold tracking-wide">8 invoices outstanding</p>
          </div>
        </div>

        {/* Completed Transactions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Completed Transactions</p>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">1,248</h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Global volume</p>
          </div>
        </div>

      </div>

      {/* Charts / Data Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Revenue Trends Bar Chart Simulation */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Trends</h3>
            <button className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">
              Last 6 Months
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between relative h-48 pb-6 px-4 before:content-[''] before:absolute before:inset-0 before:border-b-2 before:border-slate-50 after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:border-b-2 after:border-slate-50">
            {/* Chart Bars */}
            <div className="relative w-[10%] h-[45%] bg-[#f1f5f9] rounded-t-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">MAY</span>
            </div>
            <div className="relative w-[10%] h-[55%] bg-[#f1f5f9] rounded-t-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">JUN</span>
            </div>
            <div className="relative w-[10%] h-[40%] bg-[#f1f5f9] rounded-t-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">JUL</span>
            </div>
            <div className="relative w-[10%] h-[75%] bg-[#f1f5f9] rounded-t-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">AUG</span>
            </div>
            <div className="relative w-[10%] h-[65%] bg-[#f1f5f9] rounded-t-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">SEP</span>
            </div>
            <div className="relative w-[10%] h-[95%] bg-[#0b0f19] rounded-t-sm shadow-sm group">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-900">OCT</span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0b0f19] text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-[5px] after:border-transparent after:border-t-[#0b0f19]">
                $425k
              </div>
            </div>
          </div>
        </div>

        {/* Right: Channel Performance Progress Bars */}
        <div className="lg:col-span-4 bg-[#111827] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-8">Channel Performance</h3>
            
            <div className="space-y-6">
              {/* Bank Transfer */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Bank Transfer</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-100 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              {/* Visa/Mastercard */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Visa/Mastercard</span>
                  <span className="text-white">28%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-100 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>

              {/* Digital Wallets */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Digital Wallets</span>
                  <span className="text-white">7%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-100 rounded-full" style={{ width: "7%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-700/50 pt-6">
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2">Portfolio Insight</p>
            <p className="text-xs font-medium text-slate-400 italic leading-relaxed">
              "High-value bank transfers increased by 14% this quarter, indicating a shift towards long-term corporate leases."
            </p>
          </div>
        </div>

      </div>

      {/* Recent Transactions Table Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
          
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-2">
                All Statuses <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Period:</span>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-4">
                Oct 1, 2023 - Oct 31, 2023 <Calendar size={14} className="text-slate-400" />
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
          {transactions.map((txn) => {
            const Icon = txn.methodIcon;
            return (
              <div key={txn.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/50 transition-colors bg-white group">
                
                {/* Property */}
                <div className="col-span-3 flex items-center gap-3 pr-2">
                  <img src={txn.property.image} alt={txn.property.name} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-200 border border-slate-200/50" />
                  <h4 className="text-xs font-bold text-slate-900 truncate pr-2">{txn.property.name}</h4>
                </div>

                {/* Tenant */}
                <div className="col-span-2">
                  <span className="text-[11px] font-bold text-slate-700">{txn.tenant}</span>
                </div>

                {/* Owner */}
                <div className="col-span-2">
                  <span className="text-[11px] font-bold text-slate-500">{txn.owner}</span>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <span className="text-sm font-black text-slate-900">{txn.amount}</span>
                </div>

                {/* Date */}
                <div className="col-span-1 flex flex-col text-[10px] font-semibold text-slate-500 leading-tight">
                  <span>{txn.date.split(',')[0]}</span>
                  <span>{txn.date.split(',')[1]}</span>
                </div>

                {/* Method */}
                <div className="col-span-1 flex items-center gap-2 text-[10px] font-bold text-slate-600">
                  <Icon size={14} className="text-slate-400" />
                  <span className="truncate">{txn.method}</span>
                </div>

                {/* Status & Action */}
                <div className="col-span-1 flex items-center justify-between">
                  <span className={`inline-block px-2.5 py-1 rounded-[4px] text-[8px] font-black uppercase tracking-widest ${getStatusBadge(txn.status)}`}>
                    {txn.status}
                  </span>
                  <button className="text-slate-300 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100 pr-2">
                     <MoreVertical size={16} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-between items-center px-2">
        <p className="text-xs font-semibold text-slate-500">
          Showing 4 of 1,248 transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="px-5 py-2.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold transition-colors hover:bg-slate-200">
            Previous
          </button>
          <button className="px-5 py-2.5 bg-[#0b0f19] text-white rounded-lg text-xs font-bold transition-colors hover:bg-slate-800 shadow-sm">
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
