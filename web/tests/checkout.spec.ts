import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { paths } from '../constants/paths';
import { ShippingInfo } from '../types/types';
import { generateShippingInfo } from '../fixtures/checkout.fixture';

test.describe('Checkout Process', () => {
    let shippingInfo: ShippingInfo;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        shippingInfo = generateShippingInfo();
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('should complete checkout with multiple items', async ({ page }) => {
        await page.goto(paths.inventory);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.goToCart();

        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBe(2);
        const cartTotal = await cartPage.getTotalPrice();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillShippingInfo(shippingInfo.firstName, shippingInfo.lastName, shippingInfo.postalCode);

        const subtotal = await checkoutPage.getSubtotal();
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();

        expect(subtotal).toBe(cartTotal);
        expect(total).toBe(subtotal + tax);

        await checkoutPage.completePurchase();

        expect(page.url()).toContain(paths.checkoutComplete);
    });
}); 