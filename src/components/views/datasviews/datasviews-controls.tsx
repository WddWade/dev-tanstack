"use client"
import { useRef, useState } from "react"
import DatasViewsSearch from "./datasviews-search"
import { ArrowUpDown, Eye, FunnelPlus, Minus } from "lucide-react"
import { cn } from "@/utils"
import {
	useViewsStores,
	useShallow,
	setDatasViewsSelectedId,
} from "@/stores/globals-views-stores"

import DatasController from "./datas-controller"
import DatasSelecter from "./datas-selector"
import { useDatasViews } from "./datasviews-hooks"

interface PropsType { }

const DatasViewsControls: React.FC<PropsType> = () => {

	const { datasViewsSelectedId, setDatasViewsSelectedId } = useDatasViews()
	const [active, setActive] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })

	const containerRef = useRef<HTMLDivElement | null>(null)

	const panelWidth = 250
	const panelHeight = 600
	const panelOffset = 8

	const openControllerPanel = () => {
		if (active) return setActive(false)

		if (!containerRef.current) return
		const { right, bottom } = containerRef.current.getBoundingClientRect()

		const x = right - panelWidth - panelOffset
		const y = bottom + panelOffset

		setPosition(() => ({ x, y }))
		setActive(true)
	}

	return (
		<div
			data-components="datasViews-controls"
			className={cn(
				"flex",
				"gap-divider-line",
				"min-h-view-header",
				"bg-divider-line"
			)}
		>

			<div className={cn(
				"w-14",
				"px-space",
				"grid",
				"place-items-center",
				"bg-white",
				"relative",
			)}>
				<DatasSelecter >
					<div
						className={cn(
							"cursor-pointer",
							"size-4",
							"rounded",
							"grid",
							"place-content-center",
							"border-1",
							"border-stone-600",

							datasViewsSelectedId.length && [
								"border-2",
								"text-black",
								"border-black",
								// "bg-black"
							]
						)}
						onClick={() => setDatasViewsSelectedId([])}
					>
						<span>
							{datasViewsSelectedId.length ? <Minus size={10} strokeWidth={3.5} /> : null}
							{/* <List size={17} strokeWidth={2.2} /> */}
						</span>
					</div>
				</DatasSelecter>


			</div>
			<div
				data-components="search"
				className={cn(
					"flex-1",
					"flex",
					"px-4",
					"bg-background",
				)}
			>
				<DatasViewsSearch />
			</div>
			<div
				ref={containerRef}
				data-components="selectAll"
				className={cn(
					"flex",
					"bg-background",
					"place-items-center",
					"px-space",
					"gap-x-2"
				)}
			>
				<button
					className="cursor-pointer"
					onClick={openControllerPanel}
				>
					<FunnelPlus size={14} strokeWidth={2.7} />
				</button>
				<button
					className="cursor-pointer"
					onClick={openControllerPanel}
				>
					<ArrowUpDown size={15} strokeWidth={2} />
				</button>
				<button
					className="cursor-pointer"
					onClick={openControllerPanel}
				>
					<Eye size={15} strokeWidth={2.3} />
				</button>
			</div>

			<DatasController
				active={active}
				defaultPosX={position.x}
				defaultPosY={position.y}
				panelWidth={panelWidth}
				panelHeight={panelHeight}
				setClose={openControllerPanel}
			/>


			{/* <div
				data-components="selectAll"
				className={cn(
					"flex",
					"bg-background",
					"place-items-center",
					"px-space",
					"gap-5"
				)}
			>

				<DatasViewsCategories categories={categories} />
			</div> */}
		</div>
	)
}

DatasViewsControls.displayName = "DatasViewsControls"
export default DatasViewsControls
