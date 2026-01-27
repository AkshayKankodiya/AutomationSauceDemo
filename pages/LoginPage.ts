import { Page, Locator, expect } from '@playwright/test';
import LoginLocatorsPage from './../Locators/LoginPageLocators';

export class LoginPage {
  private readonly page: Page;
  private LoginLocatorsPage: LoginLocatorsPage;

  constructor(page: Page) {
    this.page = page;
    this.LoginLocatorsPage = new LoginLocatorsPage(page);
  }




  async navigationGoto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    console.log('Navigating to search page');
    const pageTitle = await this.page.title();
    console.log('Page Title:', pageTitle);
    console.log('---------------------------------------');
  }

  async assertOnLoginWithInvalidData() {
    console.log('\n========== ❌ INVALID LOGIN FLOW STARTED ==========');
    console.log('⏳ Waiting for login page to load...');
    await this.page.waitForLoadState('domcontentloaded');
    console.log('👀 Verifying username field visibility');
    await expect(this.LoginLocatorsPage.username_text_box).toBeVisible();
    console.log('✍️ Entering valid username');
    await this.LoginLocatorsPage.username_text_box.fill('standard_user');
    console.log('✍️ Entering invalid password');
    await this.LoginLocatorsPage.password_text_box.fill('wrong_password');
    console.log('🚀 Clicking Login button');
    await this.LoginLocatorsPage.submit_button.click();
    console.log('⚠️ Waiting for error message to appear...');
    await expect(this.LoginLocatorsPage.error_message).toBeVisible();
    const errorMessage = await this.LoginLocatorsPage.error_message.allInnerTexts();
    console.log(`🧾 Error message displayed: "${errorMessage[0]}"`);
    console.log('🧠 Verifying error message content');
    expect(errorMessage[0]).toContain(
      'Epic sadface: Username and password do not match any user in this service'
    );
    console.log('✅ Invalid login attempt verified successfully');
    console.log('========== 🧪 NEGATIVE LOGIN FLOW COMPLETED ==========\n');
    await this.page.waitForTimeout(2000); // Pause for 2 seconds before next action
  }

  async assertOnLoginWithLockedUser() {
    console.log('\n========== 🔒 LOCKED USER LOGIN FLOW STARTED ==========');
    console.log('⏳ Waiting for login page to be ready...');
    await this.page.waitForLoadState('domcontentloaded');
    console.log('👀 Checking visibility of username input');
    await expect(this.LoginLocatorsPage.username_text_box).toBeVisible();
    console.log('✍️ Entering locked user credentials');
    console.log('   ↳ Username: locked_out_user');
    await this.LoginLocatorsPage.username_text_box.fill('locked_out_user');
    console.log('✍️ Entering password');
    await this.LoginLocatorsPage.password_text_box.fill('secret_sauce');
    console.log('🚀 Submitting login form');
    await this.LoginLocatorsPage.submit_button.click();
    console.log('⚠️ Awaiting locked-user error message...');
    await expect(this.LoginLocatorsPage.error_message).toBeVisible();
    const errorMessage = await this.LoginLocatorsPage.error_message.allInnerTexts();
    console.log(`🧾 Error message received: "${errorMessage[0]}"`);
    console.log('🧠 Validating locked-user error message');
    expect(errorMessage[0]).toContain(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    console.log('✅ Locked user login restriction verified successfully');
    console.log('========== 🧪 LOCKED USER NEGATIVE FLOW COMPLETED ==========\n');
    await this.page.waitForTimeout(2000);
  }



  async assertOnLoginPage(Username: string , Password: string ) {
    console.log('\n========== 🔐 LOGIN FLOW STARTED ==========');
    console.log('⏳ Waiting for login page to load...');
    await this.page.waitForLoadState('domcontentloaded');
    console.log('👀 Verifying username field visibility');
    await expect(this.LoginLocatorsPage.username_text_box).toBeVisible();
    console.log('✍️ Entering username');
    await this.LoginLocatorsPage.username_text_box.fill(Username);
    console.log('✍️ Entering password');
    await this.LoginLocatorsPage.password_text_box.fill(Password);
    console.log('🚀 Clicking Login button');
    await this.LoginLocatorsPage.submit_button.click();
    console.log('🌐 Waiting for network to be idle...');
    await this.page.waitForLoadState('networkidle');
    console.log('🧠 Verifying page title after login');
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    console.log(`✅ Login successful | Page Title: "${pageTitle}"`);
    console.log('🏠 User landed on Home page');
    console.log('========== ✅ LOGIN FLOW COMPLETED ==========\n');
    await this.page.waitForTimeout(2000);
  }

  async sessionPersistenceValidation() {
    console.log('\n========== 🔐 SESSION PERSISTENCE VALIDATION STARTED ==========');
    console.log('🔄 Reloading the page to validate active session...');
    await this.page.reload({ waitUntil: 'networkidle' });
    console.log('🧠 Verifying user remains authenticated after page refresh');
    const pageTitle = await this.page.title();
    console.log(`📄 Page title after refresh: "${pageTitle}"`);
    expect(pageTitle).toBe('Swag Labs');
    console.log('✅ Session persisted successfully after refresh');
    console.log('========== 🟢 SESSION PERSISTENCE VALIDATION COMPLETED ==========\n');
    await this.page.waitForTimeout(2000);
  }

}