"use client"

import { AsPropsTypes } from "@/types"
import { memo } from "react"
import pkg from 'react-sortablejs'
import type { Sortable, Store } from "react-sortablejs"


type PropsTypes<T extends React.ElementType = "div"> = AsPropsTypes<T, {
	as?: string
	children: React.ReactNode
	datasets: any[]
	rootClass?: string
	sorterClass?: string
	handlerClass?: string
	style?: React.CSSProperties
	disabled?: boolean
	animation?: number
	onChange?: (newState: any[], sortable: Sortable | null, store: Store) => void
	onStart?: ((evt: Sortable.SortableEvent, sortable: Sortable | null, store: Store) => void) | undefined
	onEnd?: ((evt: Sortable.SortableEvent, sortable: Sortable | null, store: Store) => void) | undefined
}>

const DragSortableBase = <T extends React.ElementType = "div">(
	props: PropsTypes<T>
) => {
	const { ReactSortable } = pkg

	const {
		as,
		children,
		datasets = [],
		rootClass,
		sorterClass,
		handlerClass,
		style,
		animation = 150,
		disabled = false,
		onChange,
		onStart,
		onEnd,
		...othersProps
	} = props

	return (
		<ReactSortable
			{...othersProps}
			tag={as}
			disabled={disabled}
			className={rootClass}
			ghostClass={sorterClass}
			handle={"." + handlerClass}
			fallbackClass={"sortable-fallback"}
			list={datasets}
			setList={onChange}
			animation={animation}
			style={style}
			onStart={onStart}
			onEnd={onEnd}
		>
			{children}
		</ReactSortable >
	)
}

const DragSortable = memo(DragSortableBase) as React.MemoExoticComponent<typeof DragSortableBase>

DragSortable.displayName = "DragSortable"
export default DragSortable
