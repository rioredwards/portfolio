import { expect, test } from "@playwright/test";

import { primaryProject } from "./support/site-data";

test.describe("Lightbox interactions", () => {
  test("project page has lightbox-enabled images", async ({ page }) => {
    // Navigate to a project detail page that has lightbox images
    await page.goto(`/work/${primaryProject.slug}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(
      () => document.documentElement.dataset.appHydrated === "true",
      { timeout: 10000 },
    );

    // Project page should have figure elements with images
    const figures = page.locator("figure");
    await expect(figures.first()).toBeVisible();

    // The ImageOverlayClient should be present
    const imageGroups = page.locator('figure [role="group"]');
    const count = await imageGroups.count();
    expect(count).toBeGreaterThan(0);
  });

  test("image overlay shows active state on click", async ({ page }) => {
    await page.goto(`/work/${primaryProject.slug}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(
      () => document.documentElement.dataset.appHydrated === "true",
      { timeout: 10000 },
    );

    // Find the image group
    const imageGroup = page.locator('figure [role="group"]').first();
    await imageGroup.scrollIntoViewIfNeeded();

    // Click to toggle active state
    await imageGroup.click();

    // Check the active state is set
    await expect(imageGroup).toHaveAttribute("data-active", "true", {
      timeout: 5000,
    });
  });
});

test.describe("Lightbox via modal", () => {
  test("project modal contains lightbox-enabled images", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.dataset.appHydrated === "true",
      { timeout: 10000 },
    );

    // Open a project modal
    const projectCard = page
      .getByTestId("project-card")
      .filter({ hasText: primaryProject.title })
      .first();
    await projectCard.scrollIntoViewIfNeeded();
    await projectCard.click();

    // Wait for modal to open
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Modal should contain figure elements
    const figures = modal.locator("figure");
    await expect(figures.first()).toBeVisible({ timeout: 10000 });

    // The ImageOverlayClient should be present inside the modal
    const imageGroups = modal.locator('figure [role="group"]');
    const count = await imageGroups.count();
    expect(count).toBeGreaterThan(0);
  });

  test("image overlay in modal shows active state on click", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.dataset.appHydrated === "true",
      { timeout: 10000 },
    );

    // Open a project modal
    const projectCard = page
      .getByTestId("project-card")
      .filter({ hasText: primaryProject.title })
      .first();
    await projectCard.scrollIntoViewIfNeeded();
    await projectCard.click();

    // Wait for modal to open
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Find the image group within the modal
    const imageGroup = modal.locator('figure [role="group"]').first();
    await expect(imageGroup).toBeVisible({ timeout: 10000 });
    await imageGroup.scrollIntoViewIfNeeded();

    // Click to toggle active state
    await imageGroup.click();

    // Check the active state is set
    await expect(imageGroup).toHaveAttribute("data-active", "true", {
      timeout: 5000,
    });
  });
});
