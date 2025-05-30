import { test as base } from '@playwright/test';
import { APIClient } from '../helpers/api-client';
import { generateUser } from './user-data';
import { endpoints } from '../helpers/endpoints';
import { CreateUserResponse } from '../types/api.types';
import { UserValidator } from '../helpers/validators';

type UserFixture = {
    api: APIClient;
    createUser: () => Promise<{ id: string; userData: ReturnType<typeof generateUser> }>;
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
            return { id: body.id, userData };
        });
    }
}); 