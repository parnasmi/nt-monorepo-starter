import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import type { ReactNode } from 'react'

// Radix primitives expect ResizeObserver to exist in jsdom.
;(globalThis as Record<string, unknown>).ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

const originalConsoleError = console.error.bind(console)

console.error = (...args: unknown[]) => {
	const message = typeof args[0] === 'string' ? args[0] : ''

	if (message.includes('was not wrapped in act')) return
	if (message.includes('changing an uncontrolled input to be controlled')) return

	originalConsoleError(...args)
}

afterEach(() => {
	cleanup()
	localStorage.clear()
	sessionStorage.clear()
	vi.restoreAllMocks()
})

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			changeLanguage: vi.fn().mockResolvedValue(undefined),
			language: 'en'
		}
	}),
	Trans: ({ children }: { children: ReactNode }) => children,
	initReactI18next: {
		type: '3rdParty',
		init: vi.fn()
	}
}))

vi.mock('nuqs', () => {
	const createParser = (defaultValue?: unknown) => ({
		withDefault: (value: unknown) => createParser(value ?? defaultValue),
		parse: (value: string) => (value ? Number.parseInt(value, 10) : (defaultValue ?? null)),
		serialize: (value: unknown) => String(value),
		defaultValue,
		_defaultValue: defaultValue,
		_hasDefault: defaultValue !== undefined
	})

	const useQueryState = vi.fn().mockImplementation(
		(
			_key: string,
			parserOrOptions?: {
				_hasDefault?: boolean
				_defaultValue?: unknown
			}
		) => {
			const defaultValue = parserOrOptions?._hasDefault ? parserOrOptions._defaultValue : null

			return [defaultValue, vi.fn()]
		}
	)

	return {
		useQueryState,
		parseAsInteger: createParser(),
		parseAsString: createParser(''),
		parseAsStringLiteral: (_literals: readonly string[]) => createParser(null),
		parseAsNumberLiteral: (_literals: readonly number[]) => createParser(null),
		parseAsJson: (_parser?: unknown) => createParser(null),
		parseAsBoolean: createParser(null),
		parseAsIsoDateTime: createParser(null)
	}
})

vi.mock('sonner', () => ({
	toast: Object.assign(vi.fn(), {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
		warning: vi.fn()
	})
}))
