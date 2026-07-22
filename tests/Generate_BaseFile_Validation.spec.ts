import { test, expect } from './fixtures/baseTest';

test.describe('Generate Base File Validation', () => {

  // test('Scenario: Generate and verify PCOF Fund Base File', async ({ landingPage },testInfo) => {
  //   landingPage.setLongTimeout(testInfo);
  //   const homePage = await landingPage.goTo();
  //   const data = await homePage.navigateToDataIngestion();
  //   const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
  //   await extractNewBaseData.enterFundAndDate("PCOF");
  //   await extractNewBaseData.checkSourceFileAvailabilityForPCOF();
  //   await extractNewBaseData.selectSourceFileForPCOF();
  //   await extractNewBaseData.checkDataMappingInfo();
  //   const base = await extractNewBaseData.clickStartExtractionBtn();
  //   const fundType = await base.getFundType();
  //   expect(fundType).toBe("PCOF");
  // });
  
  test('Scenario: Generate and verify PFLT Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PFLT");
    await extractNewBaseData.checkSourceFileAvailabilityForPFLT();
    await extractNewBaseData.selectSourceFileForPFLT();
    await extractNewBaseData.checkDataMappingInfo();
    const base = await extractNewBaseData.clickStartExtractionBtn();
    const fundType = await base.getFundType();
    expect(fundType).toBe("PFLT");
  });

  test('Scenario: Generate and verify PSSL Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PSSL");
    await extractNewBaseData.checkSourceFileAvailabilityForPSSL();
    await extractNewBaseData.selectSourceFileForPSSL();
    await extractNewBaseData.checkDataMappingInfo();
    const base = await extractNewBaseData.clickStartExtractionBtn();
    const fundType = await base.getFundType();
    expect(fundType).toBe("PSSL");
  });

  test('Scenario: Generate and verify PSLF Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PSLF");
    await extractNewBaseData.checkSourceFileAvailabilityForPSLF();
    await extractNewBaseData.selectSourceFileForPSLF();
    await extractNewBaseData.checkDataMappingInfo();
    const base = await extractNewBaseData.clickStartExtractionBtn();
    const fundType = await base.getFundType();
    expect(fundType).toBe("PSLF");
  });

  test('Scenario: Generate and verify PSCF Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PSCF");
    await extractNewBaseData.checkSourceFileAvailabilityForPPIF();
    await extractNewBaseData.selectSourceFileForPSCF();
    await extractNewBaseData.checkDataMappingInfo();
    const base = await extractNewBaseData.clickStartExtractionBtn();
    const fundType = await base.getFundType();
    expect(fundType).toBe("PSCF");
  });

    test('Scenario: Generate and verify PPIF Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PPIF");
    await extractNewBaseData.checkSourceFileAvailabilityForPPIF();
    await extractNewBaseData.selectSourceFileForPPIF();
    await extractNewBaseData.checkDataMappingInfo();
    // const base = await extractNewBaseData.clickStartExtractionBtn();
    // const fundType = await base.getFundType();
    // expect(fundType).toBe("PPIF");
  });


   test('Scenario: Generate and verify PSSL_II_SPV Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PSSL_II_SPV");
    await extractNewBaseData.checkSourceFileAvailabilityForPSSL_II();
    await extractNewBaseData.selectSourceFileForPSSL_II();
    await extractNewBaseData.checkDataMappingInfo();
    // const base = await extractNewBaseData.clickStartExtractionBtn();
    // const fundType = await base.getFundType();
    // expect(fundType).toBe("PPIF");
  });

test.only('Scenario: Generate and verify PNNT Fund Base File', async ({ landingPage },testInfo) => {
    landingPage.setLongTimeout(testInfo);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const extractNewBaseData = await data.selectExtractNewBaseDataBtn();
    await extractNewBaseData.enterFundAndDate("PNNT");
    await extractNewBaseData.checkSourceFileAvailabilityForPNNT();
    await extractNewBaseData.selectSourceFileForPNNT();
    //await extractNewBaseData.checkDataMappingInfo();
    // const base = await extractNewBaseData.clickStartExtractionBtn();
    // const fundType = await base.getFundType();
    // expect(fundType).toBe("PPIF");
  });


});
