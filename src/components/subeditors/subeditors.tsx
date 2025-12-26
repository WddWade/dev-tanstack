"use client"

import { memo, Suspense, useMemo } from "react"
import { columns, datas, DataTables } from "../datatables"
import SubeditorsForms from "./subeditors-forms"
import SubeditorsDialogs from "./subeditors-dialogs"
import SubeditorsTemplates from "./subeditors-templates"
import { useSubeditors } from "./subeditors-hooks"
import {
	SubeditorsActionsProvider as ActionsProvider,
	SubeditorsStatesContextProvider as StatesContextProvider,
	SubeditorsTemplatesContextProvider as TemplatesContextProvider,
} from "./subeditors-context"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"
import type {
	ControllerActions,
	SubeditorsEditors,
	SubeditorsTemplate
} from "./subeditors-types"
import SubeditorsRoots from "./subeditors-roots"
import SubeditorsContents from "./subeditors-contents"
import SubeditorsDescriptions from "./subeditors-descriptions"
import SubeditorsControllers from "./subeditors-controllers"

export interface SubeditorsProps
	extends ControllerRenderProps<FieldValues, any> {
	id?: string | number | null
	templates: SubeditorsTemplate
	editors: SubeditorsEditors
	controllers: ControllerActions
}

const Subeditors: React.FC<SubeditorsProps> = memo((props) => {

	const {
		restProps,
		editState,
		editorsForms,
		editorOpen,
		editorMode,
		controllers,
		templateDatas,
		setEditorOpen,
		onEditorsOpen,
		onEditorsDatasetOpen,
		onEditorsFormSubmit,
		onChangeActions
	} = useSubeditors(props)

	const statesContextMemo = useMemo(() => ({
		controllers,
		templateDatas,
		editorOpen,
		editState,
		editorsForms,
		editorMode,
	}), [
		controllers,
		templateDatas,
		editorOpen,
		editState,
		editorsForms,
		editorMode,
	])

	const templatesContextMemo = useMemo(() => ({
		templateDatas
	}), [templateDatas,])

	const actionsContextMemo = useMemo(() => ({
		setEditorOpen,
		onChangeActions,
		onEditorsOpen,
		onEditorsDatasetOpen,
		onEditorsFormSubmit
	}), [
		setEditorOpen,
		onChangeActions,
		onEditorsOpen,
		onEditorsDatasetOpen,
		onEditorsFormSubmit
	])

	return (
		<ActionsProvider value={actionsContextMemo}>
			<StatesContextProvider value={statesContextMemo}>
				<TemplatesContextProvider value={templatesContextMemo}>

					<SubeditorsRoots {...restProps} >
						<SubeditorsContents>
							<SubeditorsDescriptions>
								Use a permanent address where you can receive mail, use a permanent address where you can receive mail.
							</SubeditorsDescriptions>
							<SubeditorsControllers />
						</SubeditorsContents>
						<SubeditorsTemplates timeline />
					</SubeditorsRoots>

				</TemplatesContextProvider>
				<Suspense fallback="">
					<SubeditorsDialogs>
						{editorMode == "form" && <SubeditorsForms title={"工作日誌"} />}
						{editorMode == "dataset" && <DataTables data={datas} columns={columns} />}
					</SubeditorsDialogs >
				</Suspense>
			</StatesContextProvider>
		</ActionsProvider>
	)
})

Subeditors.displayName = "Subeditors"
export default Subeditors
