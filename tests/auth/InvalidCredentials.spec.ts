// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication / Login', () => {
  test('Invalid Credentials', async ({ loginPageFixture }) => {
    // 1. Verify username/password inputs are visible.
    // 2. Enter a valid username and an invalid password.
    // 3. Click Login and 4. Wait for the error banner to appear and validate its message.

    await loginPageFixture.assertOnLoginWithInvalidData();

  });
});