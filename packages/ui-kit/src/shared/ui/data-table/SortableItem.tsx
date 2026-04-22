import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReOrderRegular } from '@fluentui/react-icons'
import type { Updater, VisibilityState } from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import { Checkbox } from '../../../shadcn/checkbox'
import { Field, FieldLabel } from '../../../shadcn/field'
import { Label } from '../../../shadcn/label'

type Props = {
	column: {
		id: string
		header: string
	}
	columnVisibility: VisibilityState
	setColumnVisibility: (updater: Updater<VisibilityState>) => void
}

export const SortableItem = ({ column, columnVisibility, setColumnVisibility }: Props) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: column.id
	})

	const style: CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: 'relative',
		transform: CSS.Translate.toString(transform),
		transition: transition,
		zIndex: isDragging ? 1 : 0
	}

	return (
		<FieldLabel ref={setNodeRef} style={style}>
			<Field orientation='horizontal' className='gap-x-3'>
				<Checkbox
					id={column.id}
					checked={columnVisibility[column.id] ?? true}
					onCheckedChange={(checked) => {
						setColumnVisibility((prev) => ({
							...prev,
							[column.id]: !!checked
						}))
					}}
				/>
				<Label htmlFor={column.id} className='inline-flex items-center gap-2'>
					{column.header}
				</Label>

				<ReOrderRegular
					{...attributes}
					{...listeners}
					fontSize={16}
					className='ml-auto flex size-4 cursor-grab touch-none items-center justify-center outline-none'
				/>
			</Field>
		</FieldLabel>
	)
}
