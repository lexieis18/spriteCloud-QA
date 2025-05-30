/**
 * Common types used across test files
 */

export interface TestData {
  url: string;
  title: string;
}

export interface UserData {
  username: string;
  password: string;
  email: string;
}

export interface TestConfig {
  baseURL: string;
  timeout: number;
  screenshot: 'on' | 'off' | 'only-on-failure';
} 