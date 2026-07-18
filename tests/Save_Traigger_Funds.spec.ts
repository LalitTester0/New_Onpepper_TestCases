import { test, expect } from './fixtures/baseTest';

test.describe('Save Trigger Funds', () => {

  test('Scenario: Open PCOF Base Data File', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const base = await data.clickOnBaseData("PCOF", "Completed");
    const fundType = await base.getFundType();
    expect(fundType).toBe("PCOF");
  });

  test('Scenario: Trigger Calculation for PCOF', async ({ landingPage }) => {
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
  });

  test('Scenario: Trigger Calculation for PFLT', async ({ landingPage }) => {
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
  });

  test('Scenario: Trigger Calculation for PSSL', async ({ landingPage }) => {
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
  });

  test('Scenario: Trigger Calculation for PSLF', async ({ landingPage }) => {
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
  });

  test('Scenario: Trigger Calculation for PSCF', async ({ landingPage }) => {
    const fundName = "PSCF";
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
  });

});
