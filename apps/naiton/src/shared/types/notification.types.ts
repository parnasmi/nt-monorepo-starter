import type { ExternalToast } from 'sonner'

export type SonnerToastOptions = ExternalToast

export type ShowToastOptions = {
	type?: 'success' | 'info' | 'warning' | 'error'
	message?: string
	toastOptions?: SonnerToastOptions
}
