import { test, expect } from './fixtures/baseTest';
import * as fs from 'fs';

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
  {
    fundName: "PPIF",
    otherInfoFile: "PPIF_OtherInfoFile",
  },
  {
    fundName: "PSCF",
    otherInfoFile: "PSCF_OtherInfoFile",
  }
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
  await test.step(`Test export functionality of ${item.fundName}`,async()=>{
      const downloadedFile = await homePage.clickExportBtnAndDownload(item.fundName);
      expect(downloadedFile).toBeTruthy();
      expect(fs.existsSync(downloadedFile!)).toBeTruthy();
    })
    await test.step(`Test View report functionality of ${item.fundName}`,async()=>{
      const rowStatus = await homePage.getRowStatus(item.fundName);
      await expect(rowStatus).toBeVisible();

    })
  });
}

  

});
