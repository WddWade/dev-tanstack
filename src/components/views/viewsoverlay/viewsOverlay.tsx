"use client"

import { memo } from "react"
import { cn } from "@/utils"

interface PropsTypes {
	active?: boolean
	className?: string
}

const ViewsOverlay: React.FC<PropsTypes> = memo(({
	active = false,
	className,
	...props
}) => {

	return (
		<div
			className={cn(
				"w-full",
				"h-full",
				"absolute",
				"top-0",
				"left-0",
				"bg-white",
				"opacity-50",
				"z-1",
				active ? "block" : "hidden",
				className,
			)}
			data-active={active}
			{...props}
		/>
	)
})

ViewsOverlay.displayName = "ViewsOverlay"
export default ViewsOverlay
