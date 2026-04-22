import { EyeOffRegular, EyeRegular, GlobeRegular, MailRegular, SearchRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldDescription, FieldLabel } from '../field'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea
} from './input-group.tsx'

const meta = {
	title: 'UI/InputGroup',
	component: InputGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Add addons, buttons, and helper content to inputs.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { SearchRegular } from '@fluentui/react-icons'
 * import { InputGroup, InputGroupAddon, InputGroupInput } from '@naiton/ui-kit'
 *
 * <InputGroup>
 *   <InputGroupAddon align="inline-start">
 *     <SearchRegular fontSize={16} />
 *   </InputGroupAddon>
 *   <InputGroupInput placeholder="Search..." />
 * </InputGroup>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<InputGroup>
			<InputGroupAddon align='inline-start'>
				<SearchRegular fontSize={16} />
			</InputGroupAddon>
			<InputGroupInput placeholder='Search...' />
		</InputGroup>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { SearchRegular } from '@fluentui/react-icons'
					import { InputGroup, InputGroupAddon, InputGroupInput } from '@naiton/ui-kit'

					<InputGroup>
						<InputGroupAddon align="inline-start">
							<SearchRegular fontSize={16} />
						</InputGroupAddon>
						<InputGroupInput placeholder="Search..." />
					</InputGroup>
				`
			}
		}
	}
}

export const TextInputGroup: Story = {
	name: 'Text',
	render: () => (
		<div className='flex w-72 flex-col gap-3'>
			<InputGroup>
				<InputGroupAddon align='inline-start'>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput placeholder='example.com' />
			</InputGroup>
			<InputGroup>
				<InputGroupAddon align='inline-start'>
					<InputGroupText>$</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput placeholder='0.00' type='number' />
				<InputGroupAddon align='inline-end'>
					<InputGroupText>USD</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder='username' />
				<InputGroupAddon align='inline-end'>
					<InputGroupText>@example.com</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `InputGroupText` inside `InputGroupAddon` to display inline text prefixes or suffixes such as currency symbols, URLs, or email domains.'
			},
			source: {
				code: `
					import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@naiton/ui-kit'

					<InputGroup>
						<InputGroupAddon align="inline-start">
							<InputGroupText>https://</InputGroupText>
						</InputGroupAddon>
						<InputGroupInput placeholder="example.com" />
					</InputGroup>

					<InputGroup>
						<InputGroupAddon align="inline-start">
							<InputGroupText>$</InputGroupText>
						</InputGroupAddon>
						<InputGroupInput placeholder="0.00" type="number" />
						<InputGroupAddon align="inline-end">
							<InputGroupText>USD</InputGroupText>
						</InputGroupAddon>
					</InputGroup>

					<InputGroup>
						<InputGroupInput placeholder="username" />
						<InputGroupAddon align="inline-end">
							<InputGroupText>@example.com</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				`
			}
		}
	}
}

export const ButtonInputGroup: Story = {
	name: 'Button',
	render: () => (
		<div className='flex w-72 flex-col gap-3'>
			<InputGroup>
				<InputGroupInput placeholder='Search...' />
				<InputGroupAddon align='inline-end'>
					<InputGroupButton size='icon-xs'>
						<SearchRegular fontSize={16} />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupAddon align='inline-start'>
					<InputGroupText>
						<MailRegular fontSize={16} />
					</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput type='email' placeholder='Email address' />
				<InputGroupAddon align='inline-end'>
					<InputGroupButton size='icon-xs'>
						<EyeRegular fontSize={16} />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput type='password' placeholder='Password' />
				<InputGroupAddon align='inline-end'>
					<InputGroupButton size='icon-xs'>
						<EyeOffRegular fontSize={16} />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `InputGroupButton` inside `InputGroupAddon` to render action buttons — such as submit, copy, or reveal-password — inline with the input.'
			},
			source: {
				code: `
					import { SearchRegular, EyeRegular, EyeOffRegular, MailRegular } from '@fluentui/react-icons'
					import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@naiton/ui-kit'

					<InputGroup>
						<InputGroupInput placeholder="Search..." />
						<InputGroupAddon align="inline-end">
							<InputGroupButton size="xs">
								<SearchRegular />
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
					<InputGroup>
						<InputGroupAddon align='inline-start'>
							<InputGroupText>
							<MailRegular fontSize={16} />
						</InputGroupText>
						</InputGroupAddon>
						<InputGroupInput type='email' placeholder='Email address' />
						<InputGroupAddon align='inline-end'>
							<InputGroupButton size='icon-xs'>
							<EyeRegular fontSize={16} />
						</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
					<InputGroup>
						<InputGroupInput type="password" placeholder="Password" />
						<InputGroupAddon align="inline-end">
							<InputGroupButton size="icon-xs">
								<EyeOffRegular fontSize={14} />
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				`
			}
		}
	}
}

export const Alignment: Story = {
	name: 'Align',
	render: () => (
		<div className='flex w-72 flex-col gap-3'>
			<InputGroup>
				<InputGroupAddon align='block-start'>
					<GlobeRegular fontSize={16} />
					<span>Website URL</span>
				</InputGroupAddon>
				<InputGroupInput placeholder='https://example.com' />
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder='Enter a message...' />
				<InputGroupAddon align='block-end'>
					<InputGroupButton size='xs'>Send</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `align="block-start"` or `align="block-end"` on `InputGroupAddon` to stack the addon above or below the input instead of inline.'
			},
			source: {
				code: `
					import { GlobeRegular } from '@fluentui/react-icons'
					import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@naiton/ui-kit'

					<InputGroup>
						<InputGroupAddon align="block-start">
							<GlobeRegular fontSize={16} />
							<span>Website URL</span>
						</InputGroupAddon>
						<InputGroupInput placeholder="https://example.com" />
					</InputGroup>

					<InputGroup>
						<InputGroupInput placeholder="Enter a message..." />
						<InputGroupAddon align="block-end">
							<InputGroupButton size="xs">Send</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				`
			}
		}
	}
}

export const Textarea: Story = {
	render: () => (
		<div className='w-72'>
			<InputGroup>
				<InputGroupTextarea placeholder='Write your message...' rows={4} />
				<InputGroupAddon align='block-end'>
					<InputGroupButton size='xs'>Submit</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `InputGroupTextarea` in place of `InputGroupInput` to compose a textarea with addons.'
			},
			source: {
				code: `
					import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '@naiton/ui-kit'

					<InputGroup>
						<InputGroupTextarea placeholder="Write your message..." rows={4} />
						<InputGroupAddon align="block-end">
							<InputGroupButton size="xs">Submit</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				`
			}
		}
	}
}

export const DisabledInputGroup: Story = {
	name: 'Disabled',
	render: () => (
		<div className='w-72'>
			<Field data-disabled>
				<FieldLabel>Search</FieldLabel>
				<InputGroup data-disabled='true'>
					<InputGroupAddon align='inline-start'>
						<SearchRegular fontSize={16} />
					</InputGroupAddon>
					<InputGroupInput placeholder='Search...' disabled />
				</InputGroup>
				<FieldDescription>This field is currently disabled.</FieldDescription>
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Add `data-disabled="true"` to `InputGroup` and `disabled` to `InputGroupInput` to show the disabled state. Use `data-disabled` on the `Field` wrapper for label styles.'
			},
			source: {
				code: `
					import { SearchRegular } from '@fluentui/react-icons'
					import { Field, FieldDescription, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput } from '@naiton/ui-kit'

					<Field data-disabled>
						<FieldLabel>Search</FieldLabel>
						<InputGroup data-disabled="true">
							<InputGroupAddon align="inline-start">
								<SearchRegular fontSize={16} />
							</InputGroupAddon>
							<InputGroupInput placeholder="Search..." disabled />
						</InputGroup>
						<FieldDescription>This field is currently disabled.</FieldDescription>
					</Field>
				`
			}
		}
	}
}

export const InvalidInputGroup: Story = {
	name: 'Invalid',
	render: () => (
		<div className='w-72'>
			<Field data-invalid>
				<FieldLabel>Email</FieldLabel>
				<InputGroup>
					<InputGroupAddon align='inline-start'>
						<MailRegular fontSize={16} />
					</InputGroupAddon>
					<InputGroupInput type='email' placeholder='Email address' defaultValue='not-an-email' aria-invalid />
				</InputGroup>
				<FieldDescription className='text-red-500'>Please enter a valid email address.</FieldDescription>
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Set `aria-invalid` on `InputGroupInput` to trigger the error border on the group, and add `data-invalid` to the `Field` wrapper for label and description styles.'
			},
			source: {
				code: `
					import { MailRegular } from '@fluentui/react-icons'
					import { Field, FieldDescription, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput } from '@naiton/ui-kit'

					<Field data-invalid>
						<FieldLabel>Email</FieldLabel>
						<InputGroup>
							<InputGroupAddon align="inline-start">
								<MailRegular fontSize={16} />
							</InputGroupAddon>
							<InputGroupInput
								type="email"
								placeholder="Email address"
								aria-invalid
							/>
						</InputGroup>
						<FieldDescription className="text-red-500">
							Please enter a valid email address.
						</FieldDescription>
					</Field>
				`
			}
		}
	}
}
