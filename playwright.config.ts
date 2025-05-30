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

  /* Configure projects for major browsers */
  projects: [
    { 
      name: 'setup', 
      use: { 
        baseURL: baseURL,
      },
      testMatch: /.*\.setup\.ts/ },
    {
      name: 'login-tests',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: baseURL,
      },
      testMatch: /.*login\.spec\.ts/,  // Only matches login.spec.ts
      testDir: './web/tests',
    },
    {
      name: 'web-chrome',
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
      name: 'api',
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

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
