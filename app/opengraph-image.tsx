import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Rio Edwards — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mazaeniFont = await readFile(
    join(process.cwd(), "fonts", "Mazaeni-ExtraBold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        background: "#ecdfca",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontFamily: "Mazaeni",
          color: "#2d645d",
        }}
      >
        {"Hello, I'm Rio."}
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
      ],
    },
  );
}
