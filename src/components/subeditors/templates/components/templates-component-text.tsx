"use client"

import { cn } from "@/utils"
import type { TemplatesComponentsProps } from "../templates-components"

interface TemplatesComponentTextProps extends TemplatesComponentsProps { }

export const TemplatesComponentText: React.FC<TemplatesComponentTextProps> = (props) => {

	const {
		label,
		field,
		value,
		defaultsValue,
		...restProps
	} = props

	if (!value && !defaultsValue) return null

	return (
		<div
			data-templates="templates-text"
			className={cn("flex flex-row items-center justify-start")}
			{...restProps}
		>
			{label && <span className={cn([
				"font-medium flex flex-row after:content-[':'] after:px-1.5"
			])}>{label}</span>}

			<span className={cn("flex flex-row gap-x-2")}>
				{value ?? defaultsValue}
			</span>
		</div>
	)
}
