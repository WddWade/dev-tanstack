"use client"

import { memo } from "react"
import { useDraggable, useDragBoxsContext } from "@/components"
import { cn } from "@/utils"
import { X } from "lucide-react"

export interface PropsTypes {
	className?: string
	children: React.ReactNode
	closeHandler?: () => void
}

const DragablePanelHeaderBase = (props: PropsTypes) => {

	const { closeHandler, children, className } = props

	const { id } = useDragBoxsContext()
	const { listeners, setActivatorNodeRef } = useDraggable({ id })

	return (
		<div
			data-components="drag-panels-header"
			className={cn(
				"px-5",
				"py-2",
				"flex",
				"justify-between",
				"items-center",
				"gap-1.5",

				"font-medium",
				"bg-neutral-50",
				"hover:bg-neutral-100",

				className
			)}
		>
			<span
				data-components="drag-panel-header-title"
				ref={setActivatorNodeRef}
				className={cn(
					"flex-1",
					"cursor-grab",
					"active:cursor-grabbing",
				)}
				{...listeners}
			>
				{children}
			</span>
			<button
				data-components="drag-panel-header-handler"
				className={cn(
					"flex-0",
					"-mr-1",
					"cursor-pointer",
					"text-black/20",
					"hover:text-black"
				)}
				onClick={closeHandler}
			>
				<X size={15} strokeWidth={1.8} />
			</button>
			{/* </div> */}
		</div>
	)
}

const DragablePanelHeader = memo(DragablePanelHeaderBase) as React.MemoExoticComponent<typeof DragablePanelHeaderBase>

DragablePanelHeader.displayName = "DragablePanelHeader"
export default DragablePanelHeader
