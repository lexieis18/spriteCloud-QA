import { LoginRequest } from "../types/api.types";
import { apiEmail, apiPassword } from "../helpers/constants";

export const validLogin: LoginRequest = {
    email: apiEmail || '',
    password: apiPassword || ''
};

// export const invalidLogin: LoginRequest = {
//     email: apiEmail || '',
//     password: ''
// };

export const invalidLogin = {
    email: apiEmail || ''
};