"use client"

import type { Control, FieldValues } from "react-hook-form"
import { Forms, useFormItemColumnsCss } from "../forms"
import { cn } from "@/utils"
import { Checkbox } from "./checkbox"

export interface CheckboxsProps {
	name: string
	control: any
	columns?: 1 | 6 | 12
	className?: string
	colspan?: number | "full"
	defaultOptions: ReadonlyArray<{ label: string; value: string }>
}

const Checkboxs: React.FC<CheckboxsProps> = (props) => {
	const {
		name,
		defaultOptions: options,
		className,
		control,
		columns = 1,
		colspan
	} = props

	const columnsCss = useFormItemColumnsCss(columns)

	return (
		<div className={cn(
			"grid gap-y-3 gap-x-12",
			"grid-cols-1",
			columnsCss,
			className
		)}>
			{options && options.map((option: any, key: number) => (
				<Forms.Field
					key={key}
					control={control}
					name={name}
					render={({ field }: any) => {
						return (
							<Forms.Item
								key={key}
								className={cn(
									"flex items-start space-y-0 gap-x-2",
									option?.description && "mb-2",
								)}
								colspan={colspan}
							>
								<Forms.Control>
									<Checkbox
										name={name}
										className={cn("cursor-pointer mt-px border-2 rounded-xs")}
										checked={!!field?.value?.includes(option.value)}
										disabled={!!option.disabled}
										onCheckedChange={(checked) => checked
											? field.onChange([...(field?.value || []), option.value])
											: field.onChange(field.value?.filter((val: any) => val !== option.value))
										}
									/>
								</Forms.Control>
								<Forms.Label className="grid grid-cols-1 gap-y-2">
									<span className="text-sm font-medium">
										{option.label}
									</span>
									{option?.description && <p className="font-normal text-muted-foreground">
										{option?.description}
									</p>}
								</Forms.Label>
							</Forms.Item>
						)
					}}
				/>
			))}
		</div>

	)
}

Checkboxs.displayName = "Checkboxs"
export default Checkboxs
