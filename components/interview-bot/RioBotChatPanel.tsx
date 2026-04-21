"use client";

import {
  Briefcase01Icon,
  BubbleChatIcon,
  Cancel01Icon,
  CodeSimpleIcon,
  MoreHorizontalIcon,
  Refresh01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PawPrint } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { useInterviewBot } from "@/lib/useInterviewBot";
import { cn } from "@/lib/utils";

const SUGGESTED_QUESTIONS: {
  text: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    text: "What's Rio's tech stack?",
    icon: (
      <HugeiconsIcon
        icon={CodeSimpleIcon}
        size={64}
        color="currentColor"
        className="size-5"
        strokeWidth={2}
      />
    ),
    color: "#2F645E",
  },
  {
    text: "Tell me about DogTown",
    icon: <PawPrint className="size-5" />,
    color: "#8E5140",
  },
  {
    text: "What's Rio's work experience?",
    icon: (
      <HugeiconsIcon
        icon={Briefcase01Icon}
        size={64}
        color="currentColor"
        className="size-5"
        strokeWidth={2}
      />
    ),
    color: "#006985",
  },
];

/** Filled 4-point sparkle — cardinal orientation, concave sides (controls pulled toward center). */
function SparkleAccent({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("pointer-events-none text-primary", className)}
      aria-hidden
    >
      <path d="M12 1.1Q14.35 9.35 22.62 12Q14.35 14.65 12 22.9Q9.65 14.65 1.38 12Q9.65 9.35 12 1.1z" />
    </svg>
  );
}

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

/** Squircle avatar for assistant rows */
function BotAvatar() {
  return (
    <div
      className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border/35 bg-neutral-100 text-primary [corner-shape:squircle]"
      aria-hidden
    >
      <HugeiconsIcon
        icon={BubbleChatIcon}
        size={14}
        color="currentColor"
        strokeWidth={2}
      />
    </div>
  );
}

function ChatHeaderAvatar() {
  return (
    <div
      className="relative size-8 shrink-0"
      role="img"
      aria-label="RioBot, online"
    >
      <div className="flex size-8 items-center justify-center rounded-xl border border-border/45 bg-neutral-100 shadow-[0_1px_0_rgba(0,0,0,0.04)] [corner-shape:squircle]">
        <HugeiconsIcon
          icon={BubbleChatIcon}
          size={16}
          color="var(--color-primary)"
          strokeWidth={2}
        />
      </div>
      <span
        className="custom-bg-ping-always absolute -right-px -bottom-px block size-[9px] rounded-full border-[1.5px] border-background bg-(--theme-ring) shadow-none"
        aria-hidden
      >
        <span className="custom-bg-ping block size-full rounded-full bg-(--theme-ring)" />
      </span>
    </div>
  );
}

interface RioBotChatPanelProps {
  /** When provided, a close button is shown in the header. */
  onClose?: () => void;
  /** "compact" for modal overlay, "full" for standalone full-page layout. */
  variant?: "compact" | "full";
  className?: string;
}

