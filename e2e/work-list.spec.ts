import { expect, test, type Page } from "@playwright/test";

function workFilterChips(page: Page) {
  const section = page.locator("section[aria-label='Projects list']");
  return section.locator(":scope > div").first().getByRole("link");
}

test.describe("Work list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/work");
    await page.waitForLoadState("domcontentloaded");
  });

  test("renders page header and project cards", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Work", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByText(/Showing \d+-\d+ of \d+ projects/),
    ).toBeVisible();

    const cards = page.locator("section[aria-label='Projects list'] article");
    await expect(cards.first()).toBeVisible();
  });

  test("filter chips update URL and filter results", async ({ page }) => {
    const filterSection = page.locator("section[aria-label='Projects list']");
    const chips = workFilterChips(page);

    const chipCount = await chips.count();
    if (chipCount <= 1) return;

    await chips.nth(1).click();

    await expect(page).toHaveURL(/category=/);
    await expect(
      page.getByText(/Showing \d+-\d+ of \d+ projects/),
    ).toBeVisible();

    // "All" chip should clear the filter
    await filterSection.getByRole("link", { name: "All" }).click();
    await expect(page).not.toHaveURL(/category=/);
  });

  test("sort dropdown updates URL and preserves filter", async ({ page }) => {
    const sortSelect = page.getByLabel("Sort:");
    await expect(sortSelect).toBeVisible();

    await sortSelect.selectOption("name");
    await expect(page).toHaveURL(/sort=name/);

    // Select curated (default) clears the sort param
    await sortSelect.selectOption("");
    await expect(page).not.toHaveURL(/sort=/);
  });

  test("search input updates URL and filters results", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search projects...");
    await expect(searchInput).toBeVisible();

    await searchInput.fill("zzzznotfound");
    await page.waitForURL(/q=zzzznotfound/);
    await expect(page.getByText("No projects match your search")).toBeVisible();

    // Clear search
    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(page).not.toHaveURL(/q=/);
  });

  test("pagination preserves filter, sort, and search params", async ({
    page,
  }) => {
    // Check if pagination exists (might not with few items)
    const nextButton = page
      .getByRole("navigation", { name: "Pagination" })
      .getByRole("link", { name: "Next" });
    const isDisabled = await nextButton.getAttribute("aria-disabled");

    if (isDisabled === "true") return;

    // Set a sort param first
    await page.getByLabel("Sort:").selectOption("name");
    await page.waitForURL(/sort=name/);

    // Navigate to page 2
    await nextButton.click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page).toHaveURL(/sort=name/);
  });

  test("changing filter resets to page 1", async ({ page }) => {
    const nextButton = page
      .getByRole("navigation", { name: "Pagination" })
      .getByRole("link", { name: "Next" });
    const isDisabled = await nextButton.getAttribute("aria-disabled");

    if (isDisabled === "true") return;

    await nextButton.click();
    await page.waitForURL(/page=2/);

    // Click a filter chip
    const chips = workFilterChips(page);
    if ((await chips.count()) <= 1) return;

    await chips.nth(1).click();
    await expect(page).not.toHaveURL(/page=2/);
  });
});
