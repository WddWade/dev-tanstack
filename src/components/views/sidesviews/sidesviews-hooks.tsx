"use client"

import {
	setEditorsViewsLoading,
	setDatasViewsLoading,
	useViewsStores,
	useShallow
} from "@/stores"

export const useSidesViews = () => {

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
		setEditorsViewsLoading,
		setDatasViewsLoading,
	}
}
