import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AxiosResponse } from 'axios'
import { MemoryRouter, Route, Routes } from 'react-router'
// import { LoginForm } from '@/features/auth'
import { request } from '@/shared/api'
import { endpoints } from '@/shared/const/endpoints.const'
import { useBoundStore } from '@/shared/store'
import type { FormSubmitResponse } from '@/shared/types/requests.types'

const resetSharedStore = () => {
	useBoundStore.setState({
		accessToken: null,
		refreshToken: null,
		csrfToken: null,
		profile: null,
		companyInfo: null,
		allowedProducts: [],
		isAuthenticated: false,
		lng: 'uz',
		theme: 'system',
		isSidebarCollapsed: false,
		pageTitle: null,
		pageBreadcrumbs: null,
		isGlobalLoading: false,
		isCommandPaletteOpen: false,
		activeModal: null
	})
}

describe('LoginForm', () => {
	beforeEach(() => {
		localStorage.clear()
		resetSharedStore()
	})

	it('submits credentials, stores the session, and redirects to the dashboard route', async () => {
		const user = userEvent.setup()
		const mockedResponse = {
			status: 200,
			statusText: 'OK',
			headers: {},
			config: { headers: {} },
			data: {
				success: true,
				message: null,
				data: {
					token_type: 'Bearer',
					expires_in: 3600,
					access_token: 'integration-access-token',
					refresh_token: 'integration-refresh-token',
					companyTin: '308765432',
					csrf: 'integration-csrf-token',
					start_pay_flow: false,
					allowed: ['sales', 'crm']
				},
				meta: []
			}
		}
		const requestPostSpy = vi
			.spyOn(request, 'post')
			.mockResolvedValue(mockedResponse as unknown as AxiosResponse<FormSubmitResponse>)

		render(
			<MemoryRouter initialEntries={['/auth/login']}>
				<Routes>
					{/*<Route element={<LoginForm />} path='/auth/login' />*/}
					<Route element={<div>Dashboard route</div>} path='/app/dashboard' />
				</Routes>
			</MemoryRouter>
		)

		await user.type(screen.getByLabelText('phone'), '  +998901234567  ')
		await user.type(screen.getByLabelText('password'), 'secret123')
		await user.click(screen.getByRole('button', { name: 'submit' }))

		await waitFor(() => {
			expect(requestPostSpy).toHaveBeenCalledWith(
				endpoints.LOGIN,
				{
					phone: '+998901234567',
					password: 'secret123'
				},
				{}
			)
		})

		expect(await screen.findByText('Dashboard route')).toBeInTheDocument()
		expect(useBoundStore.getState().isAuthenticated).toBe(true)
		expect(useBoundStore.getState().accessToken).toBe('integration-access-token')
		expect(useBoundStore.getState().refreshToken).toBe('integration-refresh-token')
		expect(useBoundStore.getState().csrfToken).toBe('integration-csrf-token')
		expect(useBoundStore.getState().allowedProducts).toEqual(['sales', 'crm'])
	})
})
