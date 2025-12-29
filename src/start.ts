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
        return next()
    })

// const functionMiddleware = createMiddleware({ type: 'function' })
//     .client(async (options) => {
//         const { next, context, data } = options
//         console.log('-----------functionMiddleware client', context)
//         console.log('-----------functionMiddleware client', data)
//         return next()
//     })
//     .server(async (options) => {
//         const { next, context, data } = options

//         console.log('-----------functionMiddleware server', context)
//         console.log('-----------functionMiddleware server', data)
//         return next()
//     })

export const startInstance = createStart(() => {
    return {
        // functionMiddleware: [functionMiddleware],
        requestMiddleware: [requestMiddleware],
    }
})