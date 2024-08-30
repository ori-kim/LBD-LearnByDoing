export default {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: './',
};
