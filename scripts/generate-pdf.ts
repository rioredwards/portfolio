#!/usr/bin/env bun
/**
 * Generate the resume PDF from the running dev server.
 *
 * Usage:
 *   bun scripts/generate-pdf.ts [--output PATH] [--font SIZE] [--space SIZE]
 *
 * Default output: public/Rio_Edwards_Resume.pdf
 * Requires `bun dev` to be running on localhost:3000.
 *
 * To generate a variant for a job application:
 *   1. Set RESUME_LOCAL_PATH=./resume-variants/company.json in .env.local
 *   2. Run `bun dev` (the page will render the variant data)
 *   3. Run: bun generate:pdf -- --output ./resume-variants/company.pdf
 *      Or with custom sizing: bun generate:pdf -- --output ./resume-variants/company.pdf --font 10pt --space 4pt
 *
 * --font and --space inject CSS variable overrides at runtime so you never need
 * to edit resume.css for a variant. Production CSS values stay untouched.
 * Variants are gitignored. Never overwrite public/Rio_Edwards_Resume.pdf with a variant.
 */

import { writeFile } from "fs/promises";
import { resolve } from "path";
import { chromium } from "playwright";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_OUTPUT = "public/Rio_Edwards_Resume.pdf";

const args = process.argv.slice(2);
let baseUrl = DEFAULT_BASE_URL;
let output = DEFAULT_OUTPUT;
let fontOverride: string | null = null;
let spaceOverride: string | null = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base-url" && args[i + 1]) baseUrl = args[++i];
  if (args[i] === "--output" && args[i + 1]) output = args[++i];
  if (args[i] === "--font" && args[i + 1]) fontOverride = args[++i];
  if (args[i] === "--space" && args[i + 1]) spaceOverride = args[++i];
}

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle" });
} catch {
  await browser.close();
  console.error(`\nError: could not reach ${baseUrl}/resume`);
  console.error(`Make sure the dev server is running first:\n\n  bun dev\n`);
  process.exit(1);
}

// Inject CSS variable overrides for variant generation.
// Use --font / --space args instead of editing resume.css so production CSS stays untouched.
if (fontOverride || spaceOverride) {
  await page.evaluate(
    ({ font, space }) => {
      const style = document.createElement("style");
      style.textContent = `@media print { .resume {
        ${font ? `--print-base-font: ${font} !important;` : ""}
        ${space ? `--print-base-space: ${space} !important;` : ""}
      }}`;
      document.head.appendChild(style);
    },
    { font: fontOverride, space: spaceOverride },
  );
}

// Margins are handled via CSS html padding in resume.css. Do NOT set margin
// here or Playwright will clip the rendered content before CSS margins apply.
const pdf = await page.pdf({
  format: "Letter",
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  printBackground: true,
});

await writeFile(resolve(output), pdf);
await browser.close();

console.log(`PDF saved to ${output}`);
