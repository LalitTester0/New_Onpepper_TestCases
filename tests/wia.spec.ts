import { test, expect } from './fixtures/baseTest';

const funds = [
  {
    fundName: "PCOF",
    columnName: "Investment_Cost",
    sheetName: "PL BB Build",
  },
  {
    fundName: "PFLT",
    columnName: "Total_Commitment_(Issue_Currency)",
    sheetName: "Loan List",
  },
  {
    fundName: "PSSL",
    columnName: "RCF_Commitment_Amount",
    sheetName: "Portfolio",
  },
  {
    fundName: "PSLF",
    columnName: "OutstandingAmount",
    sheetName: "Loan List",
  },
  {
    fundName: "PSCF",
    columnName: "(Local_Currency)_Current_Commitment_Amount",
    sheetName: "Loan Tape",
  },
  {
    fundName: "PPIF",
    columnName: "(Local_Currency)_Current_Commitment_Amount",
    sheetName: "Loan Tape",
  },
  {
    fundName: "PSSL_II_SPV",
    columnName: "Collateral_Obligation_Notional_Amount_(Local)",
    sheetName: "Borrowing Base",
  },
  {
    fundName: "PNNT",
    columnName: "PNNT_Market_Value",
    sheetName: "Loan Tape",
  },
];

test.describe("What-If Analysis", () => {
  for (const item of funds) {
    test(`Scenario: What-If Analysis ${item.fundName} Fund`, async ({ landingPage }) => {
      const homePage = await landingPage.goTo();
      await homePage.clickViewResultBtn(item.fundName);
      await homePage.clickWhatIfAnalysisBtn();
      const wiaText = await homePage.updateValuesWIA(
        item.columnName,
        item.fundName,
        item.sheetName
      );
      expect(wiaText).toBeTruthy();
      await homePage.saveWIAData(item.fundName);
    });
  }
});