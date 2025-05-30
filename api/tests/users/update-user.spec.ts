import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';
import { UpdateUserResponse } from '../../types/api.types';
import { endpoints } from '../../helpers/endpoints';
import { UserValidator } from '../../helpers/validators';
import { generateUser } from '../../fixtures/user-data';

test.describe('Update User API', () => {
    test('should update a user', async ({ api, createUser }) => {
        // Create a user first
        const { id } = await createUser();
        
        // Update the user with new data
        const updateData = generateUser();
        const response = await api.put(`${endpoints.users}/${id}`, updateData);
        
        expect(response.status).toBe(200);
        const body = response.body as UpdateUserResponse;
        UserValidator.validateUpdateResponse(body, updateData);
    });
}); 