"use client"

// import { useParams, useRouter } from "next/navigation"
import { setEditorsViewsLoading } from "@/stores/globals-views-stores"
import { cn } from "@/utils"
import { BookCopy, Menu, Settings2 } from "lucide-react"
import DatasOption from "./datas-options"

interface PropsType {
	routePrefix?: string
}

const DatasViewsFunction: React.FC<PropsType> = ({ routePrefix }) => {

	// const router = useRouter()
	// const { contents } = useParams()

	const createRoute = routePrefix + "/create"

	const onClickEvent = () => {
		// if (contents == "create") return
		// setEditorsViewsLoading(true)
		// router.push(createRoute as any)
	}

	return (
		<div
			data-components="datasViews-function"
			className={cn(
				"flex",
				"flex-row",
				"gap-x-3",
				"[&_button]:text-xs",
				"[&_button]:font-semibold",
				"[&_button]:select-none",
				"[&_button]:cursor-pointer",
				"[&_button]:uppercase"
			)}>
			<button onClick={onClickEvent}>Create</button>
			<DatasOption>
				<button>Option</button>
			</DatasOption>
			{/* <Settings2 size={15} strokeWidth={2.5} /> */}
		</div>
	)
}

DatasViewsFunction.displayName = "DatasViewsFunction"
export default DatasViewsFunction
