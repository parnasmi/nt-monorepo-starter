import { Spinner } from '../../shadcn/spinner'

export const PageLoader = () => {
	return (
		<div
			data-testid='loader'
			className='absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm'
			style={{ background: 'var(--bg-loader-overlay)' }}
		>
			<div data-testid='custom-spinner'>
				<Spinner className='size-4' show={true} />
			</div>
		</div>
	)
}
