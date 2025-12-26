import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const buttonVariants = cva([
	"shrink-0",
	"inline-flex",
	"items-center",
	"justify-center",
	"gap-2",

	"whitespace-nowrap",
	"text-sm",
	"font-medium",
	"rounded-md",
	"outline-none",
	"disabled:pointer-events-none",
	"disabled:opacity-50",
	"transition-all",

	"[&_svg]:shrink-0",
	"[&_svg:not([class*='size-'])]:size-4",
	"[&_svg]:pointer-events-none",

	"focus-visible:border-ring",
	"focus-visible:ring-ring/50",
	"focus-visible:ring-[3px]",

	"dark:aria-invalid:ring-destructive/40",
	"aria-invalid:ring-destructive/20",
	"aria-invalid:border-destructive",

	//customer options
	"cursor-pointer"
], {
	variants: {
		variant: {
			default: [
				"bg-primary",
				"text-primary-foreground",
				"shadow-xs",
				"hover:bg-primary/90"
			],
			destructive: [
				"bg-destructive",
				"text-white",
				"hover:bg-destructive/90",
				"focus-visible:ring-destructive/20",
				"dark:focus-visible:ring-destructive/40",
				"dark:bg-destructive/60",

				//customer options
				"shadow-xs",
			],
			outline: [
				"border",
				"bg-background",
				"shadow-xs",
				"hover:bg-accent",
				"hover:text-accent-foreground",
				"dark:bg-input/30",
				"dark:border-input",
				"dark:hover:bg-input/50"
			],
			secondary: [
				"bg-secondary",
				"text-secondary-foreground",
				"shadow-xs",
				"hover:bg-secondary/80"
			],
			ghost: [
				"hover:bg-accent",
				"hover:text-accent-foreground",
				"dark:hover:bg-accent/50"
			],
			link: [
				"text-primary",
				"underline-offset-4",
				"hover:underline"
			],

			//customer options
			ghost_customer: [
				"uppercase",
				"text-foreground",
				"bg-transparent",
				"rounded-none",
				"select-none",

				"relative",
				"hover:before:w-full",
				"before:duration-300",
				"before:absolute",
				"before:-bottom-0.5",
				"before:left-0",
				"before:w-0",
				"before:h-0.5",
				"before:bg-black",
				"focus-visible:ring-black",
				"focus-visible:ring-2",
				"focus-visible:ring-offset-4",

				"data-[controllers-action=delete]:text-destructive",
				"data-[controllers-action=delete]:before:bg-destructive",
			],

			//customer options
			icon_customer: [
				"uppercase",
				"text-foreground",
				"bg-transparent",
				"rounded-none",
				"select-none",
				"block",

				"rounded-none",
				"hover:bg-transparent",

				"data-[controllers-action=delete]:text-destructive",
				"data-[controllers-action=delete]:before:bg-destructive",
			],
		},
		size: {
			default: [
				"h-9",
				"px-4",
				"py-2",
				"has-[>svg]:px-3"
			],
			sm: [
				"h-8",
				"rounded-md",
				"gap-1.5",
				"px-3",
				"has-[>svg]:px-2.5",
				"size-8",
			],
			lg: [
				"h-10",
				"rounded-md",
				"px-6",
				"has-[>svg]:px-4",
				"size-10"
			],
			icon: [
				"size-9"
			],

			//customer options
			sm_customer: [
				"p-0",
				"text-xs",
				"font-semibold",
				"h-fit",
				"lending-1",
			],

			//customer options
			icon_customer: [
				"w-fit",
				"m-0",
				"p-0",
				"h-fit",
				"text-xs",
				"font-semibold",
			],
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
})

function Buttons({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { buttonVariants }
export { Buttons }
