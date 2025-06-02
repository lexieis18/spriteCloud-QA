import { faker } from '@faker-js/faker';
import { CreateUserRequest } from "../types/api.types";

export const generateUser = (): CreateUserRequest => ({
    name: faker.person.fullName(),
    job: faker.person.jobTitle()
});
