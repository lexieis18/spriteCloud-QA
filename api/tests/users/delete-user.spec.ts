import { expect } from '@playwright/test';
import { test } from '../../fixtures/test.fixtures';
import { endpoints } from '../../constants/endpoints';

test.describe('Delete User API', () => {
    test('should delete a user', async ({ api, createUser, getUserById }) => {
        const { id } = await createUser();
        //const user = await getUserById(id); // Created User is not returned by the API
        
        const deleteResponse = await api.delete(`${endpoints.users}/${id}`);
        expect(deleteResponse.status).toBe(204);

        const getResponse = await api.get(`${endpoints.users}/${id}`);
        expect(getResponse.status).toBe(404);
    });
}); 