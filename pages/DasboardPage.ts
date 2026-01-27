import { Page, Locator, expect } from '@playwright/test';
import DashBoardLocatorPage from '../Locators/DashBoardLocators';


export class DashboardPage {
  private readonly page: Page;
  private DashBoardLocatorPage: DashBoardLocatorPage;
  productTitle: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.DashBoardLocatorPage = new DashBoardLocatorPage(page);
  }

  async VerifyingTheProductsPage() {
    console.log('\nVerifying Products Page');
    const productsTitle = await this.page.locator('.title');
    expect(await productsTitle.textContent()).toBe('Products');
    console.log('Products page verified successfully.');
    console.log('---------------------------------------');
    await this.page.waitForTimeout(2000);
  }

  async buyProduct(numberOfProducts: number = 1) {
    console.log('\nVerifying Product');
    this.productTitle = await this.DashBoardLocatorPage.SelectTheFirstProduct.innerText();
    console.log('Selecting the product for Add to Cart  :  ', this.productTitle);
    await this.DashBoardLocatorPage.addToCartButton.nth(numberOfProducts).click();
    console.log('Verfying To Cart Bag IS Reflecting the Value of added Products')
    await this.page.waitForTimeout(2000);
    const countOfProduct = await this.DashBoardLocatorPage.cartIcon.innerText();
    console.log("Cart Icon Count is Now :", countOfProduct)
    console.log('---------------------------------------');
    await this.page.waitForTimeout(2000);
  }
  async continueShoppingButton() {
    console.log('\nBack To Product Page');
    await this.DashBoardLocatorPage.continueShoppingButton.click();
    await this.page.waitForTimeout(2000);
    console.log('---------------------------------------');
  }



  async VerifyingProductOnCartPage() {
    console.log('\n========== 🛒 CART → CHECKOUT FLOW STARTED ==========');

    console.log('🛒 Opening Cart page');
    await this.DashBoardLocatorPage.cartIcon.click();
    await this.page.waitForLoadState('networkidle');

    console.log('🧠 Verifying Cart page title');
    const cartPageTitle = await this.page.title();
    console.log(`📄 Cart Page Title: "${cartPageTitle}"`);

    console.log('📦 Fetching product name from Cart page');
    const cartProductName = await this.DashBoardLocatorPage.itemNameOnCartPage.innerText();
    console.log(`🧾 Product in cart: "${cartProductName}"`);

    expect(cartProductName).toBe(this.productTitle);
    console.log('✅ Cart product verified successfully');
    await this.page.waitForTimeout(2000);
    console.log('➡️ Proceeding to Checkout');
    await this.DashBoardLocatorPage.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
    console.log('🧭 Navigated to Checkout information page');

    console.log('✍️ Filling checkout information');
    await this.DashBoardLocatorPage.firstNameInput.fill('TestFirstName');
    console.log('   ↳ First Name entered');

    await this.DashBoardLocatorPage.lastNameInput.fill('TestLastName');
    console.log('   ↳ Last Name entered');

    await this.DashBoardLocatorPage.postalCodeInput.fill('12345');
    console.log('   ↳ Postal Code entered');
    await this.page.waitForTimeout(2000);
    console.log('➡️ Continuing to order overview page');
    await this.DashBoardLocatorPage.continueButton.click();
    await this.page.waitForLoadState('networkidle');

    console.log('🧠 Verifying product on Checkout Overview page');
    const checkoutOverviewProduct = await this.DashBoardLocatorPage.itemNameOnCartPage2.innerText();
    console.log(`🧾 Product in overview: "${checkoutOverviewProduct}"`);

    expect(checkoutOverviewProduct).toContain(this.productTitle || '');
    console.log('✅ Product verified on Checkout Overview page');
    await this.page.waitForTimeout(1000);
    console.log('🏁 Finishing the order');
    await this.DashBoardLocatorPage.finishButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    console.log('🧠 Verifying order success message');
    const successMessage = await this.DashBoardLocatorPage.SuccsessMessage.innerText();
    console.log(`🎉 Success message received: "${successMessage}"`);
    await this.page.waitForTimeout(1000);
    expect(successMessage).toBe('Thank you for your order!');
    console.log('✅ Order placed successfully');

    console.log('↩️ Navigating back to Products page');
    await this.DashBoardLocatorPage.backToProductsButton.click();
    console.log('========== ✅ CART → CHECKOUT FLOW COMPLETED ==========\n');

  }


  async verifyProductsOnCartPage(expectedProductNames: string[] = []) {
    console.log('\n========== 🛒 CART VALIDATION STARTED ==========');

    console.log('🛒 Opening cart page');
    await this.DashBoardLocatorPage.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log('🧠 Fetching all product names from cart');
    const cartItems = this.DashBoardLocatorPage.itemNameOnCartPage;
    const cartProductNames = await cartItems.allInnerTexts();

    console.log(`📦 Total items in cart: ${cartProductNames.length}`);
    console.log('📋 Products found in cart:', cartProductNames);
    await this.page.waitForTimeout(1000);
    // 🔍 Validation
    if (expectedProductNames.length > 0) {
      console.log('🔎 Validating expected products in cart');
      for (const expectedProduct of expectedProductNames) {
        expect(cartProductNames).toContain(expectedProduct);
        console.log(`✅ Product verified: ${expectedProduct}`);
      }
    } else {
      console.log('⚠️ No expected product list provided, skipping name validation');
    }

    // 🧹 Remove all products
    console.log('🧹 Removing all products from cart');
    const removeButtons = this.DashBoardLocatorPage.removeProductFromCartBtn;
    const removeCount = await removeButtons.count();
    await this.page.waitForTimeout(1000);
    for (let i = 0; i < removeCount; i++) {
      await removeButtons.nth(0).click(); // always click first, list updates
      console.log(`🗑️ Removed item ${i + 1}`);
    }

    console.log('✅ Cart validation & cleanup completed');
    console.log('========== 🟢 CART VALIDATION FINISHED ==========\n');
    await this.page.waitForTimeout(2000);
  }



}