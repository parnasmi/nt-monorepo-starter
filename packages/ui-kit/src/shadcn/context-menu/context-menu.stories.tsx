import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger
} from './context-menu.tsx'

const meta = {
	title: 'UI/ContextMenu',
	component: ContextMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Displays a menu of actions triggered by a right click.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		modal: {
			description:
				'When true, interaction with outside elements is disabled and only menu content is visible to screen readers.',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' }
			}
		},
		onOpenChange: {
			description: 'Callback fired when the open state changes.',
			action: 'openChanged',
			table: { type: { summary: '(open: boolean) => void' } }
		}
	}
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const TriggerArea = ({ label = 'Right click here' }: { label?: string }) => (
	<div className='flex h-32 w-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500 select-none'>
		{label}
	</div>
)

/**
 * ```tsx
 * import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@naiton/ui-kit'
 *
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Profile</ContextMenuItem>
 *     <ContextMenuItem>Settings</ContextMenuItem>
 *     <ContextMenuItem>Logout</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger>
				<TriggerArea />
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Profile</ContextMenuItem>
				<ContextMenuItem>Settings</ContextMenuItem>
				<ContextMenuItem>Logout</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@naiton/ui-kit'
					
					<ContextMenu>
						<ContextMenuTrigger>Right click here</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>Profile</ContextMenuItem>
							<ContextMenuItem>Settings</ContextMenuItem>
							<ContextMenuItem>Logout</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const WithSubMenu: Story = {
	name: 'Submenu',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger>
				<TriggerArea label='Right click for submenu' />
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Back</ContextMenuItem>
				<ContextMenuItem>Forward</ContextMenuItem>
				<ContextMenuItem>Reload</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<ContextMenuItem>Save Page As…</ContextMenuItem>
						<ContextMenuItem>Create Shortcut…</ContextMenuItem>
						<ContextMenuItem>Name Window…</ContextMenuItem>
						<ContextMenuSeparator />
						<ContextMenuItem>Developer Tools</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `ContextMenuSub` and `ContextMenuSubTrigger` to nest secondary actions inside a submenu.'
			},
			source: {
				code: `
					import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@naiton/ui-kit'
					
					<ContextMenu>
						<ContextMenuTrigger>Right click here</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>Back</ContextMenuItem>
							<ContextMenuItem>Reload</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuSub>
								<ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
								<ContextMenuSubContent>
									<ContextMenuItem>Save Page As…</ContextMenuItem>
									<ContextMenuItem>Developer Tools</ContextMenuItem>
								</ContextMenuSubContent>
							</ContextMenuSub>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const WithShortcuts: Story = {
	name: 'Shortcuts',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger>
				<TriggerArea label='Right click for shortcuts' />
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					Undo <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					Redo <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Add `ContextMenuShortcut` inside a `ContextMenuItem` to display keyboard shortcut hints.'
			},
			source: {
				code: `
					import {
						ContextMenu,
						ContextMenuContent,
						ContextMenuItem,
						ContextMenuSeparator,
						ContextMenuShortcut,
						ContextMenuTrigger,
					} from '@naiton/ui-kit'
					
					<ContextMenu>
						<ContextMenuTrigger>Right click here</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>
								Undo <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const WithGroups: Story = {
	name: 'Groups',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger>
				<TriggerArea label='Right click for groups' />
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>My Account</ContextMenuLabel>
				<ContextMenuGroup>
					<ContextMenuItem>Profile</ContextMenuItem>
					<ContextMenuItem>Billing</ContextMenuItem>
					<ContextMenuItem>Settings</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuLabel>Team</ContextMenuLabel>
				<ContextMenuGroup>
					<ContextMenuItem>Invite Members</ContextMenuItem>
					<ContextMenuItem>Manage Roles</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuItem>Logout</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `ContextMenuGroup` and `ContextMenuLabel` to group related actions and separate them with `ContextMenuSeparator`.'
			},
			source: {
				code: `
					import {
						ContextMenu,
						ContextMenuContent,
						ContextMenuGroup,
						ContextMenuItem,
						ContextMenuLabel,
						ContextMenuSeparator,
						ContextMenuTrigger,
					} from '@naiton/ui-kit'
					
					<ContextMenu>
						<ContextMenuTrigger>
							<TriggerArea label='Right click for groups' />
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuLabel>My Account</ContextMenuLabel>
							<ContextMenuGroup>
								<ContextMenuItem>Profile</ContextMenuItem>
								<ContextMenuItem>Billing</ContextMenuItem>
								<ContextMenuItem>Settings</ContextMenuItem>
							</ContextMenuGroup>
							<ContextMenuSeparator />
							<ContextMenuLabel>Team</ContextMenuLabel>
							<ContextMenuGroup>
								<ContextMenuItem>Invite Members</ContextMenuItem>
								<ContextMenuItem>Manage Roles</ContextMenuItem>
							</ContextMenuGroup>
							<ContextMenuSeparator />
							<ContextMenuItem>Logout</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const WithCheckboxItems: Story = {
	name: 'Checkboxes',
	render: () => {
		const [showStatusBar, setShowStatusBar] = useState(true)
		const [showActivityBar, setShowActivityBar] = useState(false)
		const [showPanel, setShowPanel] = useState(false)

		return (
			<ContextMenu>
				<ContextMenuTrigger>
					<TriggerArea label='Right click for checkboxes' />
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuLabel>View</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
						Status Bar
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
						Activity Bar
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
						Panel
					</ContextMenuCheckboxItem>
				</ContextMenuContent>
			</ContextMenu>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `ContextMenuCheckboxItem` to provide toggleable options within the context menu.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import {
						ContextMenu,
						ContextMenuCheckboxItem,
						ContextMenuContent,
						ContextMenuLabel,
						ContextMenuSeparator,
						ContextMenuTrigger,
					} from '@naiton/ui-kit'
					
					const [showStatusBar, setShowStatusBar] = useState(true)
					const [showActivityBar, setShowActivityBar] = useState(false)
					const [showPanel, setShowPanel] = useState(false)
					
					<ContextMenu>
						<ContextMenuTrigger>
							<TriggerArea label='Right click for checkboxes' />
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuLabel>View</ContextMenuLabel>
							<ContextMenuSeparator />
							<ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
								Status Bar
							</ContextMenuCheckboxItem>
							<ContextMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
								Activity Bar
							</ContextMenuCheckboxItem>
							<ContextMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
								Panel
							</ContextMenuCheckboxItem>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const WithRadioItems: Story = {
	name: 'Radio',
	render: () => {
		const [position, setPosition] = useState('bottom')

		return (
			<ContextMenu>
				<ContextMenuTrigger>
					<TriggerArea label='Right click for radio items' />
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuLabel>Panel Position</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuRadioGroup value={position} onValueChange={setPosition}>
						<ContextMenuRadioItem value='top'>Top</ContextMenuRadioItem>
						<ContextMenuRadioItem value='bottom'>Bottom</ContextMenuRadioItem>
						<ContextMenuRadioItem value='right'>Right</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuContent>
			</ContextMenu>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'Use `ContextMenuRadioGroup` and `ContextMenuRadioItem` to present mutually exclusive options.'
			},
			source: {
				code: `
					import { useState } from 'react'
					import {
						ContextMenu,
						ContextMenuContent,
						ContextMenuLabel,
						ContextMenuRadioGroup,
						ContextMenuRadioItem,
						ContextMenuSeparator,
						ContextMenuTrigger,
					} from '@naiton/ui-kit'
					
					const [position, setPosition] = useState('bottom')
					
					<ContextMenu>
						<ContextMenuTrigger>Right click here</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuLabel>Panel Position</ContextMenuLabel>
							<ContextMenuSeparator />
							<ContextMenuRadioGroup value={position} onValueChange={setPosition}>
								<ContextMenuRadioItem value='top'>Top</ContextMenuRadioItem>
								<ContextMenuRadioItem value='bottom'>Bottom</ContextMenuRadioItem>
								<ContextMenuRadioItem value='right'>Right</ContextMenuRadioItem>
							</ContextMenuRadioGroup>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}

export const DisabledItems: Story = {
	name: 'Disabled items',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger>
				<TriggerArea label='Right click for disabled items' />
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Edit</ContextMenuItem>
				<ContextMenuItem disabled>
					Delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>Copy</ContextMenuItem>
				<ContextMenuItem disabled>Paste</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `disabled` prop on `ContextMenuItem` to prevent interaction with specific actions.'
			},
			source: {
				code: `
					import {
						ContextMenu,
						ContextMenuContent,
						ContextMenuItem,
						ContextMenuSeparator,
						ContextMenuTrigger,
					} from '@naiton/ui-kit'
					
					<ContextMenu>
						<ContextMenuTrigger>Right click here</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>Edit</ContextMenuItem>
							<ContextMenuItem disabled>Delete</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				`
			}
		}
	}
}
