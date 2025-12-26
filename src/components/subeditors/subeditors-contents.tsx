"use client"

import { memo } from "react"
import { cn } from "@/utils"

const SubeditorsContents: React.FC<React.ComponentProps<"div">> = memo(({
	className,
	children,
	...props
}) => {
	return (
		<div
			data-component="sub-editors-contents"
			className={cn("flex gap-x-15", className)}
			{...props}
		>
			<div className={"flex gap-x-15"}>{children}</div>
		</div>
	)
})

SubeditorsContents.displayName = "SubeditorsContents"
export default SubeditorsContents
