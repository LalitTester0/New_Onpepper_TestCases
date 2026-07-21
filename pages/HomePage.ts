import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { DataIngestion } from './DataIngestion';
import { LiquidityManagementPage } from './LiquidityManagementPage';
import * as path from 'path';

export class HomePage extends BasePage {
  readonly optionBtn: Locator;
  readonly toastMsg: Locator;
  readonly closeFormulaBtn: Locator;
  readonly whatIfAnalysisBtn: Locator;
  readonly selectColumnDropdown: Locator;
  readonly saveWIABtn: Locator;
  readonly saveBtn: Locator;
  readonly wiaNameField: Locator;
  readonly notesField: Locator;
  readonly whatIfAnalysisOption: Locator;
  readonly borrowingBaseLibraryOption: Locator;
  readonly dataIngestionBtn: Locator;
  readonly errorLists: Locator;
  readonly exportReportBtn: Locator;
  readonly exportBtn: Locator;
  readonly viewReportBtn: Locator;
  readonly changeValueTextfield: Locator;
  readonly applyChangesBtn: Locator;
  readonly runBtn: Locator;
  readonly useBtn: Locator;
  readonly wiaReportNames: Locator;
  readonly liquidityManagementBtn: Locator;
  readonly uploadFileWIARadioBtn: Locator;
  readonly uploadFileBtn: Locator;
  readonly dragAndDropField: Locator;
  readonly uploadBtn: Locator;
  readonly proceedBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.optionBtn = page.locator("[class*='_menuIcon']");
    this.toastMsg = page.locator("//div[contains(@class,'Toastify__toast-icon')]/following-sibling::div");
    this.closeFormulaBtn = page.locator("//span[text()='Formula']/parent::div/parent::div/parent::div//button[@aria-label='Close']");
    this.whatIfAnalysisBtn = page.locator("//span[contains(text(),'What-if Analysis')]/parent::button");
    this.selectColumnDropdown = page.locator("//div[contains(text(),'Update Values')]/parent::div//select");
    this.saveWIABtn = page.getByRole('button', { name: 'Save WIA Report' });
    this.saveBtn = page.getByText('Save', { exact: true });
    this.wiaNameField = page.getByPlaceholder('Name for the analysis report');
    this.notesField = page.getByPlaceholder('Notes');
    this.whatIfAnalysisOption = page.locator("//div[contains(text(),'What-if Analysis library')]");
    this.borrowingBaseLibraryOption = page.locator("//div[contains(text(),'Borrowing Base Reports Library')]");
    this.dataIngestionBtn = page.getByText('Data Ingestion', { exact: true });
    this.errorLists = page.locator("//span[contains(@class,'_columnName_')]");
    this.exportReportBtn = page.locator("//span[contains(text(),'Export Report')]/parent::button");
    this.exportBtn = page.locator("//span[contains(text(),'Cancel')]/parent::button//following-sibling::button");
    this.viewReportBtn = page.locator("//span[contains(text(),'View Full Report')]/parent::button");
    this.changeValueTextfield = page.locator("#changeValue");
    this.applyChangesBtn = page.locator("//span[contains(text(),'Apply Changes')]/parent::button");
    this.runBtn = page.locator("//span[contains(text(),'Run')]/ancestor::button");
    this.useBtn = page.locator("//span[contains(text(),'Use')]/parent::button");
    this.wiaReportNames = page.locator("//div[contains(text(),'What if Analysis Library')]/parent::div/following-sibling::div//table//tbody//td[2]");
    this.liquidityManagementBtn = page.locator("//span[contains(.,'Liquidity Management')]/parent::div");
    this.uploadFileWIARadioBtn = page.locator("//span[contains(text(),'Upload file to update values')]/preceding-sibling::span");
    this.uploadFileBtn = page.locator("//span[contains(text(),'Upload File')]/parent::button");
    this.dragAndDropField = page.locator("//div[contains(@class,'_dropzone_')]");
    this.uploadBtn = page.locator("//div[contains(@class,'_popupFooter')]//button[1]");
    this.proceedBtn = page.locator("//span[contains(text(),'Proceed')]/parent::button");
  }

  async clickUploadBtn() {
    await this.uploadBtn.click();
  }

  async clickProceedBtn() {
    await this.clickUploadBtn();
    await this.waitForElementAppear(this.proceedBtn);
    await this.proceedBtn.click();
  }

  async uploadCLOFile(fileNameKey: string) {
    const filePath = process.env[fileNameKey];
    if (!filePath) throw new Error(`Environment variable ${fileNameKey} not found`);
    const absoluteFilePath = path.resolve(process.cwd(), filePath);
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.dragAndDropField.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(absoluteFilePath);
  }

  async selectUploadFileOption(optionName: string) {
    await this.page.locator(`//span[contains(text(),'${optionName} )')]/preceding-sibling::span`).click();
  }

  async clickUploadFileBtn() {
    await this.uploadFileWIARadioBtn.click();
    await this.uploadFileBtn.click();
  }

  async navigateToLiquidityManagement(): Promise<LiquidityManagementPage> {
    await this.liquidityManagementBtn.click();
    return new LiquidityManagementPage(this.page);
  }

  async clickExportReportBtn() {
    await this.exportReportBtn.click();
  }

  async clickViewReportBtn() {
    await this.viewReportBtn.click();
  }

  async clickExportBtnAndDownload(fundName: string): Promise<string | null> {
    await this.clickExportReportBtn();
    const downloadPromise = this.page.waitForEvent('download');
    await this.exportBtn.click();
    const download = await downloadPromise;
    const downloadDir = process.env.downloadFilepath || './downloads';
    const absoluteDownloadDir = path.resolve(process.cwd(), downloadDir);
    const suggestedName = download.suggestedFilename();
    const dest = path.join(absoluteDownloadDir, suggestedName);
    await download.saveAs(dest);
    return dest;
  }

  async getFundType(fundName: string): Promise<string> {
    const fundTypeLocator = this.page.locator(`//span[contains(@title,'${fundName}')]`);
    await this.waitForElementAppear(fundTypeLocator);
    return await fundTypeLocator.innerText();
  }

  async getRowStatus(fundName: string) {
  await this.clickViewReportBtn();
  return this.page.locator(`h4:has-text("${fundName} Borrowing Base Report for")`);
}

  async isErrorListVisible(): Promise<boolean> {
    const count = await this.errorLists.count();
    if (count > 0) {
      return await this.errorLists.first().isVisible();
    }
    return false;
  }

  async clickWhatIfAnalysisOption() {
    await this.optionBtn.click();
    await this.whatIfAnalysisOption.click();
  }

  async clickBorrowingBaseLibraryOption() {
    await this.optionBtn.click();
    await this.borrowingBaseLibraryOption.click();
  }

  async clickViewResultBtn(fundName: string) {
    await this.clickBorrowingBaseLibraryOption();
    const viewResultBtn = this.page.locator(`(//td[contains(text(),'${fundName}')]/following-sibling::td//button)[1]`);
    await viewResultBtn.hover();
    await viewResultBtn.click();
  }

  async saveWIAData(fundName: string) {
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 15);
    const value = `${fundName}_${timestamp}`;
    await this.saveWIABtn.click();
    await this.wiaNameField.fill(value);
    await this.notesField.fill("Test");
    await this.saveBtn.click();
  }

  async navigateToDataIngestion(): Promise<DataIngestion> {
    await this.dataIngestionBtn.click();
    return new DataIngestion(this.page);
  }

  async updateValuesWIA(columnName: string, fundName: string,tabName:string): Promise<boolean> {
    await this.page.getByText(tabName,{exact:true}).click();
    await this.waitForElementAppear(this.selectColumnDropdown);
    await this.selectColumnDropdown.click();
    await this.page.locator('#selectColumn').last().selectOption({value:columnName});
    await this.changeValueTextfield.fill("10");
    await this.applyChangesBtn.click();
    await this.runBtn.hover();
    await this.runBtn.click();
     const wiaText = this.page.locator('div').filter({ hasText: `Showing ${fundName} What-If Analysis Report for` }).first()
    //this.page.locator(`//div[contains(text(),'Showing ${fundName} What-If Analysis Report for')]`);
    await this.waitForElementAppear(wiaText);
    return await wiaText.isVisible();
  }

  async clickWhatIfAnalysisBtn() {
    await this.whatIfAnalysisBtn.click();
  }

  async closePopup() {
    await this.closeFormulaBtn.click();
  }

  getToastPopup(): Locator {
    return this.toastMsg;
  }
}
