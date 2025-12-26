"use client"

import { memo, use, useEffect, useMemo } from "react"
// import { notFound, useParams } from "next/navigation"
import { DragResize } from "@/components"
import { SidesSitesSelects, SidesNavigations } from "./components"
import { AnimatePresence, motion } from "motion/react"
import { useBootsContext, useBootsQuery } from "@/libs"
import { cn } from "@/utils"

export interface SidesViewsType {
	datasets: Record<string, any>,
	configs: Record<string, any>
}

export interface SidesViewsDatas {
	status: boolean
	sidesViews: { [key: string]: SidesViewsType }
	resizeStores: Record<string, any>
}

interface SidesViewsProps {
	area: string
	// paramsPromise: Promise<{ sites: string }>
	// resizeStores?: any
}

const resizeStoreKey = "sidesViews"

const SidesViews: React.FC<SidesViewsProps> = memo(({ area }) => {

	const { resizeStores } = useBootsContext()

	// const params = useParams<{ sites: string }>()
	// const sites = useMemo(() => params?.sites, [params])
	const sites = ""

	const { queryDatas, isLoading } = useBootsQuery()
	const { status, datasets, configs } = queryDatas || {}

	const sidesViewsDatas = useMemo(() => datasets?.sidesViews?.[area] ?? {}, [area, datasets])
	const sidesViewsConfigs = useMemo(() => configs?.sidesViews?.[area] ?? {}, [area, configs])

	const isSitesRoute = useMemo(() => {
		if (!sidesViewsDatas?.sitesSelects) return
		return sidesViewsDatas.sitesSelects
			.reduce((original: any[], current: any) => ([...original, ...current.sites]), [])
			.find((site: any) => site.route == sites)?.route == sites
	}, [
		sites,
		sidesViewsDatas?.sitesSelects,
	])

	// if (!isLoading && (!status || !sidesViewsDatas)) notFound()
	// if (isLoading && isSitesRoute) notFound()

	const siteNavigations = sidesViewsDatas?.siteNavigations?.[sites]
	const sitesSelects = sidesViewsDatas?.sitesSelects

	const { templates, settings } = sidesViewsConfigs || {}
	const resizeValue = resizeStores?.[resizeStoreKey]

	const dragResizeProps = useMemo(() => ({
		resizeStoreKey,
		active: settings?.resize,
		isResizeStore: settings?.resizeStore,
		resizeStoreValue: resizeValue,
		minWidth: 200,
		maxWidth: 350,
	}), [
		settings,
		resizeValue,
	])

	useEffect(() => {
		console.log("Mounted SidesViews");
		return () => {
			console.log("Unmounted SidesViews");
		}
	}, [])


	return (
		<>
			{sites && isSitesRoute && <DragResize {...dragResizeProps}>
				<aside
					data-components="sidesViews"
					className={cn(
						"min-w-sidebar",
						"h-full",
					)}>
					{/* <button onClick={() => setCount(prev=>prev+1)}>{count}</button> */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={cn(
							"h-full",
							"flex-1",
							"flex",
							"flex-col",
							"gap-divider-line",
							"bg-divider-line",
							"duration-200",
							"border-r",
							"border-r-divider-line",
						)}
					>
						<SidesSitesSelects
							area={area}
							sites={sites}
							datas={sitesSelects}
						/>
						<SidesNavigations
							area={area}
							datas={siteNavigations}
						/>
					</motion.div>
				</aside>
			</DragResize>}

		</>

	)
})
SidesViews.displayName = "SidesViews"
export default SidesViews
