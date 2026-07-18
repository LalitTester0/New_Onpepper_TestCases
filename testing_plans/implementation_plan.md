# Implementation Plan: Test Suite Analysis & Healing

This plan outlines the steps to run the complete test suite in [Tests](file:///c:/Users/Admin/git/Onpepper_Test/src/test/java/onpepper/Data_Analytics/Tests), analyze any failures, and provide suggested "healing" code for the user to review.

## Proposed Strategy

### 1. Suite Execution
The following test classes have been identified in the `Tests` folder. You can add or remove files from this list to customize the run.

**Section 1: Classes to Test**
- `Generate_BaseFile_Validation`

**Section 2: Classes to Exclude**
- `DataIngestion_Validation`
- `Export_Reports`
- `LiquidityManagement`
- `Save_Traigger_Funds`
- `SourceFile_Upload_Validation`

**Execution Strategy:**
I will run the selected test cases (methods) **one by one sequentially**.
- I will request your permission **only once** for the entire batch of tests listed in Section 1.
- Once approved, I will proceed with the entire sequence without further interruptions.

**How to Run Only Failed Tests:**
1. View the latest [TestResultsReport.md](file:///c:/Users/Admin/git/Onpepper_Test/testing_plans/TestResultsReport.md).
2. Move the failed class names or specific methods into **Section 1** below.
3. Move passed classes to **Section 2**.
4. I will then execute only those in Section 1.

**Execution Command Template:**
For each test method in Section 1, I will use:
```bash
mvn test -Dtest="ClassName#MethodName"
```
I will proceed through all methods in the listed classes sequentially.

### 2. Failure Analysis
For every failing test, I will:
- Capture the **Stack Trace** and **Failure Message**.
- Identify the **Root Cause** (e.g., UI changes, stale locators, incorrect assertions, environment issues).
- Locate the exact line of code in the test file responsible for the failure.

### 3. Healing Recommendations (No Code Modification)
I will generate a report containing:
- **Test Name**: The name of the failed test.
- **Root Cause**: A brief explanation of why it failed.
- **Healing Code**: A fenced code block showing the corrected snippet that the user can copy/paste.
    > [!IMPORTANT]
    > I will NOT apply these changes to the codebase. I will only provide the code for your review.

## Verification
- Results will be presented in a new `TestResultsReport.md` artifact.
- You can analyze the suggestions and decide which ones to implement.
