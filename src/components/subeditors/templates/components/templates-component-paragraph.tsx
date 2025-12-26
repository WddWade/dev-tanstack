"use client"

import { cn } from "@/utils"
import type { TemplatesComponentsProps } from "../templates-components"

interface TemplatesComponentParagraphProps extends TemplatesComponentsProps {
	className?: string
}

export const TemplatesComponentParagraph: React.FC<TemplatesComponentParagraphProps> = ({
	label,
	field,
	value,
	defaultsValue,
	className,
	...props
}) => {

	if (!value && !defaultsValue) return null

	return (
		<div
			data-templates="templates-paragraph"
			className={cn("flex flex-row items-start justify-start", className)}
			{...props}
		>
			{label && <span className={cn([
				"font-medium flex flex-row after:content-[':'] after:px-1.5"],
			)}>{label}</span>}

			<p className={cn(
				"text-black/80 whitespace-pre-wrap",
				"relative",
				"pl-7",
				"before:absolute",
				"before:top-0",
				"before:left-0",
				"before:bg-black/5",
				"before:h-full",
				"before:w-2.5",
			)}>{value ?? defaultsValue}</p>
		</div>
	)
}
