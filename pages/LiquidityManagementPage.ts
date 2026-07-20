import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import * as fs from 'fs';
import * as path from 'path';

export class LiquidityManagementPage extends BasePage {
  readonly fundNames: Locator;
  readonly projectiondatebtn: Locator;
  readonly projectiondate_input_field: Locator;
  readonly add_Date_Btn: Locator;
  readonly tableheaderCount: Locator;
  readonly update_Current_Valuebtn: Locator;
  readonly wiaBtn: Locator;
  readonly asOfDate_input_field: Locator;
  readonly savebtn: Locator;
  readonly editable_CellData: Locator;
  readonly tableInputField: Locator;
  readonly run_AnalysisBtn: Locator;
  readonly exportReportBtn: Locator;
  readonly exportBtn: Locator;
  readonly import_ReportBtn: Locator;
  readonly dragAndDropField: Locator;
  readonly uploadBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.fundNames = page.locator("//div[contains(text(),'Display Funds:')]/parent::div//span[@class='ant-checkbox-label']");
    this.projectiondatebtn = page.locator("//span[contains(text(),'Projection Dates ')]/parent::button");
    this.projectiondate_input_field = page.locator("//input[@id='proformaDatePicker']");
    this.add_Date_Btn = page.locator("//span[contains(text(),'Add')]/parent::button");
    this.tableheaderCount = page.locator("(//th[@title='Terms'])[2]/parent::tr//th");
    this.update_Current_Valuebtn = page.locator("//span[contains(text(),'Update Current Values')]/parent::button");
    this.wiaBtn = page.locator("//span[contains(text(),'What-if Analysis')]/parent::button");
    this.asOfDate_input_field = page.locator("//input[@id='asOfDatePicker']");
    this.savebtn = page.locator("//span[contains(text(),'Save')]/parent::button");
    this.editable_CellData = page.locator("//td[contains(@class,'htEditableCell')]//parent::tr//td[2]");
    this.tableInputField = page.locator("//textarea[@class='handsontableInput']");
    this.run_AnalysisBtn = page.locator("//span[contains(text(),'Run Analysis')]/parent::button");
    this.exportReportBtn = page.locator("//span[contains(text(),'Export')]/parent::button");
    this.exportBtn = page.locator("//span[contains(text(),'Cancel')]/parent::button//following-sibling::button");
    this.import_ReportBtn = page.locator("//span[contains(text(),'Import File')]/parent::button");
    this.dragAndDropField = page.locator("//div[contains(@class,'_dropzone_')]");
    this.uploadBtn = page.locator("//span[contains(text(),'Upload')]/parent::button");
  }

  async click_UploaBtn() {
    await this.uploadBtn.waitFor({ state: 'visible' });
    await this.uploadBtn.click();
  }

  async click_Import_ReportBtn() {
    await this.click_update_Current_Valuebtn();
    await this.import_ReportBtn.click();
  }

  async upload_Import_FIle(filePath: string) {
    await this.click_Import_ReportBtn();
    await this.page.locator("input[type='file']").first().setInputFiles(filePath);
  }

  async get_Current_ColumnStatus(subfundname: string): Promise<boolean> {
    const column = this.page.locator(`(//span[text()='${subfundname} Current'])[2]`);
    await column.waitFor({ state: 'visible' });
    return await column.isVisible();
  }

  async select_CalculationTab(tabname: string) {
    await this.page.locator(`//div[contains(text(),'${tabname}')]`).click();
  }

  async click_update_Current_Valuebtn() {
    await this.update_Current_Valuebtn.click();
  }

  async click_WIAbtn() {
    await this.wiaBtn.click();
  }

  getDateAsPerDays2(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  getDateAsPerDays3(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}-${dd}-${date.getFullYear()}`;
  }

  async add_AsOfDate() {
    await this.asOfDate_input_field.click();
    const d = this.getDateAsPerDays2(-1);
    await this.page.locator(`//td[@title='${d}']`).click();
    await this.savebtn.click();
  }

  getUpdatedValue(value: string): string {
    if (value.includes('%')) {
      let percent = parseFloat(value.replace('%', '')) / 100;
      percent += 0.01;
      return (percent * 100).toFixed(2); // Returning percentage string without % here if it matches input
    }
    if (value.includes(',')) {
      let number = parseFloat(value.replace(/,/g, ''));
      number += 1;
      return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (/^\d+$/.test(value)) {
      let number = parseInt(value, 10);
      return String(number + 1);
    }
    return value;
  }

  async get_EditData(tabname: string) {
    await this.click_update_Current_Valuebtn();
    await this.select_CalculationTab(tabname);
    
    const count = await this.editable_CellData.count();
    for (let i = 0; i < count; i++) {
      const cell = this.editable_CellData.nth(i);
      const originalValue = (await cell.innerText()).trim();
      const updatedValue = this.getUpdatedValue(originalValue);
      await cell.click();
      await this.page.waitForTimeout(500);
      await cell.dblclick();
      await this.page.waitForTimeout(500);
      await this.tableInputField.fill('');
      await this.tableInputField.fill(updatedValue);
      await this.page.waitForTimeout(500);
    }
    await this.add_AsOfDate();
  }

  async click_ProjectionDate() {
    await this.projectiondatebtn.click();
  }

  async clickExportReportBtn() {
    await this.exportReportBtn.click();
  }

  async clickExportBtn(fundName: string): Promise<string> {
    await this.clickExportReportBtn();
    await this.exportBtn.hover();
    const downloadPromise = this.page.waitForEvent('download');
    await this.exportBtn.click();
    const download = await downloadPromise;
    const downloadDir = process.env.downloadFilepath || './downloads';
    const absoluteDownloadDir = path.resolve(process.cwd(), downloadDir);
    const dest = path.join(absoluteDownloadDir, download.suggestedFilename());
    await download.saveAs(dest);
    return dest;
  }
}
