import { createServerFn } from "@tanstack/react-start"
import { fetcher } from "./fetcher"
import type { FetcherOptions, FetcherReturns } from "./fetcher"

export const serverFetcher = createServerFn()
	.inputValidator((data: FetcherOptions) => data)
	.handler(async ({ data }) => await fetcher(data))

// export const serverActions2 = createServerFn()
// 	.inputValidator((data: FetcherOptions) => data)
// 	.handler(async ({ data }) => await serverFetcher(data))

export const serverActions = async (
	configs: FetcherOptions
): Promise<FetcherReturns> => {
	return await serverFetcher({ data: configs })
}










