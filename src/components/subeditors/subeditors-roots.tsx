"use client"

import { memo } from "react"
import { cn } from "@/utils"

const SubeditorsRoots: React.FC<React.ComponentProps<"div">> = memo(({
	children,
	className,
	...props
}) => {
	return (
		<div
			data-component="sub-editors-roots"
			className={cn("flex flex-col gap-y-4 mt-2", className)}
			{...props}
		>
			{children}
		</div>
	)
})

SubeditorsRoots.displayName = "SubeditorsRoots"
export default SubeditorsRoots
