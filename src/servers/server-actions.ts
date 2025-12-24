

type Restype = "response" | undefined

export type BaseResponse<
	T extends Record<string, unknown>
> = T & {
	status: boolean
	code?: string | number
	msg?: string
	errors?: Error
}

export type ActionsResponse<
	T extends Record<string, unknown> = Record<string, unknown>,
	R extends Restype = undefined
> = R extends "response" ? Response : BaseResponse<T>

export interface ActionsOptions<R extends Restype> {
	end?: "REMOTE" | "LOCAL"
	apiRoute: string | URL
	options?: any
	restype?: R
}

export async function serverActions<
	T extends Record<string, unknown>,
	R extends Restype = undefined
>({
	end = "REMOTE",
	apiRoute,
	options,
	restype,
}: ActionsOptions<R>
): Promise<ActionsResponse<T, R>> {

	const { headers, ...others } = options || {}

	const serverHeaders = await getServerHeaders(headers)
	const controller = new AbortController()

	const timer = setTimeout(() => controller.abort(), Number(3600))
	const api = (process.env[`${end}_API_URL`] as any) + String(apiRoute)
	console.log("serverActions", api);

	try {
		const response = await fetch(api, {
			method: "POST",
			signal: controller.signal,
			headers: serverHeaders,
			...others,
		})
		if (!response.ok) throw new Error(`server actions error: ${response.status}`)
		if (restype == "response") return response as ActionsResponse<T, R>

		return await response.json() as ActionsResponse<T, R>

	} catch (error: any) {
		const errorMessage = error.name === "AbortError"
			? `server actions error: Fetch ${apiRoute} Timeout: ${3600}ms`
			: `server actions error: Fetch "${api}" :  ${error}`

		console.error(errorMessage)
		// if (error === 401) redirect("/login")

		return { status: false, msg: errorMessage, errors: error } as ActionsResponse<T, R>

	} finally {
		clearTimeout(timer)
	}
}

export async function getServerCookies(name?: string) {
	const cookieStore = await cookies()

	if (name) {
		const cookieValue = cookieStore.get(name)?.value
		return cookieValue
			? JSON.parse(cookieValue)
			: undefined
	} else {
		return cookieStore
			.getAll()
			.map((cookie) => cookie.name + "=" + cookie.value)
			.join("; ")
	}

}

export async function getServerHeaders(headers?: Record<string, string>) {
	const cookies = await getServerCookies()
	const serverHeaders = new Headers()

	serverHeaders.set("cookie", cookies || "")
	serverHeaders.set("Content-Type", "application/json")

	if (headers) {
		for (const [key, value] of Object.entries(headers)) {
			if (key.toLowerCase() == "cookie") continue
			serverHeaders.set(key.toLowerCase(), value)
		}
	}
	return serverHeaders
}




