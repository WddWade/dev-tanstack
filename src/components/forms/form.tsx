"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { Slot } from "@radix-ui/react-slot"
import { TriangleAlert } from "lucide-react"
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form"
import { Labels } from "@/components"
import { FieldsComponentGenerate } from "./form-components"
import type {
	FieldValues,
	FieldPath,
	ControllerProps,
	UseFormHandleSubmit,
	UseFormReset
} from "react-hook-form"
import { cn } from "@/utils"


const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState } = useFormContext()
	const formState = useFormState({ name: fieldContext.name })
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

const useFormItemColumnsCss = (
	columns?: number
) => columns ? {
	1: "@2xl/editorsviews:grid-cols-1",
	2: "@2xl/editorsviews:grid-cols-2",
	3: "@2xl/editorsviews:grid-cols-3",
	4: "@2xl/editorsviews:grid-cols-4",
	5: "@2xl/editorsviews:grid-cols-5",
	6: "@2xl/editorsviews:grid-cols-6",
	7: "@2xl/editorsviews:grid-cols-7",
	8: "@2xl/editorsviews:grid-cols-8",
	9: "@2xl/editorsviews:grid-cols-9",
	10: "@2xl/editorsviews:grid-cols-10",
	11: "@2xl/editorsviews:grid-cols-11",
	12: "@2xl/editorsviews:grid-cols-12",
}[columns] : "@2xl/editorsviews:grid-cols-1"

const useFormItemColspanCss = (
	colspan?: number | "full"
) => colspan ? {
	full: "@2xl/editorsviews:col-span-full",
	1: "@2xl/editorsviews:col-span-1",
	2: "@2xl/editorsviews:col-span-2",
	3: "@2xl/editorsviews:col-span-3",
	4: "@2xl/editorsviews:col-span-4",
	5: "@2xl/editorsviews:col-span-5",
	6: "@2xl/editorsviews:col-span-6",
	7: "@2xl/editorsviews:col-span-7",
	8: "@2xl/editorsviews:col-span-8",
	9: "@2xl/editorsviews:col-span-9",
	10: "@2xl/editorsviews:col-span-10",
	11: "@2xl/editorsviews:col-span-11",
	12: "@2xl/editorsviews:col-span-12",
}[colspan] : "@2xl/editorsviews:col-span-full"

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

function FormItem({
	className,
	colspan,
	...props
}: React.ComponentProps<"div"> & {
	colspan?: number | "full"
}) {
	const id = React.useId()

	const colspanCss = useFormItemColspanCss(colspan)

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn(
					`col-span-full`,
					colspanCss,
					className
				)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField()

	return (
		<Labels
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField()

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-xs", className)}
			{...props}
		/>
	)
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message ?? "") : props.children

	if (!body) {
		return null
	}

	return (
		<span
			data-slot="form-message"
			id={formMessageId}
			className={cn("col-span-full text-destructive text-xs flex flex-row gap-x-1 items-center", className)}
			{...props}
		>
			<TriangleAlert className="size-4.5 text-red-600" />
			{body}
		</span>
	)
}


export interface ControllersProps {
	submit: UseFormHandleSubmit<Record<string, unknown>, Record<string, unknown>>
	reset: UseFormReset<Record<string, unknown>>
}

export interface FormControllersProps {
	render: (props: ControllersProps) => React.ReactNode
}



export const FormControllers: React.FC<FormControllersProps> = ({ render }) => {
	const { handleSubmit: submit, reset } = useFormContext()
	return (<>{render ? render({ submit, reset }) : null}</>)
}

export type FormBlockProps = {
	children: React.ReactNode
	className?: string
	title?: React.ReactNode
	description?: React.ReactNode
	columns?: 1 | 6 | 12
}

export const FormBlock: React.FC<FormBlockProps> = ({
	className,
	children,
	title,
	description,
	columns = 6
}) => {

	const BlockTitle = (title: string | React.ReactNode) => typeof title == "string"
		? <h3 data-slot="form-block-title" className={cn("text-base", "font-medium", "text-gray-900")}>{title}</h3 >
		: title

	const BlockDescription = (description: string | React.ReactNode) => typeof title == "string"
		? <p data-slot="form-block-description" className={cn("text-sm/6", "text-gray-600")}>{description}</p>
		: description

	const columnsCss = columns
		? {
			1: "@2xl/editorsviews:grid-cols-1",
			2: "@2xl/editorsviews:grid-cols-2",
			3: "@2xl/editorsviews:grid-cols-3",
			4: "@2xl/editorsviews:grid-cols-4",
			5: "@2xl/editorsviews:grid-cols-5",
			6: "@2xl/editorsviews:grid-cols-6",
			7: "@2xl/editorsviews:grid-cols-7",
			8: "@2xl/editorsviews:grid-cols-8",
			9: "@2xl/editorsviews:grid-cols-9",
			10: "@2xl/editorsviews:grid-cols-10",
			11: "@2xl/editorsviews:grid-cols-11",
			12: "@2xl/editorsviews:grid-cols-12",
		}[columns]
		: "@2xl/editorsviews:grid-cols-1"

	return (
		<div
			data-slot="form-block"
			className={cn(
				"flex",
				"flex-col",
				"gap-y-8",
				className,
			)}
		>
			{title || description ? <div
				className={cn(
					"flex-1",
					"space-y-3",
				)}
			>
				{title && BlockTitle(title)}
				{description && BlockDescription(description)}
			</div> : null}

			{children ? <div
				data-slot="form-block-container"
				className={cn(
					"flex-1",
					"grid",
					"gap-x-6",
					"gap-y-8.5",
					"items-start",
					"justify-start",
					`grid-cols-1`,
					columnsCss,
				)}
			>
				{children}
			</div> : null}
		</div>
	)
}


export type FormFieldsetProps = {
	children: React.ReactNode
	className?: string
	label?: React.ReactNode
	tips?: React.ReactNode
	description?: React.ReactNode
	required?: boolean
	colspan?: number | "full"
	columns?: 1 | 6 | 12
}

// TODO 未來墟整合Field Information/Field Messages
// export const FormFieldsBase: React.FC<FormFieldsetProps> = ({
// 	className,
// 	children,
// 	label,
// 	tips = "This is fields tips or required tips.",
// 	required,
// 	description,
// 	colspan = 3,
// 	columns = 6
// }) => {

// 	return (
// 		<div className={cn(
// 			"space-y-2.5",
// 			"col-span-full",
// 			`sm:col-span-${colspan}`,
// 			className
// 		)}>
// 			<FieldsInformation
// 				label={label}
// 				tips={tips}
// 				description={description}
// 				required={required}
// 			/>

// 			<div className={cn(
// 				"grid",
// 				"gap-2.5",
// 				`grid-cols-1`,
// 				`sm:grid-cols-${columns}`,
// 			)}
// 			>
// 				{children}
// 			</div>
// 			{description ?
// 				<Forms.Description className="mt-1.5">
// 					Use a permanent address where you can receive mail.
// 				</Forms.Description>
// 				: null
// 			}
// 			{/* <Forms.Message className="mt-1.5" /> */}
// 		</div >
// 	)

// }

export {
	useFormField,
	useFormItemColspanCss,
	useFormItemColumnsCss
}

export const Forms = {
	Root: Form,
	Component: FieldsComponentGenerate,
	Item: FormItem,
	Label: FormLabel,
	Block: FormBlock,
	Control: FormControl,
	Controllers: FormControllers,
	Description: FormDescription,
	Message: FormMessage,
	Field: FormField,
	// Fieldset: FormFieldsBase,
}
