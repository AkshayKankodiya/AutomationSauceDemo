// spec: specs/login.test.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../Fixture/fixtures';

test.describe('Authentication / Login', () => {
  test('Empty Fields Validation (edge cases)', async ({ loginPageFixture }) => {
    const locators = (loginPageFixture as any).LoginLocatorsPage;

    // Case A — Both fields empty
    // 1. Clear username and password fields.
    // 2. Click Login.
    // 3. Verify an error message appears (text contains 'required').
    await locators.username_text_box.fill('');
    await locators.password_text_box.fill('');
    await locators.submit_button.click();
    await expect(locators.error_message).toBeVisible();
    const msgA = await locators.error_message.innerText();
    expect(msgA.toLowerCase()).toContain('required');

    // Reset to login page for next case
    await loginPageFixture.navigationGoto();

    // Case B — Username empty
    // 1. Leave username empty, fill password with a valid value, click Login, verify error message.
    await locators.username_text_box.fill('');
    await locators.password_text_box.fill('secret_sauce');
    await locators.submit_button.click();
    await expect(locators.error_message).toBeVisible();
    const msgB = await locators.error_message.innerText();
    expect(msgB.toLowerCase()).toContain('username');

    // Reset to login page for next case
    await loginPageFixture.navigationGoto();

    // Case C — Password empty
    // 1. Fill username with a valid value, leave password empty, click Login, verify error message.
    await locators.username_text_box.fill('standard_user');
    await locators.password_text_box.fill('');
    await locators.submit_button.click();
    await expect(locators.error_message).toBeVisible();
    const msgC = await locators.error_message.innerText();
    expect(msgC.toLowerCase()).toContain('password');

  });
});