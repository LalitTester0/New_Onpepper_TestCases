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
  readonly ppifCashSourceFile: Locator;
  readonly dataMappingText: Locator;
  readonly startExtractionBtn: Locator;
  readonly pssl_ii_CashFile:Locator;
  readonly pnnt_CashFile:Locator;
  readonly pnnt_day_File:Locator

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
    this.ppifCashSourceFile=page.locator("(//td[contains(text(),'PennantPark Private Income Fund SPV')]/parent::tr//td[1]//input)[1]")
    this.pssl_ii_CashFile=page.locator("(//td[contains(text(),'PSSL II SPV LLC_Cash')]/parent::tr//td[1]//input)[1]");
    this.pnnt_CashFile=page.locator("(//td[contains(text(),'PNNT_SOI')]/parent::tr//td[1]//input)[1]");
    this.pnnt_day_File=page.locator("(//td[contains(text(),'PNNT Daily TB1')]/parent::tr//td[1]//input)[1]");
  
  
  
  }

  async clickStartExtractionBtn(): Promise<BaseDataPreview> {
    await this.startExtractionBtn.waitFor({ state: 'visible' });
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

  async selectSourceFileForPPIF() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.ppifCashSourceFile.scrollIntoViewIfNeeded();
    await this.ppifCashSourceFile.click();
    await this.clickNextBtn();
  }

   async selectSourceFileForPSSL_II() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.ratingsSourceFile.scrollIntoViewIfNeeded();
    await this.ratingsSourceFile.click();
    await this.pssl_ii_CashFile.scrollIntoViewIfNeeded();
    await this.pssl_ii_CashFile.click();
    await this.clickNextBtn();
  }

  async selectSourceFileForPNNT() {
    await this.masterCompSourceFile.scrollIntoViewIfNeeded();
    await this.masterCompSourceFile.click();
    await this.pnnt_CashFile.scrollIntoViewIfNeeded();
    await this.pnnt_CashFile.click();
    await this.pnnt_day_File.scrollIntoViewIfNeeded();
    await this.pnnt_day_File.click();
    await this.clickNextBtn();
  }

  async checkFileStatusUpload(keyword: string): Promise<boolean> {
    await this.fileNames.first().waitFor({ state: 'attached', timeout: 5000 });
    const count = await this.fileNames.count();
    for (let i = 0; i < count; i++) {
      const text = await this.fileNames.nth(i).textContent();
      if (text && text.toLowerCase().includes(keyword)) {
        return true;
      }
    }
    return false;
  }

  async handleMissingFile(uploadMethodName: string) {
    await this.clickUploadNewBtn();
    const source = new SourceFileLists(this.page);
    if (uploadMethodName === 'uploadNewMasterFile') await source.uploadNewMasterFile();
    else if (uploadMethodName === 'uploadNewCashFile') await source.uploadNewCashFile();
    else if (uploadMethodName === 'uploadNewRatingFile') await source.uploadNewRatingFile();
    else if (uploadMethodName === 'uploadNewCashFileforPSLF') await source.uploadNewCashFileforPSLF();
    else if (uploadMethodName === 'uploadNewCashFileforPSCF') await source.uploadNewCashFileforPSCF();
    else if (uploadMethodName === 'uploadNewCashFileforPSSL') await source.uploadNewCashFileforPSSL();
    await this.clickLoadButton();
    await this.waitForElementToDisappear(this.loadBtn);
  }

  async marketFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('market');
    if (!status) {
      await this.handleMissingFile('uploadNewMasterFile');
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

  async ppifCashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pennantpark private income fund spv');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPPIF');
    }
    return status;
  }

  async pssl_II_CashFileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pssl ii spv llc_cash');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPSSL_II_SPV');
    }
    return status;
  }

  async pnnt_Day_FileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pnnt daily tb1');
    if (!status) {
      await this.handleMissingFile('uploadNewDailyFileforPNNT');
    }
    return status;
  }

  async pnnt_Cash_FileStatusUpload(): Promise<boolean> {
    const status = await this.checkFileStatusUpload('pnnt_soi');
    if (!status) {
      await this.handleMissingFile('uploadNewCashFileforPNNT');
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

  async checkSourceFileAvailabilityForPPIF() {
    await this.ppifCashFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPSSL_II() {
    await this.ratingsFileStatusUpload();
    await this.masterFileStatusUpload();
    await this.pssl_II_CashFileStatusUpload();
    await this.clickNextBtn();
  }

  async checkSourceFileAvailabilityForPNNT() {
    await this.masterFileStatusUpload();
    await this.pnnt_Day_FileStatusUpload();
    await this.pnnt_Cash_FileStatusUpload();
    await this.clickNextBtn();
  }


  async selectFund(fundtype: string) {
    await this.selectFundDropdown.click();;
    await this.page.getByText(`${fundtype}`, { exact: true }).click();
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
