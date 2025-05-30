import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
    }

    async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async getSubtotal(): Promise<number> {
        const subtotalText = await this.subtotalLabel.textContent();
        return this.parsePriceToNumber(subtotalText || '');
    }

    async getTax(): Promise<number> {
        const taxText = await this.taxLabel.textContent();
        return this.parsePriceToNumber(taxText || '');
    }

    async getTotal(): Promise<number> {
        const totalText = await this.totalLabel.textContent();
        return this.parsePriceToNumber(totalText || '');
    }

    private parsePriceToNumber(price: string): number {
        return parseFloat(price.replace(/[^0-9.]/g, ''));
    }
} 