"use client"

import { memo } from "react"
import { cn } from "@/utils"

export interface LoadersSpinnersProps {
	message?: string
	className?: string
	size?: string
	color?: string
}

const LoadersSpinners: React.FC<LoadersSpinnersProps> = memo(({
	message,
	color = "black",
	size,
	className
}) => {

	return (
		<div
			className={cn(
				"overflow-hidden",
				"flex",
				"justify-center",
				"items-center",
				"gap-2",
				"data-[align='center']:flex-col",
				"data-[align='center']:justify-center",
				"data-[align='center']:items-center",
				"[&_p]:text-xs",
				"[&_p]:font-semibold",
				"[&_p]:capitalize",
			)}
		>
			<div
				className={cn(
					"w-3",
					"h-3",
					"rounded-4xl",
					"border-t-black",
					"border-r-black",
					"border-b-transparent",
					"animate-spin-fast duration-300",
					"border-t-[1.5px]",
					"border-r-[1.5px]",
					"border-b-[1.5px]",
					size == "big" && [
						"w-5",
						"h-5",
						"border-t-2",
						"border-r-2",
						"border-b-2",
					],
					color == "white" && [
						"border-t-white",
						"border-r-white",
					],
					className
				)}
			/>
			{message && <p>{message}</p>}
		</div>
	)
})

LoadersSpinners.displayName = "LoadersSpinners"
export default LoadersSpinners
