import type { FormFields } from "@/components"

export type EditorMode = "form" | "dataset"

export type EditActions = "create" | "update" | "unlink"

export type AlertsStates = "delete" | "delete-create" | "unlink"

export interface TemplatesDatasSettings {
	actions: string
	keywords: string[]
	disabled: 1 | 0
}

export interface SubeditorsTemplate {
	name: string
	indexId: string
	datas: Record<string, any>[]
	slots: Record<string, any>
}

export interface ControllerActions {
	create: any
	relation: any
	search: any
}

export interface SubeditorsOpenSates {
	editorMode: EditorMode
	editActions: EditActions
	editId?: string | number
}

export interface RemoveStates {
	id: string | number
	removeActions: | "delete" | "unlink"
}

export interface SubeditorsEditors {
	forms: FormFields[]
	editmode: EditorMode
}

export interface ValueType {
	id?: string | null
	_actions?: "create" | "update" | "unlink"
	[key: string]: unknown
}

export type SubmitDatas = ValueType

export interface EditStates {
	actions?: "create" | "update" | "unlink"
	datas?: any
}
