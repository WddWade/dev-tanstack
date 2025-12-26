"use client"

import { useEffect } from "react"
// import Link from "next/link"
import { useEditorsViews } from "./editorsviews-hooks"
import { useViews } from "../views-hooks"
import { cn } from "@/utils"
import type { EditorsViewsProps } from "./editorsviews"

interface PropsTypes extends EditorsViewsProps { }

const EditorsViewsNotfound: React.FC<PropsTypes> = ({
	// viewsDatas,
}) => {

	const { globalsAlerts } = useViews()
	const { setDatasViewsLoading, setEditorsViewsLoading } = useEditorsViews()

	// const { errors } = viewsDatas as any

	const openErrorAlert = () => globalsAlerts.open(
		"editorsViews.error", {
		// title: <span className={cn("capitalize")}>{errors?.message}</span>,
		description: <>
			<span>伺服器連線發生錯誤，請嘗試重新整理。</span>
			<span>There was an error in the server connection, please try refreshing.</span>
		</>
	})

	// useEffect(() => {
	// 	if (!errors) return
	// 	openErrorAlert()
	// }, [errors])

	useEffect(() => {
		setDatasViewsLoading(false)
		setEditorsViewsLoading(false)
	}, [])

	return (
		<div className={cn(
			"w-full",
			"bg-background",
			"flex items-center justify-center flex-col gap-y-10",
		)}>
			<section className="space-y-10">
				<hgroup className={cn("flex items-start justify-center flex-col gap-y-5")}>
					<h6 className={cn("text-6xl font-medium", "uppercase")}>not found</h6>
					<div className="flex flex-col items-start justify-center gap-y-2">
						<p className={cn("text-xl")}>The data has been deleted or does not exist</p>
						<p className={cn("text-base")}>資料不存在或已被刪除，請前往下方按鈕新增資料</p>
					</div>
				</hgroup>
				<div >
					{/* <Link
						className={cn("text-base font-semibold", "uppercase")}
						href={{ pathname: "create" }}
					>
						CREATE 新增資料
					</Link> */}
				</div>
			</section>
		</div>
	)
}

EditorsViewsNotfound.displayName = "EditorsViewsNotfound"
export default EditorsViewsNotfound
