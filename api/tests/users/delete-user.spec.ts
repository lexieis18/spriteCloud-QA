import { expect } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';
import { endpoints } from '../../helpers/endpoints';

test.describe('Delete User API', () => {
    test('should delete a user', async ({ api, createUser }) => {
        // Create a user first
        const { id } = await createUser();
        
        // Delete the user
        const deleteResponse = await api.delete(`${endpoints.users}/${id}`);
        expect(deleteResponse.status).toBe(204);

        // Verify user no longer exists
        const getResponse = await api.get(`${endpoints.users}/${id}`);
        expect(getResponse.status).toBe(404);
    });
}); 