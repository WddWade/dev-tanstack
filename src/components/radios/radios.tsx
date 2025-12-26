
"use client"

import { memo, useEffect } from "react"
import { Forms, useFormItemColumnsCss } from "../forms"
import { RadiosGroup } from "./radio-group"
import { cn } from "@/utils"

export interface RadiosProps {
	name: string
	value?: string
	onChange: any
	className?: string
	columns?: 1 | 6 | 12
	colspan?: number | "full"
	defaultOptions: ReadonlyArray<{ label: string; value: string }>,
}

const Radios: React.FC<RadiosProps> = memo((props) => {

	const {
		value = "",
		defaultOptions: options,
		className,
		onChange,
		columns = 6,
		colspan = "full"
	} = props

	const columnsCss = useFormItemColumnsCss(columns)

	return (
		<RadiosGroup.Root
			required
			onValueChange={onChange}
			defaultValue={value}
			className={cn(
				"grid",
				"gap-y-3",
				"gap-x-12",
				"grid-cols-1",
				columnsCss,
				className
			)}
		>
			{options && options.map((
				option: any,
				key: number
			) =>
				<Forms.Item
					key={key}
					className={cn(
						"flex items-start space-y-0 gap-x-2",
						option?.description && "mb-2",
					)}
					colspan={colspan}
				>
					<Forms.Control>
						<RadiosGroup.Radio
							value={option.value}
							checked={!value ? option.defaults : value == option.value}
							disabled={!!option.disabled}
							className={cn(
								"cursor-pointer border-2 mt-px",
								value == option?.value && [
									"border-black",
								]
							)}
						/>
					</Forms.Control>
					<Forms.Label className="grid grid-cols-1 gap-y-2">
						<span className="text-sm font-medium">
							{option.label}
						</span>
						{option?.description && <p className="font-normal text-muted-foreground">
							{option?.description}
						</p>}
						<Forms.Message className="mt-2" />
					</Forms.Label>
				</Forms.Item>
			)}
		</RadiosGroup.Root>
	)
})

Radios.displayName = "Radios"
export default Radios
