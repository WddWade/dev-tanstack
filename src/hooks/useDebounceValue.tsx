"use client"

import { useEffect, useRef, useState } from "react"

export function useDebounceValue<T>(value: T, delay = 500): T {

	const [debounceValue, setDebounceValue] = useState<T>(value);
	const timerRef = useRef<NodeJS.Timeout | string | number | undefined>(undefined)

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setDebounceValue(value), delay);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [value, delay]);

	return debounceValue;
};
