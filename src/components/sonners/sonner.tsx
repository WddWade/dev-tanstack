"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, useSonner } from "sonner"
import { cn } from "@/utils"
import type { ViewsActions } from "../views"
import type { ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			{...props}
		/>
	)
}

type ToastStatesType =
	| "dismiss"
	| "login"
	| "editorsViews.loading"
	| "editorsViews.update"
	| "editorsViews.create"
	| "editorsViews.delete"
	| "editorsViews.error"
	| "editorsViews.formError"
	| null

interface ToastOptionsTypes {
	message?: React.ReactNode,
	actions?: ViewsActions
}

const globalToaster = (
	states: ToastStatesType,
	options?: ToastOptionsTypes
) => {

	const { message, actions } = options || {}

	switch (states) {

		case "dismiss":
			toast.dismiss()
			return

		case "login":
			toast.success(message ?? `Login Success!`, {
				cancel: { label: 'Ok', onClick: () => { }, },
			})
			return

		case "editorsViews.loading":
			toast.loading(message ?? "Please wait, fetching data…", {
				className: cn(
					"[--gray11:#ffffff]", "!bg-black",
					"!text-white/90", "![&_.sonner-loading-bar]:bg-white"
				),
			})
			return;

		case "editorsViews.update":
			toast.success(message ?? "Update Data Success!", {
				// description: "更新資料成功!!",
				cancel: { label: 'Ok', onClick: () => { }, },
			})
			return

		case "editorsViews.create":
			toast.success(message ?? "Create Data Success!", {
				// description: "新增資料成功!!",
				cancel: { label: 'Ok', onClick: () => { }, },
			})
			return

		case "editorsViews.delete":
			toast.success(message ?? "Delete Data Success!", {
				// description: "刪除資料成功!!",
				cancel: { label: 'Ok', onClick: () => { }, },
			})
			return

		case "editorsViews.error":
			toast.dismiss()
			toast.error(message ?? `${actions == "create" || actions == "update" ? "Update Data" : "Delete Data"} Error`, {
				description: `${actions == "create" || actions == "update" ? "更新資料" : "刪除資料"}失敗，請確認料是否填寫正確!!`,
				cancel: { label: 'Cancel', onClick: () => { }, },
			})
			return

		case "editorsViews.formError":
			toast.error(message ?? "Field Error!", {
				description:
					<div className="flex flex-col">
						<span>未填寫內容或填寫內容錯誤。</span>
					</div>,
				cancel: { label: 'Close', onClick: () => { }, },
			})
			return
	}
}

export { Toaster, toast, useSonner, globalToaster }
export type { ToastStatesType, ToastOptionsTypes }





