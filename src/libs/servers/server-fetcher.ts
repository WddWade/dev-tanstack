"use server"

import { serverActions } from "./server-actions"
import { getRouteAddress } from "../utils"
import { ViewsDatas } from "@/components"

interface FetcherPayloads {
	id?: number | string
	_actions:
	| "create"
	| "read"
	| "update"
	| "delete"
}

export interface FetcherOptions {
	routes: string[]
	payloads: FetcherPayloads
}

export type FetcherDatas<
	T extends Record<string, any> = ViewsDatas
> = T & {
	status: boolean
	code?: string | number
	errors?: Error
}

export async function serverFetcher<
	T extends
	Record<string, any> = ViewsDatas
>({
	routes = [],
	payloads
}: FetcherOptions
): Promise<FetcherDatas<T>> {

	const apiRoute = getRouteAddress(routes)
	const options = {
		body: JSON.stringify(payloads),
		cache: "no-store",
		next: { revalidate: 0 }
	}
	return await serverActions<FetcherDatas<T>>({ apiRoute, options })
}






