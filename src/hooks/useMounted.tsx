"use client"

import { useEffect, useState } from "react"

export function useMounted() {
	const [isMounded, setMounded] = useState(false)
	useEffect(() => { setMounded(true) }, [])
	return { isMounded }
}
