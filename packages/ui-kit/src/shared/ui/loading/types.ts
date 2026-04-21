import type { CSSProperties, ElementType, ReactNode } from 'react'

type CommonProps = {
	className?: string
	children?: ReactNode
	style?: CSSProperties
}

export type BaseLoadingProps = CommonProps & {
	asElement?: ElementType
	customLoader?: ReactNode
	loading: boolean
	spinnerClass?: string
}

export type LoadingProps = BaseLoadingProps & {
	type?: 'default' | 'cover'
}
