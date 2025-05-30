import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Checkout Process', () => {
    test('should complete checkout with multiple items', async ({ page }) => {
        // Initialize page objects
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Navigate to inventory (assuming we're already logged in due to auth.setup)
        await page.goto('/inventory.html');

        // Add two items to cart
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        // Go to cart
        await inventoryPage.goToCart();

        // Verify cart has 2 items
        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBe(2);

        // Get cart total for later comparison
        const cartTotal = await cartPage.getTotalPrice();

        // Proceed to checkout
        await cartPage.proceedToCheckout();

        // Fill shipping information
        await checkoutPage.fillShippingInfo('John', 'Doe', '12345');

        // Get and verify final amounts
        const subtotal = await checkoutPage.getSubtotal();
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();

        // Verify calculations
        expect(subtotal).toBe(cartTotal);
        expect(total).toBe(subtotal + tax);

        // Complete purchase
        await checkoutPage.completePurchase();

        // Verify we're on the confirmation page
        expect(page.url()).toContain('/checkout-complete.html');
    });
}); 