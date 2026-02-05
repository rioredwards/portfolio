import { expect, test } from '@playwright/test';

import { HomePage } from './pom/home-page';
import {
  primaryBlog,
  primaryBlogFrontmatter,
  primaryProject,
  primaryProjectFrontmatter,
} from './support/site-data';

test.describe.configure({ mode: 'serial' });

test.describe('Project and blog modals', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
   home = new HomePage(page);
   await home.goto();
    await home.waitForHydration();
  });

  test('opens and closes the project modal from the homepage', async ({ page }) => {
    const card = home.projectCardByTitle(primaryProject.title);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(new RegExp(`\\?project=${primaryProject.slug}`));

    await expect(
      home
        .dialog()
        .getByRole('heading', { level: 1, name: primaryProject.title }),
    ).toBeVisible();
    await expect(home.dialog().getByTestId('project-category')).toHaveText(
      primaryProject.category,
    );
    if (primaryProjectFrontmatter.skills.length > 0) {
      await expect(
        home.dialog().getByTestId('project-skill').first(),
      ).toHaveText(primaryProjectFrontmatter.skills[0]);
    }

    await home.closeDialogButton().click();

    await expect(home.dialog()).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
  });

  test('opens and closes the blog modal from the homepage', async ({ page }) => {
    const card = home.blogCardByTitle(primaryBlog.title);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(new RegExp(`\\?blog=${primaryBlog.slug}`));

    await expect(
      home
        .dialog()
        .getByRole('heading', { level: 1, name: primaryBlog.title }),
    ).toBeVisible();
    if (primaryBlogFrontmatter.tags?.length) {
      await expect(
        home.dialog().getByTestId('blog-tag').first(),
      ).toHaveText(primaryBlogFrontmatter.tags[0]);
    }

    await home.closeDialogButton().click();

    await expect(home.dialog()).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
  });

  test('supports deep-linking directly to a project detail page', async ({ page }) => {
    await page.goto(`/work/${primaryProject.slug}`, { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', { level: 1, name: primaryProject.title }),
    ).toBeVisible();
    await expect(page.getByTestId('project-category')).toHaveText(
      primaryProject.category,
    );
    if (primaryProjectFrontmatter.skills.length > 0) {
      await expect(page.getByTestId('project-skill').first()).toHaveText(
        primaryProjectFrontmatter.skills[0],
      );
    }
  });

  test('supports deep-linking directly to a blog detail page', async ({ page }) => {
    await page.goto(`/blog/${primaryBlog.slug}`, { waitUntil: 'domcontentloaded' });

    await expect(
      page.getByRole('heading', { level: 1, name: primaryBlog.title }),
    ).toBeVisible();
    if (primaryBlogFrontmatter.tags?.length) {
      await expect(page.getByTestId('blog-tag').first()).toHaveText(
        primaryBlogFrontmatter.tags[0],
      );
    }
  });
});
