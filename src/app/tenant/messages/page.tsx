"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  CheckCheck
} from "lucide-react";
import { useChatSocket } from "@/hooks/useChatSocket";

interface Message {
  id?: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt?: string;
  senderName?: string;
  conversationKey?: string;
}

interface Conversation {
  partnerId: number;
  partnerName: string;
  partnerRole: string;
  conversationKey: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

function convKey(a: number, b: number) {
  return `${Math.min(a, b)}_${Math.max(a, b)}`;
}

function fmtTime(iso: string | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch { return ""; }
}

export default function TenantMessagesPage() {
  const [activeTab, setActiveTab]             = useState("All");
  const [conversations, setConversations]     = useState<Conversation[]>([]);
  const [activeConv, setActiveConv]           = useState<Conversation | null>(null);
  const [messages, setMessages]               = useState<Message[]>([]);
  const [inputText, setInputText]             = useState("");
  const [loadingHistory, setLoadingHistory]   = useState(false);
  const [currentUserId, setCurrentUserId]     = useState<number>(0);
  const [token, setToken]                     = useState<string>("");
  const messagesEndRef                        = useRef<HTMLDivElement>(null);

  // Read localStorage only on the client (avoids Next.js SSR crash)
  useEffect(() => {
    setCurrentUserId(parseInt(localStorage.getItem("userId") || "0"));
    setToken(localStorage.getItem("token") || "");
  }, []);

  // ── WebSocket hook ──
  const { sendMessage, connected } = useChatSocket({
    conversationKey: activeConv?.conversationKey ?? null,
    currentUserId,
    onMessage: (msg) => {
      setMessages(prev => {
        // Avoid duplicate (our own sent message returns via broadcast too)
        if (msg.id && prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Load conversation list (runs only after localStorage is read) ──
  useEffect(() => {
    if (!currentUserId || !token) return;
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/messages/inbox/${currentUserId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
          if (data.length > 0 && !activeConv) openConversation(data[0]);
        }
      } catch (err) { console.error(err); }
    };
    load();
  }, [currentUserId, token]);

  // ── Open a conversation (load history) ──
  const openConversation = useCallback(async (conv: Conversation) => {
    setActiveConv(conv);
    setLoadingHistory(true);
    try {
      const res = await fetch(`http://localhost:8080/api/messages/conversation/${conv.conversationKey}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setMessages(await res.json());
      // Mark as read
      await fetch(
        `http://localhost:8080/api/messages/conversation/${conv.conversationKey}/read?userId=${currentUserId}`,
        { method: "PATCH", headers: { "Authorization": `Bearer ${token}` } }
      );
      // Clear unread badge locally
      setConversations(prev => prev.map(c =>
        c.conversationKey === conv.conversationKey ? { ...c, unreadCount: 0 } : c
      ));
    } catch (err) { console.error(err); }
    finally { setLoadingHistory(false); }
  }, [token, currentUserId]);

  // ── Send a message ──
  const handleSend = () => {
    if (!activeConv || !inputText.trim()) return;
    sendMessage(activeConv.partnerId, inputText);
    setInputText("");
    // Update last message preview in sidebar
    setConversations(prev => prev.map(c =>
      c.conversationKey === activeConv.conversationKey
        ? { ...c, lastMessage: inputText.trim() }
        : c
    ));
  };

  const filteredConvs = conversations.filter(c => {
    if (activeTab === "Unread") return c.unreadCount > 0;
    return true;
  });

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
          <div className="flex-1 overflow-y-auto pb-4 space-y-1">
            {filteredConvs.length === 0 ? (
              <p className="text-center text-slate-400 text-sm font-medium py-12">No conversations yet.</p>
            ) : (
              filteredConvs.map((conv) => {
                const isActive = activeConv?.conversationKey === conv.conversationKey;
                return (
                  <div
                    key={conv.conversationKey}
                    onClick={() => openConversation(conv)}
                    className={`relative px-6 md:px-8 py-5 flex items-start gap-4 cursor-pointer transition-colors ${
                      isActive ? "bg-slate-50" : "hover:bg-slate-50"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0b0f19] rounded-r-md"></div>
                    )}
                    
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center text-lg">
                        {(conv.partnerName || "?").charAt(0).toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className={`text-sm truncate pr-2 ${conv.unreadCount > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                          {conv.partnerName}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {fmtTime(conv.lastMessageTime)}
                          </span>
                          {conv.unreadCount > 0 && <div className="w-2 h-2 bg-[#0b0f19] rounded-full"></div>}
                        </div>
                      </div>
                      
                      <p className={`text-xs truncate mb-2 ${conv.unreadCount > 0 ? 'font-medium text-slate-900' : 'font-medium text-slate-500'}`}>
                        {conv.lastMessage || "Start a conversation"}
                      </p>

                      <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-[9px] font-bold uppercase tracking-wider rounded-md">
                        {conv.partnerRole}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Active Chat View */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="h-20 border-b border-slate-100 px-6 md:px-8 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center">
                      {(activeConv.partnerName || "?").charAt(0).toUpperCase()}
                    </div>
                    {connected && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-bold text-slate-900 leading-none">{activeConv.partnerName}</h2>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider rounded-md">
                        {activeConv.partnerRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      {connected ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 block"></span> Connected
                        </span>
                      ) : (
                        <span className="text-slate-400">Connecting...</span>
                      )}
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
                {loadingHistory ? (
                  <p className="text-center text-slate-400 text-sm font-medium">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm font-medium pt-12">
                    No messages yet. Say hello! 👋
                  </p>
                ) : (
                  messages.map((msg, idx) => {
                    const isOwn = msg.senderId === currentUserId;
                    return (
                      <div key={msg.id ?? idx} className={`flex gap-4 ${isOwn ? "justify-end" : "max-w-2xl"}`}>
                        {!isOwn && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                            {(msg.senderName || activeConv.partnerName || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className={isOwn ? "flex flex-col items-end" : ""}>
                          <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed mb-1 shadow-sm ${
                            isOwn
                              ? "bg-[#0b0f19] text-white rounded-tr-sm"
                              : "bg-slate-100/80 text-slate-800 rounded-tl-sm border border-slate-50"
                          }`}>
                            {msg.content}
                          </div>
                          <div className="flex items-center gap-1.5 ml-1">
                            <span className="text-[10px] font-semibold text-slate-400">{fmtTime(msg.sentAt)}</span>
                            {isOwn && <CheckCheck size={14} className="text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 md:p-8 pt-4 border-t border-slate-50 shrink-0">
                <div className="bg-slate-100 rounded-2xl flex items-center p-2 mb-4">
                  <button className="p-3 text-slate-400 hover:text-slate-700 transition-colors"><Paperclip size={20} /></button>
                  <button className="p-3 text-slate-400 hover:text-slate-700 transition-colors"><Smile size={20} /></button>
                  <input 
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type your message here..."
                    className="flex-1 bg-transparent px-3 py-3 focus:outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || !connected}
                    className="w-12 h-12 bg-[#0b0f19] text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors ml-2 shrink-0 shadow-sm disabled:opacity-50"
                  >
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-400 font-medium text-sm">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
