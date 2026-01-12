import { test, expect } from '../../Fixture/fixtures';
import { DashboardPage } from '../../pages/DasboardPage'; // make sure file/class name matches
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/inventory.page';
let dashboardPage: DashboardPage;
let loginTestPage: LoginPage;
let inventoryPage: InventoryPage;
test.beforeAll(async ({ sharedPage, loginPageFixture }) => {
  dashboardPage = new DashboardPage(sharedPage);
  loginTestPage = new LoginPage(sharedPage);
  inventoryPage = new InventoryPage(sharedPage);
  await loginTestPage.assertOnLoginPage();
});

test.describe('Automation product sorting functionality Test SauceDemo', () => {

test('Verify product sorting functionality', async () => {
  console.log('\n====================================================');
  console.log('🔃 PRODUCT SORTING TEST | START');
  console.log('====================================================\n');
  console.log('📄 Step 1: Verifying user is on Inventory page');
  await inventoryPage.assertOnInventoryPage();
  console.log('✅ Inventory page verification successful\n');
  console.log('🔤 Step 2: Verifying product sorting by NAME (A → Z)');
  await inventoryPage.assertSortByName('asc');
  console.log('✅ Product sorting by NAME (A → Z) verified\n');
  console.log('🔤 Step 3: Verifying product sorting by NAME (Z → A)');
  await inventoryPage.assertSortByName('desc');
  console.log('✅ Product sorting by NAME (Z → A) verified\n');
  console.log('💲 Step 4: Verifying product sorting by PRICE (Low → High)');
  await inventoryPage.assertSortByPrice('asc');
  console.log('✅ Product sorting by PRICE (Low → High) verified\n');
  console.log('💲 Step 5: Verifying product sorting by PRICE (High → Low)');
  await inventoryPage.assertSortByPrice('desc');
  console.log('✅ Product sorting by PRICE (High → Low) verified\n');
  console.log('====================================================');
  console.log('🎉 PRODUCT SORTING TEST | COMPLETED SUCCESSFULLY');
  console.log('====================================================\n');
});


});
