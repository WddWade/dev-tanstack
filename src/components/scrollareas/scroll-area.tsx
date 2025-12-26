"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/utils"


type ScrollAreaPropsType = React.ComponentProps<
	typeof ScrollAreaPrimitive.Root
> & {
	ref?: React.Ref<HTMLDivElement>
	viewportClassName?: string
	barClassName?: string
	thumbClassName?: string

	forceMount?: true
	orientation: "horizontal" | "vertical"
}

function ScrollArea(props: ScrollAreaPropsType) {

	const {
		ref,
		className,
		viewportClassName,
		barClassName,
		thumbClassName,

		forceMount,
		orientation = "vertical",

		children,
		...restProps
	} = props


	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn(
				"relative",
				className
			)}
			{...restProps}
		>
			<ScrollAreaPrimitive.Viewport
				ref={ref}
				data-slot="scroll-area-viewport"
				className={cn(
					"scroll-smooth",
					"focus-visible:ring-ring/50",
					"size-full",
					"rounded-[inherit]",
					"transition-[color,box-shadow]",
					"outline-none",
					"focus-visible:ring-[3px]",
					"focus-visible:outline-1",
					viewportClassName
				)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar
				forceMount={forceMount}
				orientation={orientation}
				thumbClassName={thumbClassName}
			/>
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	)
}


type ScrollBarPropsType = React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
	thumbClassName?: string
}

function ScrollBar(props: ScrollBarPropsType) {

	const {
		className,
		orientation = "vertical",
		thumbClassName,
		...restProps
	} = props

	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cn(
				"flex",
				"touch-none",
				"p-px",
				"transition-colors",
				"select-none",
				orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
				orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
				className,
			)}
			{...restProps}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot="scroll-area-thumb"
				className={cn(
					"bg-border",
					"relative",
					"flex-1",
					"rounded-full",
					thumbClassName
				)}
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	)
}

export const ScrollAreas = {
	Root: ScrollArea,
	Handle: ScrollBar
}
