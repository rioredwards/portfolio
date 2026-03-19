"use client";

import { useCallback, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const BOT_URL =
  process.env.NEXT_PUBLIC_INTERVIEW_BOT_URL ?? "http://localhost:1807";

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useInterviewBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef<string>(generateSessionId());

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BOT_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId.current }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
          body?.error ?? "Failed to reach the bot. Please try again.";
        throw new Error(message);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reach the bot. Please try again.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
    sessionId.current = generateSessionId();
  }, []);

  return { messages, isLoading, error, sendMessage, reset };
}
