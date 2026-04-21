import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldDescription, FieldLabel } from '../field'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue
} from './select.tsx'

const meta = {
	title: 'UI/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a list of options for the user to pick from—triggered by a button.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		defaultValue: {
			description: 'Initial selected value for uncontrolled usage',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		value: {
			description: 'Controlled selected value',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		disabled: {
			description: 'Disables the select',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		onValueChange: {
			description: 'Callback fired when the selected value changes.',
			action: 'valueChanged',
			table: { type: { summary: '(value: string) => void' } }
		}
	}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@naiton/ui-kit'
 *
 * <Select>
 *   <SelectTrigger className="w-48">
 *     <SelectValue placeholder="Select a fruit" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *     <SelectItem value="orange">Orange</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Select>
			<SelectTrigger className='w-48'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='apple'>Apple</SelectItem>
				<SelectItem value='banana'>Banana</SelectItem>
				<SelectItem value='blueberry'>Blueberry</SelectItem>
				<SelectItem value='grapes'>Grapes</SelectItem>
				<SelectItem value='orange'>Orange</SelectItem>
			</SelectContent>
		</Select>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@naiton/ui-kit'

					<Select>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
							<SelectItem value="blueberry">Blueberry</SelectItem>
							<SelectItem value="grapes">Grapes</SelectItem>
							<SelectItem value="orange">Orange</SelectItem>
						</SelectContent>
					</Select>
				`
			}
		}
	}
}

export const Groups: Story = {
	name: 'Group',
	render: () => (
		<Select>
			<SelectTrigger className='w-48'>
				<SelectValue placeholder='Select a timezone' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>North America</SelectLabel>
					<SelectItem value='est'>Eastern Time (ET)</SelectItem>
					<SelectItem value='cst'>Central Time (CT)</SelectItem>
					<SelectItem value='mst'>Mountain Time (MT)</SelectItem>
					<SelectItem value='pst'>Pacific Time (PT)</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Europe</SelectLabel>
					<SelectItem value='gmt'>Greenwich Mean Time (GMT)</SelectItem>
					<SelectItem value='cet'>Central European Time (CET)</SelectItem>
					<SelectItem value='eet'>Eastern European Time (EET)</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Asia</SelectLabel>
					<SelectItem value='ist'>India Standard Time (IST)</SelectItem>
					<SelectItem value='cst-asia'>China Standard Time (CST)</SelectItem>
					<SelectItem value='jst'>Japan Standard Time (JST)</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `SelectGroup`, `SelectLabel`, and `SelectSeparator` to organize items into labeled sections.'
			},
			source: {
				code: `
					import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@naiton/ui-kit'

					<Select>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select a timezone" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>North America</SelectLabel>
								<SelectItem value="est">Eastern Time (ET)</SelectItem>
								<SelectItem value="cst">Central Time (CT)</SelectItem>
							</SelectGroup>
							<SelectSeparator />
							<SelectGroup>
								<SelectLabel>Europe</SelectLabel>
								<SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
								<SelectItem value="cet">Central European Time (CET)</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				`
			}
		}
	}
}

export const Scrollable: Story = {
	render: () => (
		<Select>
			<SelectTrigger className='w-48'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Countries</SelectLabel>
					{[
						'Argentina',
						'Australia',
						'Brazil',
						'Canada',
						'China',
						'Egypt',
						'France',
						'Germany',
						'India',
						'Indonesia',
						'Italy',
						'Japan',
						'Mexico',
						'Netherlands',
						'Nigeria',
						'Norway',
						'Pakistan',
						'Poland',
						'Russia',
						'Saudi Arabia',
						'South Korea',
						'Spain',
						'Sweden',
						'Turkey',
						'United Kingdom',
						'United States'
					].map((country) => (
						<SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')}>
							{country}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
	parameters: {
		docs: {
			description: {
				story: 'When the list of options exceeds the available height, the dropdown panel scrolls automatically.'
			},
			source: {
				code: `
					import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@naiton/ui-kit'

					<Select>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select a country" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Countries</SelectLabel>
								<SelectItem value="us">United States</SelectItem>
								<SelectItem value="uk">United Kingdom</SelectItem>
								{/* ...more items */}
							</SelectGroup>
						</SelectContent>
					</Select>
				`
			}
		}
	}
}

export const Disabled: Story = {
	render: () => (
		<Field data-disabled>
			<FieldLabel>Theme</FieldLabel>
			<Select disabled>
				<SelectTrigger className='w-48'>
					<SelectValue placeholder='Select a theme' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='light'>Light</SelectItem>
					<SelectItem value='dark'>Dark</SelectItem>
					<SelectItem value='system'>System</SelectItem>
				</SelectContent>
			</Select>
			<FieldDescription>Theme selection is currently unavailable.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Add `disabled` to `Select` and `data-disabled` to the wrapping `Field` to style the label and description in the disabled state.'
			},
			source: {
				code: `
					import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Field, FieldDescription, FieldLabel } from '@naiton/ui-kit'

					<Field data-disabled>
						<FieldLabel>Theme</FieldLabel>
						<Select disabled>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Select a theme" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
							</SelectContent>
						</Select>
						<FieldDescription>Theme selection is currently unavailable.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const Invalid: Story = {
	render: () => (
		<Field data-invalid>
			<FieldLabel>Role</FieldLabel>
			<Select>
				<SelectTrigger className='w-48' aria-invalid>
					<SelectValue placeholder='Select a role' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='admin'>Admin</SelectItem>
					<SelectItem value='member'>Member</SelectItem>
					<SelectItem value='viewer'>Viewer</SelectItem>
				</SelectContent>
			</Select>
			<FieldDescription className='text-red-500'>Please select a role to continue.</FieldDescription>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Add `data-invalid` to `Field` and `aria-invalid` to `SelectTrigger` to apply error styling and signal the invalid state to assistive technologies.'
			},
			source: {
				code: `
					import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Field, FieldDescription, FieldLabel } from '@naiton/ui-kit'

					<Field data-invalid>
						<FieldLabel>Role</FieldLabel>
						<Select>
							<SelectTrigger className="w-48" aria-invalid>
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="member">Member</SelectItem>
								<SelectItem value="viewer">Viewer</SelectItem>
							</SelectContent>
						</Select>
						<FieldDescription className="text-red-500">
							Please select a role to continue.
						</FieldDescription>
					</Field>
				`
			}
		}
	}
}
