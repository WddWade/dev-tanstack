"use client"

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { useParams, usePathname, useRouter } from "next/navigation"
import SidesNavigationsMenu from "./sidesviews-navigations-menu"
import { useSidesViews } from "../sidesviews-hooks"
import { ChevronRight, Dot } from "lucide-react"
import { cn, getDomTransTime, sleep } from "@/utils"
import { Loaders, LoadersSpinners, useViews } from "@/components"

interface NavData {
	name: string
	unit?: string
	route?: string
	menu?: NavData[]
}

interface PropsTypes {
	datas: NavData
	level?: number
}

const SidesNavigationsNav: React.FC<PropsTypes> = memo(({
	datas,
	level = 0,
}) => {

	// const params = useParams<{ units: string }>()
	// const units = useMemo(() => params?.units, [params])

	// const pathname = usePathname()
	// const router = useRouter()

	const {
		leaveEditorsViewsEdited
	} = useViews()

	const {
		setEditorsViewsLoading,
		setDatasViewsLoading,
	} = useSidesViews()

	// const isUnit = useMemo(() => units
	// 	? units.split("_")[level!] === datas.unit
	// 	: false, [units, level, datas.unit])

	// const isPathname = useMemo(() => datas?.route
	// 	? pathname.startsWith(datas.route) && isUnit
	// 	: false, [pathname, isUnit, datas?.route])

	// const isDefaultActive = useMemo(() => !datas?.menu
	// 	? isPathname
	// 	: false, [datas?.menu, isPathname])

	// const [active, setActive] = useState(() => isDefaultActive)
	const [active, setActive] = useState(() => false)
	// const [expand, setExpand] = useState(() => isUnit)
	const [expand, setExpand] = useState(() => false)
	const [isWorking, setWorking] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const navRef = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	const setExpandHandler = useCallback(async () => {
		if (!menuRef.current) return
		setWorking(true)

		const target = menuRef.current
		target.style.height = target.scrollHeight + "px"
		setExpand(prev => !prev)

		await sleep(expand ? 0 : getDomTransTime(target))
		target.style.height = ""

		setWorking(false)
	}, [expand])

	const changeRouteHandler = (route: string) => {
		setLoading(true)
		setDatasViewsLoading(true)
		setEditorsViewsLoading(true)
		// router.push(route as any)
	}

	const onClickEvent = useCallback(async () => {
		if (isWorking || active) return
		if (datas.menu) return setExpandHandler()
		// if (!datas?.route || isPathname) return

		const actions = await leaveEditorsViewsEdited()
		// if (actions == "leave") changeRouteHandler(datas?.route)

	}, [
		active,
		datas,
		isWorking,
		// isPathname,
		setExpandHandler,
		leaveEditorsViewsEdited
	])

	const scrollToActive = useCallback(async () => {
		if (!navRef?.current) return
		const target = navRef.current
		await sleep(500)
		target.scrollIntoView({ block: "center" })
	}, [])

	// useEffect(() => {
	// 	if (datas?.menu) return
	// 	if (isPathname) setLoading(false)
	// 	setActive(isPathname)
	// }, [isPathname, datas?.menu])

	useEffect(() => {
		if (active) scrollToActive()
	}, [])

	return (
		<nav
			data-components="sides-navigations-nav"
			className={"flex flex-col"}
		>
			<div
				ref={navRef}
				className={cn(
					"group",
					"flex justify-start items-center flex-nowrap",
					"font-normal",
					"cursor-pointer",
					"transition-all duration-300",
					"bg-transparent",
					"py-1",
					"pr-space",
					"hover:bg-[#f2f2f2]",
					"data-[active=true]:bg-background-hover",
					"data-[active=true]:text-white",
					"data-[nav=true]:font-light",
				)}
				data-active={active}
				data-level={level}
				data-nav={level > 0 && !datas?.menu}
				onClick={onClickEvent}
				style={{
					paddingLeft: `calc(var(--spacing-space) + calc(12px * ${level}))`
				}}
			>
				<div
					className={"flex-1"}>
					{level > 0
						? <span className={"flex"}>
							<div className={cn(
								"size-1",
								"bg-black",
								"mt-1.5 mr-1.5",
								"group-data-[active=true]:bg-white"
							)} />
							{datas.name}
						</span>
						: datas.name
					}
				</div>
				<div
					className={cn(
						"flex",
						"items-center",
						"justify-center"
					)}
					data-expand={expand}
				>
					{datas?.menu && <span
						className={cn(
							"flex items-center justify-center",
							"text-black/20",
							"rotate-0",
							"data-[expand=true]:rotate-90",
							"data-[expand=true]:text-black",
							"transition-transform duration-200",
						)}
						data-expand={expand}
					>
						<ChevronRight size="0.875rem" />
					</span>}

					{isLoading && <LoadersSpinners />}
				</div>

			</div>

			{datas?.menu && <div
				ref={menuRef}
				className={cn(
					"h-0",
					"flex",
					"flex-col",
					"overflow-hidden",
					"transition-all",
					"duration-[0.3s]",
					"ease-cool",
					"data-[expand=true]:h-auto",
				)}
				data-expand={expand}
			>
				<SidesNavigationsMenu
					datas={datas?.menu}
					level={level + 1}
				/>
			</div>}

		</nav >
	)
})

SidesNavigationsNav.displayName = "SidesNavigationsNav"
export default SidesNavigationsNav
