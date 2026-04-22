import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { envConfig } from '@/config/env/env.config'
import {
	ACCESSTOKEN_LOCALSTORAGE_KEY,
	COMPANYINFO_LOCALSTORAGE_KEY,
	LNG_LOCALSTORAGE_KEY
} from '../const/localstorage.const'
import { getRouteAuthLogin, getRouteForbidden } from '../const/router.const'
import storage from '../lib/storage'
import type { SharedStoreState } from '../store'
import { useBoundStore } from '../store'
import type { TCompanyInfo } from '../types/requests.types'

export const request: AxiosInstance = axios.create({
	baseURL: envConfig.API_ROOT
})

request.defaults.headers.common.Accept = 'application/json'
request.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'

const initialToken = storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY)
let token = initialToken
const initialCompanyInfo = storage.get(COMPANYINFO_LOCALSTORAGE_KEY)
	? (JSON.parse(storage.get(COMPANYINFO_LOCALSTORAGE_KEY)!) as TCompanyInfo)
	: null

const getLanguage = () => {
	try {
		const storeLng = useBoundStore.getState().lng
		return storeLng || storage.get(LNG_LOCALSTORAGE_KEY) || 'en'
	} catch {
		return storage.get(LNG_LOCALSTORAGE_KEY) || 'en'
	}
}

request.interceptors.request.use((config) => {
	config.headers['Accept-Language'] = getLanguage()
	return config
})

export const apiSubscribe = (store?: SharedStoreState): void => {
	const companyTin = store ? (store.companyInfo?.inn ?? null) : (initialCompanyInfo?.inn ?? null)

	if (companyTin) {
		request.defaults.headers.common['Company-Tin'] = companyTin
	} else {
		delete request.defaults.headers.common['Company-Tin']
	}

	if (store?.csrfToken) {
		request.defaults.headers.common['X-Csrf-Token'] = store.csrfToken
	} else {
		delete request.defaults.headers.common['X-Csrf-Token']
	}

	token = store ? store.accessToken : initialToken

	if (token) {
		request.defaults.headers.common.Authorization = `Bearer ${token}`
	} else {
		delete request.defaults.headers.common.Authorization
	}
}

apiSubscribe()

request.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		const status = error?.response?.status

		if (status === 401 && typeof window !== 'undefined') {
			window.location.href = `${getRouteAuthLogin()}?tokenExpired=true`
		} else if (status === 403 && typeof window !== 'undefined') {
			window.location.href = getRouteForbidden()
		} else if (status === 429 && typeof window !== 'undefined') {
			alert('Too Many Requests')
		}

		return Promise.reject(error)
	}
)
