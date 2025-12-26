"use client"

import { Fragment, memo, useEffect, useId, useMemo, useRef } from "react"
import { AlertDialogs } from "./alerts-dialogs"
import { globalAlertsOptions } from "./globals-alerts-options"
import {
	useGlobalsAlertsStores,
	setGlobalsAlertDialogs,
	defaultGlobalsAlertsStores,
	useShallow
} from "@/stores"
import { cn, sleep } from "@/utils"

interface PropsTypes { }

const GlobalsAlerts: React.FC<PropsTypes> = memo(() => {

	const id = useId()

	const { open, options } = useGlobalsAlertsStores(useShallow((stores) => ({
		open: stores.open,
		options: stores.options,
	})))

	const { title, description, confirms } = options

	useEffect(() => {
		return () => { defaultGlobalsAlertsStores() }
	}, [])

	return (
		<AlertDialogs.Root
			open={open}
		// onOpenChange={(open) => {
		// 	console.log("open", open);
		// }}
		>
			<AlertDialogs.Content
				onOpenAutoFocus={(event) => {
					event.preventDefault()
					document.getElementById(id)?.focus()
				}}
				className={cn(
					"!w-fit",
					"min-w-96",
					"max-w-xs",
					"rounded",
					"space-y-4",
					"!px-8",
					"!py-6",
					"*:select-none"
				)}>
				<AlertDialogs.Header className="gap-y-4">
					{title && <AlertDialogs.Title className={cn(
						"flex",
						"flex-col",
						"m-0",
						"text-lg",
						"font-medium",
					)}>
						{title}
					</AlertDialogs.Title>}
					<AlertDialogs.Description className="space-y-0.5 flex flex-col">
						{description}
					</AlertDialogs.Description>
				</AlertDialogs.Header>
				<AlertDialogs.Footer className="space-x-4">
					{confirms?.map((confirm, key) =>
						<Fragment key={key}>
							{confirm.type == "cancel" && <AlertDialogs.Cancel
								id={id}
								variant={"ghost_customer"}
								size={"sm_customer"}
								onClick={async () => {
									setGlobalsAlertDialogs?.("close")
									await sleep(300)
									confirm.callback?.()
								}}>
								{confirm.title}
							</AlertDialogs.Cancel>}

							{confirm.type == "action" && <AlertDialogs.Action
								id={id}
								variant={"ghost_customer"}
								size={"sm_customer"}
								className={cn(
									confirm.state == "warn" && [
										"text-destructive",
										"before:bg-destructive"
									]
								)}
								onClick={async () => {
									setGlobalsAlertDialogs?.("close")
									await sleep(500)
									confirm.callback?.()
								}}>
								{confirm.title}
							</AlertDialogs.Action>}
						</Fragment>)}
				</AlertDialogs.Footer>
			</AlertDialogs.Content >
		</AlertDialogs.Root >
	)
})

GlobalsAlerts.displayName = "GlobalsAlerts"
export default GlobalsAlerts
