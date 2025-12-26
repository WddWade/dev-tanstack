"use client"

import { useMemo } from "react"
import { Radios } from "../radios"
import { Forms, useFormField } from "./form"
import { Checkboxs } from "../checkboxs"
import { Inputs } from "../inputs"
import { Textareas } from "../textareas"
import { Comboboxs } from "../comboboxs"
import { Tooltips } from "../tooltips"
import { Datepickers } from "../calendars"
import { Subeditors } from "../subeditors"
import { Asterisk, Info, InfoIcon, SearchIcon, TriangleAlert } from "lucide-react"
import { cn } from "@/utils"
import { useFormState } from "react-hook-form"

import type { InputsProps } from "../inputs"
import type { TextareasProps } from "../textareas"
import type { ComboboxsProps } from "../comboboxs"
import type { DatepickersProps } from "../calendars"
import type { RadiosProps } from "../radios"
import type { CheckboxsProps } from "../checkboxs"
import type { SubeditorsProps } from "../subeditors"
import type { Control, ControllerRenderProps, FieldValues } from "react-hook-form"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shadcn/components/ui/input-group"

export interface FieldsComponents {
	inputs: InputsProps
	textareas: TextareasProps
	selects: ComboboxsProps
	datepickers: DatepickersProps
	radios: RadiosProps
	checkboxs: CheckboxsProps
	subeditors: any
}

export interface FieldType {
	field: string
	block?: string
	component?: string
	defaultOptions?: { value: string, label: string }[]
	editors?: Record<string, any>
	_model?: string
	_type?: string
}

// React.ComponentProps<"input">

const FieldsInputs: React.FC<InputsProps> = (props) => {
	return (
		<Forms.Control>
			{/* <InputGroup className={cn("rounded")} >
				<InputGroupInput {...props} />
				<InputGroupAddon align="inline-start">
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						variant="ghost"
						aria-label="Info"
						size="icon-xs"
					>
						<InfoIcon />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup> */}
			<Inputs	{...props} />
		</Forms.Control>
	)
}

const FieldsTextareas: React.FC<TextareasProps> = (props) => {
	return (
		<Forms.Control>
			<Textareas className={cn("min-h-32 rounded")} {...props} />
		</Forms.Control>
	)
}

const FieldsSelects: React.FC<ComboboxsProps> = (props) => {
	return (<Comboboxs {...props} />)
}

const FieldsRadios: React.FC<RadiosProps> = (props) => {

	return (
		<Forms.Control>
			<Radios className="mt-4" {...props} />
		</Forms.Control>
	)
}

const FieldsDatepickers: React.FC<DatepickersProps> = (props) => {
	return (<Datepickers {...props} />)
}

const FieldsCheckboxs: React.FC<CheckboxsProps> = (props) => {
	return (
		<Checkboxs className="mt-4" {...props} />
	)
}

const FieldsSubeditors: React.FC<SubeditorsProps> = (props) => {

	const { defaultValues } = useFormState()

	return (
		<Forms.Control>
			<Subeditors id={defaultValues?.id || null} {...props} />
		</Forms.Control>
	)
}

export interface InformationProps {
	label?: React.ReactNode
	tips?: React.ReactNode
	description?: React.ReactNode
	isInforcomponent?: boolean
	required?: boolean
	className?: string
}

const FieldsMessage: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => {
	return (
		<Forms.Message className={cn("mt-2 whitespace-nowrap", className)} {...props} />
	)
}

const FieldsDescription: React.FC<React.ComponentProps<"p">> = ({ className, ...props }) => {
	return (<Forms.Description className={cn("flex items-center gap-x-2 mb-4",)} {...props} />)
}

