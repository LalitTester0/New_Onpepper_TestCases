import { test, expect } from './fixtures/baseTest';
import * as fs from 'fs';

test.describe('Source File Upload Validation', () => {

  test('Scenario: Verify mandatory fields validation during file upload (Select Report Date)', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.clickLoadButton();
    const message = await source.getToastMsg.innerText();
    expect(message).toBe("Select Report Date");
  });

  test('Scenario: Upload Master File for PFLT Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PFLT");
    const newFileName = await source.uploadNewMasterFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Cash File for PFLT Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PFLT");
    const newFileName = await source.uploadNewCashFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Market Book File for PFLT Fund', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PFLT");
    const newFileName = await source.uploadNewMarketFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  // test('Scenario: Duplicate File Upload Error', async ({ landingPage }) => {
  //   const homePage = await landingPage.goTo();
  //   const data = await homePage.navigateToDataIngestion();
  //   const source = await data.selectSourceFileTab();
  //   await source.clickUploadFilesBtn();
  //   await source.selectReportDate();
  //   await source.selectFundCheckbox("PFLT");
  //   await source.uploadNewMasterFile();
  //   await source.page.waitForTimeout(500);
  //   await source.clickLoadButton();
  //   await source.getToastMsg.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  //   const message = await source.getToastMsg.innerText();
  //   expect(message).toBe("Files with same name already exist.");
  // });

  test('Scenario: Verify mandatory fields validation (Select files)', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.clickLoadButton();
    const message = await source.getToastMsg.innerText();
    expect(message).toBe("Please select files.");
  });

  // test('Scenario: Verify mandatory fields validation (Select Fund)', async ({ landingPage }) => {
  //   const homePage = await landingPage.goTo();
  //   const data = await homePage.navigateToDataIngestion();
  //   const source = await data.selectSourceFileTab();
  //   await source.clickUploadFilesBtn();
  //   await source.selectReportDate();
  //   await source.uploadNewMarketFile();
  //   await source.page.waitForTimeout(500);
  //   await source.clickLoadButton();
  //   const message = await source.getToastMsg.innerText();
  //   expect(message).toBe("Please select Fund.");
  // });

  test('Scenario: Verify mandatory fields validation (Select files with Fund)', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PFLT");
    await source.clickLoadButton();
    const message = await source.getToastMsg.innerText();
    expect(message).toBe("Please select files.");
  });

  test('Scenario: Verify mandatory fields validation (Missing report date with Fund and File)', async ({ landingPage }) => {
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectFundCheckbox("PFLT");
    await source.uploadNewMarketFile();
    await source.clickLoadButton();
    const message = await source.getToastMsg.innerText();
    expect(message).toBe("Select Report Date");
  });

  test('Scenario: Upload Master File for PCOF Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PCOF");
    const newFileName = await source.uploadNewMasterFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Cash File for PCOF Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PCOF");
    const newFileName = await source.uploadNewCashFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Market Book File for PCOF Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PCOF");
    const newFileName = await source.uploadNewMarketFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Master File for All Funds', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("ALL");
    const newFileName = await source.uploadNewMasterFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Cash File for All Funds', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("ALL");
    const newFileName = await source.uploadNewCashFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Market Book File for All Funds', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("ALL");
    const newFileName = await source.uploadNewMarketFile();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });

  test('Scenario: Upload Cash File for PSSL Fund', async ({ landingPage }) => {
    test.setTimeout(500*1000);
    const homePage = await landingPage.goTo();
    const data = await homePage.navigateToDataIngestion();
    const source = await data.selectSourceFileTab();
    await source.clickUploadFilesBtn();
    await source.selectReportDate();
    await source.selectFundCheckbox("PSSL");
    const newFileName = await source.uploadNewCashFileforPSSL();
    await source.page.waitForTimeout(500);
    await source.clickLoadButton();
    const fileStatus = await source.getUploadFileStatus(newFileName);
    expect(fileStatus, "file is not displayed").toBeTruthy();
  });
});
