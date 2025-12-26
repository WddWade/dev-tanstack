"use client"

import { useEffect } from "react"
import { AlertDialogs } from "./alerts-dialogs"
import { defaultGlobalsOverlaysStores, useGlobalsOverlaysStores, useShallow } from "@/stores"
import { cn } from "@/utils"

interface PropsTypes { }

const GlobalsOverlays: React.FC<PropsTypes> = () => {

	const { open, options } = useGlobalsOverlaysStores(useShallow((state) => ({
		open: state.open,
		options: state.options,
	})))

	const { className } = options || {}

	useEffect(() => {
		return defaultGlobalsOverlaysStores()
	}, [])

	return (
		<AlertDialogs.Root open={open}>
			<AlertDialogs.Portal>
				<AlertDialogs.Overlay className={cn("bg-black/15", className)} />
			</AlertDialogs.Portal>
		</AlertDialogs.Root>
	)
}

GlobalsOverlays.displayName = "GlobalsOverlays"
export default GlobalsOverlays
