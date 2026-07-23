import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { HomePage } from './HomePage';
import path from 'path';

export class BaseDataPreview extends BasePage {
  readonly triggerCalculationBtn: Locator;
  readonly confirmProceedBtn: Locator;
  readonly saveBtn: Locator;
  readonly saveTriggerBtn: Locator;
  readonly uploadOtherInfoRadioBtn:Locator;
  readonly otherInfoFileDropzone:Locator;
  readonly extractBtn:Locator;
  readonly fundTypeText: Locator;

  constructor(page: Page) {
    super(page);
    this.triggerCalculationBtn = page.locator("//span[contains(text(),'Trigger Calculation')]/parent::button");
    this.confirmProceedBtn = page.locator("//span[contains(text(),'Confirm & Proceed')]/parent::button");
    this.saveBtn = page.locator("//span[contains(text(),'Save')]/parent::button");
    this.saveTriggerBtn = page.locator('button').filter({ hasText: 'Save & Trigger' }).first();
    this.uploadOtherInfoRadioBtn=page.getByLabel('Upload file to extract');
    this.otherInfoFileDropzone=page.getByRole('presentation');
    this.extractBtn= page.getByRole('button', { name: 'Extract' })
    this.fundTypeText = page.locator("//div[text()='Fund Type']/following-sibling::div//b");
  }

  async clickTriggerButton() {
    await this.waitForElementAppear(this.triggerCalculationBtn);
    await this.triggerCalculationBtn.click();
  }

    async getFundType(): Promise<string> {
    await this.waitForElementAppear(this.fundTypeText);
    return await this.fundTypeText.innerText();
  }

  async clickConfirmAndProceedBtn() {
    await this.clickTriggerButton();
    await this.confirmProceedBtn.click();
  }

  async uploadOtherInfoFile(envVariable: string) {
    await this.uploadOtherInfoRadioBtn.click();
    const file = process.env[envVariable];
    if (!file) {
      throw new Error(`Environment variable '${envVariable}' is not defined.`);
    }
    const filePath = path.resolve(file);
    await this.page.locator('div[role="presentation"] input[type="file"]')
      .setInputFiles(filePath);
    await this.extractBtn.click();
    }

  async clickSaveTriggerButton() {
    await this.saveTriggerBtn.waitFor({ state: 'visible' });
    await this.saveTriggerBtn.click();
  }

  async handleJavascriptAlert(): Promise<HomePage> {
    this.page.once('dialog', dialog => dialog.accept());
    return new HomePage(this.page);
  }


 

  
}
