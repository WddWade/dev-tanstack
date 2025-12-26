"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { isEqual } from "lodash"
import { transFormFields } from "../forms"
import { useViews } from "../views"
import type { FieldType } from "../forms"
import type { SubeditorsProps } from "./subeditors"
import type {
	EditorMode,
	SubeditorsOpenSates,
	SubmitDatas,
	ValueType,
	EditStates,
	AlertsStates,
	RemoveStates
} from "./subeditors-types"

export interface UseSubeditorsOptions extends SubeditorsProps { }

export const useSubeditors = (options: UseSubeditorsOptions) => {

	const { globalsAlerts } = useViews()
	const { resetField } = useFormContext()

	const stableOptions = useMemo(() =>
		options, [
		options.editors,
		options.templates,
		options.value
	])

	const {
		id,
		value,
		name,
		editors,
		templates,
		onChange,
		controllers,
		...restProps
	} = stableOptions

	const {
		forms: editorsForms,
		editmode = "form"
	} = editors

	const templatesSlots = templates?.slots

	const [editorMode, setEditorMode] = useState<EditorMode>(editmode)
	const [editState, setEditStates] = useState<EditStates>({})
	const [editorOpen, setEditorOpen] = useState(false)
	const originalValueRef = useRef(value)

	useEffect(() => {
		originalValueRef.current = value
	}, [value])

	const fieldsDefaultOptions = useMemo(() => {
		return transFormFields(editorsForms)
			.filter((field: FieldType) => field.defaultOptions)
			.reduce((init, current: FieldType) => ({
				[current.field]: current.defaultOptions, ...init
			}), {} as Record<string, { value: string, label: string }[] | undefined>)
	}, [editorsForms])

	//轉譯value為templateDatas
	const templateDatas = useMemo(() => {
		if (!value || !templatesSlots) return []
		const slotsValue = Object.values(templatesSlots) as any

		return value?.map((valueData: Record<string, any>) => {
			const { id, _setting, _searchKeyword, _keywords, ...datas } = valueData

			const slots = transSlotsDatas({
				slots: slotsValue, datas: valueData, fieldsOptions: fieldsDefaultOptions
			})

			const slotsKeywords = _keywords
				? [..._keywords, "contact_id", "account_id"]
					.map((fieldName: string) => {
						const fieldValue = datas[fieldName]
						const optionlabel = fieldsDefaultOptions[fieldName]?.find((option: any) => {
							return option.value == fieldValue
						})?.label
						return optionlabel ? optionlabel : fieldValue
					})
					.filter((keyword: string) => keyword)
				: []

			const subKeyword = typeof _searchKeyword == "string"
				? _searchKeyword.split(",")
				: _searchKeyword ?? []

			const keywords = [...new Set([...slotsKeywords, ...subKeyword])]

			return { id, datas, slots, keywords, setting: _setting }
		})
	}, [id, value, templatesSlots, fieldsDefaultOptions])

	// 開啟並設置編輯器
	const onEditorsOpen = useCallback((openSattes: SubeditorsOpenSates) => {
		const { editId, editorMode, editActions } = openSattes
		const editDatas = id && value ? value.find((data: any) => data.id == editId) : ""

		setEditorMode(editorMode)
		setEditStates((prev: any) => ({ ...prev, actions: editActions, datas: editDatas }))
		setEditorOpen(true)
	}, [value])

	// TODO 開啟並設置資料集
	const onEditorsDatasetOpen = useCallback((openSattes: SubeditorsOpenSates) => {
		const { editId, editorMode, editActions } = openSattes
		const editDatas = id && value ? value.find((data: any) => data.id == editId) : ""

		setEditorMode(editorMode)
		setEditStates((prev: any) => ({ ...prev, actions: editActions, datas: editDatas }))
		setEditorOpen(true)
	}, [value])

	const onEditorsFormSubmit = useCallback((submitDatas: SubmitDatas) => {
		const nextValue = transSubmitDatas(submitDatas, value)
		const isChangeValue = checkChangeValue(nextValue, originalValueRef.current)


		if (isChangeValue) onChange(nextValue)
		else resetField(name, { defaultValue: originalValueRef.current })
	}, [value, name, onChange])

	const onChangeActions = useCallback(async (removeStates: RemoveStates) => {
		let nextValue = [...value]

		const { id, removeActions } = removeStates
		const valueIndex = nextValue.findIndex((valueData: any) => valueData.id == id)
		if (valueIndex == -1) return

		const { _actions, _removeActions } = nextValue[valueIndex]
		const isRemoveActions = removeActions == "delete" || removeActions == "unlink"

		if (_removeActions == removeActions) {
			delete nextValue[valueIndex]["_removeActions"]

		} else if (isRemoveActions && _actions == "create") {
			const removes = await subeditorsAlerts("delete-create")
			if (!removes) return

			nextValue = nextValue.filter((valueData: any) => valueData.id !== id)

		} else if (isRemoveActions) {
			const removes = await subeditorsAlerts(removeActions)
			if (!removes) return

			nextValue[valueIndex]["_removeActions"] = removeActions
		}
		onChange(nextValue)
	}, [value])

	const subeditorsAlerts = useCallback(async (state: AlertsStates) => {
		switch (state) {
			case "unlink": return await globalsAlerts.open("subeditors.unlink")
			case "delete": return await globalsAlerts.open("subeditors.delete")
			case "delete-create": return await globalsAlerts.open("subeditors.delete-create")
		}
	}, [])

	return {
		restProps,
		editState,
		editorsForms,
		editorOpen,
		editorMode,
		controllers,
		templateDatas,
		subeditorsAlerts,
		setEditorOpen,
		onEditorsOpen,
		onEditorsDatasetOpen,
		onEditorsFormSubmit,
		onChangeActions
	}
}

export const transSubmitDatas = (
	submitDatas: SubmitDatas,
	value: ValueType[]
) => {
	const { _actions, id } = submitDatas
	const nextvalue = [...value]
	const nextValueIndex = nextvalue.findIndex((value) => value.id == id)
	const isCreateActions = _actions == "create" && nextValueIndex === -1

	if (isCreateActions) nextvalue.unshift(submitDatas)
	else nextvalue[nextValueIndex] = submitDatas

	return nextvalue
}

export const transSlotsDatas = (transDatas: {
	slots: { field: string, [key: string]: unknown }[],
	fieldsOptions: Record<string, { value: string, label: string }[] | undefined>,
	datas: Record<string, string>,
}) => {
	const { slots, datas, fieldsOptions } = transDatas

	return slots.reduce((prevSlot, currentSlot, index) => {
		const field = currentSlot.field
		const defaultOptions = fieldsOptions[field]
		const value = datas?.[field]
		const label = defaultOptions
			? defaultOptions.find(option => option.value == value)?.label
			: value
		const slotsKey = index + 1
		const slotsDatas = { ...currentSlot, value: label }

		return { ...prevSlot, [slotsKey]: slotsDatas }
	}, {})
}

export const checkChangeValue = (
	nextValue: ValueType[],
	originalValue: ValueType[]
) => !nextValue.every(next => {
	const original = [...originalValue].find((value: any) => value.id == next.id)
	if (!original) return false

	const { _actions, _readyActions, ...restValue } = next
	const { _actions: rawActions, _readyActions: rawReadyActions, ...restRawValueItem } = original

	// 以輸入的內容為基礎比對原始資料
	return Object.keys(restValue).every((key: any) => {
		return isEqual(restValue[key], restRawValueItem[key])
	})
})

