import { test, expect } from '@playwright/test';
import { APIClient } from '../../helpers/api-client';
import { UserListResponse } from '../../types/api.types';
import { endpoints } from '../../constants/endpoints';
import { UserValidator } from '../../helpers/validators';

let api: APIClient;

test.beforeAll(async () => {
    api = new APIClient();
    await api.init();
});

test.afterAll(async () => {
    await api.dispose();
});

test.describe('Get Users API', () => {
    const testCases = [
        { name: 'page 2', page: 2, endpoint: `${endpoints.users}?page=2` },
        { name: 'default page', page: 1, endpoint: endpoints.users }
    ];

    for (const { name, page, endpoint } of testCases) {
        test(`should retrieve a list of users (${name})`, async () => {
            const response = await api.get(endpoint);
            
            expect(response.status).toBe(200);
            const body = response.body as UserListResponse;

            if (body.total_pages < page) {
                test.skip(true, `Skipping test: only ${body.total_pages} pages exist, but requested page ${page}`);
            }   
            
            UserValidator.validateUserListResponse(body, page);
        });
    }

    test('should fail to find non-existent user', async () => {
        const response = await api.get(`${endpoints.users}/999`);
        expect(response.status).toBe(404);
    });

    test('should handle delayed request within timeout', async () => {
        const response = await api.get(`${endpoints.users}?delay=3`);
        
        expect(response.status).toBe(200);
        expect(response.duration).toBeLessThanOrEqual(3500);
        console.log("The request takes " + response.duration + "ms");
        
        const body = response.body as UserListResponse;
        UserValidator.validateUserListResponse(body, 1);
    });
}); 