"use client"

//wade 2024.12.06
import { useEffect, useRef, useState } from "react"

export interface ResizeTypes {
	width?: number | string
	height?: number | string
}

export interface DragResizeProps {
	active?: boolean
	direction?:
	| "horizontal"
	| "vertical"
	minWidth?: number
	maxWidth?: number
	minHeight?: number
	maxHeight?: number
	onInit?: (size: ResizeTypes) => void
	onResizeStart?: (size: ResizeTypes) => void
	onResizing?: (size: ResizeTypes) => void
	onResizeEnd?: (size: ResizeTypes) => void
}

export type DragResizeTypes = {
	dragRef: React.RefObject<HTMLDivElement | null>,
	resizeRef: React.RefObject<HTMLDivElement | null>
	resize?: ResizeTypes
}

export function useDragResize({
	active = true,
	direction = "horizontal",
	minWidth,
	maxWidth,
	minHeight,
	maxHeight,
	onInit,
	onResizeStart,
	onResizing,
	onResizeEnd
}: DragResizeProps
): DragResizeTypes {

	const dragRef = useRef<HTMLDivElement>(null)
	const resizeRef = useRef<HTMLDivElement>(null)

	const [resize, setResize] = useState<ResizeTypes>({ width: 0, height: 0 })

	const getResizeSizeValue = () => {
		if (!resizeRef.current) return

		const { width: w, height: h } = resizeRef.current.style
		const width = Number(w.replace("px", "")) ?? "inherit"
		const height = Number(h.replace("px", "")) ?? "inherit"

		return { width }
	}

	const setResizeValue = (clientX: number, clientY: number) => {
		if (!resizeRef.current) return

		const rect = resizeRef.current.getBoundingClientRect()
		const resizeWidth = clientX - rect.left
		const resizeHeight = clientY - rect.top

		if (direction == "horizontal"
			&& (minWidth && resizeWidth >= minWidth)
			&& (maxWidth && resizeWidth <= maxWidth)
		) {
			resizeRef.current.style.width = resizeWidth + "px"
			return { width: resizeWidth, height: undefined }
		}

		if (direction == "vertical"
			&& (minHeight && resizeWidth >= minHeight)
			&& (maxHeight && resizeWidth <= maxHeight)
		) {
			resizeRef.current.style.height = resizeHeight + "px"
			return { width: undefined, height: resizeHeight }
		}

	}

	const onInitCallback = () => {
		const resizeValue = getResizeSizeValue()
		resizeValue && onInit?.(resizeValue)
	}

	const removeEventListeners = () => {
		document.removeEventListener("mousemove", onMouseMove)
		document.removeEventListener("mouseup", onMouseUp)
	}

	const onMouseMove = (e: MouseEvent) => {
		const resizeValue = setResizeValue(e.clientX, e.clientY)
		if (!resizeValue) return
		setResize(() => ({ ...resizeValue }))
		onResizing?.(resizeValue)
	}

	const onMouseUp = () => {
		const resizeValue = getResizeSizeValue()
		resizeValue && onResizeEnd?.(resizeValue)
		removeEventListeners()
	}

	const onDragRefMouseDown = (e: MouseEvent) => {
		e.preventDefault()

		const resizeValue = getResizeSizeValue()
		resizeValue && onResizeStart?.(resizeValue)

		document.addEventListener("mousemove", onMouseMove)
		document.addEventListener("mouseup", onMouseUp)
	}

	useEffect(() => {
		if (active && dragRef.current && resizeRef.current) {
			dragRef.current.onmousedown = onDragRefMouseDown
			onInit && onInitCallback()
		}

		return () => {
			if (!dragRef?.current) return
			dragRef.current.onmousedown = null
			removeEventListeners()

		}
	}, [active])

	return { dragRef, resizeRef, resize }

}
