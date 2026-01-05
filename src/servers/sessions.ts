import { deleteCookie, useSession } from "@tanstack/react-start/server"
import { C_SESSION, C_SESSION_PASSWORD, C_SESSION_COOKIE, R_SESSION } from "@/configs/beones-config"
import { fetcher } from "./fetcher"

interface AuthSessionData {
    userId?: string
    token?: string
    role?: string
    expiresAt: number
}

export const AUTH_SESSION = {
    name: C_SESSION,
    password: C_SESSION_PASSWORD,
    cookie: C_SESSION_COOKIE
}

export function useAuthSessions() {
    return useSession<AuthSessionData>(AUTH_SESSION as any)
}

export async function setAuthSessions(user: Record<string, any>) {
    const { id: userId, is_admin: role } = user || {}
    const session = await useAuthSessions()
    return await session.update({ userId, role })
}

export async function deleteAuthSessions() {
    const session = await useAuthSessions()
    await session.clear();
    deleteCookie(C_SESSION);
    deleteCookie(R_SESSION);
}

export async function verifyAuthSessions() {
    const { status, data: user } = await fetcher({ apiRoute: ["verify"] }) as any
    if (status) await setAuthSessions(user)
    else deleteAuthSessions()

    return status
}

export function isNotExpired(session: AuthSessionData) {
    return Date.now() < session.expiresAt
}