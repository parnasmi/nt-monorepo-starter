import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator.tsx'

const meta = {
	title: 'UI/Separator',
	component: Separator,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Visually or semantically separates content.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			description: 'The orientation of the separator line',
			control: 'select',
			options: ['horizontal', 'vertical'],
			table: {
				type: { summary: '"horizontal" | "vertical"' },
				defaultValue: { summary: 'horizontal' }
			}
		},
		decorative: {
			description: 'When true, the separator is purely visual and hidden from assistive technologies',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' }
			}
		}
	}
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Separator } from '@naiton/ui-kit'
 *
 * <Separator />
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: (args) => (
		<div className='w-64'>
			<div className='space-y-1'>
				<h4 className='text-sm font-medium'>Radix Primitives</h4>
				<p className='text-muted-foreground text-sm'>An open-source UI component library.</p>
			</div>
			<Separator className='my-4' {...args} />
			<div className='flex h-5 items-center gap-4 text-sm'>
				<span>Blog</span>
				<span>Docs</span>
				<span>Source</span>
			</div>
		</div>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Separator } from '@naiton/ui-kit'

					<div>
						<div className="space-y-1">
							<h4 className="text-sm font-medium">Radix Primitives</h4>
							<p className="text-muted-foreground text-sm">An open-source UI component library.</p>
						</div>
						<Separator className="my-4" />
						<div className="flex h-5 items-center gap-4 text-sm">
							<span>Blog</span>
							<span>Docs</span>
							<span>Source</span>
						</div>
					</div>
				`
			}
		}
	}
}

export const Vertical: Story = {
	render: () => (
		<div className='flex h-5 items-center gap-4 text-sm'>
			<span>Blog</span>
			<Separator orientation='vertical' />
			<span>Docs</span>
			<Separator orientation='vertical' />
			<span>Source</span>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `orientation="vertical"` for a vertical separator.'
			},
			source: {
				code: `
					import { Separator } from '@naiton/ui-kit'

					<div className="flex h-5 items-center gap-4 text-sm">
						<span>Blog</span>
						<Separator orientation="vertical" />
						<span>Docs</span>
						<Separator orientation="vertical" />
						<span>Source</span>
					</div>
				`
			}
		}
	}
}

export const Menu: Story = {
	render: () => (
		<div className='w-48 text-sm'>
			<div className='px-1 py-1.5 font-medium'>My Account</div>
			<Separator />
			<div className='flex flex-col'>
				<button className='hover:bg-accent rounded px-2 py-1.5 text-left transition-colors'>Settings</button>
				<button className='hover:bg-accent rounded px-2 py-1.5 text-left transition-colors'>Account</button>
				<Separator className='my-1' />
				<button className='hover:bg-accent rounded px-2 py-1.5 text-left transition-colors'>Help</button>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Vertical separators between menu items with descriptions.'
			},
			source: {
				code: `
					import { Separator } from '@naiton/ui-kit'

					<div className="w-48 text-sm">
						<div className="px-1 py-1.5 font-medium">My Account</div>
						<Separator />
						<div className="flex flex-col">
							<button className="hover:bg-accent rounded px-2 py-1.5 text-left">Settings</button>
							<button className="hover:bg-accent rounded px-2 py-1.5 text-left">Account</button>
							<Separator className="my-1" />
							<button className="hover:bg-accent rounded px-2 py-1.5 text-left">Help</button>
						</div>
					</div>
				`
			}
		}
	}
}

export const List: Story = {
	render: () => (
		<div className='w-64 text-sm'>
			{[
				{ label: 'Item 1', value: 'Value 1' },
				{ label: 'Item 2', value: 'Value 2' },
				{ label: 'Item 3', value: 'Value 3' }
			].map((item, index, arr) => (
				<div key={item.label}>
					<div className='flex justify-between py-2'>
						<span className='text-muted-foreground'>{item.label}</span>
						<span className='font-medium'>{item.value}</span>
					</div>
					{index < arr.length - 1 && <Separator />}
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Horizontal separators between list items.'
			},
			source: {
				code: `
					import { Separator } from '@naiton/ui-kit'

					<div className="w-64 text-sm">
						<div className="flex justify-between py-2">
							<span className="text-muted-foreground">Item 1</span>
							<span className="font-medium">Value 1</span>
						</div>
						<Separator />
						<div className="flex justify-between py-2">
							<span className="text-muted-foreground">Item 2</span>
							<span className="font-medium">Value 2</span>
						</div>
						<Separator />
						<div className="flex justify-between py-2">
							<span className="text-muted-foreground">Item 3</span>
							<span className="font-medium">Value 3</span>
						</div>
					</div>
				`
			}
		}
	}
}
