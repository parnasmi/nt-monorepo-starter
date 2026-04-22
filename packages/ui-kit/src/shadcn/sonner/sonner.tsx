import {
	CheckmarkCircleRegular,
	DismissRegular,
	ErrorCircleRegular,
	InfoRegular,
	SpinnerIosRegular,
	WarningRegular
} from '@fluentui/react-icons'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import type { ToasterProps } from './types.ts'

export const Toaster = ({ position = 'top-center', ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			position={position}
			theme={theme as ToasterProps['theme']}
			className='toaster group'
			icons={{
				success: <CheckmarkCircleRegular className='text-success-600 size-full' />,
				info: <InfoRegular className='size-full text-gray-500' />,
				warning: <WarningRegular className='text-warning-500 size-full' />,
				error: <ErrorCircleRegular className='text-error-500 size-full' />,
				loading: <SpinnerIosRegular className='size-full animate-spin text-gray-500 duration-700' />,
				close: <DismissRegular className='size-full' />
			}}
			toastOptions={{
				classNames: {
					toast: 'group toast gap-2! bg-white! text-gray-900! border-0! shadow-md! py-3! px-4!',
					content: 'gap-1! mr-auto!',
					title: 'font-normal! text-ssm!',
					description: 'text-gray-500!',
					icon: 'size-5! m-0!',
					actionButton:
						'h-[initial]! bg-success-600! font-normal! text-xs! text-white! transition-colors! hover:bg-success-600/90! py-1! ml-0!',
					cancelButton:
						'bg-gray-500! font-normal! text-xs! text-white! transition-colors! hover:bg-gray-500/90! py-1! ml-0!',
					closeButton: 'bg-white! text-gray-500! border-0! shadow-sm! p-0.5! transition-colors! hover:bg-gray-100!',
					loader: 'size-full!'
				}
			}}
			{...props}
		/>
	)
}
