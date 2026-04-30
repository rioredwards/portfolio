import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Matches globals.css theme tokens */
const BG = "#ecdfca";
const FG = "#2d645d";
const FG_SECONDARY = "#5c4b3e";
const CARD = "#fdfbf6";
const BORDER = "#dab773";

export const alt = "RioBot — Chat with Rio's AI assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mazaeniFont, dmSans500, dmSans700] = await Promise.all([
    readFile(join(process.cwd(), "fonts", "Mazaeni-ExtraBold.ttf")),
    fetch(
      "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHTWEBlw.ttf",
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZ2IHTWEBlwu.ttf",
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Subtle radial glow behind the card */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(45, 100, 93, 0.08) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* RioBot title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "32px",
        }}
      >
        {/* Bot icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: FG,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fdfbf6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: "52px",
            fontFamily: "Mazaeni",
            color: FG,
            letterSpacing: "-0.02em",
          }}
        >
          RioBot
        </span>
      </div>

      {/* Main input card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "780px",
          backgroundColor: CARD,
          borderRadius: "28px",
          padding: "24px 28px 24px 36px",
          boxShadow:
            "0 4px 6px rgba(50, 48, 44, 0.04), 0 12px 32px rgba(50, 48, 44, 0.08), 0 0 0 1px rgba(218, 183, 115, 0.5)",
        }}
      >
        {/* Placeholder text */}
        <span
          style={{
            fontSize: "32px",
            fontFamily: "DM Sans",
            fontWeight: 500,
            color: FG_SECONDARY,
            opacity: 0.5,
          }}
        >
          Ask me anything...
        </span>

        {/* Send button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: FG,
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fdfbf6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Cursor pointing at send button */}
      <div
        style={{
          position: "absolute",
          bottom: "195px",
          right: "250px",
          display: "flex",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
      >
        <svg width="40" height="48" viewBox="0 0 24 24" fill="#1a1a1a">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L5.88 2.77a.5.5 0 0 0-.85.35l.47.09z" />
        </svg>
      </div>

      {/* Decorative sparkles */}
      <div
        style={{
          position: "absolute",
          top: "110px",
          right: "200px",
          display: "flex",
          color: "rgba(45, 100, 93, 0.2)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "140px",
          left: "160px",
          display: "flex",
          color: "rgba(45, 100, 93, 0.15)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          top: "180px",
          left: "120px",
          display: "flex",
          color: "rgba(218, 183, 115, 0.3)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Mazaeni",
          data: mazaeniFont,
          style: "normal",
          weight: 800,
        },
        {
          name: "DM Sans",
          data: dmSans500,
          style: "normal",
          weight: 500,
        },
        {
          name: "DM Sans",
          data: dmSans700,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
