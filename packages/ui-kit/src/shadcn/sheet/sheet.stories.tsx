import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { SHEET_SIZES } from './constants.ts'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from './sheet.tsx'

const allSides = ['top', 'right', 'bottom', 'left'] as const
const allSizes = [...SHEET_SIZES]

const meta = {
	title: 'UI/Sheet',
	component: SheetContent,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'Extends the Dialog component to display content that complements the main content of the screen.'
			}
		}
	},
	tags: ['autodocs'],
	args: {
		side: 'right',
		size: 'sm'
	},
	argTypes: {
		side: {
			description: 'The edge of the screen the sheet slides in from.',
			control: 'select',
			options: allSides,
			table: {
				type: { summary: allSides.join(' | ') },
				defaultValue: { summary: 'right' }
			}
		},
		size: {
			description: 'Controls the width of the sheet panel.',
			control: 'select',
			options: allSizes,
			table: {
				type: { summary: allSizes.join(' | ') },
				defaultValue: { summary: 'sm' }
			}
		},
		sizes: {
			description:
				'Array of sizes to cycle through via expand/shrink edge controls. When provided, overrides `size` and renders navigation buttons.',
			control: false,
			table: {
				type: { summary: 'SheetSize[]' }
			}
		}
	}
} satisfies Meta<typeof SheetContent>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import {
 *   Button,
 *   Sheet,
 *   SheetContent,
 *   SheetDescription,
 *   SheetFooter,
 *   SheetHeader,
 *   SheetTitle,
 *   SheetTrigger,
 * } from '@naiton/ui-kit'
 *
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button variant="outline">Open Sheet</Button>
 *   </SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet description goes here.</SheetDescription>
 *     </SheetHeader>
 *     <div className='flex-1'>Sheet Content</div>
 *     <SheetFooter>
 *       <Button variant="primary">Save</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: (args) => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open</Button>
			</SheetTrigger>
			<SheetContent {...args}>
				<SheetHeader>
					<SheetTitle>Sheet Title</SheetTitle>
					<SheetDescription>Sheet description goes here.</SheetDescription>
				</SheetHeader>
				<div className='flex-1'>Sheet Content</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant='outline'>Close</Button>
					</SheetClose>
					<Button variant='primary'>Save</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import {
						Button,
						Sheet,
						SheetClose,
						SheetContent,
						SheetDescription,
						SheetFooter,
						SheetHeader,
						SheetTitle,
						SheetTrigger
					} from '@naiton/ui-kit'

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Open Sheet</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Sheet Title</SheetTitle>
								<SheetDescription>Sheet description goes here.</SheetDescription>
							</SheetHeader>
							<div className="flex-1">Sheet Content</div>
							<SheetFooter>
							<SheetClose asChild>
								<Button variant='outline'>Close</Button>
							</SheetClose>
								<Button variant="primary">Save</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				`
			}
		}
	}
}

export const Sides: Story = {
	name: 'Side',
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{allSides.map((side) => (
				<Sheet key={side}>
					<SheetTrigger asChild>
						<Button variant='outline'>{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
					</SheetTrigger>
					<SheetContent side={side}>
						<SheetHeader>
							<SheetTitle>Sheet — {side}</SheetTitle>
							<SheetDescription>This sheet slides in from the {side}.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `side` prop on `SheetContent` to control where the sheet slides in from: `top`, `right`, `bottom`, or `left`.'
			},
			source: {
				code: `
					import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@naiton/ui-kit'

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Right</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle>Sheet Title</SheetTitle>
							</SheetHeader>
						</SheetContent>
					</Sheet>
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
				<Sheet key={size}>
					<SheetTrigger asChild>
						<Button variant='outline'>{size.toUpperCase()}</Button>
					</SheetTrigger>
					<SheetContent size={size}>
						<SheetHeader>
							<SheetTitle>Sheet — {size}</SheetTitle>
							<SheetDescription>This sheet is displayed at the "{size}" size.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `size` prop on `SheetContent` to control the width of the sheet: `sm` (20%), `md` (30%), `lg` (40%), `xl` (60%), or `full` (94%).'
			},
			source: {
				code: `
					import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@naiton/ui-kit'

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Open</Button>
						</SheetTrigger>
						<SheetContent size="md">
							<SheetHeader>
								<SheetTitle>Sheet Title</SheetTitle>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				`
			}
		}
	}
}

export const Resizable: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open Resizable Sheet</Button>
			</SheetTrigger>
			<SheetContent sizes={['sm', 'md', 'lg', 'xl']} size='sm'>
				<SheetHeader>
					<SheetTitle>Resizable Sheet</SheetTitle>
					<SheetDescription>Use the expand/shrink buttons on the left edge to cycle through sizes.</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Pass a `sizes` array to `SheetContent` to enable expand/shrink controls on the sheet edge, allowing the user to cycle through the provided sizes.'
			},
			source: {
				code: `
					import {
						Button,
						Sheet,
						SheetContent,
						SheetDescription,
						SheetHeader,
						SheetTitle,
						SheetTrigger
					} from '@naiton/ui-kit'

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Open Resizable Sheet</Button>
						</SheetTrigger>
						<SheetContent sizes={['sm', 'md', 'lg', 'xl']} size="sm">
							<SheetHeader>
								<SheetTitle>Resizable Sheet</SheetTitle>
								<SheetDescription>
									Use the expand/shrink buttons on the left edge to cycle through sizes.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				`
			}
		}
	}
}
