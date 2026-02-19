"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import "./RotatingWord.css";

type RotatingWordProps = {
  words: string[];
  className?: string;
  direction?: "up" | "down";
  color?: string;
  pauseDuration?: number;
  initialDelay?: number;
};

const ANIMATION_PAUSE_DURATION = 1400;
const ANIMATION_DURATION = 1500;
const LETTER_ANIMATION_DELAY = 0.05;
const LETTER_ANIMATION_INDEX_DELAY = 0.006;

type AnimationPhase = "preSwap" | "duringSwap" | "postSwap";

export function RotatingWord({
  words,
  className,
  direction = "up",
  color,
  pauseDuration = ANIMATION_PAUSE_DURATION,
  initialDelay = 0,
}: RotatingWordProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [nextWordIdx, setNextWordIdx] = useState(1);
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("preSwap");
  const [isInitialized, setIsInitialized] = useState(initialDelay === 0);

  function swapWords() {
    setCurrentWordIdx(nextWordIdx);
    setNextWordIdx((prev) => (prev + 1) % words.length);
  }

  // Handle initial delay
  useEffect(() => {
    if (initialDelay > 0 && !isInitialized) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, initialDelay);
      return () => clearTimeout(timer);
    }
  }, [initialDelay, isInitialized]);

  // Progress through animation phases
  useEffect(() => {
    if (!isInitialized) return;

    switch (animationPhase) {
      case "preSwap":
        setTimeout(() => {
          setAnimationPhase("duringSwap");
        }, pauseDuration);
        break;
      case "duringSwap": {
        // Account for the last letter's delay so every letter finishes animating
        const maxLetters = Math.max(
          words[currentWordIdx].length,
          words[nextWordIdx].length,
        );
        const lastLetterDelay =
          (maxLetters - 1) *
          (LETTER_ANIMATION_DELAY + LETTER_ANIMATION_INDEX_DELAY) *
          1000;
        setTimeout(() => {
          setAnimationPhase("postSwap");
        }, ANIMATION_DURATION + lastLetterDelay);
        break;
      }
      case "postSwap":
        setTimeout(() => {
          swapWords();
          setAnimationPhase("preSwap");
        }, 0);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPhase, isInitialized, pauseDuration]);

  const directionClass = direction === "down" ? "rotate-down" : "rotate-up";

  return (
    <>
      {/* <span className="debug">{animationPhase}</span> */}
      <span
        className={cn("rotating-word-container", directionClass, className)}
        style={
          {
            "--animation-duration": `${ANIMATION_DURATION}ms`,
            "--rotating-word-color": color,
          } as React.CSSProperties
        }
      >
        <span className="rotating-word-gradient-overlay" aria-hidden></span>
        <span className={`rotating-word-top ${animationPhase}`}>
          {(words[currentWordIdx] as string).split("").map((letter, index) => (
            <span
              key={index}
              className="rotating-word-letter"
              style={{
                animationDelay: `${index * LETTER_ANIMATION_DELAY + index * LETTER_ANIMATION_INDEX_DELAY}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </span>
        {/* Only in DOM during animation so crawlers don't see two words concatenated */}
        {(animationPhase === "duringSwap" || animationPhase === "postSwap") && (
          <span
            className={`rotating-word-bottom ${animationPhase}`}
            aria-hidden="true"
          >
            {(words[nextWordIdx] as string).split("").map((letter, index) => (
              <span
                key={index}
                className="rotating-word-letter"
                style={{
                  animationDelay: `${index * LETTER_ANIMATION_DELAY + index * LETTER_ANIMATION_INDEX_DELAY}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        )}
      </span>
    </>
  );
}
