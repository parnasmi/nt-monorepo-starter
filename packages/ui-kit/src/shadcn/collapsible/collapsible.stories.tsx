import { ChevronDownRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible.tsx'

const meta = {
	title: 'UI/Collapsible',
	component: Collapsible,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'An interactive component which expands/collapses a panel.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		open: {
			description: 'Controlled open state of the collapsible',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' }
			}
		},
		defaultOpen: {
			description: 'Default open state when uncontrolled',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		disabled: {
			description: 'Prevent the user from interacting with the collapsible',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		onOpenChange: {
			description: 'Callback fired when the open state changes.',
			action: 'openChanged',
			table: { type: { summary: '(open: boolean) => void' } }
		}
	}
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@naiton/ui-kit'
 *
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Collapsible className='w-80'>
			<div className='flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-3'>
				<span className='text-sm font-medium'>@peduarte starred 3 repositories</span>
				<CollapsibleTrigger asChild>
					<Button variant='ghost' size='icon' aria-label='Toggle'>
						<ChevronDownRegular fontSize={16} />
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className='mt-2 flex flex-col gap-2'>
				<div className='rounded-md border border-gray-200 px-4 py-3 text-sm'>@radix-ui/primitives</div>
				<div className='rounded-md border border-gray-200 px-4 py-3 text-sm'>@radix-ui/colors</div>
				<div className='rounded-md border border-gray-200 px-4 py-3 text-sm'>@stitches/react</div>
			</CollapsibleContent>
		</Collapsible>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { ChevronDownRegular } from '@fluentui/react-icons'
					import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@naiton/ui-kit'

					<Collapsible className="w-80">
						<div className="flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
							<span className="text-sm font-medium">@peduarte starred 3 repositories</span>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" size="icon-xs" aria-label="Toggle">
									<ChevronDownRegular fontSize={16} />
								</Button>
							</CollapsibleTrigger>
						</div>
						<CollapsibleContent className="mt-2 flex flex-col gap-2">
							<div className="rounded-md border border-gray-200 px-4 py-3 text-sm">@radix-ui/primitives</div>
							<div className="rounded-md border border-gray-200 px-4 py-3 text-sm">@radix-ui/colors</div>
							<div className="rounded-md border border-gray-200 px-4 py-3 text-sm">@stitches/react</div>
						</CollapsibleContent>
					</Collapsible>
				`
			}
		}
	}
}

export const Controlled: Story = {
	render: () => {
		const [open, setOpen] = useState(false)

		return (
			<Collapsible open={open} onOpenChange={setOpen} className='w-80'>
				<div className='flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-3'>
					<span className='text-sm font-medium'>{open ? 'Collapse' : 'Expand'} settings</span>
					<CollapsibleTrigger asChild>
						<Button variant='ghost' size='icon' aria-label='Toggle'>
							<ChevronDownRegular fontSize={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
						</Button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent className='mt-2 rounded-md border border-gray-200 px-4 py-3 text-sm'>
					<p>Notifications: enabled</p>
					<p>Dark mode: off</p>
					<p>Language: English</p>
				</CollapsibleContent>
			</Collapsible>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the `open` and `onOpenChange` props to control the collapsible state externally via React state.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { ChevronDownRegular } from '@fluentui/react-icons'
					import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@naiton/ui-kit'

					const [open, setOpen] = useState(false)

					<Collapsible open={open} onOpenChange={setOpen} className="w-80">
						<div className="flex items-center justify-between gap-4 rounded-md border px-4 py-3">
							<span className="text-sm font-medium">{open ? 'Collapse' : 'Expand'} settings</span>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" size="icon-xs" aria-label="Toggle">
									<ChevronDownRegular fontSize={16} className={\`transition-transform \${open ? 'rotate-180' : ''}\`} />
								</Button>
							</CollapsibleTrigger>
						</div>
						<CollapsibleContent className="mt-2 rounded-md border px-4 py-3 text-sm">
							<p>Notifications: enabled</p>
						</CollapsibleContent>
					</Collapsible>
				`
			}
		}
	}
}

export const Disabled: Story = {
	render: () => (
		<Collapsible disabled className='w-80'>
			<div className='flex items-center justify-between gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 opacity-50'>
				<span className='text-sm font-medium'>Collapsible — disabled</span>
				<CollapsibleTrigger asChild>
					<Button variant='ghost' size='icon' aria-label='Toggle' disabled>
						<ChevronDownRegular fontSize={16} />
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className='mt-2 rounded-md border border-gray-200 px-4 py-3 text-sm'>
				This content is never reachable when disabled.
			</CollapsibleContent>
		</Collapsible>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `disabled` prop to prevent the user from toggling the collapsible.'
			},
			source: {
				code: `
					import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@naiton/ui-kit'

					<Collapsible disabled>
						<CollapsibleTrigger>Toggle</CollapsibleTrigger>
						<CollapsibleContent>Hidden content</CollapsibleContent>
					</Collapsible>
				`
			}
		}
	}
}
