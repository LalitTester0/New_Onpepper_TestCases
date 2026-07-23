import { test, expect } from './fixtures/baseTest';
import { ExtractNewBaseData } from "../pages/ExtractNewBaseData";

test.describe('Generate Base File Validation', () => {

const funds = [
  {
    fund: "PFLT",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPFLT(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPFLT()
  },
  {
    fund: "PCOF",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPCOF(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPCOF()
  },
  {
    fund: "PSSL",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPSSL(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPSSL()
  },
  {
    fund: "PSLF",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPSLF(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPSLF()
  },
  {
    fund: "PSCF",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPSCF(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPSCF()
  },
  {
    fund: "PPIF",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPPIF(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPPIF()
  },
  {
    fund: "PSSL_II_SPV",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPSSL_II(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPSSL_II()
  },
  {
    fund: "PNNT",
    checkAvailability: (page: ExtractNewBaseData) => page.checkSourceFileAvailabilityForPNNT(),
    selectSourceFile: (page: ExtractNewBaseData) => page.selectSourceFileForPNNT()
  }
];
for (const item of funds) {

  test(`Generate and verify ${item.fund} Fund Base File`, async ({ landingPage }, testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extract = await data.selectExtractNewBaseDataBtn();
    await extract.enterFundAndDate(item.fund);
    await item.checkAvailability(extract);
    await item.selectSourceFile(extract);
    await extract.checkDataMappingInfo();
    const base = await extract.clickStartExtractionBtn();
    expect(await base.getFundType()).toBe(item.fund);
  });

}


});
