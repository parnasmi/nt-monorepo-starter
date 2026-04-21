import * as SliderPrimitive from '@radix-ui/react-slider'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { SliderProps } from './types.ts'

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
	({ className, ...props }, ref) => (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track className='bg-success-600/20 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'>
				<SliderPrimitive.Range className='bg-success-600 absolute h-full data-[orientation=vertical]:w-full' />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className='border-success-600/50 active:border-success-600 block size-4 rounded-full border bg-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
			<SliderPrimitive.Thumb className='border-success-600/50 active:border-success-600 block size-4 rounded-full border bg-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
			<SliderPrimitive.Thumb className='border-success-600/50 active:border-success-600 block size-4 rounded-full border bg-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
		</SliderPrimitive.Root>
	)
)
Slider.displayName = SliderPrimitive.Root.displayName
