import { LockClosedRegular, MailRegular, PersonRegular } from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.tsx'

const meta = {
	title: 'UI/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
			}
		}
	},
	tags: ['autodocs'],
	args: {
		defaultValue: 'account'
	},
	argTypes: {
		defaultValue: {
			description: 'The value of the tab that should be active by default (uncontrolled).',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		value: {
			description: 'The controlled value of the active tab.',
			control: 'text',
			table: {
				type: { summary: 'string' }
			}
		},
		onValueChange: {
			description: 'Callback fired when the active tab changes.',
			action: 'changed',
			table: {
				type: { summary: '(value: string) => void' }
			}
		}
	}
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Tabs, TabsContent, TabsList, TabsTrigger } from '@naiton/ui-kit'
 *
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account settings.</TabsContent>
 *   <TabsContent value="password">Change your password.</TabsContent>
 * </Tabs>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: (args) => (
		<Tabs {...args} className='w-100'>
			<TabsList>
				<TabsTrigger value='account'>Account</TabsTrigger>
				<TabsTrigger value='password'>Password</TabsTrigger>
			</TabsList>
			<TabsContent value='account'>Make changes to your account here.</TabsContent>
			<TabsContent value='password'>Change your password here.</TabsContent>
		</Tabs>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Tabs, TabsContent, TabsList, TabsTrigger } from '@naiton/ui-kit'

					<Tabs defaultValue="account" className="w-100">
						<TabsList>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="password">Password</TabsTrigger>
						</TabsList>
						<TabsContent value="account">Make changes to your account here.</TabsContent>
						<TabsContent value="password">Change your password here.</TabsContent>
					</Tabs>
				`
			}
		}
	}
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState('account')

		return (
			<div className='flex flex-col gap-4'>
				<p className='text-muted-foreground text-sm'>
					Active tab: <strong>{value}</strong>
				</p>
				<Tabs value={value} onValueChange={setValue} className='w-100'>
					<TabsList>
						<TabsTrigger value='account'>Account</TabsTrigger>
						<TabsTrigger value='password'>Password</TabsTrigger>
						<TabsTrigger value='settings'>Settings</TabsTrigger>
					</TabsList>
					<TabsContent value='account'>Account settings.</TabsContent>
					<TabsContent value='password'>Change your password.</TabsContent>
					<TabsContent value='settings'>Manage your preferences.</TabsContent>
				</Tabs>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `value` and `onValueChange` to control the active tab from external state.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import { Tabs, TabsContent, TabsList, TabsTrigger } from '@naiton/ui-kit'

					function ControlledTabsDemo() {
						const [value, setValue] = useState('account')

						return (
							<div className="flex flex-col gap-4">
								<p className='text-gray-500 text-sm'>
									Active tab: <strong>{value}</strong>
								</p>
								<Tabs value={value} onValueChange={setValue}>
									<TabsList>
										<TabsTrigger value="account">Account</TabsTrigger>
										<TabsTrigger value="password">Password</TabsTrigger>
										<TabsTrigger value="settings">Settings</TabsTrigger>
									</TabsList>
									<TabsContent value="account">Account settings.</TabsContent>
									<TabsContent value="password">Change your password.</TabsContent>
									<TabsContent value="settings">Manage your preferences.</TabsContent>
								</Tabs>
							</div>
						)
					}
				`
			}
		}
	}
}

export const Disabled: Story = {
	render: (args) => (
		<Tabs {...args} className='w-100'>
			<TabsList>
				<TabsTrigger value='account'>Account</TabsTrigger>
				<TabsTrigger value='password' disabled>
					Password
				</TabsTrigger>
				<TabsTrigger value='settings' disabled>
					Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value='account'>Make changes to your account here.</TabsContent>
			<TabsContent value='password'>Change your password here.</TabsContent>
			<TabsContent value='settings'>Manage your preferences.</TabsContent>
		</Tabs>
	),
	parameters: {
		docs: {
			description: {
				story: 'Add the `disabled` prop to a `TabsTrigger` to prevent it from being selected.'
			},
			source: {
				code: `
					import { Tabs, TabsContent, TabsList, TabsTrigger } from '@naiton/ui-kit'

					<Tabs defaultValue="account">
						<TabsList>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="password" disabled>Password</TabsTrigger>
						</TabsList>
						<TabsContent value="account">Make changes to your account here.</TabsContent>
						<TabsContent value="password">Change your password here.</TabsContent>
					</Tabs>
				`
			}
		}
	}
}

export const Icons: Story = {
	render: (args) => (
		<Tabs {...args} defaultValue='profile' className='w-100'>
			<TabsList>
				<TabsTrigger value='profile' className='gap-2'>
					<PersonRegular fontSize={14} />
					<span>Profile</span>
				</TabsTrigger>
				<TabsTrigger value='messages' className='gap-2'>
					<MailRegular fontSize={14} />
					<span>Messages</span>
				</TabsTrigger>
				<TabsTrigger value='security' className='gap-2'>
					<LockClosedRegular fontSize={14} />
					<span>Security</span>
				</TabsTrigger>
			</TabsList>
			<TabsContent value='profile'>Manage your profile information.</TabsContent>
			<TabsContent value='messages'>View your messages.</TabsContent>
			<TabsContent value='security'>Update your security settings.</TabsContent>
		</Tabs>
	),
	parameters: {
		docs: {
			description: {
				story: 'Place an icon before the label inside `TabsTrigger` to add visual context.'
			},
			source: {
				code: `
					import { MailRegular, LockClosedRegular, PersonRegular } from '@fluentui/react-icons'
					import { Tabs, TabsContent, TabsList, TabsTrigger } from '@naiton/ui-kit'

					<Tabs defaultValue="profile">
						<TabsList>
							<TabsTrigger value="profile" className="gap-2">
								<PersonRegular fontSize={14} />
								<span>Profile</span>
							</TabsTrigger>
							<TabsTrigger value="messages" className="gap-2">
								<MailRegular fontSize={14} />
								<span>Messages</span>
							</TabsTrigger>
							<TabsTrigger value="security" className="gap-2">
								<LockClosedRegular fontSize={14} />
								<span>Security</span>
							</TabsTrigger>
						</TabsList>
						<TabsContent value="profile">Manage your profile information.</TabsContent>
						<TabsContent value="messages">View your messages.</TabsContent>
						<TabsContent value="security">Update your security settings.</TabsContent>
					</Tabs>
				`
			}
		}
	}
}
