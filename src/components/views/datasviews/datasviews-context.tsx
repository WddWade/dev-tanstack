"use client"

import { createContext, use, useContext } from "react"

export interface DatasViewsDatasTypes {
	// setFormDatasDefault: () => void
	// setGlobalAlerts: (state: GlobalsAlersStates) => void
	// isCreateActions: boolean
	// mutation: UseMutationResult<FetcherReturn, Error, any, unknown>
}

const DatasViewsContext = createContext<DatasViewsDatasTypes | null>(null)

export const DatasViewsContextProvider = (props: {
	children: React.ReactNode
	value: DatasViewsDatasTypes
}) => {
	return <DatasViewsContext {...props} />
}

export const useDatasViewsContext = () => {
	const context = use(DatasViewsContext)
	if (!context) throw new Error("useCMSData must be used inside CMSProvider")
	return context
}
