"use client"

import { memo } from "react"
import { cn } from "@/utils"

interface PropsTypes extends React.ComponentProps<"section"> { }

const EditorsViewsFooters: React.FC<PropsTypes> = memo(({
	className,
	...props
}) => {

	return (
		<section
			data-components="editors-views-footer"
			className={cn(
				"relative",
				"px-space",
				"w-full",
				"min-h-view-footer",
				"flex",
				"flex-nowrap",
				"justify-center",
				"items-center",
				"bg-background",
				// "[&_button]:text-xs",
				// "[&_button]:m-0",
				// "[&_button]:p-0",
				// "[&_button]:bg-transparent",
				// "[&_button]:hover:bg-transparent",
				// "[&_button]:font-semibold",
				// "[&_button]:uppercase",
				// "[&_[data-action=delete]]:text-destructive",
				className
			)}
			{...props}
		/>
	)
})

EditorsViewsFooters.displayName = "EditorsViewsFooters"
export default EditorsViewsFooters
