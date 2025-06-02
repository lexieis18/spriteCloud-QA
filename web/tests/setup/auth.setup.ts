import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { password, username } from '@/web/constants/env';

setup('log in and store signed-in state', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login({ username, password });

    await loginPage.assertLoggedIn();

    await page.context().storageState({ path: './session.json' });
});