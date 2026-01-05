import { createServerFn } from "@tanstack/react-start"
import { fetcher } from "../servers/fetcher"

export const bootsActions = createServerFn({ method: "POST" })
    .handler(async ({ context }) => {
        console.log("cookies", context.cookies);
        return await fetcher({
            apiRoute: ["boots"],
            payloads: { _actions: "read" }
        })
    })