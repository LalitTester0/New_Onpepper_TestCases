import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { DataIngestion } from './DataIngestion';
import * as fs from 'fs';
import * as path from 'path';

export class SourceFileLists extends BasePage {
  readonly uploadFilesBtn: Locator;
  readonly reportDateField: Locator;
  readonly loadBtn: Locator;
  readonly selectFundDropdown: Locator;
  readonly reportDateColumn: Locator;
  readonly reportDate: Locator;
  readonly navigatetoBaseDataButton: Locator;
  readonly exportBaseDataBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadFilesBtn = page.locator("//span[contains(.,'+ Upload Files')]/parent::button");
    this.reportDateField = page.locator("//div[@class='ant-modal-body']//div[@class='ant-picker-input']//input[@placeholder='Report Date']");
    this.loadBtn = page.locator("//span[contains(text(),'Load')]/parent::button");
    this.selectFundDropdown = page.locator("//span[@class='ant-select-selection-search']/parent::div");
    this.reportDateColumn = page.locator("//th[@title='Fund']/parent::tr/parent::thead/following-sibling::tbody//td[4]");
    this.reportDate = page.locator("//input[@placeholder='Report Date']");
    this.navigatetoBaseDataButton = page.locator("//span[contains(text(),'<- Base Data')]/parent::button");
    this.exportBaseDataBtn = page.locator("//span[contains(text(),'Extract Base Data')]/parent::button");
  }

  async selectFilecheckbox(date: string, fileName: string): Promise<string> {
    const fileCheckbox = this.page.locator(`(//span[contains(text(),'Completed')]/ancestor::tr//td[text()='${date}']/preceding-sibling::td[1][contains(text(),'${fileName}')]/preceding-sibling::td[2]//input)[1]`);
    await fileCheckbox.click();
    return await this.getFileName(fileName);
  }

  async getFileName(fileName: string): Promise<string> {
    const fnLocator = this.page.locator(`(//th[@title='Fund']/parent::tr/parent::thead/following-sibling::tbody//td[7]//span[text()='Completed']/ancestor::tr//td[3][contains(text(),'${fileName}')])[1]`);
    return await fnLocator.innerText();
  }

  async navigateToBaseDataButtonAction(): Promise<DataIngestion> {
    await this.navigatetoBaseDataButton.click();
    return new DataIngestion(this.page);
  }

  async clickexportBaseDataBtn() {
    await this.exportBaseDataBtn.click();
  }

  uploadDate(): string {
    const date = new Date();
    date.setDate(10);
    return date.toISOString().split('T')[0];
  }

  async selectReportDate() {
    await this.reportDateField.click();
    const date = this.uploadDate();
    await this.page.locator(`(//td[@title='${date}'])[1]`).click();
  }

  async clickSelectFundDropdown() {
    await this.selectFundDropdown.click();
  }

  async clickUploadFilesBtn() {
    await this.uploadFilesBtn.click();
  }

  async selectFundCheckbox(fundType: string) {
  if (fundType === "ALL") {
    const fundsToSelect = ["PFLT", "PCOF"];
    for (const fund of fundsToSelect) {
      const checkbox = this.page.locator(`//span[text()='${fund}']/preceding-sibling::span[contains(@class,'ant-checkbox')]`);
      await checkbox.click();
    }
  } else {
    const checkbox = this.page.locator(`//span[text()='${fundType}']/preceding-sibling::span[contains(@class,'ant-checkbox')]`);
    await checkbox.click();
  }
}

  async handleFileUpload(originalEnvKey: string, newFileNameBase: string): Promise<string> {
    const originalFilePath = process.env[originalEnvKey];
    if (!originalFilePath) throw new Error(`Missing ${originalEnvKey}`);
    const absoluteOriginalPath = path.resolve(process.cwd(), originalFilePath);
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 15);
    const newFileName = `${newFileNameBase}_${timestamp}${path.extname(absoluteOriginalPath)}`;
    const renameFolderPath = process.env.RenamedFolderPath || './';
    const absoluteRenameFolderPath = path.resolve(process.cwd(), renameFolderPath);
    if (!fs.existsSync(absoluteRenameFolderPath)) {
      fs.mkdirSync(absoluteRenameFolderPath, { recursive: true });
    }
    const newFilePath = path.join(absoluteRenameFolderPath, newFileName);
    fs.copyFileSync(absoluteOriginalPath, newFilePath);
    await this.page.locator("input[type='file']").first().setInputFiles(newFilePath);
    return newFileName;
  }

  async uploadNewMasterFile(): Promise<string> {
    return await this.handleFileUpload('MasterFile', 'Master Comps v1175');
  }

  async uploadNewCashFile(): Promise<string> {
    return await this.handleFileUpload('CashFile', 'Copy of PENPL_CashFile');
  }
  
  async uploadNewMarketFile(): Promise<string> {
    return await this.handleFileUpload('MarketFile', 'Market and Book Value Position');
  }

  async uploadNewRatingFile(): Promise<string> {
    return await this.handleFileUpload('RatingFile', 'Portfolio Ratings_v102');
  }

  async uploadNewCashFileforPSLF(): Promise<string> {
    return await this.handleFileUpload('PSLFCashFile', 'PSLF_CashFile_20250228');
  }

  async uploadNewCashFileforPSCF(): Promise<string> {
    return await this.handleFileUpload('PSCFCashFile', 'PSCF_CashFile_20250228');
  }

  async uploadNewCashFileforPSSL(): Promise<string> {
    return await this.handleFileUpload('PSSLCashFile', 'PSSLF221_CashFile_20250228');
  }
  async uploadNewCashFileforPPIF(): Promise<string> {
    return await this.handleFileUpload('PPIFCashFile', 'PennantPark Private Income Fund SPV LLC_Cash File_');
  }
  async uploadNewCashFileforPSSL_II_SPV(): Promise<string> {
    return await this.handleFileUpload('PSSLIICashFile', 'PSSL II SPV LLC_Cash File_');
  }
  async uploadNewCashFileforPNNT(): Promise<string> {
    return await this.handleFileUpload('PNNTCashFile', 'PNNT_SOI_01_31_2026.v02.17_LM_REVIEW_File_');
  }
  async uploadNewDailyFileforPNNT(): Promise<string> {
    return await this.handleFileUpload('PNNTDailyFile', '01.31.26 PNNT Daily TB1_File_');
  }

  async clickLoadButton() {
    await this.loadBtn.click();
  }

  async getUploadFileStatus(fileName: string): Promise<boolean> {
    const fileLocator = this.page.locator(`//td[contains(text(),'${fileName}')]`);
    try {
      await fileLocator.waitFor({ state: 'visible', timeout: 490*1000 });
      return true;
    } catch {
      return false;
    }
  }
}
