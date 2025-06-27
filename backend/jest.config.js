module.exports = {
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Setup files - this prevents DB connection during tests
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Coverage collection
  collectCoverageFrom: [
    'controllers/**/*.js',
    'middleware/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/bin/**',
    '!**/config/**' // Exclude config files from coverage
  ],
  
  // Coverage output
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Verbose output
  verbose: true,
  
  // Force exit after tests complete
  forceExit: true,
  
  // Detect open handles
  detectOpenHandles: true
};