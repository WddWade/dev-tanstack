"use client"

import { Link2, Plus } from "lucide-react"
import { Buttons } from "../buttons"
import SubeditorsSearchs from "./subeditors-search"
import { useSubeditorsActionsContext } from "./subeditors-context"

export interface SubeditorsControllersProps { }

const SubeditorsControllers: React.FC<SubeditorsControllersProps> = () => {

	const {
		onEditorsOpen,
		onEditorsDatasetOpen,
	} = useSubeditorsActionsContext()

	return (
		<div
			data-component="sub-editors-controllers"
			className="flex gap-x-1.5 items-center">
			<SubeditorsSearchs />
			{/* TODO 需增加判斷使用哪一種editorMode在出現控制 */}
			<Buttons
				className="rounded text-xs uppercase"
				size="sm"
				onClick={() => onEditorsOpen({ editActions: "create", editorMode: "form" })}
			>
				<Plus className="size-3.5" />
			</Buttons>
			<Buttons
				className="rounded text-xs uppercase"
				size="sm"
				onClick={() => onEditorsDatasetOpen({ editActions: "create", editorMode: "dataset" })}
			>
				<Link2 className="size-3.5" />
			</Buttons>
		</div>
	)
}

SubeditorsControllers.displayName = "SubeditorsControllers"
export default SubeditorsControllers
