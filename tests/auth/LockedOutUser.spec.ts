// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication / Login', () => {
  test('Locked Out User', async ({ loginPageFixture }) => {
    // 1. Enter 'locked_out_user' and 'secret_sauce'.
    // 2. Click Login and verify the locked-user error message is displayed.

    await loginPageFixture.assertOnLoginWithLockedUser();

  });
});