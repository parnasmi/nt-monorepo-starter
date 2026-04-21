import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { request } from '../api'

interface EditRequestArgs<TRequestBody> {
	url?: string
	body: TRequestBody
	params?: Record<string, unknown>
	method?: 'put' | 'patch' | 'post'
}

const editRequest = async <TRequestBody, TResponseData>({
	url,
	body,
	params,
	method = 'put'
}: EditRequestArgs<TRequestBody>): Promise<TResponseData> => {
	if (!url) {
		throw new Error('URL is required for useEditMutation')
	}

	const response: AxiosResponse<TResponseData> = await request[method](url, body, { params })
	return response.data
}

interface UseEditMutationArgs<TRequestBody, TResponseData> {
	url?: string
	params?: Record<string, unknown>
	method?: 'put' | 'patch' | 'post'
	onSuccess?: (data: TResponseData) => void
	onError?: (error: AxiosError) => void
	onSettled?: (data: TResponseData | undefined, error: AxiosError | null) => void
	onMutate?: (variables: EditRequestArgs<TRequestBody>) => void
}

export function useEditMutation<TRequestBody, TResponseData>({
	url,
	onSuccess,
	onError,
	onSettled,
	onMutate,
	params,
	method = 'put'
}: UseEditMutationArgs<TRequestBody, TResponseData>): UseMutationResult<
	TResponseData,
	AxiosError,
	EditRequestArgs<TRequestBody>,
	unknown
> {
	return useMutation<TResponseData, AxiosError, EditRequestArgs<TRequestBody>, unknown>({
		mutationFn: (variables) =>
			editRequest<TRequestBody, TResponseData>({
				...variables,
				url: variables.url ?? url,
				params: params ?? variables.params,
				method
			}),
		onMutate,
		onSuccess,
		onError,
		onSettled
	})
}
