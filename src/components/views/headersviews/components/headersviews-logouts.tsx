"use client"

import { memo } from "react"
// import { redirect, RedirectType, useRouter } from "next/navigation"
import { useAsyncFetcher } from "@/hooks"
import { SlotsPropsTypes } from "@/types"
import { Buttons, useViews } from "@/components"
import { IconBrandGravatar } from '@tabler/icons-react'
import { cn } from "@/utils"

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
	} = useViews()

	const { fetcher } = useAsyncFetcher()

	const loginHandler = async () => {
		const actions = await leaveEditorsViewsEdited()
		if (actions !== "leave") return

		const isLogout = await globalsAlerts.open("headersViews.logout")
		if (!isLogout) return

		const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/auth/logout`
		const { status } = await fetcher({ url, options: { method: "POST" } })

		// if (status) redirect("/login", RedirectType.replace)

	}

	return (
		<Buttons
			title="Logout"
			onClick={loginHandler}
			data-components="headersLogouts"
			variant={"link"}
			size={"sm"}
			className={cn(
				"[&_*]:text-white",
				"!p-0"
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
