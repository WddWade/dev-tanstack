// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'
import { getCookies } from '@tanstack/react-start/server'

export const Route = createFileRoute('/api/auth/login')({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const cookie = getCookies()
                const body = await request.json()

                console.log("cookies", cookie);

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