import { Page, Locator, expect } from '@playwright/test';
import LocatorsPage from './Locators';

export class InventoryPage {
  private readonly page: Page;
  private locatorsPage: LocatorsPage;
  productTitle: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.locatorsPage = new LocatorsPage(page);
  }

  // ✅ Wait until inventory page is fully ready
  async waitForPageReady() {
    console.log('⏳ Waiting for Inventory page...');
    await this.page.waitForURL('**/inventory.html');
    await expect(this.locatorsPage.sortDropdown).toBeVisible();
    await expect(this.locatorsPage.productNames.first()).toBeVisible();
    console.log('✅ Inventory page ready');
  }

  // 🔃 Generic sort selector
  async selectSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
    console.log(`🔃 Selecting sort option: ${option}`);
    await this.locatorsPage.sortDropdown.selectOption(option);
    await this.page.waitForLoadState('networkidle');
  }

  // 🧠 Helper: string sorting
  private sortStrings(data: string[], order: 'asc' | 'desc') {
    return [...data].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
  }

  // 🧠 Helper: number sorting
  private sortNumbers(data: number[], order: 'asc' | 'desc') {
    return [...data].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );
  }

  async assertOnInventoryPage() {
    console.log('\n========== 🧪 ASSERTING INVENTORY PAGE ==========');
    await this.page.goto('/inventory.html');
    await this.page.waitForLoadState('networkidle');

    console.log('🧠 Verifying page title after login');
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe('Swag Labs');
    console.log('✅ Inventory page title verified:', pageTitle);
    await this.page.waitForTimeout(1000);
    console.log('===============================================\n');
  }

  // ✅ ASSERT: Name sorting
  async assertSortByName(order: 'asc' | 'desc') {
    console.log(`\n🔤 Validating NAME sort (${order.toUpperCase()})`);

    await this.selectSort(order === 'asc' ? 'az' : 'za');

    const uiNames = await this.locatorsPage.productNames.allInnerTexts();
    console.log('📦 UI Names:', uiNames);

    const expected = this.sortStrings(uiNames, order);
    expect(uiNames).toEqual(expected);

    console.log('✅ Name sorting correct');
    await this.page.waitForTimeout(2000);
  }

  // ✅ ASSERT: Price sorting
  async assertSortByPrice(order: 'asc' | 'desc') {
    console.log(`\n💲 Validating PRICE sort (${order.toUpperCase()})`);

    await this.selectSort(order === 'asc' ? 'lohi' : 'hilo');

    const uiPricesText = await this.locatorsPage.productPrices.allInnerTexts();
    const uiPrices = uiPricesText.map(p => Number(p.replace('$', '')));
    console.log('💰 UI Prices:', uiPrices);

    const expected = this.sortNumbers(uiPrices, order);
    expect(uiPrices).toEqual(expected);

    console.log('✅ Price sorting correct');
    await this.page.waitForTimeout(2000);
  }
}
