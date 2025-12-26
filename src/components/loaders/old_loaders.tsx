"use client"

import styles from "./loaders.module.scss"
import { cn } from "@/utils"

export interface LoadersPropsType {
	color?:
	| "white"
	| "black"
}

const Loaders: React.FC<LoadersPropsType> = (props) => {

	return (
		<div
			className={cn(
				"w-3",
				"h-3",
				"rounded-4xl",
				"border-t-[1.5px]",
				"border-r-[1.5px]",
				"border-b-[1.5px]",
				"border-t-black",
				"border-r-black",
				"border-b-transparent",
				"animate-spin-fast duration-300",
				props.color == "white" && [
					"border-t-white",
					"border-r-white",
				],
			)}
		/>
	)
}

Loaders.displayName = "Loaders"
export default Loaders
