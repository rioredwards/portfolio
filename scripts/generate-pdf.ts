#!/usr/bin/env bun
/**
 * Generate the resume PDF from the running dev server.
 *
 * Usage:
 *   bun scripts/generate-pdf.ts [--output PATH]
 *
 * Default output: public/Rio_Edwards_Resume.pdf
 * Requires `bun dev` to be running on localhost:3000.
 *
 * To generate a variant for a job application:
 *   1. Set RESUME_LOCAL_PATH=./resume-variants/company.json in .env.local
 *   2. Run `bun dev` (the page will render the variant data)
 *   3. Run `bun generate:pdf -- --output ./resume-variants/company.pdf`
 *   Variants are gitignored. Never overwrite public/Rio_Edwards_Resume.pdf with a variant.
 */

import { writeFile } from "fs/promises";
import { resolve } from "path";
import { chromium } from "playwright";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_OUTPUT = "public/Rio_Edwards_Resume.pdf";

const args = process.argv.slice(2);
let baseUrl = DEFAULT_BASE_URL;
let output = DEFAULT_OUTPUT;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base-url" && args[i + 1]) baseUrl = args[++i];
  if (args[i] === "--output" && args[i + 1]) output = args[++i];
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle" });

// Do not pass margin here. Margins are declared in @page CSS in resume.css.
// Passing margin to page.pdf() overrides @page and causes content to be clipped.
const pdf = await page.pdf({
  format: "Letter",
  printBackground: true,
});

await writeFile(resolve(output), pdf);
await browser.close();

console.log(`PDF saved to ${output}`);
