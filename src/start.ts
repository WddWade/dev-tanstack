// src/start.ts
import { redirect } from '@tanstack/react-router'
import { createMiddleware, createStart } from '@tanstack/react-start'
import { getCookies } from '@tanstack/react-start/server'

const checkServerFn = (headers: Headers) => {
    const accept = headers.get('accept') ?? ''
    const secFetchDest = headers.get('sec-fetch-dest') ?? ''
    const isHtmlNav = accept.includes('text/html') || secFetchDest === 'document'

    return !isHtmlNav || headers.has('x-tsr-redirect')
}

const requestMiddleware = createMiddleware().server(
    async ({ next, context, request }) => {
        const { pathname } = new URL(request.url)
        const toPath = (route: string) =>
            pathname.split("/")[1] == route.trim().replace("/", "")

        const isServerFn = checkServerFn(request.headers)
        const cookies = getCookies()
        // console.log('-----------requestMiddleware server', request)
        // console.log('-----------requestMiddleware server', cookies)

        if (!cookies.wdd_laravel_1103_session) {
            if (toPath("/login") || isServerFn) return next()
            else throw redirect({ to: '/login', replace: true })
        }

        if (cookies.wdd_laravel_1103_session) {
            if (toPath("/login")) throw redirect({ to: '/', replace: true })
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
        functionMiddleware: [functionMiddleware],
        requestMiddleware: [requestMiddleware],
    }
})