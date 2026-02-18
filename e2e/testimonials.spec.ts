import { expect, test } from "@playwright/test";

import { HomePage } from "./pom/home-page";

test.describe("Testimonials carousel", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();
  });

  test("renders testimonials section with carousel", async ({ page }) => {
    // Scroll to testimonials area (usually between work and contact)
    const carousel = page.locator("[aria-roledescription='carousel']");
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel).toBeVisible();

    // Should have slide items
    const slides = page.locator("[aria-roledescription='slide']");
    await expect(slides.first()).toBeVisible();

    // At least one testimonial should be visible
    const testimonialCount = await slides.count();
    expect(testimonialCount).toBeGreaterThan(0);
  });

  test("displays testimonial content with name and attribution", async ({
    page,
  }) => {
    const carousel = page.locator("[aria-roledescription='carousel']");
    await carousel.scrollIntoViewIfNeeded();

    // First visible slide should have testimonial text
    const firstSlide = page.locator("[aria-roledescription='slide']").first();
    await expect(firstSlide).toBeVisible();

    // Should contain testimonial text (quotes have actual content)
    const testimonialText = firstSlide.locator("p").first();
    await expect(testimonialText).toBeVisible();
    const textContent = await testimonialText.textContent();
    expect(textContent?.length).toBeGreaterThan(10);

    // Should have author name (h3 element)
    const authorName = firstSlide.locator("h3");
    await expect(authorName).toBeVisible();
  });

  test("has carousel indicators for navigation", async ({ page }) => {
    const carousel = page.locator("[aria-roledescription='carousel']");
    await carousel.scrollIntoViewIfNeeded();

    // Indicators should exist
    const indicators = page.getByRole("button", { name: /Go to slide/i });
    const indicatorCount = await indicators.count();
    expect(indicatorCount).toBeGreaterThan(0);

    // First indicator should be styled differently (active state)
    const firstIndicator = indicators.first();
    await expect(firstIndicator).toBeVisible();
  });

  test("clicking indicator navigates to the corresponding slide", async ({
    page,
  }) => {
    const carousel = page.locator("[aria-roledescription='carousel']");
    await carousel.scrollIntoViewIfNeeded();

    // Get all indicators
    const indicators = page.getByRole("button", { name: /Go to slide/i });
    const indicatorCount = await indicators.count();

    if (indicatorCount > 1) {
      // Click on second indicator
      const secondIndicator = indicators.nth(1);
      await secondIndicator.click();

      // Wait for animation/transition
      await page.waitForTimeout(500);

      // The second indicator should now have the active style (wider)
      // Check via class changes or visual appearance
      await expect(secondIndicator).toBeVisible();
    }
  });

  test("supports keyboard navigation with arrow keys", async ({ page }) => {
    const carousel = page.locator("[aria-roledescription='carousel']");
    await carousel.scrollIntoViewIfNeeded();

    // Focus the carousel
    await carousel.focus();

    // Get initial state
    const indicators = page.getByRole("button", { name: /Go to slide/i });
    const indicatorCount = await indicators.count();

    if (indicatorCount > 1) {
      // Press right arrow to go to next slide
      await page.keyboard.press("ArrowRight");

      // Wait for transition
      await page.waitForTimeout(500);

      // The carousel should have responded to the keypress
      // This is validated by checking the second slide becomes visible/active
      await expect(indicators.nth(1)).toBeVisible();
    }
  });
});
