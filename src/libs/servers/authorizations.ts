"use server";

// import { cookies } from "next/headers"
import { C_SESSION, R_SESSION, C_SESSION_OPTIONS } from "@/configs/beones-config"
import { serverActions } from "./server-actions"

export async function setAuthSessions() {
	// const cookiesStore = await cookies();
	// cookiesStore.set(C_SESSION, "true", { ...C_SESSION_OPTIONS });

	// https再開secure: true
	// cookiesStore.set(C_SESSION, "true", { ...C_SESSION_OPTIONS, secure: true });
}

export async function deleteAuthSessions() {
	// const cookiesStore = await cookies();
	// cookiesStore.delete(R_SESSION);
	// cookiesStore.delete(C_SESSION);
}

export async function verifyAuthorizationToken() {
	const { status } = await serverActions({
		apiRoute: "/verify",
		options: { method: "POST" },
	});

	if (status) await setAuthSessions();
	else await deleteAuthSessions();

	console.log("middleware : verifyAuthTokenCookies " + status);
	return status;
}

