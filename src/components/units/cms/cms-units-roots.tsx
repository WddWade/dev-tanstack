"use client"

import { memo, useMemo } from "react"
import { DatasViews, EditorsViews } from "@/components"
// import { useParams } from "next/navigation"
import { useUintsQuery } from "@/libs"

export interface CmsUnitsRootsProps {
	// area: string
	// parameters: Record<string, string>
	// resizeStores: string
}

const CmsUnitsRoots: React.FC<CmsUnitsRootsProps> = memo((props) => {

	const area = "cms"
	const views = "cms-units-roots"
	// console.log(views);

	// const params = useParams<{ sites: string, units: string, contents: string }>()

	// const ueryOptions = useMemo(() => ({
	// 	views, parameters: { area, ...params }
	// }), [params])

	// const componentProps = useUintsQuery(ueryOptions)
	// const unitsComponent = useMemo(() => componentProps?.viewsComponent?.name ?? "", [componentProps?.viewsComponent])
	// console.log("viewsComponent", componentProps.viewsComponent);

	return (
		<>123
			{/* {unitsComponent == "datasViews"
				? <DatasViews {...componentProps} />
				: <EditorsViews {...componentProps} />
			} */}
		</>
	)
})

CmsUnitsRoots.displayName = "CmsUnitsRoots"
export default CmsUnitsRoots
