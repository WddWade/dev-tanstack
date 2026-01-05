import { setResponseHeader, getRequestHeaders } from "@tanstack/react-start/server"
import { CONNECTION_MAX_TIME } from "@/configs/beones-config"

export interface FetcherPayloads {
    id?: number | string
    _actions?: "create" | "read" | "update" | "delete"
}

export interface FetcherOptions {
    end?: "REMOTE" | "LOCAL"
    isSendCookies?: boolean
    isResponseCookies?: boolean
    responseType?: "json" | "response" | "text" | "blob"
    apiRoute: string | string[]
    payloads?: FetcherPayloads
    options?: any
}

export interface FetcherReturns {
    status?: boolean
    data?: Record<string, any>
    datasets?: Record<string, any>
    configs?: Record<string, any>
    cache?: any
    msg?: string
    code?: string | number
    errors?: string
}

export const genApiAddress = (routes: string[]) => ("/" + routes.join("/"))

export const getApiRoute = (
    end: FetcherOptions["end"],
    api: FetcherOptions["apiRoute"]
) => {
    const route = end === "REMOTE" ? process.env.REMOTE_API_URL : process.env.LOCAL_API_URL
    return route + (Array.isArray(api) ? genApiAddress(api) : api)
}

export const fetcher = async (
    data: FetcherOptions
): Promise<FetcherReturns> => {
    const {
        end = "REMOTE",
        isResponseCookies = false,
        isSendCookies = true,
        responseType = "json",
        apiRoute: api,
        payloads: body,
        options
    } = data
    // console.log("serverActions", apiRoute);

    const serverHeaders = new Headers()
    serverHeaders.set("Content-Type", "application/json")

    if (isSendCookies) {
        const requestHeaders = getRequestHeaders()
        const headersCookies = requestHeaders.get("cookie")
        if (headersCookies) serverHeaders.set("cookie", headersCookies)
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Number(CONNECTION_MAX_TIME))

    const apiRoute = getApiRoute(end, api)
    // console.log("serverActions url", url);

    try {
        const response = await fetch(apiRoute, {
            method: "POST",
            headers: serverHeaders,
            body: JSON.stringify(body),
            // signal: controller.signal,
            ...options,
        })

        if (!response.ok) throw new Error(`server actions error: ${response.status}`)
        if (isResponseCookies) {
            const resHeaders = response.headers
            const resCookies = typeof resHeaders.getSetCookie === 'function'
                ? resHeaders.getSetCookie()
                : (resHeaders.get('set-cookie') ? [resHeaders.get('set-cookie') ?? ""] : [])
            // console.log("resCookies", resCookies);
            if (resCookies.length) for (const cookie of resCookies) {
                setResponseHeader('Set-Cookie', cookie)
            }
        }
        // if (responseType == "response") return response
        // if (responseType == "blob") return await response.blob()

        return await response.json()

    } catch (error: any) {
        const errorMessage = error.name === "AbortError"
            ? `server actions error: Fetch ${apiRoute} Timeout: ${CONNECTION_MAX_TIME}ms`
            : `server actions error: Fetch "${api}" :  ${error}`

        console.error(errorMessage)
        // if (error === 401) redirect("/login")

        return { status: false, msg: errorMessage, errors: error } as FetcherReturns

    } finally {
        clearTimeout(timer)
    }
}


export async function fetcher2(
    url: string,
    options?: RequestInit
): Promise<Response> {

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Number(CONNECTION_MAX_TIME))

    try {
        const response = await fetch(url, {
            ...(options ?? {}),
            signal: controller.signal
        })

        if (response.ok) return response
        throw Object.assign(new Error(`HTTP_${response.status}`), { response })

    } finally {
        clearTimeout(timer)
    }
}

interface serverActionsOptions {
    route: string | string[]
    endpoints?: "REMOTE" | "LOCAL"
    options?: RequestInit,
    reqCookie?: boolean
    resCookie?: boolean
}

export async function serverActions2(opt: serverActionsOptions) {

    const {
        route,
        endpoints = "REMOTE",
        options = {}
    } = opt

    const { body, headers, ...requestInit } = options

    // headers
    // get env Secretkey
    // get session RemoteCookies
    // set header Authorization Bearer Secretkey
    // set header RemoteCookies

    // body
    // body instanceof FormData ? body :JSON.stringify(body)

    const requestHeaders = new Headers()
    requestHeaders.set("Authorization", `Bearer Secretkey`)
    requestHeaders.set("Cookie", `RemoteCookies`)

    const requestBody = body instanceof FormData ? body : JSON.stringify(body)
    const url = getApiRoute(endpoints, route)

    try {
        const response = await fetcher2(url, {
            ...requestInit,
            headers: requestHeaders,
            body: requestBody
        })

        const responseData = await response.json()

        if (responseData.status) {
            // response-cookies
            // response ok, get response "Set-Cookie"
            // set response-cookie update to session.update
        }

        return responseData

    } catch (error: any) {
        const errorMessage = error.name === "AbortError"
            ? `server actions error: "${route}" Timeout: ${CONNECTION_MAX_TIME}ms, ${new Date()}`
            : `server actions error: "${route}" ${error}, ${new Date()}`

        console.error(errorMessage)
        // if (error === 401) redirect("/login")
        return { status: false, msg: errorMessage, errors: error }

    }

}