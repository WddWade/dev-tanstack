"use client"

import { memo, useMemo } from "react"
import { EditorsViews, EditorsViewsNotfound } from "@/components"
// import { useParams } from "next/navigation"
import { useUints } from "../units-hooks"

export interface CmsUnitsContentsProps {
	// parameters: Record<string, string>
	// resizeStores: string
}

const CmsUnitsContents: React.FC<CmsUnitsContentsProps> = memo((props) => {

	const area = "cms"
	const views = "cms-units-contents"
	// console.log(views);

	// const params = useParams<{ sites: string, units: string, contents: string }>()

	// const ueryOptions = useMemo(() => ({
	// 	views, id: params?.contents, parameters: { area, ...params }
	// }), [params])

	// const componentProps = useUints(ueryOptions)

	return (
		<>546
			{/* {componentProps.isNotfound
				? <EditorsViewsNotfound {...componentProps} />
				: <EditorsViews {...componentProps} />
			} */}
		</>
	)
})

CmsUnitsContents.displayName = "CmsUnitsContents"
export default CmsUnitsContents
