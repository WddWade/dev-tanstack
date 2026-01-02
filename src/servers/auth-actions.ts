import { createServerFn, createServerOnlyFn } from "@tanstack/react-start"
import { deleteCookie, setCookie } from "@tanstack/react-start/server"
import { C_TOKEN, R_TOKEN, C_TOKEN_OPTIONS } from "@/beones.config"
import { fetcher, serverActions } from "@/servers"

export const setAuthTokenCookies = createServerOnlyFn(() => {
	setCookie(C_TOKEN, "success", { ...C_TOKEN_OPTIONS });
	// https再開secure: true
	// setCookie(C_TOKEN, "true", { path: '/', maxAge: 60 * 60 * 60, httpOnly: true });
})

export const deleteAuthTokenCookies = createServerOnlyFn(() => {
	deleteCookie(C_TOKEN);
	deleteCookie(R_TOKEN);
})


export const verifyAuthorizationActions = createServerOnlyFn(
	async () => {
		const { status } = await fetcher({ apiRoute: ["verify"] })
		if (status) setAuthTokenCookies()
		else deleteAuthTokenCookies()

		return status
	}
)

export const logoutActions = createServerFn({ method: "POST" }).handler(
	async () => {
		const respponse = await fetcher({
			apiRoute: ["logout"],
			isResponseCookies: true
		})
		if (respponse?.status) deleteAuthTokenCookies()
		return respponse
	}
)

export const loginActions = createServerFn({ method: 'POST' })
	.inputValidator((data: Record<string, any>) => data)
	.handler(async ({ data }) => {
		const respponse = await fetcher({
			apiRoute: ["login"],
			payloads: data,
			isResponseCookies: true
		})
		if (respponse?.status) setAuthTokenCookies()
		return respponse
	})

