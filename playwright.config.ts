import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.BASE_URL;
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

export default defineConfig({
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  projects: [
    { 
      name: 'setup', 
      use: { 
        baseURL: baseURL,
      },
      testMatch: /.*\.setup\.ts/ },
    {
      name: 'web-login-tests',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: baseURL,
      },
      testMatch: /.*login\.spec\.ts/,  // Only matches login.spec.ts
      testDir: './web/tests',
    },
    {
      name: 'web-tests',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: baseURL,
        storageState: './session.json',
      },
      dependencies: ['setup'],
      testDir: './web/tests',
      testIgnore: /.*login\.spec\.ts/,  // Ignore login.spec.ts in this project
    },
    {
      name: 'api-tests',
      use: { 
        baseURL: apiURL,
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': apiKey || '',
        },
      },
      testDir: './api/tests',
    },
  ],
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
});
