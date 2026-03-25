"use client";

import React, { useState } from "react";
import { 
  SquarePen, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send, 
  Image as ImageIcon, 
  FileText, 
  Download,
  CheckCheck
} from "lucide-react";

export default function TenantMessagesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const conversations = [
    {
      id: 1,
      name: "Alexander Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      time: "2m ago",
      preview: "The contract is ready for your...",
      property: "Azure Sky Penthouse",
      unread: true,
      online: true,
      active: true
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      time: "1h ago",
      preview: "I've sent over the utility breakdown...",
      property: null,
      unread: false,
      online: false,
      active: false
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      time: "Yesterday",
      preview: "Great meeting you yesterday! The...",
      property: null,
      unread: false,
      online: false,
      active: false
    },
    {
      id: 4,
      name: "Marcus Bennett",
      avatar: null,
      initials: "MB",
      time: "Tuesday",
      preview: "Thank you for the prompt payment...",
      property: null,
      unread: false,
      online: false,
      active: false
    }
  ];

  return (
    <div className="h-[calc(100vh-6rem)] max-w-[1400px] mx-auto p-4 lg:p-8 font-sans">
      
      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row overflow-hidden h-full">
        
        {/* Left Panel: Conversations List */}
        <div className="w-full md:w-[350px] lg:w-[400px] border-r border-slate-100 flex flex-col shrink-0">
          
          {/* Header */}
          <div className="p-6 md:p-8 pb-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Messages</h1>
              <button className="w-10 h-10 bg-[#0b0f19] text-white rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                <SquarePen size={18} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {['All', 'Unread', 'Archived'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeTab === tab
                      ? "bg-[#0b0f19] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-4 space-y-1">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`relative px-6 md:px-8 py-5 flex items-start gap-4 cursor-pointer transition-colors ${
                  chat.active ? "bg-slate-50" : "hover:bg-slate-50"
                }`}
              >
                {/* Active Indicator Line */}
                {chat.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0b0f19] rounded-r-md"></div>
                )}
                
                {/* Avatar */}
                <div className="relative shrink-0">
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover bg-slate-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {chat.initials}
                    </div>
                  )}
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`text-sm truncate pr-2 ${chat.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                      {chat.name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-semibold text-slate-400">{chat.time}</span>
                      {chat.unread && <div className="w-2 h-2 bg-[#0b0f19] rounded-full"></div>}
                    </div>
                  </div>
                  
                  <p className={`text-xs truncate ${chat.unread ? 'font-medium text-slate-900' : 'font-medium text-slate-500'} mb-2`}>
                    {chat.preview}
                  </p>

                  {chat.property && (
                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-[9px] font-bold uppercase tracking-wider rounded-md">
                      {chat.property}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Active Chat View */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Chat Header */}
          <div className="h-20 border-b border-slate-100 px-6 md:px-8 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" 
                  alt="Alexander Vance" 
                  className="w-10 h-10 rounded-full object-cover bg-slate-200" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-slate-900 leading-none">Alexander Vance</h2>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider rounded-md">
                    OWNER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 block"></span> Online
                  </span>
                  <span>•</span>
                  <span>Azure Sky Penthouse</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-900 transition-colors hidden sm:block"><Phone size={20} /></button>
              <button className="hover:text-slate-900 transition-colors hidden sm:block"><Video size={20} /></button>
              <button className="hover:text-slate-900 transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            <div className="flex justify-center mb-6">
              <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-widest rounded-full">
                Monday, August 14
              </span>
            </div>

            {/* Received Message */}
            <div className="flex gap-4 max-w-2xl">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full shrink-0" />
              <div>
                <div className="bg-slate-100/80 text-slate-800 p-4 rounded-2xl rounded-tl-sm text-sm font-medium leading-relaxed mb-1 shadow-sm border border-slate-50">
                  Hello Julian, I've just uploaded the revised lease agreement for the Azure Sky Penthouse. I've included the parking stall amendment we discussed.
                </div>
                <span className="text-[10px] font-semibold text-slate-400 ml-1">10:42 AM</span>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex gap-4 justify-end max-w-2xl ml-auto">
              <div className="flex flex-col items-end">
                <div className="bg-[#0b0f19] text-white p-4 rounded-2xl rounded-tr-sm text-sm font-medium leading-relaxed mb-1 shadow-sm">
                  Thanks Alexander! I appreciate the quick turnaround on the parking update. I'm reviewing it right now.
                </div>
                <div className="flex items-center gap-1.5 mr-1">
                  <span className="text-[10px] font-semibold text-slate-400">10:45 AM</span>
                  <CheckCheck size={14} className="text-blue-500" />
                </div>
              </div>
            </div>

            {/* Received Message with Attachment */}
            <div className="flex gap-4 max-w-2xl">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full shrink-0" />
              <div className="w-full max-w-md">
                <div className="bg-slate-100/80 text-slate-800 p-4 rounded-2xl rounded-tl-sm text-sm font-medium leading-relaxed mb-3 shadow-sm border border-slate-50">
                  The contract is ready for your signature, Julian. Let me know when you've had a look.
                </div>
                
                {/* File Attachment Widget */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-300 transition-colors w-72 mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Lease_Agreement_V2....</p>
                      <p className="text-[10px] font-semibold text-slate-400">2.4 MB • PDF Document</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-900 transition-colors p-2">
                    <Download size={18} />
                  </button>
                </div>

                <span className="text-[10px] font-semibold text-slate-400 ml-1 mt-1 block">11:02 AM</span>
              </div>
            </div>
            
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 pt-4 border-t border-slate-50 shrink-0">
            <div className="bg-slate-100 rounded-2xl flex items-center p-2 mb-4">
              <button className="p-3 text-slate-400 hover:text-slate-700 transition-colors"><Paperclip size={20} /></button>
              <button className="p-3 text-slate-400 hover:text-slate-700 transition-colors"><Smile size={20} /></button>
              <input 
                type="text" 
                placeholder="Type your message here..." 
                className="flex-1 bg-transparent px-3 py-3 focus:outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400 cursor-text"
              />
              <button className="w-12 h-12 bg-[#0b0f19] text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors ml-2 shrink-0 shadow-sm">
                <Send size={18} className="translate-y-[1px] -translate-x-[1px]" />
              </button>
            </div>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                  <ImageIcon size={14} /> Image
                </button>
                <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors">
                  <FileText size={14} /> Document
                </button>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 italic">Press Enter to send</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
