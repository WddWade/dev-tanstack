"use client"

import { cn } from "@/utils"
import { useAnchors } from "@xwadex/fesd-next"

export interface PropsTypes { }

const Main: React.FC<React.ComponentProps<"main">> = (props) => {
	const { registerContainers } = useAnchors()
	return (
		<main
			className={cn("w-full", "h-main", "flex", "items-start", "justify-center")}
			{...registerContainers("main")}
		>
			{props.children}
		</main>
	)
}

Main.displayName = "Main"
export default Main
