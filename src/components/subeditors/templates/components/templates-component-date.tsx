"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { zhTW } from "date-fns/locale"
import { cn } from "@/utils"
import type { TemplatesComponentsProps } from "../templates-components"

interface TemplatesComponentDateProps extends TemplatesComponentsProps {
	formats?: string
	today?: boolean
}

export const TemplatesComponentDate: React.FC<TemplatesComponentDateProps> = ({
	label,
	field,
	value,
	defaultsValue,
	formats = "yyyy/MM/dd eeee p",
	today,
	...props
}) => {

	// if (!value && !defaultsValue) return null

	const date = useMemo(() => {
		if (!value || today) return format(new Date(), formats, { locale: zhTW })
		if (value) return format(new Date(value), formats, { locale: zhTW })
	}, [value])

	return (
		<div
			data-templates="templates-paragraph"
			className={cn("flex flex-row items-start justify-start")}
			{...props}
		>
			{label && <span className={cn([
				"font-medium flex flex-row after:content-[':'] after:px-1.5"
			])}>{label}</span>}

			<span className={cn("flex flex-row gap-x-2")}>
				{date}
			</span>
		</div>
	)
}
