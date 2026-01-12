// ../Fixture/fixtures.ts
import { test as base, expect, BrowserContext, Page } from '@playwright/test';
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
  loginPageFixture: async ({ sharedPage }, use) => {
    const loginPage = new LoginPage(sharedPage);
    await loginPage.navigationGoto();
    await use(loginPage);

  },

  // ---------- Worker-scoped BrowserContext ----------
  sharedContext: [
    async ({ browser }: any, use: (arg0: any) => any) => {
      const context = await browser.newContext();
      await use(context);
      await context.close();
    },
    {
      scope: 'worker',
    },
  ] as any, // 👈 avoid the WorkerFixtureValue type headache

  // ---------- One Page per worker (same tab, no extra tabs per test) ----------
  sharedPage: [
    async ({ sharedContext }: any, use: (arg0: any) => any) => {
      const page = await sharedContext.newPage();
      await use(page);
      // optional: await page.close(); // usually not needed; context.close() will handle it
    },
    {
      scope: 'worker',
    },
  ] as any,
});

export { expect };
