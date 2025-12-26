"use client"

import React, { use, useMemo, useState, createContext } from "react"

export interface DragResizeContextType {
	setResizeActive: (active: boolean) => void
	clearResizeStore: () => void
	defaultResizeSize: () => void
}

export const DragResizeContext = Object.assign(
	createContext<DragResizeContextType | undefined>(undefined),
	{ displayName: "DragResizeContext" }
)

export const useDragResizeContext = () => {
	const context = use(DragResizeContext)
	if (context) return context

	throw new Error("DragResizeContext is not defined!!")
}
