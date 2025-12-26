"use client"

import { createContext, use } from "react"
import { useDraggable, useDndContext } from "@dnd-kit/core"

export type PositionsType = { x?: number; y?: number }

export interface DragBoxsContextType {
	id: string
	positions: PositionsType
}

export const DragBoxsContext = Object.assign(
	createContext<DragBoxsContextType | undefined>(undefined),
	{ displayName: "DragBoxsContext" }
)

export const useDragBoxsContext = () => {
	const context = use(DragBoxsContext)
	if (context) return context
	throw new Error('useDragPanel must be used inside provider')
}

export { useDraggable, useDndContext }
