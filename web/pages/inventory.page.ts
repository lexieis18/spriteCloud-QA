import { expect, Locator, Page } from '@playwright/test';
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
        await this.sortDropdown.selectOption(option);
    }

    async getAvailableProducts(): Promise<string[]> {
        const items = await this.inventoryItems.allTextContents();
        return items;
    }

    async getRandomProducts(count: number = 1): Promise<string[]> {
        const products = await this.getAvailableProducts();
        if (count > products.length) {
            throw new Error(`Cannot get ${count} products, only ${products.length} available`);
        }
        return [...products]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    }

    async addProductToCart(productName: string) {
        const item = this.inventoryItem.filter({ hasText: productName });
        const button = item.locator('button');
        await expect(button).toBeVisible();
        await button.click();
    }

    async goToCart() {
        await this.cartButton.click();
    }
} 