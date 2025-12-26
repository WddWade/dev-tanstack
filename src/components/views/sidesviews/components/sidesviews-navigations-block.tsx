"use client"
import { useEffect, memo } from "react"
import { cn } from "@/utils"


interface PropsTypes {
	title: string
	children: React.ReactNode
}

const SidesNavigationsBlock: React.FC<PropsTypes> = memo(({
	title,
	children
}) => {

	return (
		<div
			data-components="sidesNavigationsBlock"
			className={cn(
				"pt-2.5",
				"pb-3",
				"flex",
				"flex-col",
				"bg-background",
				"relative",
				"last:flex-1",
				"last:pb-10"
			)}
		>
			<div
				data-components="title"
				className={cn(
					"font-semibold",
					"pt-2.5",
					"pb-2.5",
					"px-space",
					"text-foreground/60",
					"uppercase",
					"sticky",
					"top-0",
					"z-0",
					"bg-background",
					"text-mini-10",
					"dark:font-medium",
					"dark:text-foreground/60",
					"dark:bg-background",
				)}>
				{title}
			</div>
			{children}
		</div>
	)
})

SidesNavigationsBlock.displayName = "SidesNavigationsBlock"
export default SidesNavigationsBlock
