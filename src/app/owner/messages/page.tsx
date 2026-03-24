"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Image as ImageIcon, 
  Send,
  CheckCheck
} from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number>(1);

  const conversations = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      property: "Azure Sky Penthouse",
      lastMessage: "That sounds perfect, thank you for...",
      time: "10:24 AM",
      unread: 0,
      online: true
    },
    {
      id: 2,
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      property: "The Gilded Villa",
      lastMessage: "Will the maintenance team be ...",
      time: "Yesterday",
      unread: 2,
      online: false
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
      property: "Harbor Light Suite",
      lastMessage: "I've attached the signed lease agre...",
      time: "Oct 12",
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      property: "Metro Studio",
      lastMessage: "The pool area looks fantastic after ...",
      time: "Oct 10",
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      type: "incoming",
      text: "Hi there! I just wanted to confirm if the new smart locks have been installed on the terrace door?",
      time: "9:45 AM"
    },
    {
      id: 2,
      type: "outgoing",
      text: "Good morning Sarah. Yes, the technician finished the installation about an hour ago. You should have received the access code via the app notification.",
      time: "10:12 AM"
    },
    {
      id: 3,
      type: "incoming",
      text: "That sounds perfect, thank you for the update! I really appreciate the quick response.",
      time: "10:24 AM"
    }
  ];

  const activeConversation = conversations.find(c => c.id === activeChat);

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 font-sans h-[calc(100vh-5rem)] flex flex-col">
      {/* Page Title */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Messages</h1>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-[600px]">
        
        {/* Left Column: Inboxes */}
        <div className="w-96 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden shrink-0 hidden lg:flex">
          <div className="p-6 border-b border-slate-100 shrink-0">
            <h2 className="text-xl font-bold text-slate-900">Inboxes</h2>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {conversations.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-5 flex items-start gap-4 cursor-pointer transition-colors border-l-[3px] ${
                  activeChat === chat.id 
                    ? "bg-slate-50 border-[#0f172a]" 
                    : "border-transparent hover:bg-slate-50/50"
                }`}
              >
                <div className="relative shrink-0 mt-1">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-200" />
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`text-sm truncate pr-2 ${activeChat === chat.id ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                      {chat.name}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate ${chat.unread > 0 ? "font-bold text-slate-900" : "text-slate-500 font-medium"}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          
          {/* Chat Header */}
          {activeConversation ? (
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white z-10">
              <div className="flex items-center gap-4">
                <img src={activeConversation.avatar} alt={activeConversation.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-200" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight mb-1">{activeConversation.name}</h2>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Building2 size={14} />
                    <span className="text-xs font-semibold">{activeConversation.property}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors">
                  <Phone size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ) : null}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
            <div className="flex justify-center mb-8">
              <span className="px-4 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Today
              </span>
            </div>

            <div className="space-y-6">
              {messages.map((msg) => {
                const isOutgoing = msg.type === "outgoing";
                return (
                  <div key={msg.id} className={`flex gap-4 ${isOutgoing ? "justify-end" : "justify-start"}`}>
                    {!isOutgoing && (
                      <img 
                        src={activeConversation?.avatar} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-auto bg-slate-200" 
                      />
                    )}
                    
                    <div className={`max-w-[75%] lg:max-w-[60%] flex flex-col ${isOutgoing ? "items-end" : "items-start"}`}>
                      <div 
                        className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                          isOutgoing 
                            ? "bg-[#0b0f19] text-white rounded-br-sm shadow-md" 
                            : "bg-slate-200/60 text-slate-800 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1.5 px-1">
                        <span className="text-[10px] font-bold text-slate-400">
                          {msg.time}
                        </span>
                        {isOutgoing && (
                          <CheckCheck size={14} className="text-blue-500 ml-1" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 md:p-6 bg-white shrink-0">
            <div className="bg-slate-100 rounded-2xl flex items-center p-2 pr-2.5">
              <div className="flex items-center gap-1 px-2 text-slate-400">
                <button className="p-2 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors">
                  <Paperclip size={20} />
                </button>
                <button className="p-2 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors">
                  <ImageIcon size={20} />
                </button>
              </div>
              
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 outline-none px-4 py-3 placeholder:text-slate-400 text-slate-800"
              />
              
              <button className="w-12 h-12 bg-[#0b0f19] flex items-center justify-center text-white rounded-xl shadow-md hover:bg-slate-800 transition-colors shrink-0">
                <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
              </button>
            </div>
            
            <p className="text-center mt-4 text-[10px] font-semibold text-slate-400 pb-1">
              Encryption active for {activeConversation?.name} • LuxeManage Security
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
