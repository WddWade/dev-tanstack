import { createServerFn, createServerOnlyFn } from "@tanstack/react-start"
import { setResponseHeader, getRequestHeaders } from "@tanstack/react-start/server"
import { CONNECTION_MAX_TIME } from "@/beones.config"
import { deleteAuthTokenCookies } from "./auth-actions"

export interface ServerActionsPayloads {
	id?: number | string
	_actions?: "create" | "read" | "update" | "delete"
}

export interface ServerActionsOptions {
	end?: "REMOTE" | "LOCAL"
	isRequestCookies?: boolean
	isResponseCookies?: boolean
	responseType?: "json" | "response" | "text" | "blob"
	apiRoute: string | string[]
	payloads?: ServerActionsPayloads
	options?: any
}

export interface ServerActionsReturns {
	status?: boolean
	data?: Record<string, any>
	datasets?: Record<string, any>
	configs?: Record<string, any>
	cache?: any
	msg?: string
	code?: string | number
	errors?: string
}

export const genApiAddress = createServerOnlyFn((routes: string[]) => ("/" + routes.join("/")))

export const getApiRoute = createServerOnlyFn((end, api) => {
	const route = end === "REMOTE" ? process.env.REMOTE_API_URL : process.env.LOCAL_API_URL
	return route + (Array.isArray(api) ? genApiAddress(api) : api)
})

export const fetcher = createServerOnlyFn(async (
	data: ServerActionsOptions
): Promise<ServerActionsReturns> => {
	const {
		end = "REMOTE",
		isResponseCookies = false,
		isRequestCookies = true,
		responseType = "json",
		apiRoute: api,
		payloads: body,
		options
	} = data
	// console.log("serverActions", apiRoute);

	const serverHeaders = new Headers()
	serverHeaders.set("Content-Type", "application/json")

	if (isRequestCookies) {
		const requestHeaders = getRequestHeaders()
		const headersCookies = requestHeaders.get("cookie")
		if (headersCookies) serverHeaders.set("cookie", headersCookies)
	}

	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), Number(CONNECTION_MAX_TIME))

	const apiRoute = getApiRoute(end, api)
	// console.log("serverActions url", url);

	try {
		const response = await fetch(apiRoute, {
			method: "POST",
			headers: serverHeaders,
			body: JSON.stringify(body),
			// signal: controller.signal,
			...options,
		})

		if (!response.ok) throw new Error(`server actions error: ${response.status}`)
		if (isResponseCookies) {
			const resHeaders = response.headers
			const resCookies = typeof resHeaders.getSetCookie === 'function'
				? resHeaders.getSetCookie()
				: (resHeaders.get('set-cookie') ? [resHeaders.get('set-cookie') ?? ""] : [])
			// console.log("resCookies", resCookies);
			if (resCookies.length) for (const cookie of resCookies) {
				setResponseHeader('Set-Cookie', cookie)
			}
		}
		// if (responseType == "response") return response
		// if (responseType == "blob") return await response.blob()

		return await response.json()

	} catch (error: any) {
		const errorMessage = error.name === "AbortError"
			? `server actions error: Fetch ${apiRoute} Timeout: ${CONNECTION_MAX_TIME}ms`
			: `server actions error: Fetch "${api}" :  ${error}`

		console.error(errorMessage)
		// if (error === 401) redirect("/login")

		return { status: false, msg: errorMessage, errors: error } as ServerActionsReturns

	} finally {
		clearTimeout(timer)
	}
})

export const serverFetcher = createServerFn({ method: 'POST' })
	.inputValidator((data: ServerActionsOptions) => data)
	.handler(async ({ data }) => await fetcher(data))

export const serverActions = async (
	configs: ServerActionsOptions
): Promise<ServerActionsReturns> => {
	return await serverFetcher({ data: configs })
}










