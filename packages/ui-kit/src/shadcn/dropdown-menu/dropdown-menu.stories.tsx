import {
	CloudRegular,
	CopyRegular,
	DeleteRegular,
	EditRegular,
	MailRegular,
	PersonRegular
} from '@fluentui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from './dropdown-menu.tsx'

const meta = {
	title: 'UI/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a menu to the user — such as a set of actions or functions — triggered by a button.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		open: {
			description: 'Controlled open state of the menu',
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
		},
		modal: {
			description: 'Whether the menu is modal (traps focus and blocks interaction outside)',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' }
			}
		}
	}
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import {
 *   DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
 *   DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
 *   DropdownMenuTrigger, Button
 * } from '@naiton/ui-kit'
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">Open</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import {
						DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
						DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
						DropdownMenuTrigger, Button
					} from '@naiton/ui-kit'

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>Open</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Billing</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>GitHub</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuItem disabled>API</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				`
			}
		}
	}
}

export const SubMenu: Story = {
	name: 'Submenu',
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<PersonRegular fontSize={16} />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<MailRegular fontSize={16} />
						<span>Invite</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>
							<MailRegular fontSize={16} />
							<span>Email</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CloudRegular fontSize={16} />
							<span>Share link</span>
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<DeleteRegular fontSize={16} />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `DropdownMenuSub` to nest secondary actions.'
			},
			source: {
				code: `
					import {
						Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
						DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
						DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger
					} from '@naiton/ui-kit'

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>Open</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<MailRegular fontSize={16} />
									<span>Invite</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Email</DropdownMenuItem>
									<DropdownMenuItem>Share link</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuContent>
					</DropdownMenu>
				`
			}
		}
	}
}

export const Shortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<EditRegular fontSize={16} />
					<span>Edit</span>
					<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CopyRegular fontSize={16} />
					<span>Copy</span>
					<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<DeleteRegular fontSize={16} />
					<span>Delete</span>
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Add `DropdownMenuShortcut` to show keyboard hints.'
			},
			source: {
				code: `
					import {
						DropdownMenu, DropdownMenuContent, DropdownMenuItem,
						DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
						DropdownMenuTrigger, Button
					} from '@naiton/ui-kit'

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>Open</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<EditRegular fontSize={16} />
								<span>Edit</span>
								<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CopyRegular fontSize={16} />
								<span>Copy</span>
								<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				`
			}
		}
	}
}

export const Checkboxes: Story = {
	render: () => {
		const [showStatus, setShowStatus] = useState(true)
		const [showActivity, setShowActivity] = useState(false)
		const [showPanel, setShowPanel] = useState(false)

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>View options</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Appearance</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
						Status bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
						Activity bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
						Panel
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `DropdownMenuCheckboxItem` for toggles.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import {
						Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
						DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
					} from '@naiton/ui-kit'

					export function DropdownMenuCheckboxes() {
						const [showStatus, setShowStatus] = useState(true)
						const [showActivity, setShowActivity] = useState(false)
						const [showPanel, setShowPanel] = useState(false)

						return (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='outline'>View options</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Appearance</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
										Status bar
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
										Activity bar
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
										Panel
									</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)
					}
				`
			}
		}
	}
}

export const RadioGroup: Story = {
	name: 'Radio group',
	render: () => {
		const [position, setPosition] = useState('bottom')

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>Panel position</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Panel position</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Show radio options with icons.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import {
						Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel,
						DropdownMenuRadioGroup, DropdownMenuRadioItem,
						DropdownMenuSeparator, DropdownMenuTrigger
					} from '@naiton/ui-kit'

					export function DropdownMenuRadioIcons() {
						const [position, setPosition] = useState('bottom')

						return (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant='outline'>Panel position</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Panel position</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
										<DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						)
					}
				`
			}
		}
	}
}
