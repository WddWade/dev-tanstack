"use client"

import { memo } from "react"
import { useDraggable, useDndContext, useDragBoxsContext } from "@/components"
import { cn } from "@/utils"

export interface PropsTypes {
	width?: number
	height?: number
	layout?: "options" | "setting" | "datas"
	className?: string
	children: React.ReactNode
}

const DragablePanelsRootBase = (props: PropsTypes) => {

	const {
		width,
		height,
		className,
		children,
		layout
	} = props

	const { id, positions } = useDragBoxsContext()
	const { attributes, setNodeRef, transform } = useDraggable({ id })

	const { active } = useDndContext()
	const isDragging = active?.id === id

	return (
		<div
			id={id}
			ref={setNodeRef}
			data-components="drag-panels-root"
			className={cn(
				"w-full",
				"h-fit",
				"fixed",
				"select-none",
				"overflow-hidden",

				"flex",
				"flex-col",
				"gap-px",
				"rounded-xs",
				"text-block",
				"rounded-sm",
				"shadow-xl",
				"border-2",
				"bg-divider-line",
				"border-neutral-600",

				isDragging ? "z-99" : "z-9",
				className,
			)}

			style={{
				maxWidth: width + "px",
				maxHeight: height + "px",
				left: (positions?.x ?? 0) + (transform?.x ?? 0),
				top: (positions?.y ?? 0) + (transform?.y ?? 0),
			}}
			{...attributes}
		>
			{children}
		</div>
	)
}

const DragablePanelsRoot = memo(DragablePanelsRootBase) as React.MemoExoticComponent<typeof DragablePanelsRootBase>

DragablePanelsRoot.displayName = "DragablePanelsRoot"
export default DragablePanelsRoot


