import { expect, test } from '@playwright/test';

import { HomePage } from './pom/home-page';

test.describe('Contact form validation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();
    await home.sectionHeading('Contact').scrollIntoViewIfNeeded();
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test('enforces client-side validation before enabling submit', async ({ page }) => {
    const form = home.contactForm();
    const nameError = form.getByRole('alert').filter({ hasText: 'Name is required.' });
    const emailRequiredError = form
      .getByRole('alert')
      .filter({ hasText: 'Email is required.' });
    const emailFormatError = form
      .getByRole('alert')
      .filter({ hasText: 'Please enter a valid email address.' });
    const messageError = form
      .getByRole('alert')
      .filter({ hasText: 'Message is required.' });

    await home.nameInput().focus();
    await home.nameInput().blur();
    await expect(nameError).toBeVisible();

    await home.emailInput().focus();
    await home.emailInput().blur();
    await expect(emailRequiredError).toBeVisible();

    await home.emailInput().fill('invalid-email');
    await home.emailInput().blur();
    await expect(emailFormatError).toBeVisible();

    await home.messageInput().focus();
    await home.messageInput().blur();
    await expect(messageError).toBeVisible();

    await home.nameInput().fill('Rio Tester');
    await expect(nameError).toHaveCount(0);

    await home.emailInput().fill('rio@example.com');
    await expect(emailRequiredError).toHaveCount(0);
    await expect(emailFormatError).toHaveCount(0);

    await home.messageInput().fill('Happy to chat about opportunities and collaborations.');
    await expect(messageError).toHaveCount(0);

    await expect(home.sendButton()).toBeEnabled();
  });
});
