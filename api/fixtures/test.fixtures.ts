import { test as base } from '@playwright/test';
import { APIClient } from '../helpers/api-client';
import { generateUser } from './user-data';
import { endpoints } from '../constants/endpoints';
import { CreateUserResponse, User } from '../types/api.types';
import { UserValidator } from '../helpers/validators';
import { expect } from '@playwright/test';

type UserFixture = {
    api: APIClient;
    createUser: () => Promise<{ id: string; userData: ReturnType<typeof generateUser> }>;
    getUserById: (id: string) => Promise<User>;
};

export const test = base.extend<UserFixture>({
    api: async ({}, use) => {
        const api = new APIClient();
        await api.init();
        await use(api);
        await api.dispose();
    },
    createUser: async ({ api }, use) => {
        await use(async () => {
            const userData = generateUser();
            const response = await api.post(endpoints.users, userData);
            const body = response.body as CreateUserResponse;
            UserValidator.validateCreateResponse(body, userData);
            expect(response.status).toBe(201);
            return { id: body.id, userData };
        });
    },
    getUserById: async ({ api }, use) => {
        await use(async (id: string) => {
            const response = await api.get(`${endpoints.users}/${id}`);
            const body = response.body as User;
            expect(response.status).toBe(200);
            return body;
        });
    }
}); 