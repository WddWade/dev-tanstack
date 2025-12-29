
"use client"

import { create } from "zustand"
import { useShallow } from 'zustand/react/shallow'
import type {
	GlobalsAlersStates,
	GlobalsAlertsOptions
} from "@/components"

export type GlobalsAlertsStoresTypes = {
	open?: boolean
	state: GlobalsAlersStates
	options: GlobalsAlertsOptions
}

const globalsAlertsStores: GlobalsAlertsStoresTypes = {
	state: null,
	open: false,
	options: {}
}

export const useGlobalsAlertsStores = create<GlobalsAlertsStoresTypes>()((set, get) => globalsAlertsStores)

export const setGlobalsAlertDialogs = (
	state?: GlobalsAlersStates,
	options: GlobalsAlertsStoresTypes["options"] = {},
) => useGlobalsAlertsStores.setState(stores => ({ state, options, open: state == "close" ? false : true }))

export const defaultGlobalsAlertsStores = () => {
	useGlobalsAlertsStores.setState(() => globalsAlertsStores)
}

export {
	useShallow
}
