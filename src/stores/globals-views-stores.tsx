
"use client"

import { useGlobalsAlerts } from "@/components"
import { create } from "zustand"
import { useShallow } from "./globals-alerts-stores"
export { useShallow } from 'zustand/react/shallow'

type GlobalsViewsStoresTypes = {
	datasViewsSelectedId: string[]
	datasViewsSelectedIndex: string
	editorViewsDatas: Record<string, any>

	isEditorsViewsEdited: boolean
	isEditorsViewsLoading: boolean
	isDatasViewsLoading: boolean

	editorsViewsActions: {
		save?: (e?: React.BaseSyntheticEvent) => Promise<void>
		refetch?: () => Promise<void>
	}

	datasViewsActions: {
		refetch?: () => Promise<void>
	}
}

const globalsViewsStores: GlobalsViewsStoresTypes = {
	datasViewsSelectedId: [],
	datasViewsSelectedIndex: "",
	editorViewsDatas: {},

	isEditorsViewsEdited: false,
	isEditorsViewsLoading: false,
	editorsViewsActions: {},

	isDatasViewsLoading: false,
	datasViewsActions: {}
}

export const useViewsStores = create<GlobalsViewsStoresTypes>()((set, get) => globalsViewsStores)

export const setDatasViewsSelectedId = (id: string[]) =>
	useViewsStores.setState(stores => ({ datasViewsSelectedId: id }))

export const setEditorsViewsDatas = (datas: any) =>
	useViewsStores.setState(stores => ({ editorViewsDatas: datas }))

export const setEditorsViewsEdited = (status: boolean) =>
	useViewsStores.setState(stores => ({ isEditorsViewsEdited: status }))

export const setEditorsViewsLoading = (status: boolean) =>
	useViewsStores.setState(stores => ({ isEditorsViewsLoading: status }))

export const setDatasViewsLoading = (status: boolean) =>
	useViewsStores.setState(stores => ({ isDatasViewsLoading: status }))

export const setDatasViewsControllers = (methods: any) =>
	useViewsStores.setState(stores => ({ datasViewsActions: { ...methods } }))

export const setEditorsViewsControllers = (methods: any) =>
	useViewsStores.setState(stores => ({ editorsViewsActions: { ...methods } }))

export const defaultGlobalsViewsStores = () => useViewsStores.setState(globalsViewsStores)


