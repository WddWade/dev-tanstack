"use client"

import { useCallback, useMemo } from "react"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useBootsQuery } from "@/libs"
import { genUnitsViewsOptions } from "./units-helpers"
import { serverActions } from "@/servers/server-actions"

export interface UintsQueryOptions {
	id?: string | number
	views: string
	parameters: Record<string, string>
	resizeStores?: string
}

export function useUints({
	id,
	views,
	parameters,
	resizeStores
}: UintsQueryOptions) {

	const { queryDatas: bootsDatas } = useBootsQuery()

	const { boots } = bootsDatas?.datasets || {}

	const {
		viewsRoutePrefix,
		viewsRemoteRoute,
		viewsComponent,
		viewsQueryCache = {}
	} = genUnitsViewsOptions({
		views,
		boots,
		parameters
	})

	const {
		queryKey,
		staleTime,
		gcTime
	} = viewsQueryCache

	const queryKeyMemo = useMemo(() => queryKey ?
		id ? [[queryKey[0], id].join("/")] : queryKey
		: undefined, [queryKey, id])

	const staleTimeMemo = (staleTime == 'Infinity' ? Infinity : staleTime) || 1000 * 60 * 5
	const gcTimeMemo = (gcTime == 'Infinity' ? Infinity : gcTime) || 1000 * 60 * 30


	const queryClient = useQueryClient()

	const {
		data: queryDatas,
		refetch: queryRefetch,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey: queryKeyMemo,
		queryFn: async () => await serverActions({
			apiRoute: viewsRemoteRoute,
			payloads: { _actions: "read", ...(id ? { id } : {}) },
		}),
		staleTime: staleTimeMemo,
		gcTime: gcTimeMemo,
		placeholderData: keepPreviousData,
		enabled: !!queryKeyMemo
	})

	const isNotfound = useMemo(() => !isLoading && !queryDatas?.status, [isLoading, queryDatas])

	const viewsQueryKeys = useMemo(() => queryDatas && queryKeyMemo
		? { self: queryKeyMemo, ...(queryDatas?.cache || {}) }
		: undefined, [queryDatas, queryKeyMemo])

	const setQueryDatas = useCallback((datas: Record<string, any>) => {
		const selfQueryKey = viewsQueryKeys?.self as string[]
		if (!Array.isArray(selfQueryKey) || selfQueryKey.length === 0) return

		queryClient.setQueryData(selfQueryKey, { ...datas })
	}, [viewsQueryKeys])

	const setSelfQueryKeyActions = useCallback(async (
		selfQueryKey: string[],
		action: "remove" | "invalidate"
	) => {
		if (!action || !Array.isArray(selfQueryKey) || selfQueryKey.length === 0) return
		if (action == "remove") return queryClient.removeQueries({ queryKey: selfQueryKey })
		if (action == "invalidate") await queryClient.invalidateQueries({ queryKey: selfQueryKey })

	}, [])

	const setRemoveQueryKeysActions = useCallback((
		removeQueryKeys: string[][]
	) => {
		if (!Array.isArray(removeQueryKeys) || removeQueryKeys.length === 0) return
		for (let key of removeQueryKeys) {
			if (!Array.isArray(key)) continue
			queryClient.removeQueries({ queryKey: key })
		}
	}, [])

	const setInvalidateKeysActions = useCallback(async (
		invalidateQueryKeys: string[][]
	) => {
		if (!Array.isArray(invalidateQueryKeys) || invalidateQueryKeys.length === 0) return
		await Promise.all(invalidateQueryKeys.map(
			(key) => queryClient.invalidateQueries({ queryKey: key })
		))
	}, [])

	const viewsPropsMemo = useMemo(() => ({
		id,
		isLoading,
		isNotfound,
		isFetching,
		datas: queryDatas,
		refetch: queryRefetch,
		queryKey: viewsQueryKeys,
		remoteRoute: viewsRemoteRoute,
		routePrefix: viewsRoutePrefix,
		routeParams: parameters,
		viewsComponent,
		resizeStores,
		setQueryDatas,
		setSelfQueryKeyActions,
		setRemoveQueryKeysActions,
		setInvalidateKeysActions,
	}), [
		id,
		isLoading,
		isNotfound,
		isFetching,
		queryDatas,
		queryRefetch,
		viewsQueryKeys,
		viewsRemoteRoute,
		viewsRoutePrefix,
		parameters,
		viewsComponent,
		resizeStores,
		setQueryDatas,
		setSelfQueryKeyActions,
		setRemoveQueryKeysActions,
		setInvalidateKeysActions,
	])
	return viewsPropsMemo
}
