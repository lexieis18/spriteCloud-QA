import { expect } from '@playwright/test';
import { UserListResponse, User, UpdateUserResponse, CreateUserResponse } from '../types/api.types';

export class UserValidator {
    static validateUserListResponse(body: UserListResponse, expectedPage: number) {
        // Validate pagination
        expect(body.data).toBeDefined();
        expect(body.data.length).toBe(body.per_page);
        expect(body.page).toBe(expectedPage);
        expect(body.total).toBeGreaterThan(0);

        // Validate user structure for each user in the list
        body.data.forEach(this.validateUserStructure);
    }

    static validateUserStructure(user: User) {
        expect(user.id).toBeDefined();
        expect(user.email).toMatch(/@.*\./);
        expect(user.first_name).toBeTruthy();
        expect(user.last_name).toBeTruthy();
        expect(user.avatar).toMatch(/^https?:/);
    }

    static validateCreateResponse(body: CreateUserResponse, expectedData: { name: string; job: string }) {
        expect(body.name).toBe(expectedData.name);
        expect(body.job).toBe(expectedData.job);
        expect(body.id).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(new Date(body.createdAt)).toBeInstanceOf(Date);
    }

    static validateUpdateResponse(body: UpdateUserResponse, expectedData: { name: string; job: string }) {
        expect(body.name).toBe(expectedData.name);
        expect(body.job).toBe(expectedData.job);
        expect(body.updatedAt).toBeDefined();
        expect(new Date(body.updatedAt)).toBeInstanceOf(Date);
    }
} 