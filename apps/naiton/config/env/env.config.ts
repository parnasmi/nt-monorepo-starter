type EnvConfig = {
	API_ROOT: string
	APP_VERSION: string
}

export const envConfig: EnvConfig = {
	API_ROOT: import.meta.env.VITE_PUBLIC_API_BASE_URL as string,
	APP_VERSION: import.meta.env.VITE_PUBLIC_APP_VERSION as string
}
