# SpriteCloud QA Automation

This project contains automated API and Web UI tests using Playwright and TypeScript.

## Project Structure

```
├── api/                 # API Test Suite
│   ├── fixtures/        # Test fixtures and data generators
│   ├── helpers/         # Utility functions and API client
│   ├── tests/          # Test files
│   │   └── users/      # User-related test cases
│   └── types/          # TypeScript type definitions
├── web/                 # Web Test Suite
│   ├── helpers/        # Utility functions and type definitions
│   ├── pages/          # Page Object Models
│   └── tests/          # Test files
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
API_URL=https://reqres.in
BASE_URL=
```

## Running Tests

### API Tests

Run all API tests:
```bash
npx playwright test api/
```

Run specific API test file:
```bash
npx playwright test api/tests/users/
```

### Web Tests

Run all web tests:
```bash
npx playwright test web/
```

Run specific web test file:
```bash
npx playwright test web/tests/login.spec.ts
```

View test report:
```bash
npx playwright show-report
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
- `get-users.spec.ts`: Tests for retrieving user data
- `update-user.spec.ts`: Tests for updating user data
- `delete-user.spec.ts`: Tests for user deletion

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
- `login.spec.ts`: Tests user authentication
- `inventory.spec.ts`: Tests inventory list
- `checkout.spec.ts`: Tests checkout process


## Test Configuration

The `playwright.config.ts` file contains settings for:
- Browser configurations
- Viewport sizes
- Timeouts
- Retry settings
- Reporter options
- Project-specific settings

## Continuous Integration

This project is integrated with a CI/CD platform:
- GitHub Actions


