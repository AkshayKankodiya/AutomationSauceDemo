import { Page, Locator } from "@playwright/test";

export default class InventorylocatorsPage {
    sortStrings(names: string[], order: string) {
        throw new Error('Method not implemented.');
    }

    sortDropdown: Locator;
    productNames: Locator;
    productPrices: Locator;

    constructor(public page: Page) {
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

    }







}