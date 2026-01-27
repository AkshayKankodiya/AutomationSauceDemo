// ../Fixture/fixtures.ts
import {test as base,expect,Browser,BrowserContext,Page,} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// ---------- Worker-scoped fixtures ----------
type WorkerFixtures = {
  sharedContext: BrowserContext;
  sharedPage: Page;
};

// ---------- Per-test fixtures ----------
type TestFixtures = {
  loginPageFixture: LoginPage;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // ---------- Per-test LoginPage fixture ----------
  loginPageFixture: async ({ sharedPage }: { sharedPage: Page },
    use: (loginPage: LoginPage) => Promise<void>
  ) => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.navigationGoto();
    await use(loginPage);
  },

  // ---------- Worker-scoped BrowserContext ----------
  sharedContext: [
    async (
      { browser }: { browser: Browser },
      use: (context: BrowserContext) => Promise<void>
    ) => {
      const context = await browser.newContext();
      await use(context);
      await context.close();
    },
    { scope: 'worker' },
  ],

  // ---------- One Page per worker ----------
  sharedPage: [
    async (
      { sharedContext }: { sharedContext: BrowserContext },
      use: (page: Page) => Promise<void>
    ) => {
      const page = await sharedContext.newPage();
      await use(page);
    },
    { scope: 'worker' },
  ],
});

export { expect };
