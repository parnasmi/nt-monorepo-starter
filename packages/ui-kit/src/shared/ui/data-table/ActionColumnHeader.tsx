import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ArrowResetRegular, OptionsRegular, SearchRegular } from '@fluentui/react-icons'
import { type Table as TanstackTable } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '../../../shadcn/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../shadcn/dialog'
import { Field, FieldGroup } from '../../../shadcn/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../../shadcn/input-group'
import { SortableItem } from './SortableItem'

export const ActionColumnHeader = ({ table }: { table: TanstackTable<any> }) => {
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: { distance: 5 }
		}),
		useSensor(TouchSensor, { activationConstraint: { distance: 5 } })
	)

	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')

	// Все колонки кроме 'select' и 'actions'
	const allColumns = useMemo(
		() => table.getAllLeafColumns().filter((col) => col.id !== 'select' && col.id !== 'actions'),
		[table]
	)

	// Текущий порядок — берём из state таблицы, fallback на порядок колонок
	const columnOrder = table.getState().columnOrder
	const defaultOrder = useMemo(() => allColumns.map((c) => c.id), [allColumns])
	const items = columnOrder.length > 0 ? columnOrder.filter((id) => id !== 'select' && id !== 'actions') : defaultOrder

	const labels = useMemo(
		() =>
			Object.fromEntries(
				allColumns.map((col) => [col.id, typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id])
			),
		[allColumns]
	)

	const filteredItems = useMemo(() => {
		if (!search.trim()) return items
		const lower = search.toLowerCase()

		return items.filter((id) => (labels[id] ?? id).toLowerCase().includes(lower))
	}, [items, labels, search])

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			if (!over || active.id === over.id) return

			const currentOrder = columnOrder.length > 0 ? columnOrder : defaultOrder
			const oldIndex = currentOrder.indexOf(String(active.id))
			const newIndex = currentOrder.indexOf(String(over.id))
			const newOrder = arrayMove(currentOrder, oldIndex, newIndex)

			table.setColumnOrder(newOrder)
		},
		[columnOrder, defaultOrder, table]
	)

	const handleReset = () => {
		table.setColumnOrder([])
		table.resetColumnVisibility()
		setSearch('')
	}

	const columnVisibility = table.getState().columnVisibility

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon' className='hover:text-success-600 text-gray-500'>
					<OptionsRegular fontSize={16} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Table columns</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col'>
					<Field className='mb-3'>
						<InputGroup>
							<InputGroupAddon align='inline-start'>
								<SearchRegular fontSize={16} />
							</InputGroupAddon>
							<InputGroupInput
								type='search'
								placeholder='Search'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</InputGroup>
					</Field>

					<FieldGroup className='h-110 gap-1 overflow-y-auto'>
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							modifiers={[restrictToVerticalAxis]}
							onDragEnd={handleDragEnd}
						>
							<SortableContext items={filteredItems} strategy={verticalListSortingStrategy}>
								{filteredItems.length ? (
									filteredItems.map((id) => (
										<SortableItem
											key={id}
											column={{ id, header: labels[id] ?? id }}
											columnVisibility={columnVisibility}
											setColumnVisibility={(updater) => table.setColumnVisibility(updater)}
										/>
									))
								) : (
									<div className='flex grow flex-col justify-center text-center text-gray-500'>
										<div className='mb-1 text-center text-sm font-medium'>No results found</div>
										<div className='text-center text-xs'>Try a different search</div>
									</div>
								)}
							</SortableContext>
						</DndContext>
					</FieldGroup>
				</div>

				<DialogFooter>
					<Button onClick={handleReset}>
						<ArrowResetRegular fontSize={16} />
						<span>Reset</span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
