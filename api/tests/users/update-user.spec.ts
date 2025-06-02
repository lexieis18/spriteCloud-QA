import { expect } from '@playwright/test';
import { test } from '../../fixtures/test.fixtures';
import { UpdateUserResponse } from '../../types/api.types';
import { endpoints } from '../../constants/endpoints';
import { UserValidator } from '../../helpers/validators';
import { generateUser } from '../../fixtures/user-data';

test.describe('Update User API', () => {
    test('should update a user', async ({ api, createUser }) => {
        const { id } = await createUser();
        //const user = await getUserById(id); // Created User is not returned by the API
        
        const updateData = generateUser();
        const response = await api.put(`${endpoints.users}/${id}`, updateData);
        
        expect(response.status).toBe(200);
        const body = response.body as UpdateUserResponse;
        UserValidator.validateUpdateResponse(body, updateData);
    });
}); 