import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test to prevent state leakage
afterEach(() => {
  cleanup();
});

// Polyfills for jsdom environment
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

global.matchMedia = Object.assign(() => ({
  matches: false,
  media: '',
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
}), {
  matches: false,
  media: '',
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
}) as any;

// Polyfill for HTMLMediaElement
global.HTMLMediaElement.prototype.play = () => new Promise(() => {});