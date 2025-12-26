"use client"

import { useGlobalsLoadersStores, useShallow } from "@/stores"
import Loaders from "./loaders"

interface PropsTypes { }

const GlobalsLoaders: React.FC<PropsTypes> = () => {

	const { active } = useGlobalsLoadersStores(
		useShallow((stores) => ({ active: stores.active }))
	)

	return <Loaders
		active={active}
		message="System Booting"
		fullScreen
	/>
}

GlobalsLoaders.displayName = "GlobalsLoaders"
export default GlobalsLoaders
