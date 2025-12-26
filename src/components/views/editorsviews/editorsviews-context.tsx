"use client"

import { createContext, use } from "react"
import type { ViewsActions } from "@/components"

export interface EditorsViewsDatasTypes {
	isCreateActions?: boolean
	mutationPending?: boolean

	editorsActionsControllers: (
		actions: ViewsActions
	) => (e?: React.BaseSyntheticEvent) => Promise<void>
}

const EditorsViewsContext = createContext<EditorsViewsDatasTypes | null>(null)

export const EditorsViewsContextProvider = (props: {
	children: React.ReactNode
	value: EditorsViewsDatasTypes
}) => {
	return <EditorsViewsContext {...props} />
}

export const useEditorsViewsContext = () => {
	const context = use(EditorsViewsContext)
	if (!context) throw new Error("useEditorsViewsContext must be used inside EditorsViewsContextProvider")
	return context
}
