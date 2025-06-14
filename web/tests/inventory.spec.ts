import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { paths } from '../constants/paths';
import { SortOption } from '../types/types';

test.describe('Inventory Sorting', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await page.goto(paths.inventory);
    });

    test('should sort products by name Z to A', async () => {
        const productNames = await inventoryPage.getAvailableProducts();
        expect(productNames.length).toBeGreaterThan(0);
        
        await inventoryPage.sortBy(SortOption.ZA);
        const sortedNames = await inventoryPage.getAvailableProducts();
        expect(sortedNames.length).toBeGreaterThan(0);

        const reversedNames = [...productNames].sort((a, b) => a.localeCompare(b)).reverse();

        expect(sortedNames).toEqual(reversedNames);
    });
}); 