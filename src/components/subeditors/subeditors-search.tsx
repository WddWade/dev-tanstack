"use client"

import { memo, useMemo, useState } from "react"
import { InputsGroup } from "../inputs"
import { Search, X } from "lucide-react"

const SubeditorsSearchs: React.FC<any> = () => {

	// console.log("datas", datas);
	// const { templateDatas } = useSubeditorsStatesContext()
	const [search, setSearch] = useState("")

	// const filterResult = useMemo(() => {
	// 	if (!search) return datas
	// 	const filterDatas = datas.filter((data: any) => {
	// 		return data.keywords ? data.keywords.filter((word: string) => word.match(search))?.length : false
	// 	})
	// 	return filterDatas
	// }, [search, datas])

	// console.log(filterResult);

	return (
		<InputsGroup.Group className="rounded">
			<InputsGroup.Input
				data-component="sub-editors-searchs"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search..."
			/>
			<InputsGroup.Addon>
				<Search className="size-3.5" />
			</InputsGroup.Addon>
			<InputsGroup.Addon align="inline-end">
				<InputsGroup.Button size="icon-xs">
					<X className="size-3.5" />
				</InputsGroup.Button>
			</InputsGroup.Addon>
		</InputsGroup.Group>
	)
}



SubeditorsSearchs.displayName = "SubeditorsSearchs"
export default SubeditorsSearchs

