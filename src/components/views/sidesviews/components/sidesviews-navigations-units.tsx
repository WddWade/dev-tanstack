"use client"

import { memo } from "react"
import SidesNavigationsNav from "./sidesviews-navigations-nav"
import { cn } from "@/utils"

interface PropsTypes {
	datas: any
}

const SidesNavigationsUnits: React.FC<PropsTypes> = memo(({
	datas
}) => {

	return (
		<>
			{datas && datas.map((unit: any) =>
				<section
					key={unit.id}
					data-components="sidesNavigationsUnits"
					className={"flex flex-col"}
				>
					<SidesNavigationsNav datas={unit} />
				</section>
			)}
		</>

	)
})

SidesNavigationsUnits.displayName = "SidesNavigationsUnits"
export default SidesNavigationsUnits
