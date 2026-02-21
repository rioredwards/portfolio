import { expect, test } from "@playwright/test";

test.describe("Resume PDF", () => {
  test("fits on exactly one page", async ({ page, browserName }) => {
    // page.pdf() is only available in Chromium
    test.skip(browserName !== "chromium", "PDF generation requires Chromium");

    await page.goto("/resume", { waitUntil: "networkidle" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      margin: {
        top: "0.5in",
        right: "0.55in",
        bottom: "0.5in",
        left: "0.55in",
      },
      printBackground: true,
    });

    // Count pages by matching /Type /Page dictionary entries (not /Type /Pages)
    const pdfStr = Buffer.from(pdfBuffer).toString("latin1");
    const pageMatches = pdfStr.match(/\/Type\s*\/Page\b(?!s)/g);
    const pageCount = pageMatches ? pageMatches.length : 0;

    expect(
      pageCount,
      `Resume PDF is ${pageCount} page(s). Must be exactly 1. ` +
        `Reduce content or adjust --print-base-font / --print-base-space in resume.css.`,
    ).toBe(1);
  });
});
