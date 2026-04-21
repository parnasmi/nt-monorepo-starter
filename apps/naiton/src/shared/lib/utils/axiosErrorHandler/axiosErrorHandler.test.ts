import type { AxiosError } from 'axios'

import { axiosErrorHandler } from './axiosErrorHandler'

describe('axiosErrorHandler', () => {
	it('routes Axios errors through the axios-error branch', () => {
		const callback = vi.fn()
		const error = {
			isAxiosError: true,
			name: 'AxiosError',
			message: 'Request failed',
			toJSON: () => ({})
		} as AxiosError<{ message: string }>

		axiosErrorHandler<{ message: string }>({ error, callback })

		expect(callback).toHaveBeenCalledWith({
			type: 'axios-error',
			error
		})
	})

	it('routes non-Axios errors through the unknown branch', () => {
		const callback = vi.fn()
		const error = new Error('Unexpected failure')

		axiosErrorHandler({ error, callback })

		expect(callback).toHaveBeenCalledWith({
			type: 'unknown',
			error
		})
	})
})
