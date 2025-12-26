"use client"

import { useId, useMemo } from "react"
import { z } from "zod"
import type { FieldType } from "./form-components"
import type { FormFields } from "@/components"

export const stringArrayComponents = ["selects", "checkboxs"]
export const objectsArrayComponents = ["subeditors"]
export const subDatasComponents = ["subeditors"]
export const dateComponents = ["datepickers"]
export const hiddenComponents = ["hidden"]

export interface FormsSchemasProps {
	formsFields: FieldType[]
}

export const useFormsSchemas = ({ formsFields }: FormsSchemasProps) => {

	const { formsZodSchemas, defaultValueSchemas } = useMemo(() => {
		return formsSchemas(formsFields)
	}, [formsFields])

	const defaultValues = { ...defaultValueSchemas, id: "create_" + useId() }
	return { formsZodSchemas, defaultValues }
}

export const formsSchemas = (formsFields: FieldType[]) => {
	const valuesSchemas: Record<string, any> = {}
	const zodSchemas: Record<string, any> = {}

	formsFields?.forEach((fieldProps: any) => {

		let fieldSchema

		const {
			block,
			field,
			component,
			multiple,
			required,
			max,
			min,
			length,
			verify,
			_type,
			_model,
		} = fieldProps

		const isStringArrayComponent = stringArrayComponents.includes(component)
		const isObjectsArrayComponent = objectsArrayComponents.includes(component)
		const isHiddenComponent = hiddenComponents.includes(component)
		const isDateComponent = dateComponents.includes(component)

		if (isObjectsArrayComponent) {
			valuesSchemas[field] = []

			fieldSchema = objectsArraySchema()
			fieldSchema = !!required
				? fieldSchema.nonempty({ error: "不可為空值" })
				: fieldSchema.optional()

		} else if (isStringArrayComponent && !!multiple) {
			valuesSchemas[field] = []
			fieldSchema = stringArraySchema(length ?? 0)
			fieldSchema = !!required
				? fieldSchema.nonempty({ error: "不可為空值" })
				: fieldSchema.optional()


		} else if (isDateComponent) {
			valuesSchemas[field] = null
			fieldSchema = z.date({ error: "日期為必填項目" })

		} else if (isHiddenComponent) {
			fieldSchema = field == "id"
				? z.union([z.string(), z.number()]).refine(
					(val) => val !== "" && val !== undefined,
					{ message: "id必填項目" }
				)
				: z.any().optional()
		} else {
			// string type fields
			valuesSchemas[field] = ""
			fieldSchema = z.string({ error: "輸入格式錯誤" })

			if (typeof length == "number") {
				fieldSchema = fieldSchema.length(length, {
					message: isStringArrayComponent
						? `必須選擇 ${length} 個選項`
						: `必須輸入 ${length} 個字元`,
				})

			} else {
				if (typeof min == "number") {
					fieldSchema = fieldSchema.min(min, {
						message: isStringArrayComponent
							? `至少選擇 ${min} 個選項`
							: `至少輸入 ${min} 個字元`,
					})
				}
				if (typeof max == "number") {
					fieldSchema = fieldSchema.max(max, {
						message: isStringArrayComponent
							? `最多選擇 ${max} 個選項`
							: `最多輸入 ${max} 個字元`,
					})
				}
			}

			if (!!required) fieldSchema = fieldSchema.nonempty({ error: "不可為空值" })
			else fieldSchema = fieldSchema.optional()
		}

		zodSchemas[field] = fieldSchema
	})

	return {
		defaultValueSchemas: valuesSchemas,
		formsZodSchemas: z.object(zodSchemas) as z.ZodObject<Record<string, z.ZodTypeAny>>,
	}
}

export const transFormFields = (forms: FormFields[]) => {
	return forms
		? [
			{ field: "id", required: 0, component: "hidden" },
			{ field: "_actions", required: 0, component: "hidden" },
			...forms.reduce((init: any[], block: any) => [
				...(init || {}), ...block.fields.map((blockField: any) => ({
					...blockField, block: block.tabName, blockId: block.id
				}))], [])
		] : [
			{ field: "id", required: 0, component: "hidden" },
			{ field: "_actions", required: 0, component: "hidden" },
		]
}

export const stringArraySchema = (length: number) => {
	return z
		.array(z.string().refine(val => val.trim().length > length,
			{ error: "選項遺失必要Value" }),
			{ error: "輸入格式錯誤，請選擇選項" })
		.refine((arr) => new Set(arr).size == arr.length,
			{ error: "選項不可重複" })
}

export const objectsArraySchema = () => {
	return z.array(z.object({}).loose(), { message: "輸入格式錯誤" }).refine(
		(arr) => new Set(arr.map((obj) => JSON.stringify(obj))).size === arr.length, {
		message: "選項不可重複",
	})
}


