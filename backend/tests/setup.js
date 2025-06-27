// tests/setup.js

// Set test environment
process.env.NODE_ENV = 'test';

// Mock database connection to prevent actual DB calls during tests
jest.mock('../config/db.js', () => ({
  connect: jest.fn(),
  query: jest.fn(),
  close: jest.fn(),
  // Add other database methods your app uses
}));

// Increase timeout for async operations
jest.setTimeout(10000);

// Clean up after all tests
afterAll(async () => {
  // Close any open handles
  await new Promise(resolve => setTimeout(resolve, 100));
});