
"use client"

import { create } from "zustand"
export { useShallow } from 'zustand/react/shallow'

type StoresTypes = {
	active?: boolean
}

const globalsLoadersStores: StoresTypes = {
	active: true,
}

export const useGlobalsLoadersStores = create<StoresTypes>()((set, get) => globalsLoadersStores)

export const setGlobalsLoaders = (active: boolean) =>
	useGlobalsLoadersStores.setState(stores => ({ active }))

