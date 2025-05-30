import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item_name');
        this.cartButton = page.locator('.shopping_cart_link');
    }

    /**
     * Sort products by the given option
     */
    async sortBy(option: 'Name (Z to A)' | 'az' | 'lohi' | 'hilo') {
        await this.sortDropdown.click();
        await this.sortDropdown.selectOption(option);
    }

    /**
     * Get all product names in current order
     */
    async getProductNames(): Promise<string[]> {
        //await this.page.waitForSelector('.inventory_item_name');
        const items = await this.page.locator('.inventory_item_name').all();
        return Promise.all(items.map(item => item.textContent().then(text => text || '')));
    }

    /**
     * Add a product to cart by its name
     */
    async addProductToCart(productName: string) {
        const item = this.page.locator('.inventory_item').filter({ hasText: productName });
        await item.locator('button').click();
    }

    /**
     * Navigate to cart page
     */
    async goToCart() {
        await this.cartButton.click();
    }
} 