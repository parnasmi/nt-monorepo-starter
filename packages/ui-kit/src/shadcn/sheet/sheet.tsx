import { ChevronLeftRegular, ChevronRightRegular, DismissRegular } from '@fluentui/react-icons'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva } from 'class-variance-authority'
import { type ElementRef, forwardRef, useEffect, useState } from 'react'
import { cn } from '../../lib/utils.ts'
import { Button } from '../button'
import { SHEET_SIZES } from './constants.ts'
import type {
	SheetContentProps,
	SheetDescriptionProps,
	SheetFooterProps,
	SheetHeaderProps,
	SheetOverlayProps,
	SheetSize,
	SheetTitleProps
} from './types.ts'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = forwardRef<ElementRef<typeof SheetPrimitive.Overlay>, SheetOverlayProps>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Overlay
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
				className
			)}
			{...props}
			ref={ref}
		/>
	)
)
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

export const sheetVariants = cva(
	'fixed flex flex-col z-50 gap-4 bg-white p-6 shadow-lg transition-all ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
	{
		variants: {
			side: {
				top: 'w-full! rounded-bl-md rounded-br-md inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
				bottom:
					'w-full! rounded-tl-md rounded-tr-md inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
				left: 'h-full! rounded-tr-md rounded-br-md inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
				right:
					'h-full! rounded-tl-md rounded-bl-md inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
			},
			size: {
				sm: 'w-[20%] h-[30%]',
				md: 'w-[30%] h-[40%]',
				lg: 'w-[40%] h-[50%]',
				xl: 'w-[60%] h-[70%]',
				full: 'w-[94%] h-[90%]'
			}
		}
	}
)

const SheetContent = forwardRef<ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
	({ side = 'right', size = 'sm', sizes, className, children, ...props }, ref) => {
		const resolvedSizes: SheetSize[] = sizes
			? [...sizes].sort((a, b) => SHEET_SIZES.indexOf(a) - SHEET_SIZES.indexOf(b))
			: [size as SheetSize]

		const resolvedInitial: SheetSize = resolvedSizes.includes(size as SheetSize)
			? (size as SheetSize)
			: resolvedSizes[0]

		const [currentSize, setCurrentSize] = useState<SheetSize>(resolvedInitial)

		useEffect(() => {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			if (!sizes) setCurrentSize(size as SheetSize)
		}, [size, sizes])

		const currentIdx = resolvedSizes.indexOf(currentSize)
		const canExpand = currentIdx < resolvedSizes.length - 1
		const canShrink = currentIdx > 0

		return (
			<SheetPortal>
				<SheetOverlay />
				<SheetPrimitive.Content
					ref={ref}
					className={cn(sheetVariants({ side, size: currentSize }), className)}
					{...props}
				>
					{sizes && sizes.length > 1 && (
						<>
							<Button
								variant='outline'
								size='icon'
								className='absolute top-[calc(50%-24px)] -left-5 -translate-y-1/2 rounded-full p-3'
								onClick={() => canExpand && setCurrentSize(resolvedSizes[currentIdx + 1])}
								disabled={!canExpand}
							>
								<ChevronLeftRegular fontSize={20} />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='absolute top-[calc(50%+24px)] -left-4 -translate-y-1/2 rounded-full p-2'
								onClick={() => canShrink && setCurrentSize(resolvedSizes[currentIdx - 1])}
								disabled={!canShrink}
							>
								<ChevronRightRegular fontSize={20} />
							</Button>
						</>
					)}
					<SheetPrimitive.Close className='absolute top-4 right-4 cursor-pointer rounded opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-gray-50'>
						<DismissRegular fontSize={20} />
						<span className='sr-only'>Close</span>
					</SheetPrimitive.Close>
					{children}
				</SheetPrimitive.Content>
			</SheetPortal>
		)
	}
)
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
	<div className={cn('mb-4 flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
	<div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = forwardRef<ElementRef<typeof SheetPrimitive.Title>, SheetTitleProps>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Title ref={ref} className={cn('text-xl font-medium text-gray-900', className)} {...props} />
	)
)
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = forwardRef<ElementRef<typeof SheetPrimitive.Description>, SheetDescriptionProps>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Description ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
	)
)
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle,
	SheetTrigger
}
