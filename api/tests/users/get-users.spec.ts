import { test, expect } from '@playwright/test';
import { APIClient } from '../../helpers/api-client';
import { 
    UserListResponse, 
    LoginResponse, 
    CreateUserResponse,
    UpdateUserResponse,
    ErrorResponse
} from '../../types/api.types';
import { endpoints } from '../../helpers/endpoints';
import { UserValidator } from '../../helpers/validators';

let api: APIClient;

test.beforeAll(async () => {
    api = new APIClient();  // No need to pass baseURL as it's configured in playwright.config.ts
    await api.init();
});

test.afterAll(async () => {
    await api.dispose();
});

test.describe('Get Users API', () => {
    const testCases = [
        { name: 'page 2', page: 2, endpoint: endpoints.users + '?page=2' },
        { name: 'default page', page: 1, endpoint: endpoints.users }
    ];

    for (const { name, page, endpoint } of testCases) {
        test(`should retrieve a list of users (${name})`, async () => {
            const response = await api.get(endpoint);
            
            expect(response.status).toBe(200);
            const body = response.body as UserListResponse;

            // Skip test if requesting page 2 but total pages is 1
            if (page === 2 && body.total_pages === 1) {
                test.skip();
                return;
            }
            
            UserValidator.validateUserListResponse(body, page);
        });
    }

    test('should fail to find non-existent user', async () => {
        const response = await api.get(endpoints.users + '/999');
        expect(response.status).toBe(404);
    });

    test('should handle delayed request within timeout', async () => {
        const response = await api.get(endpoints.users + '?delay=3');
        
        expect(response.status).toBe(200);
        expect(response.duration).toBeLessThanOrEqual(3500); // 3 seconds + 500ms buffer
        
        const body = response.body as UserListResponse;
        UserValidator.validateUserListResponse(body, 1);
    });
}); 