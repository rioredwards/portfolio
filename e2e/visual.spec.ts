import { expect, test, type Page } from "@playwright/test";
import { HomePage } from "./pom/home-page";
import { primaryBlog, primaryProject } from "./support/site-data";

// Visual snapshots for PR review. Baselines live in e2e/__screenshots__ and are
// generated ONLY by the `visual` CI job (Linux container) — never run
// `--update-snapshots` locally; macOS pixels won't match. Tagged @visual;
// excluded from the default run unless VISUAL=1 (see playwright.config.ts).
const routes: Record<string, string> = {
  home: "/",
  work: "/work",
  blog: "/blog",
  contact: "/contact",
  resume: "/resume",
  privacy: "/privacy",
  "work-detail": `/work/${primaryProject.slug}`,
  "blog-detail": `/blog/${primaryBlog.slug}`,
};

// Non-deterministic regions: JS-timer rotating word, autoplay carousel, videos.
const dynamicRegions = (page: Page) => [
  page.locator(".rotating-word-container"),
  page.locator(".carousel-fade"),
  page.locator("video"),
];

for (const [name, path] of Object.entries(routes)) {
  test(`${name} @visual`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path, { waitUntil: "networkidle" });
    // Hydration flag is set in the root layout, so it covers every route.
    await new HomePage(page).waitForHydration();
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      mask: dynamicRegions(page),
    });
  });
}