const FieldsInformation: React.FC<InformationProps> = (props) => {

	const {
		label,
		tips = "This is fields tips or required tips.",
		// description = "This is fields tips or required tips, this is fields tips or required tips, this is fields tips or required tips, this is fields tips or required tips, this is fields tips or required tips, this is fields tips or required tips",
		description,
		required,
		className
	} = props

	const { isDirty } = useFormField()

	return (<>{label ?
		<Forms.Label className={cn(
			"flex",
			"w-fit",
			"mb-2.5",
			"gap-x-1",
			"relative",
			"[&>span]:text-mini-13",
			"[&>span]:font-medium",
			isDirty && [
				"after:rounded-2xl",
				"after:size-1.5",
				"after:bg-green-500",
				"after:-top-0.5",
				"after:-right-2",
				"after:z-1",
				"after:absolute",
			],
		)}
		>
			<span>{label}</span>
			{tips ?
				<Tooltips.Root>
					<Tooltips.Trigger className="group" onClick={(e) => {
						e.preventDefault()
						return
					}}
					>
						<Info strokeWidth={2.5} className={cn(
							"w-2",
							"size-3.5",
							"-mt-0.5",
							"group-data-[state=delayed-open]:opacity-100",
							required ? "text-destructive" : "opacity-30",
						)}
						/>
					</Tooltips.Trigger>
					<Tooltips.Content className="rounded text-xs">
						<p>{tips}</p>
					</Tooltips.Content>
				</Tooltips.Root>
				: null
			}

		</Forms.Label> : null}
		{description && <FieldsDescription children={description} />}
	</>
	)
}


export type FieldsGenerateProps<
	T extends keyof FieldsComponents,
> = FieldsComponents[T] & {
	component: T
	control: Control<Record<string, any>, any, Record<string, any>>
	field: ControllerRenderProps<FieldValues, any>
	modal?: boolean
}

const FieldsComponentGenerate = <T extends keyof FieldsComponents>(
	props: FieldsGenerateProps<T>
) => {

	const {
		modal,
		fieldsProps,
		field: formFields,
		control,
		component,
	} = props

	const {
		label,
		tips,
		description,
		// description = "Use a permanent address where you can receive mail.",
		required,
		className,
		...compomentProps
	} = fieldsProps

	const informationProps = { label, tips, required, description, className }

	return (
		<>
			{component == "inputs" && <>
				<FieldsInformation {...informationProps} />
				<FieldsInputs
					{...compomentProps}
					{...formFields}
					value={formFields?.value ?? ""}
				/>
				<FieldsMessage /></>
			}
			{component == "textareas" && <>
				<FieldsInformation	{...informationProps} />
				<FieldsTextareas
					{...compomentProps}
					{...formFields}
					value={formFields?.value ?? ""}
				/></>
			}
			{component == "selects" && <>
				<FieldsInformation	{...informationProps} />
				<FieldsSelects
					{...compomentProps}
					{...formFields}
					search
					formComponent
					modal={modal}
				// value={formFields?.value
				// 	? formFields?.value
				// 	: fieldsProps?.multiple
				// 		? []
				// 		: ""
				// }
				/>
				<FieldsMessage /></>
			}
			{component == "datepickers" && <>
				<FieldsInformation {...informationProps} />
				<FieldsDatepickers
					{...compomentProps}
					{...formFields}
					description={"This is the language that will be used in the dashboard."}
					formComponent
				/>
				<FieldsMessage /></>
			}
			{component == "radios" && <>
				<FieldsInformation	{...informationProps} />
				<FieldsRadios
					{...compomentProps}
					{...formFields}
				/></>
			}
			{component == "checkboxs" && <>
				<FieldsInformation	{...informationProps} />
				<FieldsCheckboxs
					{...compomentProps}
					{...formFields}
					control={control}
				/>
				<FieldsMessage /></>
			}
			{component == "subeditors" && <>
				<FieldsInformation {...informationProps} />
				<FieldsSubeditors
					{...compomentProps}
					{...formFields}
				// formComponent
				/>
				<FieldsMessage /></>
			}
		</>
	)
}

export {
	FieldsInformation,
	FieldsComponentGenerate
}

export const FormComponents = {
	Informeatio: FieldsInformation,
	Inputs: FieldsInputs,
	Textareas: FieldsTextareas,
	Selects: FieldsSelects,
	Radios: FieldsRadios,
	Checkboxs: FieldsCheckboxs
}







