// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';
import { credentials } from '../../config/credentials';

test.describe('Authentication / Login', () => {
  test('Session Persistence After Refresh', async ({ loginPageFixture }) => {
    // 1-2. Log in with valid credentials and verify successful login
    await loginPageFixture.assertOnLoginPage(credentials.username, credentials.password);

    // 3-4. Reload the page and verify user remains authenticated
    await loginPageFixture.sessionPersistenceValidation();

  });
});