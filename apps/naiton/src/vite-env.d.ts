/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PUBLIC_API_BASE_URL: string
	readonly VITE_PUBLIC_APP_VERSION: string
	readonly VITE_USE_MSW: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module '*.svg?react' {
	import * as React from 'react'
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}
