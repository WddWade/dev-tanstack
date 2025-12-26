"use client"

import { FieldType, transFormFields, useGlobalsAlerts } from "@/components"
import { useEffectLeave } from "@/hooks"
import {
	useShallow,
	useViewsStores,
	setDatasViewsLoading,
	setEditorsViewsEdited,
	setEditorsViewsLoading,
	setGlobalsOverlays,
	setEditorsViewsDatas,
	setEditorsViewsControllers,
} from "@/stores"
import { EditorsViewsPayloads, SubeditorPayloadsDatas, SubeditorsPayloads } from "./editorsviews"

export const useEditorsViews = () => {

	const {
		datasViewsActions,
		isEditorsViewsLoading,
	} = useViewsStores(useShallow((stores) => ({
		datasViewsActions: stores.datasViewsActions,
		isEditorsViewsLoading: stores.isEditorsViewsLoading,
	})))

	useEffectLeave(() => {
		setEditorsViewsDatas(null)
		setEditorsViewsEdited(false)
	})

	return {
		datasViewsActions,
		isEditorsViewsLoading,
		setEditorsViewsControllers,
		setDatasViewsLoading,
		setEditorsViewsEdited,
		setEditorsViewsLoading,
		setGlobalsOverlays,
		setEditorsViewsDatas,
	}
}

export function transMutationPayload(
	formsFields: FieldType[],
	payloads: Record<string, any>
) {
	const EXCLUDED_FIELDS = ["id", "_actions"]

	const { id, ...restPayloads } = payloads
	const mutationPayloads = !id || (typeof id === "string" && id.startsWith("create_"))
		? { ...restPayloads } : { ...restPayloads, id } as Record<string, any>


	function transSubeditorsDatas(
		fields: FieldType[], datas: Record<string, any>[]
	): SubeditorPayloadsDatas {
		if (!datas) return []

		return datas.map((originalData: Record<string, any>) => {
			const data = { ...originalData }
			const { id, _actions, _removeActions } = data

			if (!id || String(id).startsWith("create_")) delete data.id;
			if (!_actions) delete data._actions
			if (_removeActions) {
				data["_actions"] = _removeActions
				delete data._removeActions
			}
			return transMutationPayload(fields, data)
		})
	}

	function transMutationDatas(payloads: Record<string, any>) {
		return formsFields.reduce((result, field) => {
			const { field: fieldName, component, editors, _model, _type } = field

			if (component == "subeditors" && editors?.fields) {
				const editorFields = transFormFields(editors?.fields)
				const editorDatas = transSubeditorsDatas(editorFields, payloads?.[fieldName])
				const subDatas: SubeditorsPayloads = { fieldName, _model, _type, datas: editorDatas }

				if (result?._subDatas) result._subDatas.push(subDatas)
				else result["_subDatas"] = [subDatas]

				return result
			}

			const skipTrans = EXCLUDED_FIELDS.includes(fieldName) && typeof mutationPayloads?.[fieldName] == "undefined"
			return skipTrans ? result : { ...result, [fieldName]: mutationPayloads?.[fieldName] }

		}, {} as EditorsViewsPayloads)
	}

	return transMutationDatas(mutationPayloads)

}
