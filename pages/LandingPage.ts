import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { HomePage } from './HomePage';

export class LandingPage extends BasePage {
  readonly dataIngestionNavBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.dataIngestionNavBtn = page.locator("//span[contains(.,'Data Ingestion')]/parent::div");
  }

  async goTo(): Promise<HomePage> {
    const url = process.env.URL || 'https://borrowing-base-uat.azurewebsites.net/';
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 240000 });
    await this.waitForElementAppear(this.dataIngestionNavBtn);
    return new HomePage(this.page);
  }
}
