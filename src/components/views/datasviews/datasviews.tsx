"use client"

import { memo, useState, useRef, useMemo, useCallback } from "react"
// import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import DatasViewsPagination from "./datasviews-pagination"
import DatasViewsTitle from "./datasviews-title"
import DatasViewsFunction from "./datasviews-function"
import DatasViewsControls from "./datasviews-controls"
import DatasViewsLists from "./datasviews-lists"
import { DatasViewsContextProvider } from "./datasviews-context"
import { useDatasViews } from "./datasviews-hooks"
import { ViewsOverlay } from "../viewsoverlay"
import { DragResize, Loaders, ScrollAreas } from "@/components"
import { useEffectOne } from "@/hooks"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import type { ViewsDatas } from "@/components"
import { cn } from "@/utils"
import { useBootsContext } from "@/libs"

export interface DatasViewsViewsProps {
	datas?: ViewsDatas
	isFetching?: boolean
	isLoading?: boolean
	remoteRoute: string[]
	routeParams: Record<string, string>
	routePrefix: string
	refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
	setQueryDatas: (datas: any) => void
}

const resizeStoreKey = "datasViews"

const DatasViews: React.FC<DatasViewsViewsProps> = memo((props) => {

	const {
		datas: queryDatas,
		refetch: queryRefetch,
		isFetching,
		isLoading,
		remoteRoute,
		routeParams,
		routePrefix,
		setQueryDatas,
	} = props

	const { resizeStores } = useBootsContext()

	// const params = useParams<{ contents?: string }>()
	// const contents = useMemo(() => params.contents, [params.contents])

	const {
		datasViewsSelectedId,
		isDatasViewsLoading,
		setDatasViewsLoading,
		setDatasViewsControllers,
		setEditorsViewsLoading,
	} = useDatasViews()

	const {
		headers = {},
		functions = {},
		categories = {},
		searchs = {},
		pagination = {},
		lists = []
	} = queryDatas?.datasets ?? {}

	const {
		templates = {},
		settings = {}
	} = queryDatas?.configs ?? {}

	const listsPerPage = templates?.lists?.perPage ?? 50

	const listsGroupRef = useRef<HTMLDivElement | null>(null)
	const scrollAreasRef = useRef<HTMLDivElement | null>(null)

	const [currentPage, setCurrentPage] = useState(() => {
		// const contentsContentsIndex = lists.findIndex((list: any) => String(list.id) === String(contents))
		const contentsContentsIndex = lists.findIndex((list: any) => String(list.id) === String(""))
		return contentsContentsIndex >= 0
			? Math.ceil((contentsContentsIndex + 1) / listsPerPage)
			: 1
	})

	const paginateMemo = useMemo(() => {
		const listsRecords = lists.length
		const totalPages = Math.ceil(listsRecords / listsPerPage)
		const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages))

		const startIndex = (safeCurrentPage - 1) * listsPerPage
		const endIndex = Math.min(startIndex + listsPerPage - 1, listsRecords - 1)

		return {
			listsRecords,
			listsPerPage,
			totalPages,
			currentPage: safeCurrentPage,
			startIndex,
			endIndex,
			hasPrev: safeCurrentPage > 1,
			hasNext: safeCurrentPage < totalPages,
		}
	}, [
		lists,
		listsPerPage,
		currentPage
	])

	const listsMemo = useMemo(() => {
		const { startIndex, endIndex } = paginateMemo
		const currentLista = lists.slice(startIndex, endIndex + 1)

		return currentLista
	}, [
		lists,
		paginateMemo,
	])

	//lists components
	const ListsDatasProps = {
		routePrefix,
		slots: templates?.lists?.slots,
	}

	// const activeScrollIntoView = useCallback(() => {
	// 	if (!contents) return
	// 	const list = document.querySelector(`[data-list-id="${contents}"]`)
	// 	list?.scrollIntoView({ block: "center" })
	// }, [contents])

	const dragResizeProps = useMemo(() => {
		const resizeValue = resizeStores?.[resizeStoreKey] ?? undefined
		return {
			active: settings?.resize,
			isResizeStore: settings?.resizeStore,
			resizeStoreValue: resizeValue,
			resizeStoreKey: resizeStoreKey,
			// dragLineWidth: 3,
			minWidth: settings?.resizeMinWidth,
			maxWidth: settings?.resizeMaxWidth,
		}
	}, [])

	const refetchCallback = async () => {
		const result = await queryRefetch?.({})
		console.log("refetchCallback", result);
		if (result?.isSuccess) setQueryDatas(result.data)
	}

	const DatasViewsTitleProps = {
		title: headers.title,
		name: headers.name,
		routePrefix
	}

	const DatasViewsFunctionProps = { routePrefix }

	useEffectOne(() => {
		setDatasViewsLoading(false)
		setEditorsViewsLoading(false)

		if (!listsGroupRef?.current) return
		// activeScrollIntoView()
	})


	return (
		<DatasViewsContextProvider value={{}}>
			<DragResize {...dragResizeProps}>
				<div
					data-components="datasViews-root"
					className={cn(
						"h-full",
						"flex-1",
						"flex",
						"relative",
						"flex-col",
						"gap-divider-line",
						"overflow-hidden",
						"bg-divider-line",
						"border-r-1",
						"border-r-divider-line",
						!queryDatas && "border-r-white",
					)}
				>
					<Loaders
						active={!!isLoading}
						size={"big"}
						fullScreen
					/>
					<section
						data-components="datasViews-headers"
						className={cn(
							"px-space",
							"flex",
							"bg-background"
						)}
					>
						<DatasViewsTitle {...DatasViewsTitleProps} />
						<DatasViewsFunction {...DatasViewsFunctionProps} />
						<span
							className={cn(
								"pl-4",
								"flex",
								"justify-center",
								"items-center",
								isFetching && "opacity-20"
							)}
							onClick={() => !isFetching && refetchCallback()}
						>
							<RefreshCw size={14} />
						</span>
					</section>

					<section>
						<DatasViewsControls />
					</section>

					<ScrollAreas.Root
						ref={scrollAreasRef}
						data-components="lists"
						orientation="vertical"
						className={cn(
							"bg-background",
							"overflow-hidden",
							"flex-1",
							"flex",
							"flex-col",
							"gap-divider-line",
						)}
						thumbClassName="bg-black/30"
						type="scroll"
					>
						<div
							data-components="listsGroup"
							className={cn(
								"flex",
								"flex-col",
								"gap-divider-line",
								"bg-divider-line",
								"relative",
							)}
							ref={listsGroupRef}
						>
							{listsMemo && listsMemo.map((data: any, index: number) => (
								<DatasViewsLists
									key={data.id}
									index={index}
									template={templates?.lists.name}
									datas={{ datas: data, ...ListsDatasProps }}
								/>
							))}
							<div className={cn(
								"w-full",
								"min-h-view-header",
								"grid",
								"grid-cols-1",
								"justify-self-stretch"
							)}>
								<button
									className={cn(
										"text-mini-11",
										"font-medium",
										"bg-background",
										paginateMemo.hasNext && "cursor-pointer",
									)}
									onClick={() => {
										if (!paginateMemo.hasNext) return
										if (scrollAreasRef.current) scrollAreasRef.current.scrollTo({ top: 0, behavior: "instant" })
										setCurrentPage(prev => prev + 1)
									}}
								>
									{!paginateMemo.hasNext
										? "No more page"
										: "Move to Page " + (paginateMemo.currentPage + 1)
									}
								</button>
							</div>
						</div>
					</ScrollAreas.Root>

					<DatasViewsPagination>
						<div
							className={cn(
								"text-mini-11",
								"inline-flex",
								"gap-x-3",
								"[&_span]:font-bold",
								"**:select-none"
							)}
						>
							{datasViewsSelectedId.length ? <p>Selected <span>{datasViewsSelectedId.length}</span></p> : null}
							{<p>Records <span>{paginateMemo.listsRecords}</span></p>}
							<p>Data Page <span>{paginateMemo.currentPage}</span>/<span>{paginateMemo.totalPages}</span></p>
						</div>
						<div className={cn(
							"inline-flex",
							"gap-x-3",
							"[&_button]:text-mini-11",
							"[&_button]:font-semibold",
							"[&_button]:uppercase",
							"[&_button]:cursor-pointer",
							"**:select-none"
						)}>
							<button
								className="inline-flex items-center gap-x-px"
								onClick={() => {
									if (!paginateMemo.hasPrev) return
									if (scrollAreasRef.current) scrollAreasRef.current.scrollTo({ top: 0, behavior: "instant" })
									// window.history.replaceState(null, "", "?page=" + (paginateMemo.currentPage - 1))
									setCurrentPage(prev => prev - 1)
								}}
							>
								<ChevronLeft size={14} strokeWidth={2.2} />
								{/* Prev */}
							</button>

							<button
								className="inline-flex items-center gap-x-px"
								onClick={() => {
									if (!paginateMemo.hasNext) return
									if (scrollAreasRef.current) scrollAreasRef.current.scrollTo({ top: 0, behavior: "instant" })
									// window.history.replaceState(null, "", "?page=" + (paginateMemo.currentPage + 1))
									setCurrentPage(prev => prev + 1)
								}}
							>
								{/* Next */}
								<ChevronRight size={14} strokeWidth={2.2} />
							</button>
						</div>
					</DatasViewsPagination >

					{/* <ViewsOverlay active={isDatasViewsLoading} /> */}
				</div>
			</DragResize>
		</DatasViewsContextProvider>
	)
})

DatasViews.displayName = "DatasViews"
export default DatasViews
