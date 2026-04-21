import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Field, FieldDescription, FieldLabel } from '../field'
import { Input } from '../input'
import { Popover, PopoverContent, PopoverTrigger } from './popover.tsx'

const meta = {
	title: 'UI/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays rich content in a portal, triggered by a button.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		open: {
			description: 'Controlled open state of the popover',
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
		onOpenChange: {
			description: 'Callback fired when the open state changes.',
			action: 'openChanged',
			table: { type: { summary: '(open: boolean) => void' } }
		}
	}
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Button, Popover, PopoverContent, PopoverTrigger } from '@naiton/ui-kit'
 *
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p className="text-sm">Popover content goes here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Open</Button>
			</PopoverTrigger>
			<PopoverContent>
				<p className='text-sm'>Popover content goes here.</p>
			</PopoverContent>
		</Popover>
	),
	parameters: {
		docs: {
			description: {
				story: 'A simple popover with a header, title, and description.'
			},
			source: {
				code: `
					import { Button, Popover, PopoverContent, PopoverTrigger } from '@naiton/ui-kit'

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">Open</Button>
						</PopoverTrigger>
						<PopoverContent>
							<p className="text-sm">Popover content goes here.</p>
						</PopoverContent>
					</Popover>
				`
			}
		}
	}
}

export const Align: Story = {
	render: () => (
		<div className='flex flex-wrap gap-4'>
			{(['start', 'center', 'end'] as const).map((align) => (
				<Popover key={align}>
					<PopoverTrigger asChild>
						<Button variant='outline'>{align}</Button>
					</PopoverTrigger>
					<PopoverContent align={align}>
						Aligned to <strong>{align}</strong>
					</PopoverContent>
				</Popover>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `align` prop on `PopoverContent` to control the horizontal alignment.'
			},
			source: {
				code: `
					import { Button, Popover, PopoverContent, PopoverTrigger } from '@naiton/ui-kit'

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">Start</Button>
						</PopoverTrigger>
						<PopoverContent align="start">...</PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">Center</Button>
						</PopoverTrigger>
						<PopoverContent align="center">...</PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">End</Button>
						</PopoverTrigger>
						<PopoverContent align="end">...</PopoverContent>
					</Popover>
				`
			}
		}
	}
}

export const WithForm: Story = {
	name: 'With form',
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline'>Edit dimensions</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium'>Dimensions</p>
					<Field>
						<FieldLabel htmlFor='popover-width'>Width</FieldLabel>
						<Input id='popover-width' defaultValue='100%' />
						<FieldDescription>Max width of the element.</FieldDescription>
					</Field>
					<Field>
						<FieldLabel htmlFor='popover-height'>Height</FieldLabel>
						<Input id='popover-height' defaultValue='25px' />
					</Field>
				</div>
			</PopoverContent>
		</Popover>
	),
	parameters: {
		docs: {
			description: {
				story: 'A popover with form fields inside.'
			},
			source: {
				code: `
					import { Button, Field, FieldDescription, FieldLabel, Input, Popover, PopoverContent, PopoverTrigger } from '@naiton/ui-kit'

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">Edit dimensions</Button>
						</PopoverTrigger>
						<PopoverContent>
							<div className="flex flex-col gap-3">
								<p className="text-sm font-medium">Dimensions</p>
								<Field>
									<FieldLabel htmlFor="width">Width</FieldLabel>
									<Input id="width" defaultValue="100%" />
									<FieldDescription>Max width of the element.</FieldDescription>
								</Field>
								<Field>
									<FieldLabel htmlFor="height">Height</FieldLabel>
									<Input id="height" defaultValue="25px" />
								</Field>
							</div>
						</PopoverContent>
					</Popover>
				`
			}
		}
	}
}
