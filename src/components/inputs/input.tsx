import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils"

const inputsVariants = cva([
	"w-full",
	"min-w-0",

	"bg-transparent",

	"border",
	"rounded",
	"border-input",
	"dark:bg-input/30",

	"flex",

	"text-base",
	"md:text-sm",

	"placeholder:text-muted-foreground",

	"selection:bg-primary",
	"selection:text-primary-foreground",

	"file:inline-flex",
	"file:text-foreground",
	"file:h-7",
	"file:border-0",
	"file:bg-transparent",
	"file:text-sm",
	"file:font-medium",

	"disabled:pointer-events-none",
	"disabled:cursor-not-allowed",
	"disabled:opacity-50",

	"aria-invalid:ring-destructive/20",
	"aria-invalid:border-destructive",
	"dark:aria-invalid:ring-destructive/40",
], {
	variants: {
		variant: {
			default: [
				"shadow-xs",
				"outline-none",
				"transition-[color,box-shadow]",
				"focus-visible:border-ring",
				"focus-visible:ring-ring/50",
				"focus-visible:ring-[3px]",
			],
			underline: [
				"shadow-none",
				"border-0",
				"border-b-1",
				"border-b-ring/50",
				"rounded-none",
				"focus-visible:outline-0",
				"focus-visible:border-b-1",
				"focus-visible:border-black",
				"px-1",
			]

		},
		size: {
			default: [
				"px-3",
				"py-1",
				"h-9",
			],
			underline: [
				"px-0",
				"py-1",
				"h-9",
			]
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	}
})

export type InputsProps =
	Omit<React.ComponentProps<"input">, "size">
	& VariantProps<typeof inputsVariants>

function Inputs({
	className,
	variant,
	size,
	type,
	...props
}: InputsProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(inputsVariants({
				variant, size,
				className,
			}))}
			{...props}
		/>
	)
}

export { Inputs }
