
// import { serverActions } from "./server-actions"
// import { getRouteAddress } from "./server-utils"
// import { ViewsDatas } from "@/components"

// interface FetcherPayloads {
// 	id?: number | string
// 	_actions:
// 	| "create"
// 	| "read"
// 	| "update"
// 	| "delete"
// }

// export interface FetcherOptions {
// 	routes: string[]
// 	payloads: FetcherPayloads
// }

export interface FetcherDatas {
	status: boolean
	code?: string | number
	errors?: Error
}

// export async function se rverFetcher({
// 	routes = [],
// 	payloads
// }: FetcherOptions
// ) {
// 	const apiRoute = getRouteAddress(routes)
// 	const options = { body: JSON.stringify(payloads) }
// 	const data = await serverActions({ apiRoute, options })
// 	// console.log("serverFetcher", data);
// 	return data
// }






