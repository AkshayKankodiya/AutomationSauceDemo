import { test, expect } from '../../Fixture/fixtures';
import { LoginPage } from '../../pages/LoginPage';
import { credentials } from '../../config/credentials';
let loginTestPage: LoginPage;
test.beforeAll(async ({ sharedPage, loginPageFixture }) => {
  loginTestPage = new LoginPage(sharedPage);
});

test.describe('Automation Authentication Test SauceDemo', () => {


  test('Authentication Tests1:', async () => {
    console.log('\n====================================================');
    console.log('🧪 TEST STARTED: Authentication Tests');
    console.log('====================================================\n');
    console.log('➡️ Scenario 1: Invalid Credentials Login');
    await loginTestPage.assertOnLoginWithInvalidData();
    console.log('➡️ Scenario 2: Locked User Login');
    await loginTestPage.assertOnLoginWithLockedUser();
    console.log('\n====================================================');
    console.log('✅ TEST COMPLETED: Authentication Tests');
    console.log('====================================================\n');
  });
 

    test('Authentication Tests 2 :', async () => {
    console.log('\n====================================================');
    console.log('🧪 TEST STARTED: Authentication Tests');
    console.log('====================================================\n');
    console.log('➡️ Scenario 3: Valid User Login');
    await loginTestPage.assertOnLoginPage(credentials.username, credentials.password);
    console.log('➡️ Scenario 4: Session Persistence Validation');
    await loginTestPage.sessionPersistenceValidation();
    console.log('\n====================================================');
    console.log('✅ TEST COMPLETED: Authentication Tests');
    console.log('====================================================\n');
  });
 

});
