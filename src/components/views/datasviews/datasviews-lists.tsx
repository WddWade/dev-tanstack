"use client"

import { memo } from "react"
import { Lists } from "./components"

interface PropsTypes {
	index: number
	template?: string | number
	datas: any
}

const DatasViewsLists: React.FC<PropsTypes> = memo(({
	template,
	datas,
	index
}) => {

	const props = { ...datas, index }
	if (template == "defaults") {
		return <Lists.Normal {...props} />
	}
	// if (template == "color") {
	// 	return <Lists.Color {...props} />
	// }
})

DatasViewsLists.displayName = "DatasViewsLists"
export default DatasViewsLists

