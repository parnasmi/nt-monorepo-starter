import { zodResolver } from '@hookform/resolvers/zod'
import axios, { type AxiosResponse } from 'axios'
import {
	type DefaultValues,
	type FieldValues,
	type Resolver,
	type SubmitHandler,
	useForm,
	type UseFormSetError
} from 'react-hook-form'
import { infer as zodInfer, type ZodTypeAny } from 'zod'

import { request } from '@/shared/api'
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif'
import type { PostRequestResponse } from '@/shared/types/requests.types'

type SchemaValues<TSchema extends ZodTypeAny> = zodInfer<TSchema> & FieldValues

type UseRhFormProps<TSchema extends ZodTypeAny, ResponseType, RequestType> = {
	initialValues: DefaultValues<SchemaValues<TSchema>>
	successCallback: (formData: SchemaValues<TSchema>, response?: AxiosResponse<ResponseType>) => void
	errorCallback?: (setError: UseFormSetError<SchemaValues<TSchema>>, error: unknown) => void
	fieldDataMapper?: (formData: SchemaValues<TSchema>) => Promise<RequestType> | RequestType
	url: string
	method?: 'put' | 'post'
	validationSchema: TSchema
	isMultiPart?: boolean
	autoErrorHandle?: boolean
	showErrorsInNotification?: boolean
	resolveToSuccess?: boolean
}

export function useRhForm<
	TSchema extends ZodTypeAny,
	ResponseType,
	RequestType extends Partial<Record<keyof RequestType, unknown>>
>({
	initialValues,
	successCallback,
	errorCallback,
	fieldDataMapper,
	url,
	method = 'post',
	validationSchema,
	isMultiPart,
	autoErrorHandle = false,
	resolveToSuccess = false,
	showErrorsInNotification
}: UseRhFormProps<TSchema, ResponseType, RequestType>) {
	const { showToast } = useToastNotif()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setError,
		control,
		trigger,
		reset,
		setValue,
		resetField,
		clearErrors
	} = useForm<SchemaValues<TSchema>>({
		defaultValues: initialValues,
		mode: 'onBlur',
		resolver: zodResolver(validationSchema as never) as unknown as Resolver<SchemaValues<TSchema>>
	})

	const onSubmit: SubmitHandler<SchemaValues<TSchema>> = async (data) => {
		try {
			const normalizedData = (await fieldDataMapper?.(data)) || data
			const headers = isMultiPart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}

			if (resolveToSuccess) {
				await Promise.resolve()
				successCallback(data)
			} else {
				const response = await request[method]<ResponseType>(url, normalizedData, headers)
				successCallback(data, response)
			}
		} catch (error: unknown) {
			const allProperties = Object.keys(initialValues) as (keyof RequestType)[]

			if (axios.isAxiosError<PostRequestResponse<RequestType>, Record<string, unknown>>(error)) {
				const message = error.response?.data?.message
				const errorsObjects = error.response?.data?.data
				let allErrorsInString = ''

				if (errorsObjects && autoErrorHandle) {
					allProperties.forEach((fieldName) => {
						if (fieldName in errorsObjects) {
							// @ts-expect-error RHF generic setError path
							setError(fieldName, {
								type: 'custom',
								message: errorsObjects[fieldName]?.toString()
							})
						}
					})
				}

				for (const key in errorsObjects) {
					if (key.includes('.')) {
						// @ts-expect-error RHF generic setError path
						setError(key, {
							type: 'custom',
							message: errorsObjects[key]?.toString()
						})
					}
				}

				if (errorsObjects && showErrorsInNotification) {
					allProperties.forEach((fieldName) => {
						if (fieldName in errorsObjects) {
							allErrorsInString += `\n${fieldName.toString()}:${errorsObjects[fieldName]?.toString()}`
						}
					})
				}

				if (allErrorsInString.length) {
					showToast({ type: 'error', message: allErrorsInString })
				}

				if (typeof message === 'string') {
					showToast({ type: 'error', message })
				}
			}

			errorCallback?.(setError, error)
		}
	}

	return {
		onSubmit: handleSubmit(onSubmit as SubmitHandler<SchemaValues<TSchema>>),
		register,
		errors,
		watch,
		setError,
		isSubmitting,
		control,
		trigger,
		reset,
		setValue,
		handleSubmit,
		resetField,
		clearErrors
	}
}
