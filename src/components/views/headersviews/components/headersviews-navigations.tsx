import { memo, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import HeadersNvigationsDropdowns from "./headersviews-navigations-dropdowns"
import { useViews } from "@/components"
import { cn } from "@/utils"

interface NavMenuTypes {
	id: number,
	name: string
	route: string
	active?: boolean
	// dropdown?: any
}

interface PropsTypes {
	datas?: NavMenuTypes[]
	configs?: Record<string, any>
}

const HeadersNvigations: React.FC<PropsTypes> = memo(({ datas, configs }) => {

	const navigate = useNavigate()
	const location = useLocation()

	const currentRoute = "/" + location.pathname.split("/")[1]

	const { leaveEditorsViewsEdited } = useViews()

	const [openDropdown, setOpenDropdown] = useState(false)
	const [dropdownKey, setDropdownKey] = useState("")

	const onClickEvent = useCallback(async (route: string) => {
		const actions = await leaveEditorsViewsEdited()
		if (actions == "leave") navigate({ to: route as any })
	}, [leaveEditorsViewsEdited])

	useEffect(() => setDropdownKey(""), [])

	return (
		<div
			data-components="headersNvigations"
			className={cn(
				"h-[inherit]",
				"flex",
				"flex-row",
				"justify-center",
				"items-center",
				"gap-5",
				"relative"
			)}
		>
			{datas ? datas.map((data) =>
				<div
					key={data.id}
					data-components="navs"
					className={cn(
						"font-medium",
						"text-xs",
						"uppercase",
						"text-gray-400",
						"cursor-pointer",
						"duration-500",
						"transition-colors",
						"hover:text-white",
						"data-[active=true]:text-white"
					)}
					onClick={() => onClickEvent(data.route)}
					data-active={currentRoute == data.route}
				>
					{data.name}
				</div>
			) : null}

			{!configs?.dropdown && <HeadersNvigationsDropdowns
				active={openDropdown}
				setActive={setOpenDropdown}
				index={dropdownKey}
			/>}

		</div>
	)
})

export type NavigationsConfigsTypes = PropsTypes["configs"]
export type NavigationsDatasetsTypes = PropsTypes["datas"]

HeadersNvigations.displayName = "HeadersNvigations"
export default HeadersNvigations
