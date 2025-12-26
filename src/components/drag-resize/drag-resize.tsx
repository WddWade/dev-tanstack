"use client"

import { memo, useCallback, useMemo, useState } from "react"
import { useDragResize, DragResizeProps, ResizeTypes, useCookies } from "@/hooks"
import { DragResizeContext } from "./drag-resize-context"
import { cn } from "@/utils"
import { RESIZE_COOKIES_NAME } from "@/beones.config"
import { AsPropsTypes } from "@/types"

type PropsTypes<
	T extends React.ElementType = "div"
> = AsPropsTypes<T, {
	as?: React.ElementType
	children: React.ReactNode
	defaultWidth?: number
	defaultHeight?: number
	className?: string
	handlerClassName?: string
	isResizeStore?: boolean
	resizeStoreKey?: string
	resizeStoreValue?: ResizeTypes
} & DragResizeProps>

const DragResizeBase = <
	T extends React.ElementType = "div"
>(
	props: PropsTypes<T>
) => {

	const {
		as,
		children,
		defaultWidth,
		defaultHeight,
		className,
		handlerClassName,
		resizeStoreKey,
		resizeStoreValue,
		isResizeStore = true,

		active = true,
		direction = "horizontal",
		minWidth = 500,
		maxWidth = 950,
		onInit,
		onResizeStart,
		onResizing,
		onResizeEnd,
		...othersProps
	} = props

	const RootComponent: React.ElementType = as || "div"

	const [isActive, setActive] = useState(active)
	const { setCookies, deleteCookies, getCookies } = useCookies()

	const isCookieStore = useMemo(() => isResizeStore
		&& resizeStoreKey
		&& resizeStoreKey !== ""
		? true : false, [isResizeStore, resizeStoreKey])

	const resizeDefauleStyles = useMemo(() => {
		if (!isCookieStore || !resizeStoreValue) return {
			width: minWidth + "px",
			// height: minHeight + "px"
		}

		const { width, height } = resizeStoreValue
		return {
			width: width ? width + "px" : "inherit",
			height: height ? height + "px" : "inherit",
		}

	}, [isCookieStore, resizeStoreValue])

	const onResizeEndHandler = useCallback((size: ResizeTypes) => {
		onResizeEnd?.(size)

		if (!isCookieStore) return

		const resizeCookies = getCookies(RESIZE_COOKIES_NAME)
		const resizeStores = resizeCookies ? JSON.parse(resizeCookies) : {}
		const resizeStoreName = resizeStoreKey as string

		resizeStores[resizeStoreName] = {}
		resizeStores[resizeStoreName] = { ...size }

		setCookies(RESIZE_COOKIES_NAME, JSON.stringify(resizeStores))

	}, [isCookieStore, onResizeEnd, isResizeStore])

	//Hooks
	const { dragRef, resizeRef } = useDragResize({
		active: isActive,
		direction,
		minWidth,
		maxWidth,
		onInit,
		onResizeStart,
		onResizing,
		onResizeEnd: onResizeEndHandler,
	})


	//Context Functions
	const setResizeActive = useCallback((active: boolean) =>
		setActive(active), [])

	const setResizeClose = useCallback((active: boolean) => {
		if (!resizeRef.current) return

		// resizeRef.current.style.width = active0 + "px"
		// resizeRef.current.style.height = minHeight + "px"
		clearResizeStore()
	}, [])

	const clearResizeStore = useCallback(() => resizeStoreKey
		? deleteCookies(resizeStoreKey)
		: console.error("resizeStoreKey is not undefined"), [])

	const defaultResizeSize = useCallback(() => {
		if (!resizeRef.current) return

		resizeRef.current.style.width = minWidth + "px"
		// resizeRef.current.style.height = minHeight + "px"
		clearResizeStore()
	}, [])

	const contextValue = useMemo(() => ({
		setResizeActive,
		clearResizeStore,
		defaultResizeSize
	}), [
		setResizeActive,
		clearResizeStore,
		defaultResizeSize
	])

	return (
		<DragResizeContext value={contextValue}>
			<RootComponent
				{...othersProps}
				data-components="drag-resize-root"
				ref={resizeRef}
				className={cn(
					"w-[inherit]",
					"h-[inherit]",
					"flex",
					"flex-row",
					className
				)}
				style={resizeDefauleStyles}
			>
				<div
					data-components="drag-resize-container"
					className={cn(
						"w-[inherit]",
						"h-[inherit]",
					)}
				>{children}</div>
				<div
					data-components="drag-resize-handler"
					ref={dragRef}
					className={cn(
						"w-0",
						"h-full",
						"relative",
						"z-2",
						"hover:before:cursor-ew-resize",
						"hover:before:opacity-100",

						"before:w-1",
						"before:h-full",
						"before:absolute",
						"before:z-1",
						"before:opacity-0",
						"before:duration-500",
						"before:transition-opacity",
						"before:ease-in-out",
						"before:bg-black",
						handlerClassName
					)}
				/>
			</RootComponent>
		</DragResizeContext>
	)
}

const DragResize = memo(DragResizeBase) as React.MemoExoticComponent<typeof DragResizeBase>

DragResize.displayName = "DragResize"
export default DragResize
