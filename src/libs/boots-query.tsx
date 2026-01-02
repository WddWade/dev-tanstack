import { useEffect, useEffectEvent, createContext, use } from "react"
import { setGlobalsLoaders } from "@/stores"
import { useQuery } from "@tanstack/react-query"
import { bootsActions } from "@/servers"

// import { notFound } from "next/navigation"

// interface BootsQueryOptions {
// 	active?: boolean
// }

export function useBootsQuery() {

	const {
		data: queryDatas,
		isLoading
	} = useQuery({
		queryKey: ["boots"],
		queryFn: bootsActions
	})

	// console.log("queryDatas", queryDatas);

	const isError = !isLoading && (!queryDatas || !queryDatas?.status)

	const onQueryDatasReady = useEffectEvent(() => {
		if (!isError) setGlobalsLoaders(false)
	})

	useEffect(() => {
		if (!isLoading) onQueryDatasReady()
	}, [isLoading])

	// if (isError) notFound()

	return { queryDatas, isLoading }
}

export interface BootsContextState {
	children: React.ReactNode
	value: { resizeStores?: string }
}

const BootsContext = createContext<BootsContextState | any>({
	resizeStores: null
})

export const BootsProviders = (props: BootsContextState) => {
	useBootsQuery()
	return <BootsContext {...props} />
}

export const useBootsContext = () => {
	const context = use(BootsContext)
	if (!context) throw new Error("BootsContext must be used inside BootsProviders")
	return context
}
