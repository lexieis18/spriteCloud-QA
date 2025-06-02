import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { password, username } from '../constants/env';
import { errorMessage } from '../constants/messages';
    
test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('successful login with valid credentials', async () => {
        await loginPage.login(username, password);       
        await expect(await loginPage.isLoggedIn()).toBeTruthy();
    });

    test('failed login with invalid credentials', async () => {
        await loginPage.login('invalid_user', 'invalid_password');      
        await expect(await loginPage.hasError()).toBeTruthy();
        
        const message = await loginPage.getErrorMessage();
        await expect(message).toContain(errorMessage.invalidCredentials);
    });
}); 