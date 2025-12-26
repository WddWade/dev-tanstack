"use client"

import { memo } from "react"
import { useDraggable, useDragBoxsContext } from "@/components"
import { cn } from "@/utils"

export interface PropsTypes {
	className?: string
	children: React.ReactNode
}

const DragablePanelHandlerBaase = (props: PropsTypes) => {

	const { children, className } = props

	const { id } = useDragBoxsContext()
	const { listeners, setActivatorNodeRef } = useDraggable({ id })

	return (
		<button
			data-components="drag-panels-handler"
			ref={setActivatorNodeRef}
			className={cn(
				"cursor-grab",
				"active:cursor-grabbing",
				className
			)}
			{...listeners}
		>
			{children}
		</button>
	)
}

const DragablePanelHandler = memo(DragablePanelHandlerBaase) as React.MemoExoticComponent<typeof DragablePanelHandlerBaase>

DragablePanelHandler.displayName = "DragablePanelHandler"
export default DragablePanelHandler
