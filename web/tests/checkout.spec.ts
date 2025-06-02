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
        const productsToAdd = await inventoryPage.getRandomProducts(2);
        await test.step('Add products to cart', async () => {
            for (const product of productsToAdd) {
                await inventoryPage.addProductToCart(product);
            }
        });

        await test.step('Go to cart', async () => {
            await inventoryPage.goToCart();
        });

        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBe(productsToAdd.length); 
        const cartTotal = await cartPage.getTotalPrice();
        await test.step('Proceed to checkout', async () => {
            await cartPage.proceedToCheckout();
        });

        await test.step('Fill shipping info', async () => {
            await checkoutPage.fillShippingInfo(shippingInfo);
        });

        await test.step('Get totals', async () => {
            const subtotal = await checkoutPage.getSubtotal();
            const tax = await checkoutPage.getTax();
            const total = await checkoutPage.getTotal();
            expect(subtotal).toBeCloseTo(cartTotal, 2);
            expect(total).toBeCloseTo(subtotal + tax, 2);
        });

        await test.step('Complete purchase', async () => {
            await checkoutPage.completePurchase();
        });

        expect(await checkoutPage.isCheckoutComplete()).toBe(true);
    });
}); 