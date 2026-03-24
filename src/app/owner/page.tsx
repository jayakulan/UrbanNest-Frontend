import React from "react";
import {
  Building2,
  Eye,
  CalendarCheck,
  Wallet,
  Users,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";

export default function OwnerDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Portfolio Overview
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Welcome back, Julian. Here is what's happening with your properties today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              +2 this month
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Total Properties
            </p>
            <h3 className="text-3xl font-bold text-slate-900">24</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
              94% Active
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Active Listings
            </p>
            <h3 className="text-3xl font-bold text-slate-900">18</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-md">
              Action Required
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Pending Bookings
            </p>
            <h3 className="text-3xl font-bold text-slate-900">07</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              +12.4%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Monthly Earnings
            </p>
            <h3 className="text-3xl font-bold text-slate-900">$42,850</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
              Stable
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Total Tenants
            </p>
            <h3 className="text-3xl font-bold text-slate-900">56</h3>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Trends */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Revenue Trends
                </h2>
                <p className="text-slate-500 mt-1 font-medium">
                  Earnings growth over the last 6 months
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Last 6 Months <ChevronDown size={16} />
              </button>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 relative flex items-end justify-between px-4">
              {/* Very simplistic mock chart bars */}
              {[40, 30, 60, 45, 80, 55].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-4 w-1/6">
                  <div
                    className="w-12 bg-gradient-to-t from-blue-100 to-blue-500 rounded-t-sm opacity-20"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
              
              {/* Smooth line mock - pure css */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M 5 60 Q 15 40 25 70 T 45 40 T 65 55 T 85 20" fill="none" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                 <path d="M 5 60 Q 15 40 25 70 T 45 40 T 65 55 T 85 20 L 85 100 L 5 100 Z" fill="url(#gradient)" stroke="none" />
                 <defs>
                   <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                     <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
                     <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                   </linearGradient>
                 </defs>
              </svg>

              {/* X Axis labels */}
              <div className="absolute bottom-[-32px] left-0 w-full flex justify-between px-8">
                {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((month, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold text-slate-400"
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-8"></div> {/* Spacer for x-axis labels */}
          </div>

          {/* Recent Booking Requests */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">
                Recent Booking Requests
              </h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[240px]">
                      Guest
                    </th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                          EM
                        </div>
                        <span className="font-semibold text-slate-900">
                          Eleanor May
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Skyline Penthouse
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Oct 12 - 15
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">
                      $1,240
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                          RK
                        </div>
                        <span className="font-semibold text-slate-900">
                          Ryan Kallas
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Oak Ridge Villa
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Oct 14 - 20
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">
                      $3,800
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                          SL
                        </div>
                        <span className="font-semibold text-slate-900">
                          Sarah Liao
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Modern Loft 12
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      Oct 16 - 17
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">
                      $450
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                        Expired
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Spans 1) */}
        <div className="space-y-8">
          {/* Top Performer Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="relative h-48 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Azure Bay Villa"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-full shadow-sm">
                  Top Performer
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900">
                Azure Bay Villa
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1 mb-8">
                Malibu, California
              </p>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Occupancy Rate
                  </span>
                  <span className="text-lg font-bold text-slate-900">98%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0f172a] w-[98%] rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">
                    Views
                  </p>
                  <p className="text-xl font-bold text-slate-900 text-center">
                    12.4k
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-center">
                    Bookings
                  </p>
                  <p className="text-xl font-bold text-slate-900 text-center">
                    142
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Support */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-8 relative">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <h2 className="text-xl font-bold mb-3 relative z-10">
              Premium Support
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium relative z-10">
              As an Elite Host, you have a dedicated portfolio manager available
              24/7 for consultation.
            </p>
            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors relative z-10">
              Contact Manager
            </button>
          </div>

          {/* Service Status */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
              Service Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm font-semibold text-slate-700">
                  Listing Visibility: Online
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm font-semibold text-slate-700">
                  Payment Processing: Active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span className="text-sm font-semibold text-slate-700">
                  Calendar Sync: Updating...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
