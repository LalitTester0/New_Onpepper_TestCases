import { test, expect } from './fixtures/baseTest';

test.describe('Save Trigger Funds', () => {

 const funds = [
  {
    fundName: "PCOF",
    otherInfoFile: "PCOF_OtherInfoFile",
  },
  {
    fundName: "PFLT",
    otherInfoFile: "PFLT_OtherInfoFile",
  },
  {
    fundName: "PSSL",
    otherInfoFile: "PSSL_OtherInfoFile",
  },
  {
    fundName: "PSLF",
    otherInfoFile: "PSLF_OtherInfoFile",
  },
  {
    fundName: "PSSL_II_SPV",
    otherInfoFile: "PSLF_OtherInfoFile", // Change if you have a separate file
  },
  {
    fundName: "PNNT",
    otherInfoFile: "PNNT_OtherInfoFile",
  },
];
for (const item of funds) {
  test(`Scenario: Trigger Calculation for ${item.fundName}`, async ({ landingPage }) => {

    const homePage = await landingPage.goTo();

    const data = await homePage.navigateToDataIngestion();

    const base = await data.clickOnBaseData(item.fundName, "Completed");

    await base.clickConfirmAndProceedBtn();

    await base.uploadOtherInfoFile(item.otherInfoFile);

    await base.clickSaveTriggerButton();

    if (await homePage.isErrorListVisible()) {
      expect(false, "Errors were displayed on screen.").toBeTruthy();
    } else {
      const actualMsg = await homePage.getFundType(item.fundName);
      expect(actualMsg).toBe(item.fundName);
    }
  });
}

  // test('Scenario: Trigger Calculation for PSCF', async ({ landingPage }) => {
  //   const fundName = "PSCF";
  //   const homePage = await landingPage.goTo();
  //   const data = await homePage.navigateToDataIngestion();
  //   const base = await data.clickOnBaseData(fundName, "Completed");
  //   await base.clickConfirmAndProceedBtn();
  //   await base.clickSaveTriggerButton();
  //   if (await homePage.isErrorListVisible()) {
  //     expect(false, "Errors were displayed on screen.").toBeTruthy();
  //   } else {
  //     const actualMsg = await homePage.getFundType(fundName);
  //     expect(actualMsg).toBe(fundName);
  //   }
  // });

});
