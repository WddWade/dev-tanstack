import { createServerFn } from "@tanstack/react-start"
import { setResponseHeader, getRequestHeaders } from "@tanstack/react-start/server"
import { getRouteAddress } from "./server-utils"
import { CONNECTION_MAX_TIME } from "@/beones.config"

export interface ActionsOptions {
	end?: "REMOTE" | "LOCAL"
	apiRoute: string[]
	options?: any
}

export interface ActionReturns {
	status?: boolean
	data?: Record<string, any>
	datasets?: Record<string, any>
	configs?: Record<string, any>
	msg?: string
	errors?: string
}

const getServerHeaders = () => {
	const requestHeaders = getRequestHeaders()
	const requesCookies = requestHeaders.get("cookie") ?? ""
	const headers = new Headers()

	headers.set("Content-Type", "application/json")
	headers.set("cookie", requesCookies || "")

	return headers
}

export const serverActions = createServerFn({ method: 'POST' })
	.inputValidator((data: ActionsOptions) => data)
	.handler(async ({ data }): Promise<ActionReturns> => {

		const { end = "REMOTE", apiRoute, options } = data
		// console.log("serverActions", apiRoute);

		const serverHeaders = getServerHeaders()
		const controller = new AbortController()

		const timer = setTimeout(() => controller.abort(), Number(CONNECTION_MAX_TIME))
		const api = end === "REMOTE" ? process.env.REMOTE_API_URL : process.env.LOCAL_API_URL
		const url = api + getRouteAddress(apiRoute)

		// console.log("serverActions url", url);

		try {
			const res = await fetch(url, {
				method: "POST",
				signal: controller.signal,
				headers: serverHeaders,
				...options,
			})

			if (!res.ok) throw new Error(`server actions error: ${res.status}`)

			const resHeaders = res.headers
			const resCookies = typeof resHeaders.getSetCookie === 'function'
				? resHeaders.getSetCookie()
				: (resHeaders.get('set-cookie') ? [resHeaders.get('set-cookie') ?? ""] : [])
			// console.log("resCookies", resCookies);

			if (resCookies.length) {
				for (const cookie of resCookies) { setResponseHeader('Set-Cookie', cookie) }
			}

			const datas = await res.json()
			console.log("serverActions datas", datas);

			return datas

		} catch (error: any) {
			const errorMessage = error.name === "AbortError"
				? `server actions error: Fetch ${apiRoute} Timeout: ${CONNECTION_MAX_TIME}ms`
				: `server actions error: Fetch "${api}" :  ${error}`

			console.error(errorMessage)
			// if (error === 401) redirect("/login")

			return { status: false, msg: errorMessage, errors: error } as ActionReturns

		} finally {
			clearTimeout(timer)
		}
	})




