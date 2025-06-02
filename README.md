# SpriteCloud QA Task

This project contains automated API and Web UI tests using Playwright and TypeScript.

## Project Structure

```
├── api/                 # API Test Suite
│   ├── constants/        # Test constants and auth config
│   ├── fixtures/        # Test fixtures and data generators
│   ├── helpers/         # Utility functions and API client
│   ├── tests/          # Test files
│   │   └── users/      # User-related test cases
│   └── types/          # TypeScript type definitions
├── web/                 # Web Test Suite
│   ├── constants/       # Test constants and auth config
│   ├── fixtures/       # Test fixtures and data generators
│   ├── helpers/        # Utility functions and type definitions
│   ├── pages/          # Page Object Models
│   ├── tests/          # Test files
│   └── types/           # TypeScript type definitions
├── playwright.config.ts # Playwright configuration
└── package.json        # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd spriteCloud-QA
```

2. Install dependencies:
```bash
npm install
```

3. Install playwright browsers:
```bash
npx playwright install
```

4. Create a `.env` file in the root directory with the variables from `.env.example`:
```
Note: Environment variable values are typically not added to .env.example for security, but for this assignment, sample values are included for convenience.
```

## Running Tests

### API Tests

Run all API tests:
```bash
npm run test:api
```

### Web Tests

Run all web tests:
```bash
npm run test:web
```

Run all tests:
```bash
npx playwright test
```

View test report:
```bash
npm run report
```

## Test Structure

### API Testing
#### API Client
- Centralized API client for making HTTP requests
- Handles request/response processing

#### API Test Fixtures
- Test Request Data Setup
- User creation helpers
- Data generators using Faker.js

#### API Test Files
- `get-users.spec.ts`: Validates user retrieval and pagination
- `update-user.spec.ts`: Validates user update functionality
- `delete-user.spec.ts`: Validates user deletion functionality

### Web Testing
#### Page Objects
- Encapsulates page structure and behavior
- Provides methods for page interactions
- Handles element selectors and waits

#### Web Test Helpers
- Authentication state management
- Browser context setup
- Test data preparation

#### Web Test Files
- `auth.setup.ts`: Authentication state management
- `login.spec.ts`: Tests user authentication and handles invalid login
- `inventory.spec.ts`: Sorts and adds inventory items to cart
- `checkout.spec.ts`: Fills shipping, asserts price breakdown, completes purchase

## Continuous Integration

This project runs in the pipeline with GitHub Actions
- The workflow can be triggered manually, you can go directly via the link below
[![Playwright Tests](https://github.com/lexieis18/spriteCloud-QA/actions/workflows/playwright.yml/badge.svg)](https://github.com/lexieis18/spriteCloud-QA/actions/workflows/playwright.yml)


## AI References
- Cursor using AI agent (model - claude-3.5-sonnet)
- Chatgpt 4o


