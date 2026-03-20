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

async function postInterviewBotChat(
  baseUrl: string,
  message: string,
  sessionId: string,
  signal: AbortSignal,
): Promise<{ reply: string }> {
  const res = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
    signal,
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(
      body?.error ?? "Failed to reach the bot. Please try again.",
    );
  }

  return (await res.json()) as { reply: string };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withMinimumDelay<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.all([p, sleep(ms)]).then(([value]) => value);
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
      const data = await withMinimumDelay(
        postInterviewBotChat(
          BOT_URL,
          text,
          sessionId.current,
          controller.signal,
        ),
        800,
      );

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
