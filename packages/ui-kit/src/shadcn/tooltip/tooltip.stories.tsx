import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip.tsx'

const allSides = ['top', 'right', 'bottom', 'left'] as const
const allAligns = ['start', 'center', 'end'] as const

const meta = {
	title: 'UI/Tooltip',
	component: TooltipContent,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
			}
		}
	},
	tags: ['autodocs'],
	args: {
		side: 'top',
		sideOffset: 4
	},
	argTypes: {
		side: {
			description: 'The preferred side of the trigger to render against.',
			control: 'select',
			options: allSides,
			table: {
				type: { summary: allSides.join(' | ') },
				defaultValue: { summary: 'top' }
			}
		},
		align: {
			description: 'The preferred alignment against the trigger.',
			control: 'select',
			options: allAligns,
			table: {
				type: { summary: allAligns.join(' | ') },
				defaultValue: { summary: 'center' }
			}
		},
		sideOffset: {
			description: 'Distance in pixels from the trigger.',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '4' }
			}
		}
	},
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		)
	]
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from '@naiton/ui-kit'
 *
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button variant="outline">Hover me</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       <p>Tooltip text</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: (args) => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent {...args}>
				<p>Tooltip text</p>
			</TooltipContent>
		</Tooltip>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button } from '@naiton/ui-kit'

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='outline'>Hover me</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Tooltip text</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				`
			}
		}
	}
}

export const Sides: Story = {
	name: 'Side',
	render: () => (
		<div className='flex gap-4'>
			{allSides.map((side) => (
				<Tooltip key={side}>
					<TooltipTrigger asChild>
						<Button variant='outline'>{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
					</TooltipTrigger>
					<TooltipContent side={side}>
						<p>Tooltip on {side}</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `side` prop on `TooltipContent` to control which side of the trigger the tooltip appears on.'
			},
			source: {
				code: `
					import { Tooltip, TooltipContent, TooltipTrigger, Button } from '@naiton/ui-kit'

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant='outline'>Bottom</Button>
						</TooltipTrigger>
						<TooltipContent side='bottom'>
							<p>Tooltip on bottom</p>
						</TooltipContent>
					</Tooltip>
				`
			}
		}
	}
}

export const WithKeyboardShortcut: Story = {
	name: 'Keyboard Shortcut',
	render: (args) => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant='outline'>Save</Button>
			</TooltipTrigger>
			<TooltipContent {...args}>
				<p className='flex items-center gap-1'>
					Save document
					<kbd className='rounded bg-gray-600 px-1 font-mono text-xs'>⌘S</kbd>
				</p>
			</TooltipContent>
		</Tooltip>
	),
	parameters: {
		docs: {
			description: {
				story: 'Combine descriptive text with a `kbd` element inside `TooltipContent` to display keyboard shortcuts.'
			},
			source: {
				code: `
					import { Tooltip, TooltipContent, TooltipTrigger, Button } from '@naiton/ui-kit'

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Save</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p className="flex items-center gap-1">
								Save document
								<kbd className="bg-gray-600 rounded px-1 font-mono text-xs">⌘S</kbd>
							</p>
						</TooltipContent>
					</Tooltip>
				`
			}
		}
	}
}

export const DisabledButton: Story = {
	name: 'Disabled button',
	render: (args) => (
		<Tooltip>
			<TooltipTrigger asChild>
				<span tabIndex={0}>
					<Button variant='outline' disabled>
						Disabled
					</Button>
				</span>
			</TooltipTrigger>
			<TooltipContent {...args}>
				<p>You don't have permission to perform this action.</p>
			</TooltipContent>
		</Tooltip>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Wrap a disabled button in a `<span tabIndex={0}>` to allow the tooltip to trigger, since disabled elements do not fire mouse events.'
			},
			source: {
				code: `
					import { Tooltip, TooltipContent, TooltipTrigger, Button } from '@naiton/ui-kit'
					
					<Tooltip>
						<TooltipTrigger asChild>
							<span tabIndex={0}>
								<Button variant="outline" disabled>Disabled</Button>
							</span>
						</TooltipTrigger>
						<TooltipContent>
							<p>You don't have permission to perform this action.</p>
						</TooltipContent>
					</Tooltip>
				`
			}
		}
	}
}
