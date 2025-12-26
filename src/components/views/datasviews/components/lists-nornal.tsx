"use client"

import { memo, useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
import { EllipsisVertical, Check } from "lucide-react"
import { useDatasViews } from "../datasviews-hooks"
import { divide } from "lodash"
import { cn } from "@/utils"
import { Loaders, LoadersSpinners, useViews } from "@/components"

interface PropsType {
	index: number
	routePrefix: string
	datas: any
	slots: { [key: string | number]: string }
}

const ListsNornal: React.FC<PropsType> = memo(({
	routePrefix,
	datas,
	slots,
	index,
}) => {

	const { id } = datas || {}

	const {
		leaveEditorsViewsEdited
	} = useViews()

	const {
		datasViewsSelectedId,
		editorViewsDatas,
		isEditorsViewsLoading,
		setDatasViewsSelectedId,
		setEditorsViewsLoading,
	} = useDatasViews()

	// const router = useRouter()
	const [loading, setLoading] = useState(false)

	const isSelected = datasViewsSelectedId.includes(String(id))
	const isActive = editorViewsDatas?.id == String(id)
	const datasViewsSelectedIndex = datasViewsSelectedId.indexOf(String(id)) + 1

	const changeRouteHandler = () => {
		const contentsUrl = routePrefix + "/" + id
		setEditorsViewsLoading(true)
		setLoading(true)
		// router.push(contentsUrl as any)
	}

	const onClickEvent = async () => {
		if (isEditorsViewsLoading || loading) return

		const actions = await leaveEditorsViewsEdited()
		if (actions == "leave") changeRouteHandler()
	}

	useEffect(() => {
		!isEditorsViewsLoading && setLoading(false)
	}, [isEditorsViewsLoading])

	return (
		<div
			data-components={"ListsNornal"}
			className={cn(
				"py-4",
				"grid",
				"grid-cols-[auto_1fr_auto]",
				"items-center",
				"relative",
				"bg-background",
				"transition-[background]",
				"last:border-b-1",
				"data-[active=true]:bg-stone-100",
				"last:border-b-divider-line",
				"relative",
				// isSelected && "bg-indigo-50"
			)}
			data-list-id={datas.id}
			data-active={isActive}
		>
			<div
				data-components={"select"}
				className={cn(
					"w-14",
					"px-space",
					"grid",
					"place-content-center",
					"select-none",
				)}>
				<div
					data-components="lists-views-selected-checkbox"
					className={cn(
						"size-4",
						"rounded",
						"grid",
						"place-content-center",
						"border-1",
						"cursor-pointer",
						"border-stone-400",
						"text-white",

						isSelected && [
							"bg-indigo-500",
							"border-indigo-600"
						])
					}
					onClick={(e: React.MouseEvent) => {
						if (isSelected) {
							const next = datasViewsSelectedId.filter(selected => selected !== String(id))
							return setDatasViewsSelectedId(next)
						}

						const target = e.nativeEvent as MouseEvent
						if (target.shiftKey) {
							console.log("index", index);
						}
						if (isSelected) {
							const next = datasViewsSelectedId.filter(selected => selected !== String(id))
							return setDatasViewsSelectedId(next)
						}
						if (!isSelected) {
							return setDatasViewsSelectedId([...datasViewsSelectedId, String(id)])
						}
					}}
				>
					{isSelected && <span className={cn(
						"-mb-px",
						"text-[8px]",
						"leading-2",
						"-tracking-wider",
						"font-medium",
					)}
					>
						{datasViewsSelectedId.length > 999
							? <Check size={11} strokeWidth={3} />
							: datasViewsSelectedIndex
						}
					</span>}
				</div>

			</div>
			<div
				data-components={"container"}
				className={"flex justify-start items-center cursor-pointer"}
				onClick={isActive ? undefined : onClickEvent}
			>
				{slots?.[1] && <div
					data-components={"a"}
					className={cn(
						"w-14",
						"aspect-[1/1]",
						"bg-[#ccc]",
						"rounded-full",
						"flex",
						"justify-center",
						"items-center",
						"overflow-hidden",
						"[&>img]:w-aut",
					)}
				>
					<img src={datas?.[slots?.[1]]} />
				</div>}

				<div
					data-components={"content"}
					className={cn(
						"flex",
						"flex-col",
						"justify-center",
						"items-start",
						"gap-[3px]",
					)}
				>
					{slots?.[2] && <div
						data-components={"b"}
						className={cn(
							"font-medium",
							"cursor-pointer",
							"font-semibold",
						)}

					>
						{datas?.[slots?.[2]]}
					</div>}

					{slots?.[3] && <div
						data-components={"c"}
						className={cn("cursor-pointer line-clamp-1")}
					>
						{datas?.[slots?.[3]]}
					</div>}

					{/* {slots?.[4] && <div className={styles.d}>
                        {datas?.[slots?.[4]].map((data: string, index: number) => <span key={index}>{data}</span>)}
                    </div>} */}

				</div>
			</div>
			<div
				data-components={"control"}
				className={cn(
					"w-14",
					"px-5",
					"flex",
					"justify-end",
					"items-center"
				)}
			>
				<span>
					{loading
						? <LoadersSpinners />
						: <div className={cn("flex flex-row flex-nowrap")}>
							<EllipsisVertical size={18} className="text-black/30" />
						</div>
					}
				</span>
			</div>
		</div>
	)
})

ListsNornal.displayName = "ListsNornal"
export default ListsNornal
