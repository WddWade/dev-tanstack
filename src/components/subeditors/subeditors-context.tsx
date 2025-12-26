"use client"

import { createContext, use } from "react"
import type { FormFields } from "@/components"
import type { ControllerActions, SubmitDatas, EditorMode, EditStates, RemoveStates, SubeditorsOpenSates } from "./subeditors-types"

export interface SubeditorsStatesContext {
	editorOpen?: boolean
	editState: EditStates
	editorMode: EditorMode
	editorsForms: FormFields[]
	controllers?: ControllerActions
}

const SubeditorsStatesContext = createContext<SubeditorsStatesContext | null>(null)

export const SubeditorsStatesContextProvider = (props: {
	children: React.ReactNode
	value: SubeditorsStatesContext
}) => {
	return <SubeditorsStatesContext {...props} />
}

export const useSubeditorsStatesContext = () => {
	const context = use(SubeditorsStatesContext)
	if (!context) throw new Error("useCMSData must be used inside CMSProvider")
	return context
}

export interface SubeditorsTemplatesContext {
	templateDatas: any[]
}

const SubeditorsTemplatesContext = createContext<SubeditorsTemplatesContext | null>(null)

export const SubeditorsTemplatesContextProvider = (props: {
	children: React.ReactNode
	value: SubeditorsTemplatesContext
}) => {
	return <SubeditorsTemplatesContext {...props} />
}

export const useSubeditorsTemplatesContext = () => {
	const context = use(SubeditorsTemplatesContext)
	if (!context) throw new Error("useCMSData must be used inside CMSProvider")
	return context
}

export interface SubeditorsActionsContext {
	setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>
	onChangeActions: (removeStates: RemoveStates) => Promise<void>
	onEditorsOpen: (openSattes: SubeditorsOpenSates) => void
	onEditorsDatasetOpen: (openSattes: SubeditorsOpenSates) => void
	onEditorsFormSubmit: (submitDatas: SubmitDatas) => void
}

const SubeditorsActionsContext = createContext<SubeditorsActionsContext | null>(null)

export const SubeditorsActionsProvider = (props: {
	children: React.ReactNode
	value: SubeditorsActionsContext
}) => {
	return <SubeditorsActionsContext {...props} />
}

export const useSubeditorsActionsContext = () => {
	const context = use(SubeditorsActionsContext)
	if (!context) throw new Error("useCMSData must be used inside CMSProvider")
	return context
}
