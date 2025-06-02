import { test, expect } from '@playwright/test';
import { APIClient } from '../../helpers/api-client';
import { endpoints } from '../../constants/endpoints';
import { 
    LoginResponse, 
    ErrorResponse
} from '../../types/api.types';
import { missingPasswordLogin, validLogin } from '../../fixtures/login-data';
import { errorMessage } from '../../constants/messages';

let api: APIClient;

test.beforeAll(async () => {
    api = new APIClient();
    await api.init();
});

test.afterAll(async () => {
    await api.dispose();
});

test.describe('Login API Tests', () => {

    test('should perform successful login', async () => {
        const response = await api.post(endpoints.login, validLogin);

        expect(response.status).toBe(200);
        const body = response.body as LoginResponse;
        expect(body.token).toBeTruthy();
    });

    test('should fail login with missing password', async () => {
        const response = await api.post(endpoints.login, missingPasswordLogin);

        expect(response.status).toBe(400);
        const body = response.body as ErrorResponse;
        expect(body.error).toBe(errorMessage.invalidCredentials);
    });

}); 