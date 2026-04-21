import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Button } from '../button'
import { Toaster } from './sonner.tsx'

const allPositions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

const meta = {
	title: 'UI/Sonner',
	component: Toaster,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `An opinionated toast component for React.

Mount \`<Toaster />\` once at the root of your app, then call \`toast()\` from anywhere:

\`\`\`tsx
// src/main.tsx
import { Toaster } from '@naiton/ui-kit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </StrictMode>
)
\`\`\`
`
			}
		}
	},
	tags: ['autodocs'],
	args: {
		position: 'top-center',
		richColors: false,
		closeButton: true,
		duration: 3000
	},
	argTypes: {
		position: {
			description: 'Position of the toast on the screen.',
			control: 'select',
			options: allPositions,
			table: {
				type: { summary: allPositions.join(' | ') },
				defaultValue: { summary: 'top-center' }
			}
		},
		richColors: {
			description: 'Makes success and error toasts use rich, colored backgrounds.',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		closeButton: {
			description: 'Adds a close button to every toast.',
			control: 'boolean',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' }
			}
		},
		duration: {
			description: 'Duration in milliseconds before the toast auto-dismisses.',
			control: 'number',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '4000' }
			}
		}
	},
	decorators: [
		(Story, { args }) => (
			<>
				<Toaster {...args} />
				<Story />
			</>
		)
	]
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ```tsx
 * import { toast } from 'sonner'
 *
 * // Then call toast() anywhere
 * toast.success('Event has been created. Successfully')
 * toast.error('Event has been created. Incorrectly')
 * ```
 */
export const Base: Story = {
	name: 'Usage',
	render: () => (
		<Button variant='outline' onClick={() => toast('Event has been created.')}>
			Show Toast
		</Button>
	),
	parameters: {
		docs: {
			source: {
				code: `
					import { toast } from 'sonner'
					import { Toaster } from '@naiton/ui-kit'

					// Mount once in your app root
					<Toaster />

					// Trigger from anywhere
					<Button onClick={() => toast('Event has been created.')}>
						Show Toast
					</Button>
				`
			}
		}
	}
}

export const Types: Story = {
	args: {
		richColors: true
	},
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<Button variant='outline' onClick={() => toast('Default toast')}>
				Default
			</Button>
			<Button variant='outline' onClick={() => toast.success('Changes saved successfully.')}>
				Success
			</Button>
			<Button variant='outline' onClick={() => toast.info('New update available.')}>
				Info
			</Button>
			<Button variant='outline' onClick={() => toast.warning('Storage is almost full.')}>
				Warning
			</Button>
			<Button variant='outline' onClick={() => toast.error('Something went wrong.')}>
				Error
			</Button>
			<Button
				variant='outline'
				onClick={() =>
					toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
						loading: 'Saving...',
						success: 'Saved!',
						error: 'Failed to save.'
					})
				}
			>
				Promise
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Sonner supports `default`, `success`, `info`, `warning`, `error`, and `promise` toast types. Use `richColors` on `Toaster` for colored backgrounds.'
			},
			source: {
				code: `
					import { toast } from 'sonner'

					toast('Default toast')
					toast.success('Changes saved successfully.')
					toast.info('New update available.')
					toast.warning('Storage is almost full.')
					toast.error('Something went wrong.')
					toast.promise(fetchData(), {
						loading: 'Loading...',
						success: 'Done!',
						error: 'Failed.'
					})
				`
			}
		}
	}
}

export const Description: Story = {
	render: () => (
		<Button
			variant='outline'
			onClick={() =>
				toast('Event has been created.', {
					description: 'Monday, January 3rd at 6:00pm'
				})
			}
		>
			Show Toast with Description
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pass a `description` in the toast options to display secondary text below the title.'
			},
			source: {
				code: `
					import { toast } from 'sonner'

					toast('Event has been created.', {
						description: 'Monday, January 3rd at 6:00pm'
					})
				`
			}
		}
	}
}

export const Position: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{allPositions.map((position) => (
				<Button key={position} variant='outline' onClick={() => toast(`Position: ${position}`, { position })}>
					{position}
				</Button>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `position` prop to change the position of the toast.'
			},
			source: {
				code: `
					import { Toaster } from '@naiton/ui-kit'

					<Toaster position="bottom-right" />
				`
			}
		}
	}
}

export const Action: Story = {
	render: () => (
		<Button
			variant='outline'
			onClick={() =>
				toast('Event has been created.', {
					action: {
						label: 'Undo',
						onClick: () => toast('Action undone.')
					}
				})
			}
		>
			Show Toast with Action
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pass an `action` object to the toast call to display a clickable action button alongside the message.'
			},
			source: {
				code: `
					import { toast } from 'sonner'

					toast('Event has been created.', {
						action: {
							label: 'Undo',
							onClick: () => console.log('Undo clicked')
						}
					})
				`
			}
		}
	}
}
