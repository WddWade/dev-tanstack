"use client"

import { useGlobalsAlerts } from "@/components"
import { useEffectLeave } from "@/hooks"
import {
	useViewsStores,
	useShallow,
	setEditorsViewsDatas,
	setDatasViewsLoading,
	setDatasViewsControllers,
	setDatasViewsSelectedId,
	setEditorsViewsLoading,
} from "@/stores"

export const useDatasViews = () => {

	const {
		datasViewsSelectedId,
		editorsViewsActions,
		editorViewsDatas,
		isDatasViewsLoading,
		isEditorsViewsLoading,
		isEditorsViewsEdited,
	} = useViewsStores(useShallow((state) => ({
		datasViewsSelectedId: state.datasViewsSelectedId,
		editorsViewsActions: state.editorsViewsActions,
		editorViewsDatas: state.editorViewsDatas,
		isDatasViewsLoading: state.isDatasViewsLoading,
		isEditorsViewsLoading: state.isEditorsViewsLoading,
		isEditorsViewsEdited: state.isEditorsViewsEdited,
	})))

	useEffectLeave(() => {
		// setEditorsViewsDatas(null)
		setDatasViewsSelectedId([])
	})

	return {
		editorsViewsActions,
		datasViewsSelectedId,
		editorViewsDatas,
		isDatasViewsLoading,
		isEditorsViewsLoading,
		isEditorsViewsEdited,
		setEditorsViewsDatas,
		setDatasViewsLoading,
		setDatasViewsControllers,
		setDatasViewsSelectedId,
		setEditorsViewsLoading,
	}
}
