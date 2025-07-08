/**
 * @fileoverview Test setup configuration for Vitest and React Testing Library
 * Configures testing utilities and automatic cleanup between tests
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom';

/**
 * Extend Vitest's expect method with custom matchers from jest-dom
 * Provides additional assertions like toBeInTheDocument, toHaveClass, etc.
 */
expect.extend(matchers);

/**
 * Automatically cleanup after each test to prevent memory leaks
 * and ensure test isolation by clearing the DOM
 */
afterEach(() => {
  cleanup();
});
