import { expect, test } from '@playwright/test';

import { HomePage } from './pom/home-page';

test.describe('Site navigation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();
  });

  test('supports skipping directly to the main content', async ({ page }) => {
    await home.skipToContentLink().focus();
    await home.skipToContentLink().press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
  });

  test('anchors in the main navigation update the URL hash', async ({ page }) => {
    const navTargets = [
      { label: 'Work', hash: '#work' },
      { label: 'Blog', hash: '#blog' },
      { label: 'Contact', hash: '#contact' },
    ];

    for (const target of navTargets) {
      await home.navigationLink(target.label).click();
      await expect(page).toHaveURL(new RegExp(`${target.hash}$`));
    }
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 430, height: 900 } });

  test('opens and closes the floating mobile menu', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();

    await expect(home.mobileMenuButton()).toBeVisible();
    await home.mobileMenuButton().click();
    await expect(home.mobileMenuDialog()).toBeVisible();

    await expect(home.mobileMenuLinks().filter({ hasText: 'GitHub' })).toBeVisible();
    await expect(home.mobileMenuLinks().filter({ hasText: 'Resume' })).toBeVisible();

    await home.closeMobileMenuButton().click();
    await expect(home.mobileMenuDialog()).toBeHidden();
  });
});
