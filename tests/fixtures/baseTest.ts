import { test as base } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
// other pages will be imported here as we migrate them

type MyFixtures = {
  landingPage: LandingPage;
};

export const test = base.extend<MyFixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
});

export { expect } from '@playwright/test';
