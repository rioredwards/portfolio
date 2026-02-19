/**
 * Generate a static resume PDF from the /resume page using Playwright.
 *
 * Usage:
 *   bun run resume:pdf              # Requires a running dev server on localhost:3000
 *   BASE_URL=http://localhost:4000 bun run resume:pdf   # Custom URL
 *
 * The script:
 *   1. Connects to the running Next.js dev/preview server
 *   2. Opens /resume in headless Chromium
 *   3. Waits for the resume content to render
 *   4. Generates a letter-sized PDF with matching margins
 *   5. Saves to public/Rio_Edwards_Resume.pdf
 */

import { chromium } from "playwright";
import { resolve } from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUTPUT_PATH = resolve(__dirname, "../public/Rio_Edwards_Resume.pdf");

async function generateResumePdf() {
  console.log(`Connecting to ${BASE_URL}/resume …`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });

  // Wait for the resume article to be rendered
  await page.waitForSelector("article[aria-label='Resume']");

  // Generate PDF with letter size and consistent margins
  await page.pdf({
    path: OUTPUT_PATH,
    format: "Letter",
    margin: {
      top: "0.5in",
      right: "0.55in",
      bottom: "0.5in",
      left: "0.55in",
    },
    printBackground: false,
  });

  await browser.close();

  console.log(`✓ Resume PDF saved to ${OUTPUT_PATH}`);
}

generateResumePdf().catch((err) => {
  console.error("Failed to generate resume PDF:", err);
  process.exit(1);
});
