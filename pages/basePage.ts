import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly closeToastLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeToastLocator = page.locator("//button[@aria-label='close']");
  }

  async closeToast() {
    await this.closeToastLocator.click();
  }

  // Playwright handles auto-waiting, but we can provide explicit wait methods if needed
  async waitForElementAppear(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 240000 });
  }

  async waitForElementToDisappear(locator: Locator) {
    await locator.waitFor({ state: 'hidden', timeout: 240000 });
  }
}
