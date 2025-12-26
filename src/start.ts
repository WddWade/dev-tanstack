// src/start.ts
import { createMiddleware, createStart } from '@tanstack/react-start'

const requestMiddleware = createMiddleware().server(async (options) => {
    const { next, context, request } = options

    console.log('-----------requestMiddleware server', request)
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
        // requestMiddleware: [requestMiddleware],
    }
})