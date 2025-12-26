"use client"

import { memo } from "react"
import SidesNavigationsNav from "./sidesviews-navigations-nav"

interface PropsTypes {
	datas: any
	level: number
}

const SidesNavigationsMenu: React.FC<PropsTypes> = memo(({
	datas,
	level
}) => {

	return (
		<>
			{datas.map((data: any) =>
				<SidesNavigationsNav
					key={data.id}
					datas={data}
					level={level}
				/>)}
		</>

	)
})

SidesNavigationsMenu.displayName = "SidesNavigationsMenu"
export default SidesNavigationsMenu
