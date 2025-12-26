"use client"

import { IndexsViews } from "@/components"
// import { useParams } from "next/navigation"

interface CmsUnitsIndexProps { }

const CmsUnitsIndex: React.FC<CmsUnitsIndexProps> = (props) => {

	const views = "cms-units-index"
	console.log(views);

	// const { units } = useParams()

	return (<IndexsViews />)
}

CmsUnitsIndex.displayName = "CmsUnitsIndex"
export default CmsUnitsIndex
