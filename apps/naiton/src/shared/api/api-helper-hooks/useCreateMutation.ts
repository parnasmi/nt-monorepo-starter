import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif'
import { axiosErrorHandler } from '@/shared/lib/utils/axiosErrorHandler/axiosErrorHandler'
import type { PostRequestResponse } from '@/shared/types/requests.types'
import { request } from '../api'

interface UseCreateMutationArgs<TRequestBody, TResponseData> {
	url: string
	params?: Record<string, string>
	onSuccess?: (data: TResponseData, variables: TRequestBody, context: unknown) => void
	onError?: (error: AxiosError, variables: TRequestBody, context: unknown) => void
	onSettled?: (
		data: TResponseData | undefined,
		error: AxiosError | null,
		variables: TRequestBody,
		context: unknown
	) => void
	onMutate?: (variables: TRequestBody) => void
	headers?: Record<string, string>
	retry?: boolean | number
	isAutoErrNotifEnabled?: boolean
}

export function useCreateMutation<TRequestBody extends Partial<Record<keyof TRequestBody, unknown>>, TResponseData>({
	url,
	params,
	onSuccess,
	onError,
	onSettled,
	onMutate,
	headers,
	retry = false,
	isAutoErrNotifEnabled = false
}: UseCreateMutationArgs<TRequestBody, TResponseData>): UseMutationResult<
	TResponseData,
	AxiosError,
	TRequestBody,
	unknown
> {
	const stringifiedParams = params
		? Object.entries(params).reduce((acc, [key, value]) => `${acc}-${key}-${value}`, '')
		: ''
	const computedQueryKey = `${url}-${stringifiedParams}`
	const cachedQueryKey = useMemo(() => [computedQueryKey], [computedQueryKey])
	const { t } = useTranslation()
	const { showToast } = useToastNotif()

	return useMutation<TResponseData, AxiosError, TRequestBody, unknown>({
		mutationFn: async (requestData: TRequestBody) => {
			const response: AxiosResponse<TResponseData> = await request.post(url, requestData, {
				params,
				headers
			})

			return response.data
		},
		mutationKey: cachedQueryKey,
		onMutate,
		onSuccess,
		onError: (error, variables, context) => {
			onError?.(error, variables, context)

			if (isAutoErrNotifEnabled) {
				axiosErrorHandler<PostRequestResponse<TRequestBody>>({
					error: error as Error,
					callback: (err) => {
						if (err.type === 'axios-error') {
							const message = t('Что-то пошло не так')
							const errorMessage = err.error.response?.data?.message
							let allErrorsInString = ''

							if (typeof errorMessage === 'string') {
								showToast({ message, type: 'error' })
							}

							const errorsObjects = err.error.response?.data?.data
							const allProperties = Object.keys(variables) as (keyof TRequestBody)[]

							if (errorsObjects) {
								allProperties.forEach((fieldName) => {
									if (fieldName in errorsObjects) {
										allErrorsInString += `\n${fieldName.toString()}:${errorsObjects[fieldName]?.toString()}`
									}
								})
							}

							if (allErrorsInString.length) {
								showToast({ type: 'error', message: allErrorsInString })
							}
						}
					}
				})
			}
		},
		onSettled,
		retry
	})
}
