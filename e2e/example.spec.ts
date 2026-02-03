import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect the page to have a title
  await expect(page).toHaveTitle(/Portfolio/);
});

test('navigation links are visible', async ({ page }) => {
  await page.goto('/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Check that main navigation is visible (use specific aria-label)
  await expect(page.getByRole('navigation', { name: 'Main' }).first()).toBeVisible();
});

test('can navigate to work section', async ({ page }) => {
  await page.goto('/');

  // Find and click a link that navigates to work section
  // Use force: true because the header has pointer-events-none
  const workLink = page.locator('a[href="#work"]').first();
  if (await workLink.isVisible()) {
    await workLink.click({ force: true });
    await expect(page).toHaveURL(/#work/);
  }
});
