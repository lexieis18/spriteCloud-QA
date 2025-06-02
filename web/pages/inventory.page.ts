import { Locator, Page } from '@playwright/test';
import { SortOption } from '../types/types';

export class InventoryPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;
    readonly cartButton: Locator;
    readonly inventoryItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item_name');
        this.cartButton = page.locator('.shopping_cart_link');
        this.inventoryItem = page.locator('.inventory_item');

    }

    async sortBy(option: SortOption) {
        await this.sortDropdown.click();
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        const items = await this.inventoryItems.all();
        return Promise.all(items.map(item => item.textContent().then(text => text || '')));
    }

    async addProductToCart(productName: string) {
        const item = this.inventoryItem.filter({ hasText: productName });
        await item.locator('button').click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
} 