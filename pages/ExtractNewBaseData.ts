import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SourceFileLists } from './SourceFileLists';
import { BaseDataPreview } from './BaseDataPreview';

export class ExtractNewBaseData extends BasePage {
  readonly selectFundDropdown: Locator;
  readonly reportDateField: Locator;
  readonly nextBtn: Locator;
  readonly fileNames: Locator;
  readonly uploadNewFileBtn: Locator;
  readonly loadBtn: Locator;
  readonly masterCompSourceFile: Locator;
  readonly marketSourceFile: Locator;
  readonly cashSourceFile: Locator;
  readonly ratingsSourceFile: Locator;
  readonly psslfCashSourceFile: Locator;
  readonly pslfCashSourceFile: Locator;
  readonly pscfCashSourceFile: Locator;
  readonly dataMappingText: Locator;
  readonly startExtractionBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.selectFundDropdown = page.locator("//span[contains(text(),'Select Fund')]");
    this.reportDateField = page.locator("#reportDatePicker");
    this.nextBtn = page.locator("//span[contains(text(),'Next ')]/parent::button");
    this.fileNames = page.locator("//table//td[2]");
    this.uploadNewFileBtn = page.locator("//span[contains(text(),'Upload New Files')]/parent::button");
    this.loadBtn = page.locator("//span[contains(text(),'Load')]/parent::button");
    this.masterCompSourceFile = page.locator("(//td[contains(text(),'Master Comps')]/parent::tr//td[1]//input)[1]");
    this.marketSourceFile = page.locator("(//td[contains(text(),'Market')]/parent::tr//td[1]//input)[1]");
    this.cashSourceFile = page.locator("(//td[contains(text(),'Cash')]/parent::tr//td[1]//input)[1]");
    this.ratingsSourceFile = page.locator("(//td[contains(text(),'Ratings')]/parent::tr//td[1]//input)[1]");
    this.psslfCashSourceFile = page.locator("(//td[contains(text(),'PSSLF')]/parent::tr//td[1]//input)[1]");
    this.pslfCashSourceFile = page.locator("(//td[contains(text(),'PSLF')]/parent::tr//td[1]//input)[1]");
    this.pscfCashSourceFile = page.locator("(//td[contains(text(),'PSCF_Cash')]/parent::tr//td[1]//input)[1]");
    this.dataMappingText = page.locator("//h1[contains(text(),'Data mapping')]");
    this.startExtractionBtn = page.locator("//span[contains(text(),'Start Extraction')]/parent::button");
  }

  async clickStartExtractionBtn(): Promise<BaseDataPreview> {
    await this.startExtractionBtn.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(10);
    await this.startExtractionBtn.click();
    return new BaseDataPreview(this.page);
  }

  async checkDataMappingInfo() {
    await this.waitForElementAppear(this.dataMappingText);
    await this.clickNextBtn();
  }

  async selectSourceFileForPFLT() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.ratingsSourceFile.scrollIntoViewIfNeeded();
    await this.ratingsSourceFile.click();
    await this.cashSourceFile.scrollIntoViewIfNeeded();
    await this.cashSourceFile.click();
    await this.clickNextBtn();
  }

  async selectSourceFileForPCOF() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.marketSourceFile.scrollIntoViewIfNeeded();
    await this.marketSourceFile.click();
    await this.clickNextBtn();
  }

  async selectSourceFileForPSSL() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.ratingsSourceFile.scrollIntoViewIfNeeded();
    await this.ratingsSourceFile.click();
    await this.psslfCashSourceFile.scrollIntoViewIfNeeded();
    await this.psslfCashSourceFile.click();
    await this.clickNextBtn();
  }

  async selectSourceFileForPSLF() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.pslfCashSourceFile.scrollIntoViewIfNeeded();
    await this.pslfCashSourceFile.click();
    await this.clickNextBtn();
  }

  async selectSourceFileForPSCF() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.pscfCashSourceFile.scrollIntoViewIfNeeded();
    await this.pscfCashSourceFile.click();
    await this.clickNextBtn();
  }

  async checkFileStatusUpload(keyword: string): Promise<boolean> {
    const count = await this.fileNames.count();
    for (let i = 0; i < count; i++) {
      const text = await this.fileNames.nth(i).innerText();
      if (text && text.toLowerCase().includes(keyword)) {
        return true;
      }
    }
    return false;
  }

  async handleMissingFile(uploadMethodName: string) {
    await this.clickUploadNewBtn();
    const source = new SourceFileLists(this.page);
    // TypeScript doesn't let us dynamically call methods safely without indexing,
    // but we can map string to method here:
    if (uploadMethodName === 'uploadNewMasterFile') await source.uploadNewMasterFile();
    else if (uploadMethodName === 'uploadNewCashFile') await source.uploadNewCashFile();
    else if (uploadMethodName === 'uploadNewRatingFile') await source.uploadNewRatingFile();
    else if (uploadMethodName === 'uploadNewCashFileforPSLF') await source.uploadNewCashFileforPSLF();
    else if (uploadMethodName === 'uploadNewCashFileforPSCF') await source.uploadNewCashFileforPSCF();
    else if (uploadMethodName === 'uploadNewCashFileforPSSL') await source.uploadNewCashFileforPSSL();
    
    await this.page.waitForTimeout(500);
    await this.clickLoadButton();
    await this.page.waitForTimeout(500);
    await this.waitForElementToDisappear(this.loadBtn);
  }

  async marketFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('market');
    if (!status) {
      await this.handleMissingFile('uploadNewMasterFile'); // As per Java code: source.uploadNewMasterFile();
    }
    return status;
  }

  async cashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('cash');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFile');
    }
    return status;
  }

  async ratingsFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('ratings');
    if (!status) {
      await this.handleMissingFile('uploadNewRatingFile');
    }
    return status;
  }

  async masterFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('master');
    if (!status) {
      await this.handleMissingFile('uploadNewMasterFile');
    }
    return status;
  }

  async pslfCashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pslf_cashfile');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPSLF');
    }
    return status;
  }

  async pscfCashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pscf_cashfile');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPSCF');
    }
    return status;
  }

  async psslCashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('psslf');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPSSL');
    }
    return status;
  }

  async clickLoadButton() {
    await this.loadBtn.click();
  }

  async clickUploadNewBtn() {
    await this.uploadNewFileBtn.click();
  }

  async checkSourceFileAvailabilityForPFLT() {
    await this.masterFileStatusUpload();
    await this.cashFileStatusUpload();
    await this.ratingsFileStatusUpload();
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPCOF() {
    await this.marketFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPSSL() {
    await this.ratingsFileStatusUpload();
    await this.psslCashFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPSLF() {
    await this.pslfCashFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.waitForElementToDisappear(this.loadBtn);
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPSCF() {
    await this.pscfCashFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.clickNextBtn();
  }

  async selectFund(fundtype: string) {
    await this.selectFundDropdown.click();
    await this.page.locator(`//div[contains(text(),'${fundtype}')]`).click();
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

  async clickNextBtn() {
    await this.nextBtn.waitFor({ state: 'visible' });
    try {
      await this.nextBtn.hover();
      await this.nextBtn.click();
    } catch (e) {
      await this.nextBtn.dispatchEvent('click');
    }
  }

  async enterFundAndDate(fundtype: string) {
    await this.selectFund(fundtype);
    await this.selectReportDate();
    await this.clickNextBtn();
  }
}
