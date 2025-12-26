"use client"

import { memo } from "react"
import { cn } from "@/utils"

export interface PropsTypes {
	className?: string
	children: React.ReactNode
}

const DragablePanelFooterBase = (props: PropsTypes) => {

	const { children, className } = props

	return (
		<div
			data-components="drag-panels-footer"
			className={cn(
				"px-5",
				"py-2",
				"bg-background",
				className
			)}
		>
			{children}
		</div>

	)
}

const DragablePanelFooter = memo(DragablePanelFooterBase) as React.MemoExoticComponent<typeof DragablePanelFooterBase>

DragablePanelFooter.displayName = "DragablePanelFooter"
export default DragablePanelFooter
