import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "RioBot — Chat with Rio's AI assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mazaeniFont, dmSansFont] = await Promise.all([
    readFile(join(process.cwd(), "fonts", "Mazaeni-ExtraBold.ttf")),
    fetch(
      "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHTWEBlw.ttf"
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(180deg, #ecdfca 0%, #f4ebda 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      {/* Input field container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Main input box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#f4ebda",
            borderRadius: "28px",
            padding: "24px 32px",
            boxShadow: "0 8px 32px rgba(50, 48, 44, 0.08)",
            border: "2px solid #dab773",
          }}
        >
          {/* Placeholder text */}
          <span
            style={{
              fontSize: "42px",
              fontFamily: "DM Sans",
              color: "#5c4b3e",
              opacity: 0.5,
            }}
          >
            Message RioBot
          </span>
        </div>

        {/* Bottom row with icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: "20px",
            paddingLeft: "20px",
            gap: "16px",
          }}
        >
          {/* Paperclip icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              color: "#5c4b3e",
              opacity: 0.4,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </div>

          {/* Chat bubble button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "rgba(45, 100, 93, 0.12)",
              borderRadius: "24px",
              padding: "12px 24px",
              border: "1.5px solid rgba(45, 100, 93, 0.25)",
            }}
          >
            {/* Chat bubble icon */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2d645d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontFamily: "DM Sans",
                color: "#2d645d",
                fontWeight: 500,
              }}
            >
              Ask Rio
            </span>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          bottom: "180px",
          left: "580px",
          display: "flex",
        }}
      >
        <svg
          width="40"
          height="48"
          viewBox="0 0 24 24"
          fill="#32302c"
          stroke="#ecdfca"
          strokeWidth="1"
        >
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L5.88 2.77a.5.5 0 0 0-.85.35l.47.09z" />
        </svg>
      </div>

      {/* Sparkle accents */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "180px",
          display: "flex",
          color: "rgba(45, 100, 93, 0.25)",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1.1Q14.35 9.35 22.62 12Q14.35 14.65 12 22.9Q9.65 14.65 1.38 12Q9.65 9.35 12 1.1z" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "140px",
          display: "flex",
          color: "rgba(45, 100, 93, 0.18)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1.1Q14.35 9.35 22.62 12Q14.35 14.65 12 22.9Q9.65 14.65 1.38 12Q9.65 9.35 12 1.1z" />
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
          data: dmSansFont,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
