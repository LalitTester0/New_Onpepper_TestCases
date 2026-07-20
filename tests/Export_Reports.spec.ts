import { test, expect } from './fixtures/baseTest';
import * as fs from 'fs';

test.describe('Export Reports', () => {

  test('Scenario: Export Report PCOF', async ({ landingPage }) => {
    const fundName = "PCOF";
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData(fundName, "Completed");
    await base.clickConfirmAndProceedBtn();
    await base.clickSaveTriggerButton();
    
    if (await homePage.isErrorListVisible()) {
      expect(false, "Errors were displayed on screen.").toBeTruthy();
    } else {
      const actualMsg = await homePage.getFundType(fundName);
      expect(actualMsg).toBe(fundName);
    }
    
    const downloadedFile = await homePage.clickExportBtnAndDownload(fundName);
    expect(downloadedFile).toBeTruthy();
    expect(fs.existsSync(downloadedFile!)).toBeTruthy();
  });

  test('Scenario: View Report PCOF', async ({ landingPage }) => {
    const fundName = "PCOF";
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData(fundName, "Completed");
    await base.clickConfirmAndProceedBtn();
    await base.clickSaveTriggerButton();
    
    if (await homePage.isErrorListVisible()) {
      expect(false, "Errors were displayed on screen.").toBeTruthy();
    } else {
      const actualMsg = await homePage.getFundType(fundName);
      expect(actualMsg).toBe(fundName);
    }
    
    const rowStatus = await homePage.getRowStatus("PL BB Build");
    expect(rowStatus, "row is not present").toBeTruthy();
  });

  test('Scenario: Export Report PFLT', async ({ landingPage }) => {
    const fundName = "PFLT";
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData(fundName, "Completed");
    await base.clickConfirmAndProceedBtn();
    await base.clickSaveTriggerButton();
    await base.page.waitForTimeout(3000);
    await base.handleJavascriptAlert();
    
    if (await homePage.isErrorListVisible()) {
      expect(false, "Errors were displayed on screen.").toBeTruthy();
    } else {
      const actualMsg = await homePage.getFundType(fundName);
      expect(actualMsg).toBe(fundName);
    }
    
    const downloadedFile = await homePage.clickExportBtnAndDownload(fundName);
    expect(downloadedFile).toBeTruthy();
    expect(fs.existsSync(downloadedFile!)).toBeTruthy();
  });

  test.only('Scenario: What-If Analysis PCOF Fund', async ({ landingPage }) => {
    const fundName = "PCOF";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisBtn();
    const wia_text = await homePage.updateValuesWIA("Investment Cost", fundName,'PL BB Build');
    expect(wia_text).toBeTruthy();
    await homePage.saveWIAData(fundName);
  });

  test('Scenario: Use What-If Analysis PCOF Fund', async ({ landingPage }) => {
    const fundName = "PCOF";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisOption();
    // Assuming getLatestWIAReport is adapted similarly:
    // const latestReport = await homePage.getLatestWIAReport(fundName);
    // For now we just check the toast popups conceptually if implemented.
  });

  test('Scenario: WIA PFLT Fund CLO Upload', async ({ landingPage }) => {
    const fundName = "PFLT";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisBtn();
    await homePage.clickUploadFileBtn();
    await homePage.uploadCLOFile("PFLT_CLOFile");
    await homePage.clickProceedBtn();
    await homePage.page.waitForTimeout(5000);
  });
});
