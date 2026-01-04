import { createServerFn } from "@tanstack/react-start"
import { deleteAuthSessions, setAuthSessions } from "@/servers/sessions"
import { fetcher } from "@/servers/fetcher"

export const logoutActions = createServerFn()
	.handler(async () => {
		const respponse = await fetcher({
			apiRoute: ["logout"],
			isResponseCookies: true
		})
		if (respponse?.status) await deleteAuthSessions()
		return respponse
	})

export const loginActions = createServerFn({ method: "POST" })
	.inputValidator((data: Record<string, any>) => data)
	.handler(async ({ data }) => {

		const respponse = await fetcher({
			apiRoute: ["login"],
			payloads: data,
			isResponseCookies: true
		})

		const { status, data: user } = respponse

		if (status) {
			const { id: userId, is_admin: role } = user || {}
			await setAuthSessions({ userId, role })
		}

		return { status }
	})

export const verifyActions = createServerFn({ method: "POST" })
	.handler(async ({ data }) => {
		const { status, data: user } = await fetcher({ apiRoute: ["verify"] }) as any
		if (status) await setAuthSessions(user)
		else deleteAuthSessions()

		return status
	})

