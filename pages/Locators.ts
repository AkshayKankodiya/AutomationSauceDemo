import { Page, Locator } from "@playwright/test";

export default class locatorsPageWebElementPage {
    sortStrings(names: string[], order: string) {
      throw new Error('Method not implemented.');
    }

    username_text_box: Locator;
    password_text_box: Locator;
    submit_button: Locator;
    error_message: Locator;
    SelectTheFirstProduct: Locator;
    addToCartButton: Locator;
    cartIcon: Locator;
    itemNameOnCartPage: Locator;
    removeProductFromCartBtn: Locator;
    checkoutButton: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    finishButton: Locator;
    itemNameOnCartPage2: Locator;
    SuccsessMessage: Locator;
    backToProductsButton: Locator;
    continueShoppingButton: Locator;
    sortDropdown: Locator;
    productNames: Locator;
    productPrices: Locator;



    constructor(public page: Page) {
        this.username_text_box = this.page.locator("//input[@id='user-name']");
        this.password_text_box = this.page.locator("//input[@id='password']");
        this.submit_button = this.page.locator("//input[@id='login-button']");
        this.error_message = this.page.locator("//h3[@data-test='error']");
        this.SelectTheFirstProduct = this.page.locator("//div[contains(text(),'Sauce Labs Backpack')]");
        this.addToCartButton = this.page.locator("(//button[text()='Add to cart'])")
        this.cartIcon = this.page.locator("//span[@class='shopping_cart_badge']")
        this.itemNameOnCartPage = this.page.locator("//div[@class='cart_item_label']//a//div")
        this.removeProductFromCartBtn = this.page.locator("//button[text()='Remove']")
        this.checkoutButton = this.page.locator("//button[@id='checkout']");
        this.firstNameInput = this.page.locator("//input[@id='first-name']");
        this.lastNameInput = this.page.locator("//input[@id='last-name']");
        this.postalCodeInput = this.page.locator("//input[@id='postal-code']");
        this.continueButton = this.page.locator("//input[@id='continue']");
        this.itemNameOnCartPage2 = this.page.locator("//div[@class='cart_item']");
        this.finishButton = this.page.locator("//button[@id='finish']");
        this.SuccsessMessage = this.page.locator("//h2[normalize-space()='Thank you for your order!']");
        this.backToProductsButton = this.page.locator("//button[@id='back-to-products']");
        this.continueShoppingButton = this.page.locator("//button[@id='continue-shopping']");

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');






    }



    parentMenuLocator(menuName: string) {
        return this.page.locator(`//a[text()="${menuName}"]`);
    }







}