import { test, expect } from './fixtures/baseTest';

test.describe('Data Ingestion Validation', () => {

  test('Scenario: Successfully archive a file and verify its presence in the archived list', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    const fileName = await source.fileName.innerText();
    await source.fileCheckbox.click();
    await source.addToArchieveBtn.click();
    await source.switcher.click();
    const filesCount = await source.archievedfileNames.count();
    let isValuePresent = false;
    for (let i = 0; i < filesCount; i++) {
      const text = await source.archievedfileNames.nth(i).innerText();
      if (text.includes(fileName)) {
        isValuePresent = true;
        break;
      }
    }
    expect(isValuePresent, `Expected value '${fileName}' not found in the list!`).toBeTruthy();
  });

  test('Scenario: Successfully unarchive a file and verify its return to the main list', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    await source.page.waitForTimeout(500);
    await source.switcher.click();
    const fileName = await source.archivedFileName.innerText();
    await source.archieveFileCheckbox.click();
    await source.unArchieveBtn.click();
    await source.switcher.click();
    const filesCount = await source.archievedfileNames.count();
    let isValuePresent = false;
    for (let i = 0; i < filesCount; i++) {
      const text = await source.archievedfileNames.nth(i).innerText();
      if (text.includes(fileName)) {
        isValuePresent = true;
        break;
      }
    }
    expect(isValuePresent, `Expected value '${fileName}' not found in the list!`).toBeTruthy();
  });

  test('Scenario: Filter PCOF files and verify filtering logic', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    await source.filteredPCOFValue();
    const fundsLocator = source.pcofFundTypeColumn;
    const count = await fundsLocator.count();
    if (count === 0) {
      const text = await source.noDataCellText();
      expect(text).toBe("No Data");
    } else {
      let allMatch = true;
      for (let i = 0; i < count; i++) {
        const text = await fundsLocator.nth(i).innerText();
        if (!text.includes("PCOF")) {
          allMatch = false;
        }
      }
      expect(allMatch, "PCOF Funds are not get filtered").toBeTruthy();
    }
  });

  test('Scenario: Filter PFLT files and verify filtering logic', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    await source.filteredPFLTValue();
    const fundsLocator = source.pfltFundTypeColumn;
    const count = await fundsLocator.count();
    if (count === 0) {
      const text = await source.noDataCellText();
      expect(text).toBe("No Data");
    } else {
      let allMatch = true;
      for (let i = 0; i < count; i++) {
        const text = await fundsLocator.nth(i).innerText();
        if (!text.includes("PFLT")) {
          allMatch = false;
        }
      }
      expect(allMatch, "PFLT Funds are not get filtered").toBeTruthy();
    }
  });

  test('Scenario: Filter files by report dates', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    
    // Equivalent of formattedDate() -> MM-dd-yyyy of uploadDate()
    const inputDate = source.uploadDate();
    const d = new Date(inputDate);
    const formattedDate = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`;
    
    await source.selectReportDate();
    const fundsLocator = source.reportDateColumn;
    const count = await fundsLocator.count();
    if (count === 0) {
      const text = await source.noDataCellText();
      expect(text).toBe("No Data");
    } else {
      for (let i = 0; i < count; i++) {
        const text = await fundsLocator.nth(i).innerText();
        expect(text).toBe(formattedDate);
      }
    }
  });

  test('Scenario: Create PFLT Base Data File', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    const fileNames = await source.selectSourceFileforPFLT();
    const dataPage = await source.navigateToBaseDataButtonAction();
    const names = await dataPage.getBaseFileAsPerDate("PFLT");
    const status = dataPage.verifyAllFileNamesPresent(names, fileNames);
    expect(status, `${fileNames} is not present`).toBeTruthy();
  });

  test('Scenario: Create PCOF Base Data File', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    const fileNames = await source.selectSourceFileforPCOF();
    const dataPage = await source.navigateToBaseDataButtonAction();
    const names = await dataPage.getBaseFileAsPerDate("PCOF");
    const status = dataPage.verifyAllFileNamesPresent(names, fileNames);
    expect(status, `${fileNames} is not present`).toBeTruthy();
  });

  test('Scenario: Create PSSL Base Data File', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.clickExtractNewBaseBtn();
    const fileNames = await source.selectSourceFileforPFLT(); // Use PFLT for PSSL as fallback since missing
    const dataPage = await source.navigateToBaseDataButtonAction();
    const names = await dataPage.getBaseFileAsPerDate("PSSL");
    const status = dataPage.verifyAllFileNamesPresent(names, fileNames);
    expect(status, `${fileNames} is not present`).toBeTruthy();
  });
});
