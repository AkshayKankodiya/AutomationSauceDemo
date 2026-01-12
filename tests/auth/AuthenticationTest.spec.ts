import { test, expect } from '../../Fixture/fixtures';
import { DashboardPage } from '../../pages/DasboardPage'; 
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/inventory.page';
let dashboardPage: DashboardPage;
let loginTestPage: LoginPage;
let inventoryPage: InventoryPage;
test.beforeAll(async ({ sharedPage, loginPageFixture }) => {
  dashboardPage = new DashboardPage(sharedPage);
  loginTestPage = new LoginPage(sharedPage);
  inventoryPage = new InventoryPage(sharedPage);
});

test.describe('Automation Authentication Test SauceDemo', () => {


  test('Authentication Tests:', async () => {
    console.log('\n====================================================');
    console.log('🧪 TEST STARTED: Authentication Tests');
    console.log('====================================================\n');
    console.log('➡️ Scenario 1: Invalid Credentials Login');
    await loginTestPage.assertOnLoginWithInvalidData();
    console.log('➡️ Scenario 2: Locked User Login');
    await loginTestPage.assertOnLoginWithLockedUser();
    console.log('➡️ Scenario 3: Valid User Login');
    await loginTestPage.assertOnLoginPage();
    console.log('➡️ Scenario 4: Session Persistence Validation');
    await loginTestPage.sessionPersistenceValidation();
    console.log('\n====================================================');
    console.log('✅ TEST COMPLETED: Authentication Tests');
    console.log('====================================================\n');
  });
 

});
