"use client"

import { memo } from "react"
import { useSubeditorsTemplatesContext } from "./subeditors-context"
import { Templates } from "./templates"
import { cn } from "@/utils"

export interface TemplatesProps {
	timeline?: boolean
}

const SubeditorsTemplates: React.FC<TemplatesProps> = memo((props) => {

	const { timeline } = props
	const { templateDatas } = useSubeditorsTemplatesContext()

	if (!templateDatas) return null

	return (
		<>{templateDatas?.length > 0
			? <div
				data-component="sub-editors-templates"
				data-templates="A"
				className={cn(
					"flex",
					"flex-col",
					"gap-y-3.5",
					"border-t",
					"border-b",
					timeline && [
						"py-7",
						"gap-y-7"
					]
				)}
			>
				{templateDatas.map((datas: Record<string, any>, index: number) => (
					<Templates.A key={datas.id}	{...datas} />
				))}

			</div>
			: "No data!!"
		}</>


	)
})

SubeditorsTemplates.displayName = "SubeditorsTemplates"
export default SubeditorsTemplates
