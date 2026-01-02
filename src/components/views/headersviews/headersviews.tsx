
// import { notFound } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import {
	ViewsLogos,
	ViewsNotifications,
	ViewsPersonals,
	ViewsNavigations,
	ViewsLogouts
} from "./components"
import { useBootsQuery } from "@/libs"
import { cn } from "@/utils"
import { ClientOnly } from "@tanstack/react-router"

export interface HeadersViewsType {
	datasets: Record<string, any>,
	configs: Record<string, any>
}

export interface HeadersViewsDatas {
	status: boolean
	headersViews: HeadersViewsType
	resizeStores: Record<string, any>
}

interface HeadersViewsProps { }

const HeadersViews: React.FC<HeadersViewsProps> = () => {

	const { queryDatas, isLoading } = useBootsQuery()
	const { status, datasets, configs } = queryDatas || {}

	// console.log("HeadersViews queryDatas", queryDatas);
	// if (!isLoading && (!status || !datasets?.headersViews)) notFound()

	const headersViewsDatas = datasets?.headersViews
	const headersViewsConfigs = configs?.headersViews
	const templates = headersViewsConfigs?.templates || {}

	const isLogos = headersViewsDatas?.logos && templates.logos
	const isNavigations = headersViewsDatas?.navigations && templates.navigations
	const isPersonals = headersViewsDatas?.personals && templates.personals
	const isNotifications = headersViewsDatas?.notifications && templates.notifications
	// const isLogouts = datasets.logouts && templates.notifications

	return (
		<div
			data-components="headersViews"
			className={cn("h-headers")}
		>
			{/* <ClientOnly> */}
			<AnimatePresence>
				{headersViewsDatas && <motion.div

					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn(
						"w-full",
						"h-full",
						"px-space",
						"bg-black",
						"flex",
						"justify-start",
						"items-center",
						"gap-[52px]",
						"bg-black",
						"*:w-auto"
					)}
				>
					<section
						data-components="left"
						className={"w-auto"}>
						{isLogos ? <ViewsLogos
							datas={headersViewsDatas.logos}
							configs={templates.logos}
						/> : null}
					</section>

					<section
						data-components="center"
						className={cn(
							"w-auto",
							"h-full",
							"flex",
							"flex-row",
							"flex-nowrap",
							"justify-center",
							"items-center",
							"gap-[25px]"
						)}>
						{isNavigations ? <ViewsNavigations
							datas={headersViewsDatas.navigations}
							configs={templates.navigations}
						/> : null}
					</section>

					<section
						data-components="right"
						className={cn(
							"capitalize",
							"flex-1",
							"flex",
							"gap-x-3",
							"justify-end",
							"items-center"
						)}>

						{isPersonals ? <ViewsPersonals
							datas={headersViewsDatas.personals}
							configs={templates.personals}
						/> : null}

						{isNotifications ? <ViewsNotifications /> : null}
						<ViewsLogouts />
					</section>
				</motion.div>}
			</AnimatePresence>
			{/* </ClientOnly> */}
		</div>)
}

HeadersViews.displayName = "HeadersViews"
export default HeadersViews
