// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';
import { credentials } from '../../config/credentials';

test.describe('Authentication / Login', () => {
  test('Logout Flow', async ({ loginPageFixture }) => {
    // Assumption: Log in first
    await loginPageFixture.assertOnLoginPage(credentials.username, credentials.password);

    const page = (loginPageFixture as any).page;
    const locators = (loginPageFixture as any).LoginLocatorsPage;

    // 1-2. Open hamburger menu and click 'Logout'
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // 3. Verify user is redirected to Login page and inputs are visible
    await expect(locators.username_text_box).toBeVisible();
    await expect(locators.password_text_box).toBeVisible();

    // 4. Attempt navigation to /inventory.html and verify redirect back to login
    await page.goto('/inventory.html');
    await expect(locators.username_text_box).toBeVisible();

  });
});