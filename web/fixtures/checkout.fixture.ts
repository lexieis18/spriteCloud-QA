import { faker } from '@faker-js/faker';
import { ShippingInfo } from '../types/types';

export const generateShippingInfo = (): ShippingInfo => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode()
});