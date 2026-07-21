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

  test('Scenario: View Report PCOF', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
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
    const rowStatus = await homePage.getRowStatus(fundName);
    await expect(rowStatus).toBeVisible();
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

  test('Scenario: View Report PFLT', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const fundName = "PFLT";
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
    const rowStatus = await homePage.getRowStatus(fundName);
    await expect(rowStatus).toBeVisible();
  });

  test('Scenario: Export Report PSSL', async ({ landingPage }) => {
    const fundName = "PSSL";
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData(fundName, "Completed");
    await base.clickConfirmAndProceedBtn();
    await base.clickSaveTriggerButton();
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

  
  test('Scenario: View Report PSSL', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const fundName = "PSSL";
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
    const rowStatus = await homePage.getRowStatus(fundName);
    await expect(rowStatus).toBeVisible();
  });

  test('Scenario: Export Report PSLF', async ({ landingPage }) => {
    const fundName = "PSLF";
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData(fundName, "Completed");
    await base.clickConfirmAndProceedBtn();
    await base.clickSaveTriggerButton();
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

  test('Scenario: View Report PSLF', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const fundName = "PSLF";
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
    const rowStatus = await homePage.getRowStatus(fundName);
    await expect(rowStatus).toBeVisible();
  });





})