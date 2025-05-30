import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { password, username } from '../helpers/constants';

test.describe('Inventory Sorting', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await page.goto('/inventory.html');
    });

    test('should sort products by name Z to A', async () => {
        await inventoryPage.sortBy('Name (Z to A)');

        // Get all product names
        const productNames = await inventoryPage.getProductNames();

        // Verify the list is not empty
        expect(productNames.length).toBeGreaterThan(0);

        // Create a copy for comparison
        const sortedNames = [...productNames].sort().reverse();

        // Verify the items are in descending order
        expect(productNames).toEqual(sortedNames);
    });
}); 