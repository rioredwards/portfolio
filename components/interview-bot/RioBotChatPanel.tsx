"use client";

import {
  ArrowDown01Icon,
  Briefcase01Icon,
  BubbleChatIcon,
  CodeSimpleIcon,
  Refresh01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PawPrint } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
        className="size-6 md:size-5"
        strokeWidth={2}
      />
    ),
    color: "#2F645E",
  },
  {
    text: "Tell me about DogTown",
    icon: <PawPrint className="size-6 md:size-5" />,
    color: "#8E5140",
  },
  {
    text: "What's Rio's work experience?",
    icon: (
      <HugeiconsIcon
        icon={Briefcase01Icon}
        size={64}
        color="currentColor"
        className="size-6 md:size-5"
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

/** Squircle avatar for assistant rows — matches header / empty-state language */
function BotAvatar() {
  return (
    <div
      className="flex size-6 shrink-0 items-center justify-center rounded-xl border border-border/35 bg-neutral-100 text-primary [corner-shape:squircle]"
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
      className="relative size-10 shrink-0"
      role="img"
      aria-label="RioBot, online"
    >
      <div className="flex size-10 items-center justify-center rounded-2xl border border-border/45 bg-neutral-100 shadow-[0_1px_0_rgba(0,0,0,0.04)] [corner-shape:squircle]">
        <HugeiconsIcon
          icon={BubbleChatIcon}
          size={20}
          color="var(--color-primary)"
          strokeWidth={2}
        />
      </div>
      <span
        className="custom-bg-ping-always absolute right-0 bottom-0 block size-[10px] rounded-full border border-background bg-(--theme-ring) shadow-none"
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
  className?: string;
}

export function RioBotChatPanel({ onClose, className }: RioBotChatPanelProps) {
  const [input, setInput] = useState("");
  const { messages, isLoading, error, sendMessage, reset } = useInterviewBot();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-border/40 px-4 py-3">
        <ChatHeaderAvatar />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-xl leading-tight font-bold tracking-tight text-foreground">
            RioBot
          </p>
          <p className="mt-0.5 text-sm leading-tight text-body-text/55">
            Twice the smarts, half the sentience!
          </p>
        </div>
        {hasMessages && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={reset}
            aria-label="New conversation"
            className="text-body-text/50 hover:bg-foreground/10 hover:text-foreground"
          >
            <HugeiconsIcon
              icon={Refresh01Icon}
              size={18}
              color="currentColor"
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
            className="text-body-text/50 hover:bg-foreground/10 hover:text-foreground"
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={24}
              color="currentColor"
              strokeWidth={2.5}
            />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div
        className="interview-bot-messages flex-1 space-y-4 overflow-y-auto bg-secondary px-4 py-4"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-busy={isLoading}
        aria-label="RioBot conversation"
      >
        {/* Empty state with suggestions */}
        {!hasMessages && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex min-h-full w-full max-w-full flex-col items-center justify-center gap-5 px-2 pt-8"
          >
            <div className="w-full text-center">
              <div className="relative mx-auto mb-6 flex h-23 w-23 shrink-0 items-center justify-center">
                <SparkleAccent
                  size={20}
                  className="absolute top-0 right-0 text-primary/30"
                />
                <SparkleAccent
                  size={12}
                  className="absolute bottom-0 left-0 text-primary/30"
                />
                <div className="flex size-20 items-center justify-center rounded-[1.35rem] border border-border/35 bg-[color-mix(in_oklab,var(--theme-foreground-primary)_38%,var(--theme-background-secondary)_62%)] [corner-shape:squircle]">
                  <HugeiconsIcon
                    icon={BubbleChatIcon}
                    size={28}
                    color="var(--color-primary)"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <p className="font-sans text-base font-semibold text-foreground">
                Ask me anything
              </p>
            </div>
            <div className="flex w-full max-w-80 flex-col items-stretch gap-4">
              {SUGGESTED_QUESTIONS.map((q) => (
                <Button
                  key={q.text}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => handleSuggestion(q.text)}
                  className="grid h-auto w-full grid-cols-[32px_1fr] justify-center gap-2 rounded-full border-2 bg-transparent px-15 py-4 text-left text-base leading-snug font-semibold whitespace-normal shadow-none hover:bg-foreground/10 md:text-sm"
                  style={{
                    borderColor: q.color,
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
                "max-w-[82%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm bg-tertiary/80 text-body-text",
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
            <div className="rounded-xl rounded-bl-sm bg-tertiary/80 px-3.5 py-2.5">
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
        className="border-t border-border/40 bg-secondary/30 px-3 py-3"
      >
        <label htmlFor="interview-bot-input" className="sr-only">
          Ask Rio a question
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-border/40 bg-secondary px-3 py-2 transition-colors focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-ring/30 md:gap-2 md:px-3 md:py-1.5">
          <textarea
            id="interview-bot-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            enterKeyHint="send"
            placeholder="Ask a question..."
            rows={1}
            className="max-h-24 min-h-[calc(max(16px,1rem)+var(--spacing)*2)] flex-1 resize-none overflow-y-auto bg-transparent p-0 text-[max(16px,1rem)] leading-snug outline-none placeholder:text-body-text/30 md:min-h-0 md:py-1 md:text-sm"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <AnimatePresence>
            {input.trim() && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="flex shrink-0 items-center justify-center"
              >
                <Button
                  type="submit"
                  size="icon-sm"
                  disabled={isLoading}
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
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
