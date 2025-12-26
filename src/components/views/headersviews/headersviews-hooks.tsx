"use client"

import { useShallow, useViewsStores } from "@/stores"

export const useHeadersViews = () => {

	const {
		editorsViewsActions,
		editorViewsDatas,
		isEditorsViewsEdited
	} = useViewsStores(useShallow((stores) => ({
		editorsViewsActions: stores.editorsViewsActions,
		editorViewsDatas: stores.editorViewsDatas,
		isEditorsViewsEdited: stores.isEditorsViewsEdited,
	})))

	return {
		editorsViewsActions,
		editorViewsDatas,
		isEditorsViewsEdited,
	}
}
