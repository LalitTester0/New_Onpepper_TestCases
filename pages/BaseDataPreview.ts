import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { HomePage } from './HomePage';

export class BaseDataPreview extends BasePage {
  readonly fundTypeText: Locator;
  readonly settingIcon: Locator;
  readonly checkboxes: Locator;
  readonly closeSettingPopup: Locator;
  readonly tableHeaders: Locator;
  readonly reorderedColumnNames: Locator;
  readonly reorderButton: Locator;
  readonly reorderColumn1: Locator;
  readonly reorderColumn2: Locator;
  readonly reorderIcon: Locator;
  readonly updateSecurityBtn: Locator;
  readonly triggerCalculationBtn: Locator;
  readonly confirmProceedBtn: Locator;
  readonly saveBtn: Locator;
  readonly confirmBtn: Locator;
  readonly saveTriggerBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.fundTypeText = page.locator("//div[text()='Fund Type']/following-sibling::div//b");
    this.settingIcon = page.locator("//span[@aria-label='setting']");
    this.checkboxes = page.locator("//input[@type='checkbox']");
    this.closeSettingPopup = page.locator("//div[contains(@class,'_crossIcon')]");
    this.tableHeaders = page.locator("//tr[contains(@class,'_headRow')]/th");
    this.reorderedColumnNames = page.locator("//div[contains(@class,'_orderColumnContainer')]//span[1]");
    this.reorderButton = page.locator("//span[text()='Reorder']/parent::button");
    this.reorderColumn1 = page.locator("(//div[contains(@class,'_orderColumnContainer')]//span[2])[1]");
    this.reorderColumn2 = page.locator("(//div[contains(@class,'_orderColumnContainer')]//span[2])[3]");
    this.reorderIcon = page.locator("(//*[local-name()='svg'])[2]");
    this.updateSecurityBtn = page.locator("//span[contains(text(),'Bulk Update')]/parent::button");
    this.triggerCalculationBtn = page.locator("//span[contains(text(),'Trigger Calculation')]/parent::button");
    this.confirmProceedBtn = page.locator("//span[contains(text(),'Confirm & Proceed')]/parent::button");
    this.saveBtn = page.locator("//span[contains(text(),'Save')]/parent::button");
    this.confirmBtn = page.locator("//span[contains(text(),'Confirm')]/parent::button");
    this.saveTriggerBtn = page.locator('button').filter({ hasText: 'Save & Trigger' }).first();


  }

  async clickTriggerButton() {
    await this.waitForElementAppear(this.triggerCalculationBtn);
    await this.triggerCalculationBtn.click();
  }

  async clickConfirmAndProceedBtn() {
    await this.clickTriggerButton();
    await this.page.waitForTimeout(1000);
    await this.confirmProceedBtn.click();
  }

  async clickSaveTriggerButton() {
    await this.saveTriggerBtn.waitFor({ state: 'visible' });
    await this.saveTriggerBtn.click();
  }

  async handleJavascriptAlert(): Promise<HomePage> {
    this.page.once('dialog', dialog => dialog.accept());
    return new HomePage(this.page);
  }

  async clickConfirmButton() {
    await this.confirmBtn.click();
  }

  async clickTriggerCalculationBtn() {
    await this.triggerCalculationBtn.click();
  }

  async clickUpdateSecurityBtn() {
    await this.updateSecurityBtn.click();
  }

  async reorderColumn(): Promise<string[]> {
    await this.reorderIcon.click();
    await this.page.waitForTimeout(1000);
    
    // Drag and drop in Playwright
    await this.reorderColumn1.dragTo(this.reorderColumn2);
    await this.page.waitForTimeout(1000);
    
    const count = await this.reorderedColumnNames.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(await this.reorderedColumnNames.nth(i).innerText());
    }
    return names;
  }

  async clickReorderButton() {
    await this.reorderButton.click();
  }

  async getFundType(): Promise<string> {
    await this.waitForElementAppear(this.fundTypeText);
    return await this.fundTypeText.innerText();
  }

  async getIndexOfColumnName(columnName: string): Promise<number> {
    let index = 0;
    const count = await this.tableHeaders.count();
    for (let i = 0; i < count; i++) {
      const title = await this.tableHeaders.nth(i).getAttribute("title");
      if (title && columnName.toLowerCase() === title.toLowerCase()) {
        index = i + 1;
        break;
      }
    }
    return index;
  }

  async getUniqueColumnsData(index: number): Promise<number> {
    const dataLocator = this.page.locator(`//td[${index}]`);
    const count = await dataLocator.count();
    const obligorNames = new Set<string>();
    for (let i = 0; i < count; i++) {
      const name = (await dataLocator.nth(i).innerText()).trim();
      if (name) {
        obligorNames.add(name);
      }
    }
    return obligorNames.size;
  }

  async getFilteredColumnsData(index: number): Promise<Locator> {
    return this.page.locator(`//td[${index}]`);
  }

  async getColumnsData1(index: number): Promise<number> {
    const columnValues = this.page.locator(`//tbody//td[${index}]`);
    const count = await columnValues.count();
    let dashesCount = 0;
    for (let i = 0; i < count; i++) {
      const value = await columnValues.nth(i).innerText();
      if (value === "-") {
        dashesCount++;
      }
    }
    return dashesCount;
  }

  async getColumnsData(index: number): Promise<number> {
    const dataLocator = this.page.locator(`//td[${index}]`);
    const count = await dataLocator.count();
    let total = 0.0;
    for (let i = 0; i < count; i++) {
      let value = await dataLocator.nth(i).getAttribute("title");
      if (!value || !value.trim()) {
        value = (await dataLocator.nth(i).innerText()).trim();
        if (!value) {
          value = "0";
        }
      }
      value = value.replace(/,/g, "");
      const number = parseFloat(value);
      if (!isNaN(number)) {
        total += number;
      }
    }
    return total;
  }

  async selectSpecificColumns() {
    await this.waitForElementAppear(this.settingIcon);
    await this.settingIcon.click();
    const allowedNames = ["security_name", "total_commitment", "outstanding_principal", "obligor_name"];
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = this.checkboxes.nth(i);
      const name = await checkbox.getAttribute("name");
      const isSelected = await checkbox.isChecked();
      if (name && allowedNames.includes(name)) {
        if (!isSelected) {
          await checkbox.check();
        }
      } else {
        if (isSelected) {
          await checkbox.uncheck();
        }
      }
    }
    await this.closeSettingPopup.click();
  }

  async selectSpecificPCOFColumns() {
    await this.waitForElementAppear(this.settingIcon);
    await this.settingIcon.click();
    const allowedNames = ["investment_cost", "issuer", "investment_name"];
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = this.checkboxes.nth(i);
      const name = await checkbox.getAttribute("name");
      const isSelected = await checkbox.isChecked();
      if (name && allowedNames.includes(name)) {
        if (!isSelected) {
          await checkbox.check();
        }
      } else {
        if (isSelected) {
          await checkbox.uncheck();
        }
      }
    }
    await this.closeSettingPopup.click();
  }
}
