"use client";

import { useCallback, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const BOT_URL =
  process.env.NEXT_PUBLIC_INTERVIEW_BOT_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:1807" : null);

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useInterviewBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef<string>(generateSessionId());
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    if (!BOT_URL) {
      setError("Interview bot is not configured for this environment.");
      return;
    }

    const requestId = ++requestIdRef.current;
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // POST /chat expects { message, sessionId } and returns { reply }.
      const res = await fetch(`${BOT_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId.current }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
          body?.error ?? "Failed to reach the bot. Please try again.";
        throw new Error(message);
      }

      const data = await res.json();
      if (requestId !== requestIdRef.current) return;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      if (controller.signal.aborted) return;
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reach the bot. Please try again.",
      );
      console.error(err);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setIsLoading(false);
    setError(null);
    sessionId.current = generateSessionId();
  }, []);

  return { messages, isLoading, error, sendMessage, reset };
}
