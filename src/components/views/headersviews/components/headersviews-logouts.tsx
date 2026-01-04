"use client"

import { memo } from "react"
// import { redirect, RedirectType, useRouter } from "next/navigation"
import { useAsyncFetcher } from "@/hooks"
import { SlotsPropsTypes } from "@/types"
import { Buttons, useViews } from "@/components"
import { IconBrandGravatar } from '@tabler/icons-react'
import { cn } from "@/utils"
import { logoutActions } from "@/libs/auths-actions"
import { useNavigate } from "@tanstack/react-router"

interface PropsTypes {
	datas?: {}
	configs?: {
		name: "defaults" | "vertical"
		slots?: SlotsPropsTypes
	}
}

const HeadersLogouts: React.FC<PropsTypes> = memo((props) => {

	const {
		globalsAlerts,
		leaveEditorsViewsEdited,
		isEditorsViewsEdited
	} = useViews()

	const navigate = useNavigate()

	// const { fetcher } = useAsyncFetcher()

	const loginHandler = async () => {
		// if (isEditorsViewsEdited) {
		// 	const actions = await leaveEditorsViewsEdited()
		// 	if (actions !== "leave") return
		// }

		const isLogout = await globalsAlerts.open("headersViews.logout")
		if (!isLogout) return

		const { status } = await logoutActions()
		if (status) navigate({ to: "/login", replace: true, viewTransition: true })

	}

	return (
		<Buttons
			title="Logout"
			onClick={loginHandler}
			data-components="headersLogouts"
			variant={"link"}
			size={"sm"}
			className={cn(
				"**:text-white",
				"p-0"
			)}
		>
			<IconBrandGravatar
				className="size-4"
				stroke={2}
			/>
		</Buttons>
	)
})

export type LogoutsConfigsTypes = PropsTypes["configs"]
export type LogoutsDatasetsTypes = PropsTypes["datas"]

HeadersLogouts.displayName = "HeadersLogouts"
export default HeadersLogouts
