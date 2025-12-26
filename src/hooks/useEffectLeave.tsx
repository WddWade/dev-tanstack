"use client"

import { useEffect, useRef } from "react"

export function useEffectLeave(callback: () => void) {
	const callbackRef = useRef<(() => void) | null>(callback)
	callbackRef.current = callback

	useEffect(() => {
		return () => {
			callbackRef.current?.()
			callbackRef.current = null
		}
	}, [])
}
