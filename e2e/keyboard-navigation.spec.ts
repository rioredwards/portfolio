import { expect, test } from "@playwright/test";

import { HomePage } from "./pom/home-page";
import { primaryBlog, primaryProject } from "./support/site-data";

test.describe("Keyboard navigation", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();
  });

  test("closes project modal with Escape key", async ({ page }) => {
    // Open a project modal
    const card = home.projectCardByTitle(primaryProject.title);
    await card.scrollIntoViewIfNeeded();
    await card.click();

    // Modal should be open
    const modal = home.dialog();
    await expect(modal).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Modal should be closed
    await expect(modal).toBeHidden();
  });

  test("closes blog modal with Escape key", async ({ page }) => {
    // Open a blog modal
    const card = home.blogCardByTitle(primaryBlog.title);
    await card.scrollIntoViewIfNeeded();
    await card.click();

    // Modal should be open
    const modal = home.dialog();
    await expect(modal).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Modal should be closed
    await expect(modal).toBeHidden();
  });

  test("closes mobile menu with Escape key", async ({ page }) => {
    // Use mobile viewport
    await page.setViewportSize({ width: 430, height: 900 });

    // Open mobile menu
    await home.mobileMenuButton().click();
    await expect(home.mobileMenuDialog()).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Menu should be closed
    await expect(home.mobileMenuDialog()).toBeHidden();
  });

  test("Tab navigates through interactive elements", async ({ page }) => {
    // Start from skip link
    await page.keyboard.press("Tab");

    // First focusable element should be the skip to content link
    await expect(home.skipToContentLink()).toBeFocused();

    // Tab to navigation links
    await page.keyboard.press("Tab");

    // Should focus on a navigation element
    const activeElement = page.locator(":focus");
    await expect(activeElement).toBeVisible();
  });
});

test.describe("Focus trap in modals", () => {
  test("modal traps focus within its bounds", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();

    // Open a project modal
    const card = home.projectCardByTitle(primaryProject.title);
    await card.scrollIntoViewIfNeeded();
    await card.click();

    // Modal should be open
    const modal = home.dialog();
    await expect(modal).toBeVisible();

    // Tab through the modal elements multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
    }

    // Check that focus is still inside the modal
    const focusedElement = page.locator(":focus");
    const focusCount = await focusedElement.count();

    // If there's a focused element, verify it's in the modal
    if (focusCount > 0) {
      const isInModal = await focusedElement.evaluate((el) => {
        return el.closest('[role="dialog"]') !== null;
      });
      expect(isInModal).toBe(true);
    }
  });
});
