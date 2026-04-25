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
    await expect(page.getByText(/Showing \d+-\d+ of \d+ posts/)).toBeVisible();

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

  test("sort dropdown updates URL", async ({ page }) => {
    const sortSelect = page.getByLabel("Sort:");
    await expect(sortSelect).toBeVisible();

    await sortSelect.selectOption("newest");
    await expect(page).toHaveURL(/sort=newest/);

    await sortSelect.selectOption("oldest");
    await expect(page).toHaveURL(/sort=oldest/);

    await sortSelect.selectOption("name");
    await expect(page).toHaveURL(/sort=name/);

    await sortSelect.selectOption("");
    await expect(page).not.toHaveURL(/sort=/);
  });

  test("search input updates URL and filters results", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Search by title, tag, or description…",
    );
    await expect(searchInput).toBeVisible();

    await searchInput.fill("zzzznotfound");
    await page.waitForURL(/q=zzzznotfound/);
    await expect(page.getByText("No posts match your search")).toBeVisible();

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(page).not.toHaveURL(/q=/);
  });

  test("all params compose together in URL", async ({ page }) => {
    const chips = blogFilterChips(page);

    if ((await chips.count()) <= 1) return;

    // Set filter
    await chips.nth(1).click();
    await expect(page).toHaveURL(/tag=/);

    // Set sort
    await page.locator("select").selectOption("newest");
    await expect(page).toHaveURL(/sort=newest/);
    await expect(page).toHaveURL(/tag=/);

    // Set search
    const searchInput = page.getByPlaceholder(
      "Search by title, tag, or description…",
    );
    await searchInput.fill("test");
    await page.waitForURL(/q=test/);

    // All three params should be present
    const url = page.url();
    expect(url).toMatch(/tag=/);
    expect(url).toMatch(/sort=newest/);
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
