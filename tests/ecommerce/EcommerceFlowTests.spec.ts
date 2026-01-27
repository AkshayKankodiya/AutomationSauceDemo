import { test, expect } from '../../Fixture/fixtures';
import { DashboardPage } from '../../pages/DasboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../config/credentials';
let dashboardPage: DashboardPage;
let loginTestPage: LoginPage;
test.beforeAll(async ({ sharedPage, loginPageFixture }) => {
  dashboardPage = new DashboardPage(sharedPage);
  loginTestPage = new LoginPage(sharedPage);
  await loginTestPage.assertOnLoginPage(credentials.username, credentials.password);
});

test.describe('Automation E-commerce Flow Test SauceDemo', () => {

  test('E-commerce Flow Tests', async () => {
    console.log('\n====================================================');
    console.log('🛍️ TEST STARTED: E-commerce Flow Tests');
    console.log('====================================================\n');
    console.log('🧭 Step 1: Verifying Products Listing Page is displayed');
    await dashboardPage.VerifyingTheProductsPage();
    console.log('➕ Step 2: Adding first product to cart (Index: 0)');
    await dashboardPage.buyProduct(0);
    console.log('➕ Step 3: Adding second product to cart (Index: 1)');
    await dashboardPage.buyProduct(1);
    console.log('🛒 Step 4: Verifying cart items and clearing cart');
    await dashboardPage.verifyProductsOnCartPage([
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt'
    ]);
    console.log('↩️ Step 5: Continuing shopping');
    await dashboardPage.continueShoppingButton();
    console.log('➕ Step 6: Adding first product again to cart (Index: 0)');
    await dashboardPage.buyProduct(0);
    console.log('💳 Step 7: Verifying cart and completing checkout');
    await dashboardPage.VerifyingProductOnCartPage();
    console.log('\n====================================================');
    console.log('✅ TEST COMPLETED: E-commerce Flow Tests');
    console.log('====================================================\n');
  });


});
