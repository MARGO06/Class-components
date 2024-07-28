import '@testing-library/jest-dom';
import { beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

afterAll(() => {
  (global.URL.createObjectURL as unknown) = undefined;
});
