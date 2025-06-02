import { Locator, Page } from '@playwright/test';
import { paths } from '../constants/paths';
import { User } from '../types/types';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login({ username, password }: User) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async hasError(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isLoggedIn(): Promise<boolean> {
        return this.page.url().includes(paths.inventory);
    }

    async assertLoggedIn(): Promise<void>  {
        if (await this.hasError()) {
            throw new Error(`Login failed: ${await this.getErrorMessage()}`);
          }
          if (!await this.isLoggedIn()) {
            throw new Error('Login failed: Not redirected');
          }
    }
} 