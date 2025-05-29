// Import jest-dom for additional DOM matchers
import '@testing-library/jest-dom';

// Mock Chrome APIs for testing
(global as any).chrome = {
  runtime: {
    id: 'test-extension-id',
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    sendMessage: jest.fn(),
  },  storage: {
    sync: {
      get: jest.fn().mockImplementation(() => Promise.resolve({})),
      set: jest.fn().mockImplementation(() => Promise.resolve()),
    },
    local: {
      get: jest.fn().mockImplementation(() => Promise.resolve({})),
      set: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
};

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
    write: jest.fn(),
  },
});

// Mock window.getSelection
Object.assign(window, {
  getSelection: jest.fn(() => ({
    toString: jest.fn(() => 'selected text'),
    getRangeAt: jest.fn(() => ({
      cloneContents: jest.fn(() => ({
        textContent: 'selected text',
      })),
    })),
    rangeCount: 1,
  })),
});
