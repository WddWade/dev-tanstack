import { Buttons } from "@/components"
import { SlotsPropsTypes } from "@/types"
import { IconNotification } from '@tabler/icons-react'

import { cn } from "@/utils"

interface PropsTypes {
	datas?: {}
	configs?: {
		name: "defaults" | "vertical"
		slots?: SlotsPropsTypes
	}
}

const HeadersNotifications: React.FC<PropsTypes> = () => {

	return (
		<Buttons
			title="Notification"
			data-components="headersNotifications"
			variant={"link"}
			size={"sm"}
			className={cn(
				"[&_*]:text-white",
				"!p-0"
			)}
		>
			<IconNotification
				className="size-5"
				stroke={1.6}
			/>
		</Buttons>
	)
}

export type NotificationsConfigs = PropsTypes["configs"]
export type NotificationsDatasets = PropsTypes["datas"]

HeadersNotifications.displayName = "HeadersNotifications"
export default HeadersNotifications
