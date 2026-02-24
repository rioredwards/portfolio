#!/usr/bin/env bun
/**
 * Generate the resume PDF from the running dev server.
 *
 * Usage:
 *   bun generate:pdf -- [--input PATH] [--output PATH] [--font SIZE] [--space SIZE] [--watch]
 *
 * --input   Path to a resume JSON variant. Written to resume-variants/current.json
 *           before rendering and cleaned up after. No server restart needed.
 *           Omit to render whatever the server currently has (canonical resume).
 *
 * --output  Output PDF path. Default: public/Rio_Edwards_Resume.pdf
 *
 * --font    Override --print-base-font (e.g. 10pt). Default: 10.5pt
 * --space   Override --print-base-space (e.g. 3.5pt). Default: 4.25pt
 *
 * --watch   Watch --input for changes and regenerate on each save.
 *           Requires --input. Keeps the browser and temp file alive until Ctrl+C.
 *
 * Examples:
 *   bun generate:pdf -- --input ./resume-variants/acme.json --output ./resume-variants/acme.pdf
 *   bun generate:pdf -- --input ./resume-variants/acme.json --output ./resume-variants/acme.pdf --watch
 *   bun generate:pdf -- --output public/Rio_Edwards_Resume.pdf
 *
 * Requires `bun dev` running on localhost:3000.
 * Variants are gitignored. Never overwrite public/Rio_Edwards_Resume.pdf with a variant.
 */

import { writeFile, mkdir, unlink, readFile } from "fs/promises";
import { watch } from "fs";
import { resolve, dirname } from "path";
import { chromium, type Browser } from "playwright";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_OUTPUT = "public/Rio_Edwards_Resume.pdf";
const TEMP_PATH = resolve("./resume-variants/current.json");

const args = process.argv.slice(2);
let baseUrl = DEFAULT_BASE_URL;
let output = DEFAULT_OUTPUT;
let inputPath: string | null = null;
let fontOverride: string | null = null;
let spaceOverride: string | null = null;
let watchMode = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base-url" && args[i + 1]) baseUrl = args[++i];
  if (args[i] === "--input" && args[i + 1]) inputPath = args[++i];
  if (args[i] === "--output" && args[i + 1]) output = args[++i];
  if (args[i] === "--font" && args[i + 1]) fontOverride = args[++i];
  if (args[i] === "--space" && args[i + 1]) spaceOverride = args[++i];
  if (args[i] === "--watch") watchMode = true;
}

if (watchMode && !inputPath) {
  console.error("--watch requires --input");
  process.exit(1);
}

async function generate(browser: Browser): Promise<void> {
  // Write input JSON to temp path so the server picks it up without restarting.
  if (inputPath) {
    const json = await readFile(resolve(inputPath), "utf-8");
    await mkdir(dirname(TEMP_PATH), { recursive: true });
    await writeFile(TEMP_PATH, json);
  }

  const page = await browser.newPage();
  try {
    await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle" });

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

    await mkdir(dirname(resolve(output)), { recursive: true });
    await writeFile(resolve(output), pdf);

    console.log(`PDF saved to ${output}`);
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch();

try {
  await generate(browser);

  if (watchMode && inputPath) {
    console.log(`\nWatching ${inputPath}. Press Ctrl+C to stop.`);

    let debounce: ReturnType<typeof setTimeout> | null = null;
    let generating = false;

    const watcher = watch(resolve(inputPath), () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(async () => {
        if (generating) return;
        generating = true;
        console.log("\nFile changed, regenerating...");
        try {
          await generate(browser);
        } catch (e) {
          console.error("Error:", e instanceof Error ? e.message : e);
        } finally {
          generating = false;
        }
      }, 150);
    });

    await new Promise<void>((res) => {
      process.on("SIGINT", () => {
        watcher.close();
        res();
      });
    });
  }
} catch (e) {
  console.error("\nError:", e instanceof Error ? e.message : e);
  console.error(`Could not reach ${baseUrl}/resume or generate PDF.`);
  console.error(`Make sure the dev server is running first:\n\n  bun dev\n`);
  process.exit(1);
} finally {
  await browser.close();
  // Clean up temp file so the dev server reverts to the canonical resume.
  if (inputPath) {
    try {
      await unlink(TEMP_PATH);
    } catch {}
  }
}
