import { cn } from '../../../lib/utils'
import { Spinner } from '../../../shadcn/spinner'
import type { BaseLoadingProps, LoadingProps } from './types'

const DefaultLoading = (props: BaseLoadingProps) => {
	const { loading = false, children, spinnerClass, className, asElement: Component = 'div', customLoader } = props

	return loading ? (
		<Component className={cn(!customLoader && 'flex h-full items-center justify-center', className)}>
			{customLoader ? <>{customLoader}</> : <Spinner className={cn(spinnerClass, 'size-10')} />}
		</Component>
	) : (
		<>{children}</>
	)
}

const CoveredLoading = (props: BaseLoadingProps) => {
	const { loading = false, children, spinnerClass, className, asElement: Component = 'div', customLoader } = props

	return (
		<Component className={cn(loading ? 'relative h-full' : 'h-full', className)}>
			{children}
			{loading && <div className='absolute inset-0 z-2 h-full w-full bg-white/50' />}
			{loading && (
				<div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform'>
					{customLoader ? <>{customLoader}</> : <Spinner className={cn(spinnerClass, 'size-10')} />}
				</div>
			)}
		</Component>
	)
}

export const Loading = ({ type = 'default', ...rest }: LoadingProps) => {
	switch (type) {
		case 'default':
			return <DefaultLoading {...rest} />
		case 'cover':
			return <CoveredLoading {...rest} />
		default:
			return <DefaultLoading {...rest} />
	}
}
