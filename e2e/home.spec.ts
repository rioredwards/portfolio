import { expect, test } from "@playwright/test";

import { HomePage } from "./pom/home-page";
import { blogCards, projectCards } from "./support/site-data";

test.describe("Homepage content", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
    await home.waitForHydration();
  });

  test("renders hero content with resume CTA", async () => {
    await expect(home.heroHeading()).toBeVisible();
    await expect(home.heroTagline()).toBeVisible();
    await expect(home.resumeCta()).toBeVisible();
    await expect(home.resumeCta()).toHaveAttribute("href", "/resume");
  });

  test("renders work, blog, and contact sections with the correct card counts", async () => {
    await expect(home.sectionHeading("Work")).toBeVisible();
    await expect(home.projectCards()).toHaveCount(projectCards.length);

    for (const project of projectCards) {
      await expect(home.projectCardByTitle(project.title)).toBeVisible();
    }

    await expect(home.sectionHeading("Blog")).toBeVisible();
    await expect(home.blogCards()).toHaveCount(blogCards.length);

    for (const blog of blogCards) {
      await expect(home.blogCardByTitle(blog.title)).toBeVisible();
    }

    await expect(home.sectionHeading("Contact")).toBeVisible();
    await expect(home.contactForm()).toBeVisible();
  });
});
