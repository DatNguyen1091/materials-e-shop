module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/index.js',
        '!src/config/swagger.js',
        '!src/socket/socketHandler.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov',
        'html'
    ],
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
    testTimeout: 10000,
    verbose: true
}; 