import { createMiddleware } from "@tanstack/react-start"
import { getCookies } from "@tanstack/react-start/server"

export const authMiddleware = createMiddleware().server(
    async ({ next, request }) => {
        const cookies = getCookies()
        console.log("authMiddleware.----------------");
        console.log("authMiddleware.url", request.url);
        console.log("authMiddleware.date", new Date());
        console.log("authMiddleware.cookies", cookies);
        // const remoteAuth = !!cookies[R_SESSION]
        // const clientAuth = !!cookies[C_SESSION]
        return next({ context: { cookies } })
    }
)