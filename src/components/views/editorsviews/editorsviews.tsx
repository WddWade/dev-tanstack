"use client"

import { useEffect, memo, useMemo, useCallback, } from "react"
// import { useRouter } from "next/navigation"
import { useViewsForms } from "../views-forms-hooks"
import EditorsViewsHeaders from "./editorsviews-headers"
import EditorsViewsControllers from "./editorsviews-controllers"
import EditorsViewsFooters from "./editorsviews-footers"
import { EditorsViewsContextProvider } from "./editorsviews-context"
import { transMutationPayload, useEditorsViews } from "./editorsviews-hooks"
import EditorsViewsContents from "./editorsviews-contents"
import { Forms, globalToaster, Loaders, useViews } from "@/components"
import { cn, sleep } from "@/utils"
import type {
	GlobalsAlersStates,
	ViewsActions,
	ViewsDatas,
	ViewsMutationActions
} from "@/components"
import {
	useMutation,
	useQueryClient,
	type QueryObserverResult,
	type RefetchOptions
} from "@tanstack/react-query"
import { FetcherDatas } from "@/servers/_server-fetcher"
import { serverActions } from "@/servers"

export type SubeditorPayloadsDatas = EditorsViewsPayloads[] | []

export interface SubeditorsPayloads {
	fieldName: string
	_model?: string
	_type?: string
	datas: SubeditorPayloadsDatas
}

export interface EditorsViewsPayloads extends Record<string, any> {
	_subDatas?: SubeditorsPayloads[]
}

export interface MutationDatas {
	actions: ViewsMutationActions,
	payload: Record<string, any>
}

export interface EditorsViewsProps {
	id?: string | number
	queryKey?: {
		self?: string[],
		remove?: string[][],
		invalidate?: string[][],
	},
	isLoading?: boolean
	datas?: ViewsDatas
	rootsMode?: boolean
	remoteRoute: string[]
	routeParams: Record<string, string>
	routePrefix: string
	refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
	setQueryDatas: (datas: any) => void
	setSelfQueryKeyActions: (selfKey: string[], action: "remove" | "invalidate") => void
	setRemoveQueryKeysActions: (removeKeys: string[][]) => void
	setInvalidateKeysActions: (invalidateKeys: string[][]) => void
}

