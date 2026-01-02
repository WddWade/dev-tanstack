import { fetcher } from "@/servers"
import { createServerFn } from "@tanstack/react-start"

export const bootsActions = createServerFn({ method: "POST" })
    .handler(async () => await fetcher({
        apiRoute: ["boots"],
        payloads: { _actions: "read" }
    }))