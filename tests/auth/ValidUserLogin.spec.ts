// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../config/credentials';

test.describe('Authentication / Login', () => {
  test('Valid User Login (Happy Path)', async ({ loginPageFixture }) => {
    // 1. Go to the Login page (navigate to '/') - handled by `loginPageFixture` setup

    // 2. Verify the username and password fields and the Login button are visible.
    // (Comment: Using the page object's assertions via helper method)

    // 3. Enter valid credentials (env vars) and 4. Click the Login button
    // 5. Wait for page to load and network to be idle
    // 6. Verify user lands on Inventory page: page title is 'Swag Labs' and product list is visible.
    await loginPageFixture.assertOnLoginPage(credentials.username, credentials.password);

  });
});