"use client"

import { memo } from "react"
import { UserRound } from "lucide-react"
import { Buttons } from "@/components"

import styles from "./headersPersonals.module.scss"
import { cn } from "@/utils"

interface PropsTypes {
	datas?: Record<string, any>
	configs?: Record<string, any>
}

const HeadersPersonals: React.FC<PropsTypes> = memo(({ datas, configs }) => {
	// const [open, setOpen] = useState(false)

	return (
		<Buttons
			title="Account Setting"
			variant={"link"}
			size={"sm"}
			className="!p-0"
		>
			<UserRound
				data-components="person-icon"
				strokeWidth={2.1}
				className={"text-white size-4.5"}
			/>
			<span
				data-components="person-name"
				className={"text-white text-xs capitalize"}
			>
				{datas?.account ?? "No Account"}
			</span>
		</Buttons>
	)
})

export type PersonalsConfigs = PropsTypes["configs"]
export type PersonalsDatasets = PropsTypes["datas"]

HeadersPersonals.displayName = "HeadersPersonals"
export default HeadersPersonals
