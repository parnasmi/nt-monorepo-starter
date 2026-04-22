import { expect, test } from '@playwright/test'
import { mockNaitonApi } from './support/mockApi'

const lazySalesChunkPattern = /(?:\/src\/pages\/sales\/|\/assets\/sales-).+/i
const lazyCrmChunkPattern = /(?:\/src\/pages\/crm\/|\/assets\/crm-).+/i

test('supports the golden path across dashboard, sales, crm, and logout', async ({ page }) => {
	const customerName = `Playwright Order ${Date.now()}`
	const pageErrors: string[] = []
	const consoleErrors: string[] = []
	const requestedScripts = new Set<string>()

	page.on('pageerror', (error) => {
		pageErrors.push(error.message)
	})
	page.on('console', (message) => {
		if (message.type() === 'error') {
			consoleErrors.push(message.text())
		}
	})
	page.on('requestfinished', (request) => {
		if (request.resourceType() === 'script') {
			requestedScripts.add(request.url())
		}
	})

	await mockNaitonApi(page)
	await page.addInitScript(() => {
		window.localStorage.clear()
		window.sessionStorage.clear()
	})
	await page.context().clearCookies()
	await page.goto('/')

	await expect(page).toHaveURL(/\/auth\/login$/)
	await page.locator('#login-phone').fill('+998901234567')
	await page.locator('#login-password').fill('secret123')
	await page.locator('button[type="submit"]').click()

	await expect(page).toHaveURL(/\/app\/dashboard$/)
	await page.waitForLoadState('networkidle')
	expect(pageErrors, pageErrors.join('\n')).toEqual([])
	expect(consoleErrors, consoleErrors.join('\n')).toEqual([])
	await expect(page.getByRole('heading', { name: 'Cross-module command center' })).toBeVisible({
		timeout: 15_000
	})
	await expect(page.getByRole('button').filter({ hasText: 'Dilshod Ergashev' })).toBeVisible()

	await page.evaluate(() => {
		const persistentShellWindow = window as Window & {
			__naitonNavbar?: Element | null
			__naitonSidebar?: Element | null
		}

		persistentShellWindow.__naitonNavbar = document.querySelector('header')
		persistentShellWindow.__naitonSidebar = document.querySelector('[data-sidebar="sidebar"]')
	})

	await page.getByRole('link', { name: 'Sales', exact: true }).click()
	await expect(page).toHaveURL(/\/app\/sales$/)
	await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible()
	expect(
		[...requestedScripts].some((requestUrl) => lazySalesChunkPattern.test(requestUrl)),
		`Expected a lazy sales module request, saw:\n${[...requestedScripts].join('\n')}`
	).toBe(true)

	await page.getByRole('button', { name: 'New order' }).click()
	const createOrderDialog = page.getByRole('dialog')
	await expect(createOrderDialog).toBeVisible()
	await createOrderDialog.locator('#sales-order-customer').fill(customerName)
	await createOrderDialog.locator('#sales-order-amount').fill('450000')
	await createOrderDialog.locator('form').evaluate((form) => {
		;(form as HTMLFormElement).requestSubmit()
	})

	await expect(page.getByText('Order created')).toBeVisible()
	await expect(page.getByText(customerName)).toBeVisible()

	await page.getByRole('link', { name: 'CRM', exact: true }).click()
	await expect(page).toHaveURL(/\/app\/crm$/)
	await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible()
	expect(
		[...requestedScripts].some((requestUrl) => lazyCrmChunkPattern.test(requestUrl)),
		`Expected a lazy CRM module request, saw:\n${[...requestedScripts].join('\n')}`
	).toBe(true)
	await expect(
		page.evaluate(() => {
			const persistentShellWindow = window as Window & {
				__naitonNavbar?: Element | null
				__naitonSidebar?: Element | null
			}

			return (
				persistentShellWindow.__naitonNavbar === document.querySelector('header') &&
				persistentShellWindow.__naitonSidebar === document.querySelector('[data-sidebar="sidebar"]')
			)
		})
	).resolves.toBe(true)

	await page.getByRole('button').filter({ hasText: 'Dilshod Ergashev' }).click()
	await page.getByRole('menuitem', { name: 'Logout' }).click()

	await expect(page).toHaveURL(/\/auth\/login$/)
	await expect(page.locator('#login-phone')).toBeVisible()
	expect(
		await page.evaluate(() => ({
			accessToken: window.localStorage.getItem('naiton-access-token'),
			refreshToken: window.localStorage.getItem('naiton-refresh-token'),
			companyInfo: window.localStorage.getItem('naiton-company-info')
		}))
	).toEqual({
		accessToken: null,
		refreshToken: null,
		companyInfo: null
	})
})