export function RioBotChatPanel({
  onClose,
  variant = "compact",
  className,
}: RioBotChatPanelProps) {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { messages, isLoading, error, sendMessage, reset } = useInterviewBot();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const full = variant === "full";

  // Close menu on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      menuBtnRef.current &&
      !menuBtnRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen, handleClickOutside]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(id);
  }, []);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage(text);
    requestAnimationFrame(() => inputRef.current?.blur());
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

  /** Wraps content with a centered max-width container in full-page mode. */
  const contentWidth = full ? "mx-auto w-full max-w-2xl" : "";

  return (
    <div className={cn("flex flex-col", !full && "overflow-hidden", className)}>
      {/* Header — compact (modal) only */}
      {!full && (
        <div className="border-b border-border/40 px-4 py-2.5">
          <div className="relative flex items-center gap-2.5">
            <ChatHeaderAvatar />
            <div className="min-w-0 flex-1">
              <a
                href="/riobot"
                className="font-sans text-[1.05rem] leading-tight font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              >
                RioBot
              </a>
              <p className="mt-px text-xs leading-tight text-body-text/45">
                Twice the smarts, half the sentience!
              </p>
            </div>
            {hasMessages && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={reset}
                aria-label="New conversation"
                className="size-8 text-body-text/40 hover:bg-foreground/8 hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={Refresh01Icon}
                  size={32}
                  color="currentColor"
                  className="size-4"
                  strokeWidth={2}
                />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                title="Close"
                aria-label="Close RioBot"
                className="size-8 text-body-text/40 hover:bg-destructive/8 hover:text-destructive/50"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={32}
                  color="currentColor"
                  className="size-5"
                  strokeWidth={2}
                />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        className={cn(
          "interview-bot-messages flex-1 overflow-y-auto",
          full ? "bg-background" : "bg-secondary",
        )}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-busy={isLoading}
        aria-label="RioBot conversation"
      >
        <div
          className={cn(
            "space-y-4 py-3",
            full ? "mx-auto w-full max-w-2xl px-6 pt-16" : "px-4",
            !hasMessages && "flex min-h-full flex-col",
          )}
        >
          {/* Empty state with suggestions */}
          {!hasMessages && !isLoading && (
            <motion.div
              initial={full ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={cn(
                "flex w-full max-w-full flex-1 flex-col items-center justify-center px-2 pb-4",
                full ? "gap-6" : "gap-3.5",
              )}
            >
              <div className="w-full text-center">
                <div
                  className={cn(
                    "relative mx-auto flex shrink-0 items-center justify-center",
                    full ? "mb-5 h-28 w-28" : "mb-4 h-[4.5rem] w-[4.5rem]",
                  )}
                >
                  <SparkleAccent
                    size={full ? 24 : 17}
                    className="absolute top-0 right-0 text-primary/25"
                  />
                  <SparkleAccent
                    size={full ? 14 : 10}
                    className="absolute bottom-0 left-0 text-primary/25"
                  />
                  <div
                    className={cn(
                      "flex items-center justify-center border border-border/30 bg-[color-mix(in_oklab,var(--theme-foreground-primary)_38%,var(--theme-background-secondary)_62%)] [corner-shape:squircle]",
                      full
                        ? "size-24 rounded-[1.5rem]"
                        : "size-16 rounded-[1.1rem]",
                    )}
                  >
                    <HugeiconsIcon
                      icon={BubbleChatIcon}
                      size={full ? 36 : 24}
                      color="var(--color-primary)"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                {full ? (
                  <>
                    <h1 className="font-sans text-xl font-bold tracking-tight text-foreground">
                      RioBot
                    </h1>
                    <p className="mt-1 text-sm text-body-text/50">
                      Twice the smarts, half the sentience!
                    </p>
                  </>
                ) : (
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Ask me anything
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "flex flex-col items-stretch",
                  full ? "w-full max-w-sm gap-3" : "w-full max-w-72 gap-2.5",
                )}
              >
                {SUGGESTED_QUESTIONS.map((q) => (
                  <Button
                    key={q.text}
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSuggestion(q.text)}
                    className={cn(
                      "grid h-auto w-full items-center rounded-full border bg-transparent text-left leading-snug font-medium whitespace-normal shadow-none hover:bg-foreground/6",
                      full
                        ? "grid-cols-[28px_1fr] gap-2.5 px-6 py-3.5 text-[0.9rem]"
                        : "grid-cols-[24px_1fr] gap-2 px-5 py-2.5 text-[0.8rem] md:text-[0.8rem]",
                    )}
                    style={{
                      borderColor: `color-mix(in oklab, ${q.color}, transparent 50%)`,
                      color: q.color,
                    }}
                  >
                    {q.icon}
                    {q.text}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Message list */}
          {messages.map((msg, i) => (
            <motion.div
              key={`${msg.role}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className={cn(
                "flex items-end gap-2",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role === "assistant" && <BotAvatar />}
              <div
                className={cn(
                  "max-w-[82%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : cn(
                        "rounded-bl-sm text-body-text",
                        full ? "bg-secondary" : "bg-tertiary/80",
                      ),
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
                        <li className="text-sm">{children}</li>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-primary/5 px-1 py-0.5 font-mono text-xs text-foreground">
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
              className="flex items-end gap-2"
            >
              <BotAvatar />
              <div
                className={cn(
                  "rounded-lg rounded-bl-sm px-3.5 py-2.5",
                  full ? "bg-secondary" : "bg-tertiary/80",
                )}
              >
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
      </div>

      {/* Input */}
      <div
        className={cn(
          "border-t border-border/30",
          full ? "bg-background px-6 py-3" : "bg-secondary/30 px-3 py-2",
        )}
      >
        <div className={contentWidth}>
          <label htmlFor="interview-bot-input" className="sr-only">
            Ask Rio a question
          </label>
          <div
            className={cn(
              "flex items-center gap-2 border border-border/35 bg-secondary transition-colors focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-ring/30",
              full
                ? "rounded-2xl py-1.5 pr-3 pl-1.5"
                : "rounded-xl px-3 py-1.5",
            )}
          >
            {full && (
              <div className="relative shrink-0">
                <button
                  ref={menuBtnRef}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center justify-center rounded-full p-1.5 text-body-text/40 transition-colors hover:bg-foreground/8 hover:text-foreground"
                  aria-label="Chat options"
                  aria-expanded={menuOpen}
                >
                  <HugeiconsIcon
                    icon={MoreHorizontalIcon}
                    size={20}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      ref={menuRef}
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute bottom-full left-0 z-[60] mb-2 min-w-44 rounded-xl border border-border/40 bg-secondary p-1 shadow-lg"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          reset();
                          setMenuOpen(false);
                          inputRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/8"
                      >
                        <HugeiconsIcon
                          icon={Refresh01Icon}
                          size={16}
                          color="currentColor"
                          strokeWidth={2}
                        />
                        New conversation
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <textarea
              id="interview-bot-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              enterKeyHint="send"
              placeholder="Ask a question..."
              rows={1}
              className="max-h-24 min-h-[calc(max(16px,1rem)+var(--spacing)*2)] flex-1 resize-none overflow-y-auto bg-transparent p-0 text-[max(16px,1rem)] leading-snug outline-none placeholder:text-body-text/25 md:min-h-0 md:py-0.5 md:text-sm"
              style={{ fieldSizing: "content" } as React.CSSProperties}
            />
            <motion.div
              animate={{
                scale: input.trim() ? 1 : 0,
                opacity: input.trim() ? 1 : 0,
              }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex shrink-0 items-center justify-center"
            >
              <Button
                type="button"
                size="icon-sm"
                disabled={isLoading || !input.trim()}
                onClick={() => handleSubmit()}
                className="shrink-0 rounded-full"
                aria-label="Send message"
              >
                <HugeiconsIcon
                  icon={SentIcon}
                  size={24}
                  color="currentColor"
                  strokeWidth={2}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
