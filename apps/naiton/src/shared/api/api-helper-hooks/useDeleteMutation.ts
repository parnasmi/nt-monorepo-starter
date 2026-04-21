import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'

import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif'
import type { PostRequestResponse } from '@/shared/types/requests.types'

import { request } from '../api'

interface DeleteRequestArgs {
	id?: number | string
	params?: Record<string, string | number>
	url?: string
	requestBody?: Record<string, unknown>
}

interface DeleteResponseData {
	message: string
}

const deleteRequest = async <TResponseBody>({
	url,
	params,
	requestBody,
	id
}: DeleteRequestArgs): Promise<TResponseBody> => {
	const computedUrl = id ? `${url}/${id}` : (url ?? '')
	const response = await request.delete<TResponseBody>(computedUrl, {
		params,
		data: requestBody
	})
	return response.data
}

interface QueryArgs<T extends DeleteResponseData> {
	apiUrl: string
	onSuccess?: (data: T, variables: DeleteRequestArgs, context: unknown) => void
	onError?: (error: unknown, variables: DeleteRequestArgs, context: unknown) => void
	onSettled?: (data: T | undefined, error: unknown, variables: DeleteRequestArgs, context: unknown) => void
	onMutate?: (variables: DeleteRequestArgs) => unknown
	params?: Record<string, string>
	autoErrorHandle?: boolean
}

export function useDeleteMutation<
	TRequestBody extends Record<string, unknown>,
	TResponseBody extends DeleteResponseData
>({
	apiUrl,
	onSuccess,
	onError,
	onSettled,
	onMutate,
	params,
	autoErrorHandle = true
}: QueryArgs<TResponseBody>): UseMutationResult<TResponseBody, unknown, DeleteRequestArgs, unknown> {
	const { showToast } = useToastNotif()

	return useMutation<TResponseBody, unknown, DeleteRequestArgs, unknown>({
		mutationFn: (variables) =>
			deleteRequest<TResponseBody>({
				...variables,
				url: variables.url ?? apiUrl,
				params: { ...params, ...variables.params },
				requestBody: variables.requestBody
			}),
		onMutate,
		onSuccess: (data, variables, context) => onSuccess?.(data, variables, context),
		onError: (err, variables, context) => {
			if (axios.isAxiosError<PostRequestResponse<TRequestBody>, Record<string, unknown>>(err) && autoErrorHandle) {
				const errorMessage = err.response?.data?.message

				if (typeof errorMessage === 'string') {
					showToast({ type: 'error', message: errorMessage })
				}
			}

			onError?.(err, variables, context)
		},
		onSettled: (data, err, variables, context) => onSettled?.(data, err, variables, context)
	})
}
