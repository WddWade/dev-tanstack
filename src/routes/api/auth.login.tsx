// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'
import { getCookies } from '@tanstack/react-start/server'

export const Route = createFileRoute('/api/auth/login')({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const cookie = getCookies()

                console.log("server cookie", cookie["wdd_laravel_1103_session"]);
                const body = await request.json()

                const url = "http://api.beones.tw/api/login"
                const options = {
                    method: "POST",
                    body: JSON.stringify(body)
                }

                const res = await fetch(url, options)
                return res
            },
        },
    },
})