"use client"

import { memo, useCallback, useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { DndContext } from "@dnd-kit/core"
import { DragBoxsContext } from "./drag-boxs-context"
import type { PositionsType } from "./drag-boxs-context"
import type { DragEndEvent, Modifier } from "@dnd-kit/core"

export interface PropsTypes {
	defaultPosX?: number
	defaultPosY?: number
	children: React.ReactNode
}

const DragBoxsBase = (props: PropsTypes) => {

	const {
		defaultPosX = 0,
		defaultPosY = 0,
		children
	} = props

	const id = useId()

	const [isMounded, setMounded] = useState(false)
	const [positions, setPositions] = useState<PositionsType>({
		x: defaultPosX,
		y: defaultPosY
	});

	const dragEndEvent = useCallback((event: DragEndEvent) => {
		const { delta, active } = event
		const id = active.id

		setPositions((prev) => ({
			...prev,
			x: prev.x as number + delta.x,
			y: prev.y as number + delta.y,
		}))
	}, [])

	const dragModifiers: Modifier = useCallback(({ transform, activeNodeRect }: any) => {
		if (!activeNodeRect) return transform

		const boxWidth = activeNodeRect.width
		const boxHeight = activeNodeRect.height

		const originalLeft = activeNodeRect.left
		const originalTop = activeNodeRect.top

		const maxX = window.innerWidth - (originalLeft + boxWidth)
		const maxY = window.innerHeight - (originalTop + boxHeight)
		const minX = -originalLeft
		const minY = -originalTop

		return {
			x: Math.min(Math.max(transform.x, minX), maxX),
			y: Math.min(Math.max(transform.y, minY), maxY),
		}
	}, [])

	const resizeNextPositions = useCallback((
		target: HTMLElement,
		prev?: PositionsType
	) => {

		if (typeof window !== "undefined" && target) {
			const {
				x: currentX = 0,
				y: currentY = 0
			} = prev || {}

			const { innerWidth, innerHeight } = window
			const { clientWidth, clientHeight } = target

			const maxX = innerWidth - clientWidth
			const maxY = innerHeight - clientHeight

			return {
				x: Math.min(currentX, maxX < 0 ? 0 : maxX),
				y: Math.min(currentY, maxY < 0 ? 0 : maxY),
			}
		}

		return { ...prev }
	}, [])

	const resizeEvent = useCallback(() => {
		const target = document.getElementById(id);
		if (target) setPositions((prev) => resizeNextPositions(target, prev))
	}, [])

	useEffect(() => {
		setMounded(true)
		window.addEventListener("resize", resizeEvent)
		return () => window.removeEventListener("resize", resizeEvent)
	}, [])

	return (
		<>
			{isMounded ? createPortal(
				<DndContext onDragEnd={dragEndEvent} modifiers={[dragModifiers]}>
					<DragBoxsContext value={{ id, positions }}>
						<div data-components="dragboxs-root">{children}</div>
					</DragBoxsContext>
				</DndContext>, document.body) : null
			}
		</>

	)
}

const DragBoxs = memo(DragBoxsBase) as React.MemoExoticComponent<typeof DragBoxsBase>

DragBoxs.displayName = "DragBoxs"
export default DragBoxs
