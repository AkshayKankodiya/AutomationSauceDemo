# Login Test Plan

## Application Overview

Login test plan for SauceDemo application (https://www.saucedemo.com/). This plan covers authentication scenarios: happy path (valid credentials), negative cases (invalid credentials, locked user), input validation (empty fields), session behavior (persistence after refresh), and logout behavior. Tests are written to be independent, repeatable, and suitable for automation with Playwright.

## Test Scenarios

### 1. Authentication / Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid User Login (Happy Path)

**File:** `tests/auth/ValidUserLogin.spec.ts`

**Steps:**
  1. Assumptions: Browser starts on a fresh session and navigates to the application root ("/").
  2. 1. Go to the Login page (navigate to '/')
  3. 2. Verify the username and password fields and the Login button are visible.
  4. 3. Enter valid credentials (use env vars: USER_EMAIL / USER_PASSWORD or 'standard_user' / 'secret_sauce').
  5. 4. Click the Login button.
  6. 5. Wait for the page to load and for network to be idle.
  7. 6. Verify user lands on the Inventory (home) page: page title is 'Swag Labs' and product list is visible.
  8. 7. (Optional cleanup) Log out if test modifies shared state.
  9. Success criteria: Page title equals 'Swag Labs' and inventory items are visible; no error message shown.
  10. Failure conditions: Login form remains visible, or an error message is shown, or redirected to other page.

**Expected Results:**
  - User is authenticated and lands on Inventory page.
  - Page title is 'Swag Labs'.
  - At least one product is displayed in the inventory list.
  - No error banners/messages are displayed.

#### 1.2. Invalid Credentials

**File:** `tests/auth/InvalidCredentials.spec.ts`

**Steps:**
  1. Assumptions: Start at Login page, not logged in.
  2. 1. Verify username/password inputs are visible.
  3. 2. Enter a valid username (e.g., 'standard_user') and an invalid password (e.g., 'wrong_password').
  4. 3. Click Login.
  5. 4. Wait for the error banner to appear.
  6. Expected observable: An error banner is displayed with a clear message informing credentials are incorrect (text contains 'Epic sadface: Username and password do not match any user in this service').

**Expected Results:**
  - Error banner is visible.
  - Error text contains 'Username and password do not match any user in this service'.
  - User remains on Login page and is not authenticated.

#### 1.3. Locked Out User

**File:** `tests/auth/LockedOutUser.spec.ts`

**Steps:**
  1. Assumptions: Start at Login page.
  2. 1. Enter 'locked_out_user' as username and 'secret_sauce' as password.
  3. 2. Click Login.
  4. 3. Wait for the error banner.
  5. Expected observable: Error banner appears with message indicating the user is locked out (text contains 'Epic sadface: Sorry, this user has been locked out.').

**Expected Results:**
  - Error banner is visible.
  - Error text contains 'Sorry, this user has been locked out.'
  - User remains on Login page and is not authenticated.

#### 1.4. Empty Fields Validation (edge cases)

**File:** `tests/auth/EmptyFields.spec.ts`

**Steps:**
  1. Assumptions: Start at Login page.
  2. Case A — Both fields empty:
  3.   1. Clear username and password fields.
  4.   2. Click Login.
  5.   3. Verify an error message appears (text contains 'Username is required' or equivalent).
  6. Case B — Username empty:
  7.   1. Leave username empty, fill password with a valid value, click Login, and verify an appropriate error message.
  8. Case C — Password empty:
  9.   1. Fill username with a valid value, leave password empty, click Login, and verify an appropriate error message.

**Expected Results:**
  - Appropriate error banner/message is shown in each case
  - Messages are specific and actionable (e.g., 'Username is required' / 'Password is required' or equivalent).
  - No navigation to the Inventory page occurs.

#### 1.5. Session Persistence After Refresh

**File:** `tests/auth/SessionPersistence.spec.ts`

**Steps:**
  1. Assumptions: Start at Login page, valid credentials available.
  2. 1. Log in with valid credentials (standard_user / secret_sauce).
  3. 2. Verify successful login and inventory page is visible.
  4. 3. Reload the page (browser refresh).
  5. 4. Verify the user remains authenticated: page title 'Swag Labs' and inventory list still visible.
  6. Success criteria: Session persists across page refreshes until explicit logout or session timeout.
  7. Failure: User is redirected back to Login page after refresh without explicit logout.

**Expected Results:**
  - After reload, page title equals 'Swag Labs'.
  - Inventory content remains visible and interactable.
  - No login error displayed, user remains authenticated.

#### 1.6. Logout Flow

**File:** `tests/auth/Logout.spec.ts`

**Steps:**
  1. Assumptions: User is logged in and on the Inventory page.
  2. 1. Open the application menu (hamburger) in the top-left.
  3. 2. Click 'Logout' in the sidebar menu.
  4. 3. Verify user is redirected to the Login page and the username/password inputs and Login button are visible.
  5. 4. Attempt navigation to an authenticated path (e.g., /inventory.html) and verify it redirects back to login (if applicable).

**Expected Results:**
  - User is redirected to Login page after logout.
  - Login inputs are visible and ready to accept credentials.
  - Protected pages are not accessible without fresh login.

#### 1.7. Basic Accessibility & UX Checks

**File:** `tests/auth/LoginAccessibility.spec.ts`

**Steps:**
  1. Assumptions: Start at Login page.
  2. 1. Check that form fields have labels or accessible names.
  3. 2. Verify keyboard navigation (Tab order) reaches username→password→login button in a logical sequence.
  4. 3. Ensure the Login button is disabled/enabled appropriately (or visibly actionable) after input is added.
  5. 4. Verify error messages are announced (have role='alert' or aria-live) and are visible to screen readers if possible.

**Expected Results:**
  - Fields have accessible names or labels.
  - Logical tab order and keyboard operability.
  - Error banners have accessible role/announce behavior.
  - Forms remain operable by keyboard-only users.
