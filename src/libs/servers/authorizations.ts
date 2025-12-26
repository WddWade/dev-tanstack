"use server";

// import { cookies } from "next/headers"
import { C_TOKEN, R_TOKEN, C_TOKEN_OPTIONS } from "@/beones.config"
import { serverActions } from "./server-actions"

export async function setAuthTokenCookies() {
	// const cookiesStore = await cookies();
	// cookiesStore.set(C_TOKEN, "true", { ...C_TOKEN_OPTIONS });

	// https再開secure: true
	// cookiesStore.set(C_TOKEN, "true", { ...C_TOKEN_OPTIONS, secure: true });
}

export async function deleteAuthTokenCookies() {
	// const cookiesStore = await cookies();
	// cookiesStore.delete(R_TOKEN);
	// cookiesStore.delete(C_TOKEN);
}

export async function verifyAuthorizationToken() {
	const { status } = await serverActions({
		apiRoute: "/verify",
		options: { method: "POST" },
	});

	if (status) await setAuthTokenCookies();
	else await deleteAuthTokenCookies();

	console.log("middleware : verifyAuthTokenCookies " + status);
	return status;
}

