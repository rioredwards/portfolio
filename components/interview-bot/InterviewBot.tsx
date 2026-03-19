"use client";

import {
  BubbleChatIcon,
  Cancel01Icon,
  ArrowUp01Icon,
  Delete02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInterviewBot } from "@/lib/useInterviewBot";

const SUGGESTED_QUESTIONS = [
  "What's Rio's tech stack?",
  "Tell me about DogTown",
  "What's Rio's work experience?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-[3px] px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-[5px] rounded-full bg-foreground/30"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <HugeiconsIcon
        icon={SparklesIcon}
        size={13}
        color="currentColor"
        strokeWidth={2}
      />
    </div>
  );
}

export function InterviewBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage, reset } = useInterviewBot();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSuggestion(q: string) {
    if (isLoading) return;
    sendMessage(q);
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6 md:z-50">
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex h-[min(520px,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border/40 px-4 py-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
                <HugeiconsIcon
                  icon={BubbleChatIcon}
                  size={16}
                  color="var(--color-primary-foreground)"
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-[15px] leading-tight font-semibold tracking-tight text-foreground">
                  Chat with Rio
                </p>
                <p className="text-[11px] leading-tight text-body-text/60">
                  AI-powered, answers on Rio&apos;s behalf
                </p>
              </div>
              {hasMessages && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={reset}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="text-body-text/40 hover:text-destructive"
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={15}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </Button>
              )}
            </div>

            {/* Messages */}
            <div
              className="interview-bot-messages flex-1 space-y-4 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-busy={isLoading}
              aria-label="Interview bot conversation"
            >
              {/* Empty state with suggestions */}
              {!hasMessages && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex h-full flex-col items-center justify-center gap-5 px-2"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-primary/8">
                      <HugeiconsIcon
                        icon={SparklesIcon}
                        size={20}
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="font-serif text-sm font-medium text-foreground">
                      Ask me anything
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-body-text/50">
                      Background, projects, experience, or how this bot works.
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestion(q)}
                        className="w-full cursor-pointer rounded-xl border border-border/50 bg-secondary/50 px-3 py-2.5 text-left text-[12px] leading-snug text-body-text/70 transition-all duration-150 hover:border-primary/20 hover:bg-secondary hover:text-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message list */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {msg.role === "assistant" && <BotAvatar />}
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-secondary/80 text-body-text",
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-foreground">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc space-y-0.5 pl-4 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal space-y-0.5 pl-4 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-[13px]">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-primary/5 px-1 py-0.5 font-mono text-[11px] text-foreground">
                              {children}
                            </code>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <BotAvatar />
                  <div className="rounded-2xl rounded-bl-md bg-secondary/80 px-3.5 py-2.5">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg bg-destructive/5 px-3 py-2 text-center text-xs text-destructive"
                >
                  {error}
                </motion.p>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 border-t border-border/40 bg-secondary/30 px-3 py-3"
            >
              <label htmlFor="interview-bot-input" className="sr-only">
                Ask Rio a question
              </label>
              <textarea
                id="interview-bot-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                className="max-h-24 flex-1 resize-none overflow-y-auto rounded-xl border border-border/40 bg-background px-3 py-2 text-[13px] transition-colors outline-none placeholder:text-body-text/30 focus:border-primary/30 focus:ring-1 focus:ring-ring/30"
                style={{ fieldSizing: "content" } as React.CSSProperties}
              />
              <motion.div whileTap={{ scale: 0.92 }}>
                <Button
                  type="submit"
                  size="icon-sm"
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 rounded-xl shadow-sm"
                  aria-label="Send message"
                >
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    size={16}
                    color="currentColor"
                    strokeWidth={2.5}
                  />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon-xl"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_6px_28px_-4px_rgba(0,0,0,0.25)]"
          aria-label={open ? "Close chat" : "Chat with Rio's AI"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "chat"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <HugeiconsIcon
                icon={open ? Cancel01Icon : BubbleChatIcon}
                size={22}
                color="currentColor"
                strokeWidth={2}
              />
            </motion.span>
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}
