import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './skeleton.tsx'

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Use to show a placeholder while content is loading.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Additional classes to control the shape and size of the skeleton',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		}
	}
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Skeleton } from '@naiton/ui-kit'
 *
 * <Skeleton className="h-4 w-48" />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	args: {
		className: 'h-4 w-48'
	},
	parameters: {
		docs: {
			source: {
				code: `
					import { Skeleton } from '@naiton/ui-kit'

					<Skeleton className="h-4 w-48" />
				`
			}
		}
	}
}

export const Avatar: Story = {
	render: () => (
		<div className='flex w-fit items-center gap-4'>
			<Skeleton className='size-10 shrink-0 rounded-full' />
			<div className='grid gap-2'>
				<Skeleton className='h-4 w-40' />
				<Skeleton className='h-4 w-25' />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Compose a circle and two lines to represent an avatar card loading state.'
			},
			source: {
				code: `
					import { Skeleton } from '@naiton/ui-kit'

					<div className='flex w-fit items-center gap-4'>
						<Skeleton className='size-10 shrink-0 rounded-full' />
						<div className='grid gap-2'>
							<Skeleton className='h-4 w-40' />
							<Skeleton className='h-4 w-25' />
						</div>
					</div>
				`
			}
		}
	}
}

export const Card: Story = {
	render: () => (
		<div className='flex w-64 flex-col gap-3'>
			<Skeleton className='h-40 w-full rounded-lg' />
			<div className='flex flex-col gap-2 px-1'>
				<Skeleton className='h-4 w-3/4' />
				<Skeleton className='h-3 w-full' />
				<Skeleton className='h-3 w-5/6' />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Stack a large image block with heading and body line skeletons to represent a card layout loading state.'
			},
			source: {
				code: `
					import { Skeleton } from '@naiton/ui-kit'

					<div className='flex w-64 flex-col gap-3'>
						<Skeleton className='h-40 w-full rounded-lg' />
						<div className='flex flex-col gap-2 px-1'>
							<Skeleton className='h-4 w-3/4' />
							<Skeleton className='h-3 w-full' />
							<Skeleton className='h-3 w-5/6' />
						</div>
					</div>
				`
			}
		}
	}
}

export const Text: Story = {
	render: () => (
		<div className='flex w-64 flex-col gap-2'>
			<Skeleton className='h-4 w-full' />
			<Skeleton className='h-4 w-full' />
			<Skeleton className='h-4 w-3/4' />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use varying widths to mimic the natural ragged edge of real text paragraphs during loading.'
			},
			source: {
				code: `
					import { Skeleton } from '@naiton/ui-kit'

					<div className="flex w-64 flex-col gap-2">
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-3/4' />
					</div>
				`
			}
		}
	}
}

export const Form: Story = {
	render: () => (
		<div className='flex w-72 flex-col gap-4'>
			<div className='flex flex-col gap-1.5'>
				<Skeleton className='h-3.5 w-16' />
				<Skeleton className='h-8 w-full rounded' />
			</div>
			<div className='flex flex-col gap-1.5'>
				<Skeleton className='h-3.5 w-20' />
				<Skeleton className='h-8 w-full rounded' />
				<Skeleton className='h-3 w-40' />
			</div>
			<div className='flex flex-col gap-1.5'>
				<Skeleton className='h-3.5 w-24' />
				<Skeleton className='h-20 w-full rounded' />
			</div>
			<Skeleton className='h-8 w-24 self-start rounded' />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Represent a form loading state with label, input, and description skeletons for each field.'
			},
			source: {
				code: `
					import { Skeleton } from '@naiton/ui-kit'

					<div className="flex w-72 flex-col gap-4">
						<div className="flex flex-col gap-1.5">
							<Skeleton className="h-3.5 w-16" />
							<Skeleton className="h-8 w-full rounded" />
						</div>
						<div className="flex flex-col gap-1.5">
							<Skeleton className="h-3.5 w-20" />
							<Skeleton className="h-8 w-full rounded" />
							<Skeleton className="h-3 w-40" />
						</div>
						<Skeleton className="h-8 w-24 self-start rounded" />
					</div>
				`
			}
		}
	}
}
