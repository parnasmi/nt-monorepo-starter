// Source: apps/dashboard/tests/integration/setup.ts
// Target: apps/naiton/tests/integration/setup.ts
// Adapt: remove E-IMZO mock (naiton doesn't use it), keep the rest.

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

// Polyfill ResizeObserver (used by Radix UI ScrollArea, RadioGroup, etc.)
(globalThis as Record<string, unknown>).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// ---------------------------------------------------------------------------
// Suppress act() warnings from third-party component internals.
// ---------------------------------------------------------------------------
const _origConsoleError = console.error.bind(console);

console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (msg.includes('was not wrapped in act')) return;
  if (msg.includes('changing an uncontrolled input to be controlled')) return;
  _origConsoleError(...args);
};

afterEach(() => {
  cleanup();
});

// Mock react-i18next to return keys as-is (no async backend loading)
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn().mockResolvedValue(undefined),
      language: 'uz',
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock nuqs (used by query string parsing in tables, filters, etc.)
vi.mock('nuqs', () => {
  const createParser = (defaultVal?: unknown) => {
    const parser = {
      withDefault: (val: unknown) => createParser(val ?? defaultVal),
      parse: (val: string) => (val ? parseInt(val, 10) : (defaultVal ?? null)),
      serialize: (val: unknown) => String(val),
      defaultValue: defaultVal,
      _defaultValue: defaultVal,
      _hasDefault: defaultVal !== undefined,
    };
    return parser;
  };

  const useQueryState = vi
    .fn()
    .mockImplementation(
      (
        _key: string,
        parserOrOpts?: { _hasDefault?: boolean; _defaultValue?: unknown },
      ) => {
        const defaultVal = parserOrOpts?._hasDefault
          ? parserOrOpts._defaultValue
          : null;
        return [defaultVal, vi.fn()];
      },
    );

  return {
    useQueryState,
    parseAsInteger: createParser(),
    parseAsString: createParser(''),
    parseAsStringLiteral: (_literals: readonly string[]) => createParser(null),
    parseAsNumberLiteral: (_literals: readonly number[]) => createParser(null),
    parseAsJson: (_parser?: unknown) => createParser(null),
    parseAsBoolean: createParser(null),
    parseAsIsoDateTime: createParser(null),
  };
});

// Mock sonner (toast notifications)
vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));
