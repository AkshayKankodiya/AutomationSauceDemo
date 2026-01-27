import { Page, Locator } from "@playwright/test";

export default class LoginlocatorsPage {
    sortStrings(names: string[], order: string) {
        throw new Error('Method not implemented.');
    }

    username_text_box: Locator;
    password_text_box: Locator;
    submit_button: Locator;
    error_message: Locator;


    constructor(public page: Page) {
        this.username_text_box = this.page.locator("//input[@id='user-name']");
        this.password_text_box = this.page.locator("//input[@id='password']");
        this.submit_button = this.page.locator("//input[@id='login-button']");
        this.error_message = this.page.locator("//h3[@data-test='error']");


    }

    parentMenuLocator(menuName: string) {
        return this.page.locator(`//a[text()="${menuName}"]`);
    }







}