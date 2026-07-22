import { SourceFileLists } from '../pages/SourceFileLists';
import { test, expect } from './fixtures/baseTest';

const Requiredfunds = [
  {
    fund: "PCOF"
  },
  {
    fund: "PFLT"
  },
  {
    fund: "PSSL"
  },
  {
  fund: "PSLF"
  },
  {
    fund:"PSCF"
  },
  {
    fund:"PPIF"
  },
  {
    fund:"PSSL_II_SPV"
  },
  {
    fund:"PNNT"
  }
];
test.describe("Master File Upload", () => {
  test.describe.configure({ mode: "serial" });
for(const data of Requiredfunds){
test(`Scenario: Upload Master File for ${data.fund} Fund`, async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const dataingestion = await homePage.navigateToDataIngestion();
    const source = await dataingestion.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox(data.fund);
    const newFileName = await source.uploadNewMasterFile();
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  })
}
});

test('Scenario: Upload Market Book File for PCOF Fund', async ({ landingPage },testInfo) => {
  landingPage.setLongTimeout(testInfo);
  const homePage = await landingPage.goTo();
  const data = await homePage.navigateToDataIngestion();
  const source = await data.selectSourceFileTab();
  await source.clickUploadFilesBtn();
  await source.selectReportDate();
  await source.selectFundCheckbox("PCOF");
  const newFileName = await source.uploadNewMarketFile();
  await source.clickLoadButton();
  const fileStatus = await source.getUploadFileStatus(newFileName);
  expect(fileStatus, "file is not displayed").toBeTruthy();
});

const funds = [
  {
    fund: "PFLT"
  },
  {
    fund: "PSSL"
  },
  {
    fund:"PSSL_II_SPV"
  }
];

test.describe("Portfolio File Upload", () => {
  test.describe.configure({ mode: "serial" });
for(const data of funds){
test(`Upload portfolio file for ${data.fund}`, async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo)
    const homePage = await landingPage.goTo();
    landingPage.setLongTimeout(testInfo);
    const dataingestion = await homePage.navigateToDataIngestion();
    const source = await dataingestion.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox(data.fund);
    const newFileName = await source.uploadNewRatingFile();
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  })
}
});

const Requiredfunds2 = [
  {
    fund: "PFLT",
    upload: (source: SourceFileLists) => source.uploadNewCashFile()
  },
  {
    fund: "PSSL",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPSSL()
  },
  {
    fund: "PSLF",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPSLF()
  },
  {
    fund: "PSCF",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPSCF()
  },
  {
    fund: "PPIF",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPPIF()
  },
  {
    fund: "PSSL_II_SPV",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPSSL_II_SPV()
  },
  {
    fund: "PNNT",
    upload: (source: SourceFileLists) => source.uploadNewCashFileforPNNT()
  }]
test.describe("Cash File Upload", () => {
  test.describe.configure({ mode: "serial" });
for (const item of Requiredfunds2) {
  test(`Upload Cash File for ${item.fund}`, async ({ landingPage }, testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const ingestion = await homePage.navigateToDataIngestion();
    const source = await ingestion.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox(item.fund);
    const newFileName = await item.upload(source);
    await source.clickLoadButton();
    const status = await source.getUploadFileStatus(newFileName);
    expect(status).toBeTruthy();
  })
}
});

test('Scenario: Upload Daily File for PNNT Fund', async ({ landingPage },testInfo) => {
  landingPage.setLongTimeout(testInfo);
  const homePage = await landingPage.goTo();
  const data = await homePage.navigateToDataIngestion();
  const source = await data.selectSourceFileTab();
  await source.clickUploadFilesBtn();
  await source.selectReportDate();
  await source.selectFundCheckbox("PNNT");
  const newFileName = await source.uploadNewDailyFileforPNNT();
  await source.clickLoadButton();
  const fileStatus = await source.getUploadFileStatus(newFileName);
  expect(fileStatus, "file is not displayed").toBeTruthy();
});

