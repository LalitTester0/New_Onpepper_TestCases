import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { DataIngestion } from './DataIngestion';
import * as fs from 'fs';
import * as path from 'path';

export class SourceFileLists extends BasePage {
  readonly uploadFilesBtn: Locator;
  readonly reportDateField: Locator;
  readonly pfltCheckbox: Locator;
  readonly psslCheckbox: Locator;
  readonly pcofCheckbox: Locator;
  readonly dragAndDropField1: Locator;
  readonly loadBtn: Locator;
  readonly getToastMsg: Locator;
  readonly fileCheckbox: Locator;
  readonly fileName: Locator;
  readonly addToArchieveBtn: Locator;
  readonly switcher: Locator;
  readonly archievedfileNames: Locator;
  readonly unArchieveBtn: Locator;
  readonly archieveFileCheckbox: Locator;
  readonly archivedFileName: Locator;
  readonly selectFundDropdown: Locator;
  readonly pcofOption: Locator;
  readonly pfltOption: Locator;
  readonly psslOption: Locator;
  readonly pfltFundTypeColumn: Locator;
  readonly reportDateColumn: Locator;
  readonly pcofFundTypeColumn: Locator;
  readonly psslFundTypeColumn: Locator;
  readonly reportDate: Locator;
  readonly navigatetoBaseDataButton: Locator;
  readonly exportBaseDataBtn: Locator;
  readonly cancelBtn: Locator;
  readonly noDataCell: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadFilesBtn = page.locator("//span[contains(.,'+ Upload Files')]/parent::button");
    this.reportDateField = page.locator("//div[@class='ant-modal-body']//div[@class='ant-picker-input']//input[@placeholder='Report Date']");
    this.pfltCheckbox = page.locator("//span[text()='PFLT']/preceding-sibling::span[contains(@class,'ant-checkbox')]");
    this.psslCheckbox = page.locator("//span[text()='PSSL']/preceding-sibling::span[contains(@class,'ant-checkbox')]");
    this.pcofCheckbox = page.locator("//span[text()='PCOF']/preceding-sibling::span[contains(@class,'ant-checkbox')]");
    this.dragAndDropField1 = page.locator("//div[contains(@class,'_dropzone_')]");
    this.loadBtn = page.locator("//span[contains(text(),'Load')]/parent::button");
    this.getToastMsg = page.locator("//div[contains(@class,'Toastify__toast-icon')]/following-sibling::div");
    this.fileCheckbox = page.locator("(//th[.='Fund']/ancestor::table//tbody//td[.='Completed']/parent::tr//td[1]//input)[1]");
    this.fileName = page.locator("(//th[.='Fund']/ancestor::table//tbody//td[.='Completed']/parent::tr//td[3])[1]");
    this.addToArchieveBtn = page.locator("//span[contains(normalize-space(),'Add to Archives')]/parent::button");
    this.switcher = page.locator("//button[@role='switch']");
    this.archievedfileNames = page.locator("//th[.='File Name']/ancestor::table//tbody//td[3]");
    this.unArchieveBtn = page.locator("//span[.='Unarchive']/parent::button");
    this.archieveFileCheckbox = page.locator("(//th[.='Fund']/ancestor::table//tbody//td//input)[1]");
    this.archivedFileName = page.locator("(//th[.='Fund']/ancestor::table//tbody//td[3])[1]");
    this.selectFundDropdown = page.locator("//span[@class='ant-select-selection-search']/parent::div");
    this.pcofOption = page.locator("//div[@title='PCOF']");
    this.pfltOption = page.locator("//div[@title='PFLT']");
    this.psslOption = page.locator("//div[@title='PSSL']");
    this.pfltFundTypeColumn = page.locator("//td[2]//span[text()='PFLT']");
    this.reportDateColumn = page.locator("//th[@title='Fund']/parent::tr/parent::thead/following-sibling::tbody//td[4]");
    this.pcofFundTypeColumn = page.locator("//td[2]//span[text()='PCOF']");
    this.psslFundTypeColumn = page.locator("//td[2]//span[text()='PSSL']");
    this.reportDate = page.locator("//input[@placeholder='Report Date']");
    this.navigatetoBaseDataButton = page.locator("//span[contains(text(),'<- Base Data')]/parent::button");
    this.exportBaseDataBtn = page.locator("//span[contains(text(),'Extract Base Data')]/parent::button");
    this.cancelBtn = page.locator("//span[text()='Cancel']/parent::button");
    this.noDataCell = page.locator("//td[contains(text(),'No Data')]");
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

  async noDataCellText(): Promise<string> {
    return await this.noDataCell.innerText();
  }

  async clickCancelBtn() {
    await this.cancelBtn.click();
  }

  async navigateToBaseDataButtonAction(): Promise<DataIngestion> {
    await this.navigatetoBaseDataButton.click();
    return new DataIngestion(this.page);
  }

  async clickexportBaseDataBtn() {
    await this.exportBaseDataBtn.click();
  }

  async selectSourceFileforPFLT(): Promise<string> {
    const date = this.uploadDate();
    await this.filteredPFLTValue();
    const fileNames: string[] = [];
    fileNames.push(await this.selectFilecheckbox(date, "Master"));
    fileNames.push(await this.selectFilecheckbox(date, "PENPL"));
    fileNames.push(await this.selectFilecheckbox(date, "Market"));
    await this.page.waitForTimeout(1000);
    const cleanedNames = fileNames.map(f => f.replace(/\.\w+$/, ""));
    const formattedString = cleanedNames.join("; ");
    await this.clickexportBaseDataBtn();
    return formattedString;
  }

  // Same logic applied to other selectSourceFile...
  async selectSourceFileforPCOF(): Promise<string> {
    const date = this.uploadDate();
    await this.filteredPCOFValue();
    const fileNames: string[] = [];
    fileNames.push(await this.selectFilecheckbox(date, "Master"));
    fileNames.push(await this.selectFilecheckbox(date, "PENPL"));
    fileNames.push(await this.selectFilecheckbox(date, "Market"));
    await this.page.waitForTimeout(1000);
    const cleanedNames = fileNames.map(f => f.replace(/\.\w+$/, ""));
    await this.clickexportBaseDataBtn();
    return cleanedNames.join("; ");
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

  async filteredPCOFValue() {
    await this.clickSelectFundDropdown();
    await this.pcofOption.click();
  }

  async filteredPFLTValue() {
    await this.clickSelectFundDropdown();
    await this.pfltOption.click();
  }

  async filteredPSSLValue() {
    await this.clickSelectFundDropdown();
    await this.psslOption.click();
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


  // Simplified file upload logic replacing AWT Robot with fileChooser
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

    // Bypass the OS filechooser and set the file directly on the hidden input element
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
