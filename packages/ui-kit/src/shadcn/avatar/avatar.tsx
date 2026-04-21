import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import type { AvatarFallbackProps, AvatarImageProps, AvatarProps } from './types'

const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn('relative flex size-8.5 shrink-0 rounded-full', className)}
		{...props}
	/>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn('bg-success-600 aspect-square size-full rounded-[inherit]', className)}
			{...props}
		/>
	)
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				'flex size-full items-center justify-center rounded-[inherit] bg-gray-300 font-medium uppercase',
				className
			)}
			{...props}
		/>
	)
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
