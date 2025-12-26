"use client"

import { useRef, useState, useEffect, useCallback } from "react"

type ReturnDatasTypes = {
	fetcher: (payload: PayloadTypes) => Promise<any>
	cancel: () => void
	pending: boolean
}

interface PayloadTypes {
	url: string | URL | globalThis.Request,
	options?: RequestInit
}

export function useAsyncFetcher(): ReturnDatasTypes {

	const [isPending, setPending] = useState(false)
	const controllerRef = useRef<AbortController | null>(null)

	const startFetch = useCallback(async ({ url, options }: PayloadTypes) => {
		if (isPending || !url) return

		const controller = new AbortController()
		controllerRef.current = controller

		setPending(true)

		try {
			const response = await fetch(url, {
				signal: controller.signal,
				...options,
			})
			const datas = await response.json()
			return datas

		} catch (error) {
			console.error("useAsyncFetche startFetch error:", error)
			return { status: false, error: error }

		} finally {
			setPending(false)
		}

	}, [isPending])

	const cancelFetch = () => {
		controllerRef.current?.abort()
		setPending(false)
	}

	useEffect(() => {
		return () => controllerRef.current?.abort()
	}, [])

	return {
		pending: isPending,
		cancel: cancelFetch,
		fetcher: startFetch
	}
}
