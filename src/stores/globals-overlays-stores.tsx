
"use client"

import { create } from "zustand"
export { useShallow } from 'zustand/react/shallow'

type StoresTypes = {
	open?: boolean
	options?: {
		className?: string
	}
}

const globalsOverlaysStores: StoresTypes = {
	open: false,
	options: {}
}

export const useGlobalsOverlaysStores = create<StoresTypes>()((set, get) => globalsOverlaysStores)

export const setGlobalsOverlays = (
	open: StoresTypes["open"],
	options?: StoresTypes["options"]) =>
	useGlobalsOverlaysStores.setState(stores => ({ options, open }))

export const defaultGlobalsOverlaysStores = () => {
	useGlobalsOverlaysStores.setState(() => globalsOverlaysStores)
}
