import { LoginRequest } from "../types/api.types";
import { apiEmail, apiPassword } from "../constants/env";

export const validLogin: LoginRequest = {
    email: apiEmail,
    password: apiPassword
};

// export const invalidLogin: LoginRequest = {
//     email: apiEmail || '',
//     password: ''
// };

export const invalidLogin = {
    email: apiEmail
};