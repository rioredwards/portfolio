import { expect, test } from "@playwright/test";

test.describe("Resume PDF", () => {
  // page.pdf() is only available in Chromium
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "PDF generation requires Chromium",
  );

  test("fits on exactly one page", async ({ page }) => {
    await page.goto("/resume", { waitUntil: "networkidle" });

    // Margins are handled via CSS html padding in resume.css. Do NOT set margin
    // here or Playwright will clip the rendered content before CSS margins apply.
    const pdfBuffer = await page.pdf({
      format: "Letter",
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      printBackground: true,
    });

    // Count pages by matching /Type /Page dictionary entries (not /Type /Pages)
    const pdfStr = pdfBuffer.toString("latin1");
    const pageMatches = pdfStr.match(/\/Type\s*\/Page\b(?!s)/g);
    const pageCount = pageMatches ? pageMatches.length : 0;

    expect(
      pageCount,
      `Resume PDF is ${pageCount} page(s). Must be exactly 1. ` +
        `Reduce content or adjust --print-base-font / --print-base-space in resume.css.`,
    ).toBe(1);
  });
});
