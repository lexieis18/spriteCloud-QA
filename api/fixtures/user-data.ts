import { faker } from '@faker-js/faker';
import { CreateUserRequest } from "../types/api.types";

export const generateUser = (): CreateUserRequest => ({
    name: faker.person.fullName(),
    job: faker.person.jobTitle()
});

// Helper to generate multiple users if needed
export const generateUsers = (count: number): CreateUserRequest[] => 
    Array.from({ length: count }, generateUser);
