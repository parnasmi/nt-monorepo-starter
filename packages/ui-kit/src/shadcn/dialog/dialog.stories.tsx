import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Field, FieldDescription, FieldLabel } from '../field'
import { Input } from '../input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './dialog.tsx'

const allSizes = ['sm', 'md', 'lg', 'xl', 'full'] as const

const meta = {
	title: 'UI/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		open: {
			description: 'Controlled open state of the dialog',
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
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from '@naiton/ui-kit'
 *
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button variant="outline">Open dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Are you absolutely sure?</DialogTitle>
 *       <DialogDescription>
 *         This action cannot be undone.
 *       </DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Continue</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from '@naiton/ui-kit'

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Open dialog</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button>Continue</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				`
			}
		}
	}
}

export const Sizes: Story = {
	name: 'Size',
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{allSizes.map((size) => (
				<Dialog key={size}>
					<DialogTrigger asChild>
						<Button variant='outline'>{size}</Button>
					</DialogTrigger>
					<DialogContent size={size}>
						<DialogHeader>
							<DialogTitle>Dialog — {size}</DialogTitle>
							<DialogDescription>
								This dialog uses the <code>{size}</code> size variant.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant='outline'>Close</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `size` prop on `DialogContent` to control the max-width of the dialog panel.'
			},
			source: {
				code: `
					import { Button, Dialog, DialogContent, DialogTrigger } from '@naiton/ui-kit'

					<Dialog>
						<DialogTrigger asChild>
							<Button variant='outline'>Open SM</Button>
						</DialogTrigger>
						<DialogContent size='sm'>...</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant='outline'>Open LG</Button>
						</DialogTrigger>
						<DialogContent size='lg'>...</DialogContent>
					</Dialog>
				`
			}
		}
	}
}

export const ScrollableContent: Story = {
	name: 'Scrollable content',
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open with long content</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Terms of Service</DialogTitle>
					<DialogDescription>Please read our terms carefully before continuing.</DialogDescription>
				</DialogHeader>
				<div className='max-h-64 overflow-y-auto text-sm text-pretty'>
					{Array.from({ length: 8 }, (_, i) => (
						<p key={i} className='mb-3'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					))}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Decline</Button>
					</DialogClose>
					<Button>Accept</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Wrap long content in a scrollable container so the header and footer remain anchored while the body scrolls.'
			},
			source: {
				code: `
					import {
						Button, Dialog, DialogClose, DialogContent, DialogDescription,
						DialogFooter, DialogHeader, DialogTitle, DialogTrigger
					} from '@naiton/ui-kit'

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Open with long content</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Terms of Service</DialogTitle>
								<DialogDescription>Please read our terms carefully before continuing.</DialogDescription>
							</DialogHeader>
							<div className="max-h-64 overflow-y-auto text-sm">
								{/* long content here */}
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Decline</Button>
								</DialogClose>
								<Button>Accept</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				`
			}
		}
	}
}

export const CustomClose: Story = {
	name: 'Custom Close Button',
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Custom close</DialogTitle>
					<DialogDescription>
						This dialog uses a custom close button in the footer instead of the default top-right X icon.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Got it, close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `DialogClose` with `asChild` to replace the default close control with any custom element.'
			},
			source: {
				code: `
					import {
						Button, Dialog, DialogClose, DialogContent, DialogDescription,
						DialogFooter, DialogHeader, DialogTitle, DialogTrigger
					} from '@naiton/ui-kit'

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Open dialog</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Custom close</DialogTitle>
								<DialogDescription>
									This dialog uses a custom close button in the footer.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Got it, close</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				`
			}
		}
	}
}

export const FormDialog: Story = {
	name: 'Form',
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit profile</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4 py-2'>
					<Field>
						<FieldLabel htmlFor='dialog-name'>Name</FieldLabel>
						<Input id='dialog-name' defaultValue='Pedro Duarte' />
					</Field>
					<Field>
						<FieldLabel htmlFor='dialog-username'>Username</FieldLabel>
						<Input id='dialog-username' defaultValue='@peduarte' />
						<FieldDescription>This is your public display name.</FieldDescription>
					</Field>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story: 'Embed form fields inside the dialog body for common edit workflows.'
			},
			source: {
				code: `
					import {
						Button, Dialog, DialogClose, DialogContent, DialogDescription,
						DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
						Field, FieldDescription, FieldLabel, Input
					} from '@naiton/ui-kit'

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Edit profile</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you're done.
								</DialogDescription>
							</DialogHeader>
							<div className="flex flex-col gap-4 py-2">
								<Field>
									<FieldLabel htmlFor="dialog-name">Name</FieldLabel>
									<Input id="dialog-name" defaultValue="Pedro Duarte" />
								</Field>
								<Field>
									<FieldLabel htmlFor="dialog-username">Username</FieldLabel>
									<Input id="dialog-username" defaultValue="@peduarte" />
									<FieldDescription>This is your public display name.</FieldDescription>
								</Field>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button>Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				`
			}
		}
	}
}
