"use server";

import { getCookies, setCookie } from '@tanstack/react-start/server'

export function getAuthTokenCookies() {
	const cookies = getCookies()
	return cookies
}

export function setAuthTokenCookies() {
	// https再開secure: true
	setCookie("C_TOKEN", "true", { path: '/', maxAge: 60 * 60 * 60, httpOnly: true });
}

export function deleteAuthTokenCookies() {
	setCookie("C_TOKEN", "true", { path: '/', maxAge: 0, httpOnly: true });
}

export async function verifyAuthorizationToken() {
	// const { status } = await serverActions({
	// 	apiRoute: "/verify",
	// 	options: { method: "POST" },
	// });

	// if (status) await setAuthTokenCookies();
	// else await deleteAuthTokenCookies();

	// console.log("middleware : verifyAuthTokenCookies " + status);
	// return status;
}

