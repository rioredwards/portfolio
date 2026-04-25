import { expect, test, type Page } from "@playwright/test";

function blogFilterChips(page: Page) {
  const section = page.locator("section[aria-label='Blog posts list']");
  return section.locator(":scope > div").first().getByRole("link");
}

test.describe("Blog list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("domcontentloaded");
  });

  test("renders page header and blog cards", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Blog", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(/Showing \d+-\d+ of \d+/)).toBeVisible();

    const cards = page.locator("section[aria-label='Blog posts list'] article");
    await expect(cards.first()).toBeVisible();
  });

  test("filter chips update URL and filter results", async ({ page }) => {
    const section = page.locator("section[aria-label='Blog posts list']");
    const chips = blogFilterChips(page);

    const chipCount = await chips.count();
    if (chipCount <= 1) return;

    await chips.nth(1).click();
    await expect(page).toHaveURL(/tag=/);

    // "All" chip should clear the filter
    await section.getByRole("link", { name: "All" }).click();
    await expect(page).not.toHaveURL(/tag=/);
  });

  test("search input updates URL and filters results", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Search by title, tag, or description…",
    );
    await expect(searchInput).toBeVisible();

    await searchInput.fill("zzzznotfound");
    await page.waitForURL(/q=zzzznotfound/);
    await expect(
      page.getByText("Try a different keyword or clear filters."),
    ).toBeVisible();

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(page).not.toHaveURL(/q=/);
  });

  test("all params compose together in URL", async ({ page }) => {
    const chips = blogFilterChips(page);

    if ((await chips.count()) <= 1) return;

    // Set filter
    await chips.nth(1).click();
    await expect(page).toHaveURL(/tag=/);

    // Set search
    const searchInput = page.getByPlaceholder(
      "Search by title, tag, or description…",
    );
    await searchInput.fill("test");
    await page.waitForURL(/q=test/);

    const url = page.url();
    expect(url).toMatch(/tag=/);
    expect(url).toMatch(/q=test/);
  });

  test("direct URL with search param pre-fills input", async ({ page }) => {
    await page.goto("/blog?q=hello");
    await page.waitForLoadState("domcontentloaded");

    const searchInput = page.getByPlaceholder(
      "Search by title, tag, or description…",
    );
    await expect(searchInput).toHaveValue("hello");
  });
});
