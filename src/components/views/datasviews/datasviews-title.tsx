"use client"

// import { useRouter } from "next/navigation"
import { useViews } from "@/components"
import { cn } from "@/utils"

interface PropsType {
	title?: string
	name?: string
	routePrefix?: string
}

const DatasViewsTitle: React.FC<PropsType> = ({
	title,
	name,
	routePrefix,
}) => {

	// const router = useRouter()
	const {
		leaveEditorsViewsEdited
	} = useViews()

	const onChangeUnitsIndex = async () => {
		const actions = await leaveEditorsViewsEdited()
		// if (actions == "leave") router.push(routePrefix as any)
	}

	return (
		<div
			data-components="datasVviews-title"
			className={cn(
				"flex-1",
				"font-medium",
				"min-h-view-header",
				"flex",
				"justify-between",
				"items-center",
				"gap-8"
			)}
		>
			<div
				data-components="units-title"
				className={cn(
					"flex-1",
					"flex",
					"justify-start",
					"items-center",
					"overflow-hidden"
				)}
			>
				{/* <div
					data-components="loader"
					className={cn(
						"w-0",
						"transition-all",
						"duration-300",
						"flex",
						"justify-start",
						"data-[loader=true]:w-5"
					)}
					data-loader={isDatasViewsLoading}
				>
					<ViewsLoader active={isDatasViewsLoading} />
				</div> */}
				<div
					onClick={onChangeUnitsIndex}
					className={cn("font-medium cursor-pointer")}
				>
					<p className={"line-clamp-1"}>
						{name}
					</p>
				</div>
			</div>
		</div>
	)
}

DatasViewsTitle.displayName = "DatasViewsTitle"
export default DatasViewsTitle

const response = {
	status: true,
	datasets: {},
	configs: {},
	cache: {
		//移除快取紀錄，用到的時候重新fetch
		remove: [
			["cacheA", "cacheB"],
			["cacheA", "cacheB"],
			["cacheA", "cacheB"],
		],
		//立即重新fetch
		invalidate: [
			["cacheA", "cacheB"],
			["cacheC", "cacheD"],
		],
	}
}