const EditorsViews: React.FC<EditorsViewsProps> = memo((props) => {
	const {
		id = undefined,
		queryKey,
		isLoading,
		datas: queryDatas,
		rootsMode = false,
		refetch: queryRefetch,
		routePrefix,
		remoteRoute,
		setQueryDatas,
		setSelfQueryKeyActions,
		setRemoveQueryKeysActions,
		setInvalidateKeysActions,
	} = props

	// useEffect(() => {
	// 	console.log("queryKey", queryKey);
	// }, [queryKey])

	const isCreateActions = id === "create"

	const formsDatas = queryDatas?.datasets?.contents?.forms
	const headers = queryDatas?.datasets?.headers
	const templates = queryDatas?.configs?.templates
	const controllers = queryDatas?.configs?.controllers

	useEffect(() => {
		setEditorsViewsDatas(formsDatas)
		setEditorsViewsLoading(false)
	}, [formsDatas])

	// const router = useRouter()
	const queryClient = useQueryClient()
	const { globalsAlerts } = useViews()

	const {
		// 使用querykey控制更新
		// datasViewsActions,
		isEditorsViewsLoading,
		setDatasViewsLoading,
		setEditorsViewsEdited,
		setEditorsViewsLoading,
		setGlobalsOverlays,
		setEditorsViewsDatas,
		setEditorsViewsControllers,
	} = useEditorsViews()

	const {
		formsFields,
		hooksFormStates,
		resetFormDatas,
	} = useViewsForms({
		forms: templates?.contents?.forms,
		formsDatas: formsDatas,
		isCreateActions: !!isCreateActions,
	})

	const { getValues, handleSubmit, formState: { isDirty } } = hooksFormStates

	useEffect(() => { setEditorsViewsEdited(!!isDirty) }, [isDirty])

	// const setSelfQueryKeyActions = useCallback(async (
	// 	selfQueryKey: string[],
	// 	action: "remove" | "invalidate"
	// ) => {
	// 	if (!action || !Array.isArray(selfQueryKey) || selfQueryKey.length === 0) return
	// 	if (action == "remove") return queryClient.removeQueries({ queryKey: selfQueryKey })
	// 	if (action == "invalidate") await queryClient.invalidateQueries({ queryKey: selfQueryKey })

	// }, [])

	// const setRemoveQueryKeysActions = useCallback((
	// 	removeQueryKeys: string[][]
	// ) => {
	// 	if (!Array.isArray(removeQueryKeys) || removeQueryKeys.length === 0) return
	// 	for (let key of removeQueryKeys) {
	// 		if (!Array.isArray(key)) continue
	// 		queryClient.removeQueries({ queryKey: key })
	// 	}
	// }, [])

	// const setInvalidateKeysActions = useCallback(async (
	// 	invalidateQueryKeys: string[][]
	// ) => {
	// 	if (!Array.isArray(invalidateQueryKeys) || invalidateQueryKeys.length === 0) return
	// 	await Promise.all(invalidateQueryKeys.map(
	// 		(key) => queryClient.invalidateQueries({ queryKey: key })
	// 	))
	// }, [])

	const mutationActions = useCallback(async ({
		actions: _actions,
		payload
	}: MutationDatas) => {
		setGlobalsOverlays(true)
		globalToaster("editorsViews.loading")

		const mutationPayloads = { ...payload, _actions }
		console.log("*****mutation.payloads", mutationPayloads);

		const viewsDatas = await serverActions({
			apiRoute: remoteRoute,
			payloads: mutationPayloads,
		})
		console.log("mutationActions.response", viewsDatas);
		return viewsDatas
	}, [
		setGlobalsOverlays,
		remoteRoute
	])

	const mutationSuccess = useCallback(async (
		responseData: FetcherDatas,
		mutationDatas: MutationDatas
	) => {
		console.log("mutationDatas", mutationDatas);
		const { status, datasets, code } = responseData
		const { id: nextId } = datasets?.contents?.forms || {}
		const { actions: payloadActions, payload: { id: prevId } } = mutationDatas
		// console.log("responseData", payloadActions, responseData);
		// console.log("responseData.mutationDatas", mutationDatas);

		await sleep(100)
		globalToaster("dismiss")

		// code=404 資料不存在，移除自己的快取以及蟲先驗證相關快取
		if (!status && code === 404) {
			if (queryKey?.self) setSelfQueryKeyActions(queryKey?.self, "remove")
			if (queryKey?.invalidate) await setInvalidateKeysActions(queryKey?.invalidate)
			setGlobalsOverlays(false)
			editorsViewsAlerts("editorsViews.notfound")
			return
		}

		if (!status) {
			setGlobalsOverlays(false)
			globalToaster("editorsViews.error", { actions: payloadActions })
			return
		}

		if (queryKey?.invalidate) {
			await setInvalidateKeysActions(queryKey?.invalidate)
		}

		switch (payloadActions) {
			case "create":
				// router.replace(routePrefix + "/" + String(nextId) as any)
				await sleep(200)
				globalToaster("editorsViews.create", { actions: payloadActions })
				break

			case "update":
				if (queryKey?.self) await setSelfQueryKeyActions(queryKey?.self, "invalidate")

				await sleep(200)
				globalToaster("editorsViews.update", { actions: payloadActions })
				break

			case "delete":
				if (queryKey?.self) setSelfQueryKeyActions(queryKey?.self, "remove")

				// router.replace(routePrefix + "/" + String(prevId) as any)
				await sleep(200)
				globalToaster("editorsViews.delete", { actions: payloadActions })
				break
		}
		setGlobalsOverlays(false)
	}, [
		globalToaster,
		resetFormDatas,
		setQueryDatas,
		setRemoveQueryKeysActions,
		setInvalidateKeysActions,
		setGlobalsOverlays,
		queryKey
	])

	const mutationError = async (
		error: Error,
		mutationDatas: MutationDatas
	) => {
		mutation.reset()

		await globalsAlerts.open("editorsViews.error")
		setGlobalsOverlays(false)
		globalToaster("dismiss")

		console.error("mutationError", error);
	}

	const mutation = useMutation({
		mutationFn: mutationActions,
		onSuccess: mutationSuccess,
		onError: mutationError,
	})

	const editorsViewsAlerts = useCallback(async (
		state: GlobalsAlersStates
	) => {
		const title = formsDatas?.title ?? "目前資料"
		switch (state) {
			case "editorsViews.restore":
				const restores = await globalsAlerts.open(state, { title })
				if (restores) resetFormDatas()
				return

			case "editorsViews.delete":
				const deletes = await globalsAlerts.open(state, { title })
				if (deletes) await mutation.mutateAsync({ actions: "delete", payload: getValues() })
				return

			case "editorsViews.notfound":
				await globalsAlerts.open(state, { title })
				// router.replace(routePrefix + "/create" as any)
				return
		}
	}, [
		// router,
		mutation.mutateAsync,
		globalsAlerts,
		formsDatas?.title,
		resetFormDatas,
		getValues
	])

	const editrosActionsSubmit = useCallback((
		actions: ViewsMutationActions
	) => handleSubmit(async (formsDatas: any) => {
		const payload = transMutationPayload(formsFields, formsDatas)
		const mutationDatas = { actions, payload }

		try { await mutation.mutateAsync(mutationDatas) }
		catch (err) { console.error("Mutation failed:", err) }
	}), [
		handleSubmit,
		formsFields,
		mutation.mutateAsync
	])

	const editorsActionsControllers = useCallback((
		actions: ViewsActions
	) => {
		if (actions == "reset" && isDirty) return () => editorsViewsAlerts("editorsViews.restore")
		if (actions == "delete") return () => editorsViewsAlerts("editorsViews.delete")
		return editrosActionsSubmit(actions as ViewsMutationActions)
	}, [
		isDirty,
		editrosActionsSubmit,
		editorsViewsAlerts
	])

	const editorsViewsActions = useMemo(() => ({
		save: editrosActionsSubmit(isCreateActions ? "create" : "update"),
		refetch: queryRefetch
	}), [isCreateActions, editrosActionsSubmit])

	const contextPropsValue = useMemo(() => ({
		editorsActionsControllers,
		isCreateActions,
		mutationPending: mutation.isPending,
	}), [
		editorsActionsControllers,
		isCreateActions,
		mutation.isPending
	])

	useEffect(() => {
		setEditorsViewsControllers(editorsViewsActions)
		return () => setEditorsViewsControllers(null)
	}, [editorsViewsActions])

	return (
		<EditorsViewsContextProvider value={contextPropsValue}>
			<div
				data-components="editors-views-root"
				className={cn(
					"@container/editorsviews",
					"h-[inherit]",
					"w-full",
					"flex",
					"flex-col",
					"gap-divider-line",
					"bg-divider-line",
					"h-inherit",
					"overflow-hidden",
					"relative",
				)}
			>
				<Loaders
					active={!!isLoading}
					size={"big"}
					fullScreen
				/>
				<Forms.Root {...hooksFormStates}>
					<EditorsViewsHeaders
						datas={headers}
						configs={templates?.headers}
						controllers={controllers}
					/>
					<EditorsViewsContents
						datas={templates?.contents?.forms}
					/>
					<EditorsViewsFooters>
						<div className={cn(
							"absolute",
							"z-1",
							"bottom-0",
							"w-full",
							"h-full",
							"px-space",
							"flex-1",
							"flex",
							"justify-start",
							"items-center",
							"gap-x-4",
							"bg-background",
							"hover:h-18",
							"hover:border-t-1",
							"hover:border-divider-line",
							"transition-height",
							"duration-200",
							"ease-cool",
							"select-none"
						)}>

							<div
								className={cn(
									"h-full",
									"flex-1",
									"flex",
									"justify-start",
									"items-center",
									"gap-x-3",
									"bg-background",
									"text-mini-11",
									"[&_span]:uppercase",
									"[&_span]:font-semibold",
								)}
							>
								<div>
									<span>Created : </span>
									{new Date(formsDatas?.created_at).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
								</div>
								<div>
									<span>Updated : </span>
									{new Date(formsDatas?.updated_at).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
								</div>
							</div>

							<div className={cn(
								"flex",
								"justify-end",
								"items-center",
								"gap-x-3",

							)}>
								<EditorsViewsControllers
									datas={controllers}
									variant={"ghost_customer"}
									size={"sm_customer"}
								/>
								<span className={cn("text-xs")}>Duplicate</span>
								<span className={cn("text-xs")}>Output</span>
								<span className={cn("text-xs")}>Review</span>
								<span className={cn("text-xs")}>Message</span>
							</div>
						</div>
					</EditorsViewsFooters>
					{/* <ViewsOverlay active={isEditorsViewsLoading} /> */}
				</Forms.Root >
			</div>

		</EditorsViewsContextProvider>
	)
})
EditorsViews.displayName = "EditorsViews"
export default EditorsViews
