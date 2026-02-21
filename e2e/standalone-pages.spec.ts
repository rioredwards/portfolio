import { expect, test } from "@playwright/test";

test.describe("Resume page", () => {
  test("renders resume content with expected sections", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    // Page header
    await expect(
      page.getByRole("heading", { name: "Resume", level: 1 }),
    ).toBeVisible();

    // Resume article should be present
    const resumeArticle = page.locator("article[aria-label='Resume']");
    await expect(resumeArticle).toBeVisible();

    // Key sections should exist
    await expect(
      resumeArticle.getByRole("heading", { name: "EXPERIENCE" }),
    ).toBeVisible();
    await expect(
      resumeArticle.getByRole("heading", { name: "EDUCATION" }),
    ).toBeVisible();

    // Contact info should be present
    await expect(
      resumeArticle.locator("address[aria-label='Contact info']"),
    ).toBeVisible();
  });

  test("has a PDF download link", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    // Download link should be visible and point to the static PDF
    const downloadLink = page.getByRole("link", { name: /download pdf/i });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute(
      "href",
      "/Rio_Edwards_Resume.pdf",
    );
    await expect(downloadLink).toHaveAttribute("download", /.+/);
  });
});

test.describe("Privacy page", () => {
  test("renders privacy policy content", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("domcontentloaded");

    // Page title
    await expect(
      page.getByRole("heading", { name: "Privacy Policy", level: 1 }),
    ).toBeVisible();

    // Key sections
    await expect(
      page.getByRole("heading", { name: "Overview", level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Analytics", level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Contact Form", level: 2 }),
    ).toBeVisible();
  });

  test("contains link back to homepage", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("domcontentloaded");

    const backLink = page.getByRole("link", { name: /back to home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/");
  });
});

test.describe("404 Not Found page", () => {
  test("renders 404 content for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-12345");
    await page.waitForLoadState("domcontentloaded");

    // Page title
    await expect(
      page.getByRole("heading", { name: "Page Not Found", level: 1 }),
    ).toBeVisible();

    // Helpful message
    await expect(page.getByText(/sorry.*page.*doesn't exist/i)).toBeVisible();
  });

  test("provides a link to return home", async ({ page }) => {
    await page.goto("/nonexistent-route");
    await page.waitForLoadState("domcontentloaded");

    // Use the main content area to find the specific back home link
    const mainContent = page.locator("#main-content");
    const homeLink = mainContent.getByRole("link", { name: /back home/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");

    // Clicking should navigate to home page (pathname should be /)
    await homeLink.click();
    await page.waitForURL((url) => url.pathname === "/");
  });
});
