export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserListResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

export interface SingleUserResponse {
    data: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface CreateUserRequest {
    name: string;
    job: string;
}

export interface CreateUserResponse {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}

export interface UpdateUserRequest {
    name: string;
    job: string;
}

export interface UpdateUserResponse {
    name: string;
    job: string;
    updatedAt: string;
}

export interface ErrorResponse {
    error: string;
} 