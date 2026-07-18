import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SourceFileLists } from './SourceFileLists';
import { BaseDataPreview } from './BaseDataPreview';
import { ExtractNewBaseData } from './ExtractNewBaseData';

export class DataIngestion extends BasePage {
  readonly extractNewBaseBtn: Locator;
  readonly baseFileasperDate: Locator;
  readonly selectFundDropdown: Locator;
  readonly pcofOption: Locator;
  readonly pfltOption: Locator;
  readonly psslOption: Locator;
  readonly pfltFundTypeColumn: Locator;
  readonly psslFundTypeColumn: Locator;
  readonly pcofFundTypeColumn: Locator;
  readonly noDataCell: Locator;
  readonly sourceFiletab: Locator;
  readonly extractNewBaseDataBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.extractNewBaseBtn = page.locator("//span[contains(.,'+ Extract New Base Data')]/parent::button");
    this.baseFileasperDate = page.locator("(//td[text()='2025-04-10']/following-sibling::td[4])[1]");
    this.selectFundDropdown = page.locator("//span[@title='-- Select Fund --']");
    this.pcofOption = page.locator("//div[contains(text(),'PCOF')]");
    this.pfltOption = page.locator("//div[@title='PFLT']");
    this.psslOption = page.locator("//div[@title='PSSL']");
    this.pfltFundTypeColumn = page.locator("//td[3]//span[text()='PFLT']");
    this.psslFundTypeColumn = page.locator("//td[3]//span[text()='PSSL']");
    this.pcofFundTypeColumn = page.locator("//td[3]//span[text()='PCOF']");
    this.noDataCell = page.locator("//td[contains(text(),'No Data')]");
    this.sourceFiletab = page.locator("//div[text()='Source Files']");
    this.extractNewBaseDataBtn = page.locator("//span[contains(text(),' Extract New Base Data')]/parent::button");
  }

  async selectSourceFileTab(): Promise<SourceFileLists> {
    await this.sourceFiletab.click();
    return new SourceFileLists(this.page);
  }

  async clickOnBaseData(fundType: string, status: string): Promise<BaseDataPreview> {
    const previewBtn = this.page.locator(`(//tr[.//span[text()='${fundType}'] and .//*[text()='${status}']]//div[.='Preview Data'])[1]`);
    await previewBtn.waitFor({ state: 'visible' });
    await previewBtn.click();
    return new BaseDataPreview(this.page);
  }

  async selectExtractNewBaseDataBtn(): Promise<ExtractNewBaseData> {
    await this.extractNewBaseDataBtn.click();
    return new ExtractNewBaseData(this.page);
  }

  async noDataCellText(): Promise<string> {
    return await this.noDataCell.innerText();
  }

  async clickSelectFundDropdown() {
    await this.selectFundDropdown.click();
  }

  async filteredPCOFValue(): Promise<Locator> {
    await this.clickSelectFundDropdown();
    await this.page.waitForTimeout(1000);
    await this.pcofOption.click();
    await this.page.waitForTimeout(1000);
    return this.pcofFundTypeColumn;
  }

  async filteredPFLTValue(): Promise<Locator> {
    await this.clickSelectFundDropdown();
    await this.pfltOption.click();
    return this.pfltFundTypeColumn;
  }

  async filteredPSSLValue(): Promise<Locator> {
    await this.clickSelectFundDropdown();
    await this.psslOption.click();
    return this.psslFundTypeColumn;
  }

  async getBaseFileAsPerDate(fundType: string): Promise<string> {
    await this.waitForElementAppear(this.baseFileasperDate);
    if (fundType === "PCOF") {
      await this.filteredPCOFValue();
    } else if (fundType === "PFLT") {
      await this.filteredPFLTValue();
    } else if (fundType === "PSSL") {
      await this.filteredPSSLValue();
    }
    const fileDivs = this.baseFileasperDate.locator('./div/div');
    const count = await fileDivs.count();
    const fileNames: string[] = [];
    for (let i = 0; i < count; i++) {
      let fullText = (await fileDivs.nth(i).innerText()).trim();
      fullText = fullText.replace(/^\d+\.\s*/, "");
      fullText = fullText.replace(/\.(xlsx|xlsm)$/, "");
      if (fullText) {
        fileNames.push(fullText);
      }
    }
    fileNames.sort();
    return fileNames.join("; ");
  }

  verifyAllFileNamesPresent(separated: string, combined: string): boolean {
    const fileNamesToCheck = separated.split(/;\s*/);
    let allPresent = true;
    for (const file of fileNamesToCheck) {
      if (!combined.includes(file)) {
        allPresent = false;
        console.log("Missing file: " + file);
      }
    }
    return allPresent;
  }

  async clickExtractNewBaseBtn(): Promise<SourceFileLists> {
    await this.extractNewBaseBtn.click();
    return new SourceFileLists(this.page);
  }
}
