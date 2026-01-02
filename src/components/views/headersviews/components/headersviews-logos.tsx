import { useViews } from "@/components"
import { cn } from "@/utils"
import { useNavigate } from "@tanstack/react-router"
import { memo } from "react"

interface PropsTypes {
	datas?: Record<string, any>
	configs?: Record<string, any>
}

const HeadersLogos: React.FC<PropsTypes> = memo((props) => {

	const navigate = useNavigate()
	const { leaveEditorsViewsEdited } = useViews()

	const onClickEvent = async () => {
		const actions = await leaveEditorsViewsEdited()
		if (actions == "leave") navigate({ to: "/" })
	}

	return (
		<div
			data-components="headersLogos"
			onClick={() => onClickEvent()}
			className={cn(
				"text-xl",
				"font-semibold",
				"text-white",
				"cursor-pointer",
			)}
		>
			BeONES
		</div>
	)
})

export type LogosConfigs = PropsTypes["configs"]
export type LogosDatasets = PropsTypes["datas"]

HeadersLogos.displayName = "HeadersLogos"
export default HeadersLogos
