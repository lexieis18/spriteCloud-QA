import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { password, username } from '@/web/helpers/constants';

setup('log in and store signed-in state', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(username || '', password || '');

    // Check for login errors first
    const hasError = await loginPage.hasError();
    if (hasError) {
        const errorText = await loginPage.getErrorMessage();
        throw new Error(`Login failed: ${errorText}`);
    }

    // Additional validation for successful login
    const isLoggedIn = await loginPage.isLoggedIn();
    if (!isLoggedIn) {
        throw new Error('Login failed: Not redirected to inventory page');
    }

    await page.context().storageState({ path: './session.json' });
});