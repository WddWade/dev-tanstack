import { createMiddleware, createStart } from '@tanstack/react-start'
import { getCookies } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'
import { deleteAuthSessions } from '@/servers/sessions'
import { C_SESSION, R_SESSION } from "@/configs/beones-config"

const isDocumentNavigation = (headers: Headers) => {
    const accept = headers.get('accept') ?? ''
    const secFetchDest = headers.get('sec-fetch-dest') ?? ''
    return accept.includes('text/html') || secFetchDest === 'document'
}

const requestMiddleware = createMiddleware().server(async ({ next, request }) => {
    const { pathname } = new URL(request.url)
    const cookies = getCookies()
    const remoteAuth = !!cookies[R_SESSION]
    const clientAuth = !!cookies[C_SESSION]

    // ✅ 只在「文件導覽」時才 redirect
    if (isDocumentNavigation(request.headers)) {
        const isLogin = pathname === '/login' || pathname.startsWith('/login/')

        if (!remoteAuth) {
            await deleteAuthSessions()
        }
        if (!remoteAuth && !isLogin) {
            throw redirect({ to: '/login', replace: true })
        }

        if (remoteAuth && isLogin) {
            throw redirect({ to: '/', replace: true })
        }
    }

    return next()
})

const functionMiddleware = createMiddleware({ type: "function" })
    .client(async ({ next }) => {
        const result = await next()
        // Woah! We have the time from the server!
        console.log("functionMiddleware.client");
        // console.log('Time from the server:', result.context.timeFromServer)

        return result
    })
    .server(async ({ context, next }) => {
        // console.log("authMiddleware", request.url);
        console.log("functionMiddleware.server");
        return next()
        //...
    })

export const startInstance = createStart(() => {
    return {
        // functionMiddleware: [functionMiddleware],
        requestMiddleware: [requestMiddleware],
    }
})