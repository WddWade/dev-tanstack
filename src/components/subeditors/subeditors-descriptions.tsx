"use client"

import { cn } from "@/utils"
import { memo } from "react"

const SubeditorsDescriptions: React.FC<React.ComponentProps<"p">> = memo(({
	children,
	className,
	...props
}) => {
	return (
		<p
			data-component="sub-editors-descriptions"
			className={cn("flex-1", className)}
			{...props}
		>
			{children}
		</p>
	)
})

SubeditorsDescriptions.displayName = "SubeditorsDescriptions"
export default SubeditorsDescriptions
