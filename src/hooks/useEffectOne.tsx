"use client"

import { useEffect, useRef } from "react"

export function useEffectOne(callback: () => void) {
	const callbackRef = useRef<(() => void) | null>(callback)
	callbackRef.current = callback

	useEffect(() => {
		callbackRef.current?.()
		return () => {
			callbackRef.current = null
		}
	}, [])
}
