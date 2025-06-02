import { Locator, Page } from '@playwright/test';
import { parsePriceToNumber } from '../helpers/utils';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly cartItemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
        this.cartItemPrices = page.locator('.cart_item .inventory_item_price');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getTotalPrice(): Promise<number> {
        const prices = await this.cartItemPrices.allInnerTexts();
        return prices.reduce((sum, price) => sum + this.parsePriceToNumber(price), 0);
    }

    private parsePriceToNumber(price: string): number {
        return parsePriceToNumber(price);
    }
} 