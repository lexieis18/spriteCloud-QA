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
        await loginPage.login({ username, password });       
        expect(await loginPage.isLoggedIn()).toBe(true);
    });

    test('failed login with invalid username', async () => {
        await loginPage.login({ username: 'invalid_user', password });      
        await expect(await loginPage.hasError()).toBe(true);
        
        const message = await loginPage.getErrorMessage();
        await expect(message).toContain(errorMessage.invalidCredentials);
    });

    test('failed login with invalid password', async () => {
        await loginPage.login({ username, password: 'invalid_password' });      
        await expect(await loginPage.hasError()).toBe(true);
        
        const message = await loginPage.getErrorMessage();
        await expect(message).toContain(errorMessage.invalidCredentials);
    });
}); 