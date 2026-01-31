"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import "./RotatingWord.css";

type RotatingWordProps = {
  words: string[];
  className?: string;
};

const ANIMATION_PAUSE_DURATION = 1000;
const ANIMATION_DURATION = 1500;
const LETTER_ANIMATION_DELAY = 0.008;
const LETTER_ANIMATION_INDEX_DELAY = 0.02;

type AnimationPhase = "preSwap" | "duringSwap" | "postSwap";

export function RotatingWord({ words, className }: RotatingWordProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [nextWordIdx, setNextWordIdx] = useState(1);
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("preSwap");

  function swapWords() {
    setCurrentWordIdx(nextWordIdx);
    setNextWordIdx((prev) => (prev + 1) % words.length);
  }

  // Progress through animation phases
  useEffect(() => {
    // setCount((prev) => prev + 1);
    switch (animationPhase) {
      case "preSwap":
        setTimeout(() => {
          setAnimationPhase("duringSwap");
        }, ANIMATION_PAUSE_DURATION);
        break;
      case "duringSwap":
        console.log("hi");
        setTimeout(() => {
          setAnimationPhase("postSwap");
        }, ANIMATION_DURATION);
        break;
      case "postSwap":
        setTimeout(() => {
          swapWords();
          setAnimationPhase("preSwap");
        }, 0);
        break;
    }
  }, [animationPhase]);

  return (
    <>
      {/* <span className="debug">{animationPhase}</span> */}
      <span
        className={cn("rotating-word-container", className)}
        style={
          {
            "--animation-duration": `${ANIMATION_DURATION}ms`,
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
        <span className={`rotating-word-bottom ${animationPhase}`}>
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
      </span>
    </>
  );
}
