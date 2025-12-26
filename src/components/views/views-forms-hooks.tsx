"use client"

import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { transFormFields, useFormsSchemas } from "../forms"
import type { FieldType, } from "../forms"
import type { FormFields } from "./editorsviews"

export interface ViewsFormsHooksOptions {
	isCreateActions: boolean
	forms: FormFields[]
	formsDatas: Record<string, any>
}

export const useViewsForms = (options: ViewsFormsHooksOptions) => {

	const {
		forms,
		formsDatas,
		isCreateActions,
	} = options

	const formsFields = useMemo<FieldType[]>(() => transFormFields(forms), [forms])
	const { formsZodSchemas, defaultValues } = useFormsSchemas({ formsFields })

	const hooksFormStates = useForm<z.infer<typeof formsZodSchemas>>({
		resolver: zodResolver(formsZodSchemas),
		values: isCreateActions
			? { ...defaultValues, _actions: "create" }
			: formsDatas
	})

	const memoDefaultValues = useMemo(() => defaultValues, [defaultValues])
	const memoFormsDatas = useMemo(() => ({ ...formsDatas }), [formsDatas])


	const resetFormDatas = useCallback(() => {
		console.log("memoFormsDatas", memoFormsDatas);
		const rawDatas = isCreateActions ? memoDefaultValues : memoFormsDatas
		Object.entries(rawDatas).forEach(([key, value]) => {
			hooksFormStates.setValue(key, value)
			hooksFormStates.resetField(key)
		})
	}, [
		isCreateActions,
		memoDefaultValues,
		memoFormsDatas,
		hooksFormStates.setValue,
		hooksFormStates.resetField
	])

	return {
		formsFields,
		hooksFormStates,
		resetFormDatas,
	}
}

export const getErrorLabels = (errorskey: string, formsFields: any[]) => {
	const { block, blockId, label } = transFormFields(formsFields)
		.find((field: any) => field.field == errorskey) || {}
	return { tabId: blockId, label: `${block}-${label}` }
}

export const scrolltoFirstField = () => {
	const errorField = document.querySelector(`[data-error="true"]`)
	if (errorField && typeof errorField.scrollIntoView === "function") {
		errorField.scrollIntoView({ behavior: "smooth", block: "center" })
	}
}

