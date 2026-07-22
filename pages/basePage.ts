import { Page, Locator, expect, TestInfo } from '@playwright/test';

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

   setLongTimeout(testInfo: TestInfo) {
    testInfo.setTimeout(720 * 1000); 
  }
  async waitForElementAppear(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 500*1000 });
  }

  async waitForElementToDisappear(locator: Locator) {
    await locator.waitFor({ state: 'hidden', timeout: 90*1000 });
  }
}
