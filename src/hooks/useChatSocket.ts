import { useEffect, useRef, useState, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface ChatMessage {
  id?: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt?: string;
  isRead?: boolean;
  conversationKey?: string;
  senderName?: string;
}

interface UseChatSocketOptions {
  conversationKey: string | null;
  currentUserId: number;
  onMessage: (msg: ChatMessage) => void;
}

export function useChatSocket({ conversationKey, currentUserId, onMessage }: UseChatSocketOptions) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!conversationKey) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        // Subscribe to this conversation's topic channel
        client.subscribe(`/topic/chat/${conversationKey}`, (frame) => {
          try {
            const msg: ChatMessage = JSON.parse(frame.body);
            onMessage(msg);
          } catch (err) {
            console.error("Failed to parse message", err);
          }
        });
      },
      onDisconnect: () => setConnected(false),
      onStompError: (frame) => console.error("STOMP error", frame),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [conversationKey]);

  const sendMessage = useCallback((receiverId: number, content: string) => {
    if (!clientRef.current?.connected || !content.trim()) return;
    const payload: ChatMessage = {
      senderId: currentUserId,
      receiverId,
      content: content.trim(),
    };
    clientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(payload),
    });
  }, [currentUserId]);

  return { sendMessage, connected };
}
