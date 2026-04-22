import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ElementRef, forwardRef } from 'react'
import { cn } from '../../lib/utils.ts'
import type { TabsContentProps, TabsListProps, TabsTriggerProps } from './types.ts'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, TabsListProps>(({ className, ...props }, ref) => (
	<TabsPrimitive.List ref={ref} className={cn('inline-flex items-center justify-center', className)} {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				'text-ssm inline-flex cursor-pointer items-center justify-center border border-gray-100 border-r-gray-200 bg-gray-100 px-3 py-2 font-medium whitespace-nowrap text-gray-500 transition-all first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br last:border-r-0 hover:border-gray-200 hover:bg-gray-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-gray-500 data-[state=active]:bg-gray-500 data-[state=active]:text-white',
				className
			)}
			{...props}
		/>
	)
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
	({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn('mt-3', className)} {...props} />
)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
