"use client"

import { memo } from "react"
import { ScrollAreas } from "@/components"
import { cn } from "@/utils"

export interface PropsTypes {
	className?: string
	thumbClassName?: string
	orientation?: "horizontal" | "vertical"
	type?: "auto" | "scroll" | "always" | "hover" | undefined
	children: React.ReactNode
}

const DragablePanelBodyBase = (props: PropsTypes) => {

	const {
		className,
		thumbClassName,
		orientation,
		type,
		children,
	} = props

	return (
		<ScrollAreas.Root
			data-components="drag-panel-body"
			orientation={orientation ?? "vertical"}
			viewportClassName="scroll-smooth"
			className={cn(
				"flex-1",
				"flex",
				"flex-col",
				"overflow-hidden",
				"bg-background",
				"scroll-smooth",
				className
			)}
			thumbClassName={cn(
				"bg-black/30",
				thumbClassName
			)}
			type={type ?? "scroll"}
		>
			{children}
		</ScrollAreas.Root>

	)
}


const DragablePanelBody = memo(DragablePanelBodyBase) as React.MemoExoticComponent<typeof DragablePanelBodyBase>

DragablePanelBody.displayName = "DragablePanelBody"
export default DragablePanelBody
