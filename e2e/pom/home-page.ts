import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async waitForHydration() {
    await this.page.waitForFunction(
      () => document.documentElement.dataset.appHydrated === "true",
    );
  }

  heroHeading(): Locator {
    return this.page.getByRole("heading", { name: "Hello, I'm Rio." });
  }

  heroTagline(): Locator {
    return this.page.getByText("I build", { exact: false }).first();
  }

  resumeCta(): Locator {
    return this.page.locator(
      '[data-testid="hero-resume-link-desktop"]:visible, [data-testid="hero-resume-link-mobile"]:visible',
    );
  }

  skipToContentLink(): Locator {
    return this.page.getByRole("link", { name: "Skip to content" });
  }

  navigationLink(label: string): Locator {
    return this.page.getByRole("link", { name: label }).first();
  }

  sectionHeading(title: string): Locator {
    return this.page.getByRole("heading", { name: title });
  }

  projectCards(): Locator {
    return this.page.getByTestId("project-card");
  }

  blogCards(): Locator {
    return this.page.getByTestId("blog-card");
  }

  projectCardByTitle(title: string): Locator {
    return this.projectCards().filter({ hasText: title }).first();
  }

  blogCardByTitle(title: string): Locator {
    return this.blogCards().filter({ hasText: title }).first();
  }

  dialog(): Locator {
    return this.page.getByRole("dialog");
  }

  closeDialogButton(): Locator {
    return this.page.getByRole("button", { name: "Close" });
  }

  contactForm(): Locator {
    return this.page.locator("#contact-form");
  }

  nameInput(): Locator {
    return this.contactForm().getByLabel("Full Name");
  }

  emailInput(): Locator {
    return this.contactForm().getByLabel("Email");
  }

  messageInput(): Locator {
    return this.contactForm().getByLabel("Message");
  }

  sendButton(): Locator {
    return this.page.getByRole("button", { name: /send/i }).first();
  }

  mobileMenuButton(): Locator {
    return this.page.getByRole("button", { name: "Open menu" });
  }

  mobileMenuDialog(): Locator {
    return this.page.getByRole("dialog", { name: "Mobile navigation menu" });
  }

  mobileMenuLinks(): Locator {
    return this.mobileMenuDialog().getByRole("link");
  }

  closeMobileMenuButton(): Locator {
    return this.page.getByRole("button", { name: "Close menu" });
  }
}
