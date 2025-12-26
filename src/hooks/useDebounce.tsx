"use client"

import { useCallback, useEffect, useRef } from "react"

export interface DebounceTypes {
	callback: () => any,
	dependency: any[],
	delay?: number,
	active?: boolean,
}

export function useDebounce({
	callback,
	dependency = [],
	delay = 500,
	active = true,
}: DebounceTypes
) {

	if (!active || !callback) return

	const timerRef = useRef<any>(null)

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current)
		timerRef.current = setTimeout(callback, delay)

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [...dependency]);

}
