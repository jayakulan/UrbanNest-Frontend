"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Building2, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Image as ImageIcon, 
  Send,
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

function fmtTime(iso: string | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch { return ""; }
}

export default function MessagesPage() {
  const [conversations, setConversations]   = useState<Conversation[]>([]);
  const [activeConv, setActiveConv]         = useState<Conversation | null>(null);
  const [messages, setMessages]             = useState<Message[]>([]);
  const [inputText, setInputText]           = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [currentUserId, setCurrentUserId]   = useState<number>(0);
  const [token, setToken]                   = useState<string>("");
  const messagesEndRef                      = useRef<HTMLDivElement>(null);

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
        if (msg.id && prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    },
  });

  // Auto-scroll
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
          if (data.length > 0) openConversation(data[0]);
        }
      } catch (err) { console.error(err); }
    };
    load();
  }, [currentUserId, token]);

  // ── Open a conversation ──
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
      setConversations(prev => prev.map(c =>
        c.conversationKey === conv.conversationKey ? { ...c, unreadCount: 0 } : c
      ));
    } catch (err) { console.error(err); }
    finally { setLoadingHistory(false); }
  }, [token, currentUserId]);

  // ── Send message ──
  const handleSend = () => {
    if (!activeConv || !inputText.trim()) return;
    sendMessage(activeConv.partnerId, inputText);
    setInputText("");
    setConversations(prev => prev.map(c =>
      c.conversationKey === activeConv.conversationKey
        ? { ...c, lastMessage: inputText.trim() }
        : c
    ));
  };

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
            {conversations.length === 0 ? (
              <p className="text-center text-slate-400 text-sm font-medium py-12">No conversations yet.</p>
            ) : (
              conversations.map((conv) => (
                <div 
                  key={conv.conversationKey}
                  onClick={() => openConversation(conv)}
                  className={`p-5 flex items-start gap-4 cursor-pointer transition-colors border-l-[3px] ${
                    activeConv?.conversationKey === conv.conversationKey
                      ? "bg-slate-50 border-[#0f172a]" 
                      : "border-transparent hover:bg-slate-50/50"
                  }`}
                >
                  <div className="relative shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      {(conv.partnerName || "?").charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`text-sm truncate pr-2 ${
                        activeConv?.conversationKey === conv.conversationKey ? "font-bold text-slate-900" : "font-semibold text-slate-800"
                      }`}>
                        {conv.partnerName}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 shrink-0">
                        {fmtTime(conv.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className={`text-xs truncate ${conv.unreadCount > 0 ? "font-bold text-slate-900" : "text-slate-500 font-medium"}`}>
                        {conv.lastMessage || "Start a conversation"}
                      </p>
                      {conv.unreadCount > 0 && (
                        <div className="w-5 h-5 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">
                      {conv.partnerRole}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          
          {/* Chat Header */}
          {activeConv ? (
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center text-xl shadow-sm">
                    {(activeConv.partnerName || "?").charAt(0).toUpperCase()}
                  </div>
                  {connected && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight mb-1">{activeConv.partnerName}</h2>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Building2 size={14} />
                    <span className="text-xs font-semibold">{activeConv.partnerRole}</span>
                    {connected && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-green-500">Live</span>
                      </>
                    )}
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
            {!activeConv ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400 font-medium text-sm">Select a conversation to start chatting.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-8">
                  <span className="px-4 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Today
                  </span>
                </div>

                <div className="space-y-6">
                  {loadingHistory ? (
                    <p className="text-center text-slate-400 text-sm font-medium">Loading messages...</p>
                  ) : messages.length === 0 ? (
                    <p className="text-center text-slate-400 text-sm font-medium pt-8">
                      No messages yet. Start the conversation! 👋
                    </p>
                  ) : (
                    messages.map((msg, idx) => {
                      const isOutgoing = msg.senderId === currentUserId;
                      return (
                        <div key={msg.id ?? idx} className={`flex gap-4 ${isOutgoing ? "justify-end" : "justify-start"}`}>
                          {!isOutgoing && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 text-white font-bold flex items-center justify-center shrink-0 mt-auto text-sm">
                              {(msg.senderName || activeConv.partnerName || "?").charAt(0).toUpperCase()}
                            </div>
                          )}
                          
                          <div className={`max-w-[75%] lg:max-w-[60%] flex flex-col ${isOutgoing ? "items-end" : "items-start"}`}>
                            <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                              isOutgoing
                                ? "bg-[#0b0f19] text-white rounded-br-sm shadow-md"
                                : "bg-slate-200/60 text-slate-800 rounded-bl-sm"
                            }`}>
                              {msg.content}
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1.5 px-1">
                              <span className="text-[10px] font-bold text-slate-400">
                                {fmtTime(msg.sentAt)}
                              </span>
                              {isOutgoing && (
                                <CheckCheck size={14} className="text-blue-500 ml-1" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>
            )}
          </div>

          {/* Chat Input */}
          {activeConv && (
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
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 outline-none px-4 py-3 placeholder:text-slate-400 text-slate-800"
                />
                
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || !connected}
                  className="w-12 h-12 bg-[#0b0f19] flex items-center justify-center text-white rounded-xl shadow-md hover:bg-slate-800 transition-colors shrink-0 disabled:opacity-50"
                >
                  <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                </button>
              </div>
              
              <p className="text-center mt-4 text-[10px] font-semibold text-slate-400 pb-1">
                {connected ? `Connected • Real-time messaging` : "Connecting..."} • UrbanNest Security
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
