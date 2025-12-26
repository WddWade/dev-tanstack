"use client"

import { useViewsStores, useShallow } from "@/stores"
import { useGlobalsAlerts } from "../alerts"
import { useCallback, useEffect } from "react"

export const useViews = () => {

	const globalsAlerts = useGlobalsAlerts()

	const {
		isEditorsViewsEdited,
		editorViewsDatas,
		editorsViewsActions
	} = useViewsStores(useShallow((stores) => ({
		isEditorsViewsEdited: stores.isEditorsViewsEdited,
		editorViewsDatas: stores.editorViewsDatas,
		editorsViewsActions: stores.editorsViewsActions,
	})))

	const leaveEditorsViewsEdited = useCallback(async () => {
		if (!isEditorsViewsEdited) return "leave"

		const actions = await globalsAlerts.open(
			"editorsViews.leave", {
			title: editorViewsDatas?.title,
		})
		if (actions == "save") editorsViewsActions.save?.()
		return actions as Promise<"cancel" | "leave" | "save">
	}, [
		isEditorsViewsEdited,
		editorViewsDatas?.title,
		editorsViewsActions
	])

	return {
		globalsAlerts,
		leaveEditorsViewsEdited
	}
}

