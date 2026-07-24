import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { SourceFileLists } from './SourceFileLists';
import { BaseDataPreview } from './BaseDataPreview';
import { ExtractNewBaseData } from './ExtractNewBaseData';

export class DataIngestion extends BasePage {
  readonly extractNewBaseBtn: Locator;
  readonly baseFileasperDate: Locator;
  readonly selectFundDropdown: Locator;
  readonly noDataCell: Locator;
  readonly sourceFiletab: Locator;
  readonly extractNewBaseDataBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.extractNewBaseBtn = page.locator("//span[contains(.,'+ Extract New Base Data')]/parent::button");
    this.baseFileasperDate = page.locator("(//td[text()='2025-04-10']/following-sibling::td[4])[1]");
    this.selectFundDropdown = page.locator("//span[@title='-- Select Fund --']");
    this.noDataCell = page.locator("//td[contains(text(),'No Data')]");
    this.sourceFiletab = page.locator("//div[text()='Source Files']");
    this.extractNewBaseDataBtn = page.getByText('+ Extract New Base Data',{exact:true});
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
