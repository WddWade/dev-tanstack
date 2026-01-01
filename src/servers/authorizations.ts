import { deleteCookie, setCookie } from '@tanstack/react-start/server'
import { serverActions } from "./server-actions";
import { C_TOKEN, R_TOKEN, C_TOKEN_OPTIONS } from "@/beones.config"

export function setAuthTokenCookies() {
	setCookie(C_TOKEN, "true", { ...C_TOKEN_OPTIONS });
	// https再開secure: true
	// setCookie(C_TOKEN, "true", { path: '/', maxAge: 60 * 60 * 60, httpOnly: true });
}

export function deleteAuthTokenCookies() {
	deleteCookie(C_TOKEN);
	deleteCookie(R_TOKEN);
}

export async function verifyAuthorizationToken() {
	const { status } = await serverActions({ apiRoute: "/verify" })

	if (status) setAuthTokenCookies();
	else deleteAuthTokenCookies();

	console.log("middleware : verifyAuthTokenCookies " + status);
	return status;
}

