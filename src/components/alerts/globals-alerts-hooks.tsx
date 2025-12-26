"use client"

import {
	useGlobalsAlertsStores,
	setGlobalsAlertDialogs,
	useShallow
} from "@/stores"

import {
	globalAlertsOptions,
	GlobalsAlersStates,
	GlobalsAlertsOptions
} from "./globals-alerts-options"


export const useGlobalsAlerts = () => {
	const { open } = useGlobalsAlertsStores(
		useShallow((stores) => ({ open: stores.open }))
	)
	return {
		isOpen: open,
		open: openGlobalsAlerts,
		close: closeGlobalsAlerts
	}
}

export const openGlobalsAlerts = async (
	state: GlobalsAlersStates,
	options?: GlobalsAlertsOptions
) => {
	const { title, description, confirms } = globalAlertsOptions({ state, options })
	return new Promise((resolve) => {
		setGlobalsAlertDialogs(state, {
			title, description,
			confirms: confirms?.map((confirm: any) => ({
				...confirm, callback: () => resolve(confirm.returnValue)
			}))
		})
	})
}

export const closeGlobalsAlerts = async () => {
	return setGlobalsAlertDialogs("close")
}
