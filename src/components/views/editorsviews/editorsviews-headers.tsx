
"use client"

import { memo } from "react"
import { useEditorsViewsContext } from "./editorsviews-context"
import type { SlotsPropsTypes } from "@/types"
import { cn } from "@/utils"
import EditorsViewsControllers from "./editorsviews-controllers"

interface PropsTypes {
	datas?: {
		title?: string,
		name?: string,
		description?: string
	}
	controllers?: any
	configs?: {
		name: "defaults" | "vertical"
		slots?: SlotsPropsTypes
	}
}

const EditorsViewsHeaders: React.FC<PropsTypes> = memo((props) => {

	const { datas, controllers, configs } = props

	const { isCreateActions } = useEditorsViewsContext()

	if (!datas) return

	return (
		<section
			data-components="editors-views-header"
			className={cn(
				"min-h-view-header",
				"px-space",
				"flex",
				"gap-x-4",
				"items-center",
				"justify-between",
				"bg-background",
			)}
		>
			<div
				data-components="editors-views-header-title"
				className={cn(
					"flex",
					"justify-start",
					"items-center",
					"overflow-hidden",
				)}
			>
				<p
					className={cn(
						"align-middle",
						"font-medium",
						"text-mini-13",
						"line-clamp-1"
					)}>
					{isCreateActions ? "新增未命名資料" : datas?.title}</p>
			</div>
			<div
				data-components="editors-views-header-controllers"
				className={cn("flex", "gap-x-3")}
			>
				{controllers && <EditorsViewsControllers
					datas={controllers}
					variant={"ghost_customer"}
					size={"sm_customer"}
				/>}
			</div>
		</section>
	)
})

EditorsViewsHeaders.displayName = "EditorsViewsHeaders"
export default EditorsViewsHeaders
