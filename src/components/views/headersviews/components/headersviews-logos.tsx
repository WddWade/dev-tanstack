"use client"

// import { useRouter } from "next/navigation"
import { useViews } from "@/components"
import { cn } from "@/utils"
import { memo } from "react"

interface PropsTypes {
	datas?: Record<string, any>
	configs?: Record<string, any>
}

const HeadersLogos: React.FC<PropsTypes> = memo((props) => {

	// const router = useRouter()
	const { leaveEditorsViewsEdited } = useViews()

	const onClickEvent = async () => {
		const actions = await leaveEditorsViewsEdited()
		// if (actions == "leave") router.push("/")
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
