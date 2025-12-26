"use client"

import { memo, useState } from "react"
import SidesNavigationsBlock from "./sidesviews-navigations-block"
import SidesNavigationsUnits from "./sidesviews-navigations-units"
import { cn } from "@/utils"
import { ScrollAreas } from "@/components"

// import type { SitesNavsMenusTypes } from "@/types"
import { useEffect } from "react"

interface PropsType {
	area: string
	datas?: any[]
}

const SidesNavigations: React.FC<PropsType> = memo(({ area, datas }) => {


	return (

		<ScrollAreas.Root
			data-components="lists"
			orientation="vertical"
			className={cn(
				"flex",
				"flex-col",
				"flex-1",
				"relative",
				"overflow-hidden",
				"scroll-smooth",
				"bg-background",
			)}
			thumbClassName="bg-black/30"
			type="scroll"
		>
			{/* <section
				className={cn(
					"flex",
					"flex-col",
					"flex-1",
					"relative",
					"overflow-hidden",
					"overflow-y-auto",
					"scroll-smooth"
				)}
			> */}
			<div
				data-components="navs"
				className={cn(
					"flex",
					"flex-col",
					"flex-1",
					"gap-divider-line",
					"bg-divider-line",
				)}
			>
				{datas && datas.map((data: any) =>
					<SidesNavigationsBlock key={data.id} title={data.title}>
						<SidesNavigationsUnits datas={data?.units} />
					</SidesNavigationsBlock>
				)}
			</div>
			{/* </section > */}
		</ScrollAreas.Root>

	)
})

SidesNavigations.displayName = "SidesNavigations"
export default SidesNavigations
