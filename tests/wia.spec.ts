import { test, expect } from './fixtures/baseTest';
import * as fs from 'fs';



test('Scenario: What-If Analysis PCOF Fund', async ({ landingPage }) => {
    const fundName = "PCOF";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisBtn();
    const wia_text = await homePage.updateValuesWIA("Investment_Cost", fundName,'PL BB Build');
    expect(wia_text).toBeTruthy();
    await homePage.saveWIAData(fundName);
  });

test('Scenario: What-If Analysis PFLT Fund', async ({ landingPage }) => {
    const fundName = "PFLT";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisBtn();
    const wia_text = await homePage.updateValuesWIA("Total_Commitment_(Issue_Currency)", fundName,'Loan List');
    expect(wia_text).toBeTruthy();
    await homePage.saveWIAData(fundName);
  });

  test.only('Scenario: What-If Analysis PSSL Fund', async ({ landingPage }) => {
    const fundName = "PSSL";
    const homePage = await landingPage.goTo();
    await homePage.clickViewResultBtn(fundName);
    await homePage.clickWhatIfAnalysisBtn();
    const wia_text = await homePage.updateValuesWIA("RCF_Commitment_Amount", fundName,'Portfolio');
    expect(wia_text).toBeTruthy();
    await homePage.saveWIAData(fundName);
  });