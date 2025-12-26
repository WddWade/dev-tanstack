"use client"

import { Buttons, Separators, TemplatesComponents } from "@/components"
import { Link2Off, SquarePen, Trash2, X } from "lucide-react"
import { cn } from "@/utils"
import { useSubeditorsActionsContext } from "../subeditors-context"

export interface PropsTypes {
	id?: number | string
	datas?: Record<string, any>
	slots?: Record<number, any>
	keywords?: string[]
	setting?: {
		actions: "view" | "update" | "delete" | "unlink"
		disabled?: boolean
	}
}

const TemplatesA: React.FC<PropsTypes> = (props) => {

	const { id, datas, slots, setting, keywords } = props
	const { actions, disabled } = setting || {}

	const { onChangeActions, onEditorsOpen } = useSubeditorsActionsContext()

	if (!id || !datas || !slots) return null

	return (
		<div
			className={cn(
				"flex",
				"flex-row",
				"gap-x-15",
				"border-t",
				"pt-7",
				"last:pb-3.5",
				"last:border-b",

				[
					"p-0",
					"relative",
					"border-none",
					"last:pb-0",
					"last:[&>div]:nth-of-type-2:pb-0",

					"after:min-w-2.5",
					"after:h-2.5",
					"after:border-2",
					"after:bg-white",
					"after:absolute",
					"after:top-1",
					"after:left-0.5",
					"after:rounded-2xl",
					"after:z-1",

					"before:absolute",
					"before:h-[calc(100%+40px)]",
					"before:w-px",
					"before:top-0.5",
					"before:left-1.5",
					"before:border-1",
					"before:border-dashed",
					"before:border-black/20",

					"first:after:bg-black",
					"last:before:hidden",

					"[&>div]:first:pl-6",
					"[&>div]:nth-of-type-2:pb-7",
					"[&>div]:nth-of-type-2:border-b",

					"last:[&>div]:nth-of-type-2:border-none",
				],
			)}
		>
			{JSON.stringify(keywords)}

			<div className="flex flex-row items-start gap-x-1 text-nowrap min-w-40 w-40">
				<TemplatesComponents template-id={1} {...slots[1]} />
				<span>-</span>
				<TemplatesComponents template-id={2} {...slots[2]} />
			</div>
			<div className={cn("space-y-5 flex-1")}>
				<div className="flex justify-between">
					<div className="flex flex-row gap-x-4">
						<TemplatesComponents template-id={3} {...slots[3]} label="Created" />
						<Separators orientation="vertical" className="bg-black/30" />
						<TemplatesComponents template-id={4} {...slots[4]} />

					</div>
					<div className="flex gap-x-2.5">
						{datas?._removeActions == "delete"
							? <Buttons
								className={cn(
									"cursor-pointer",
									"text-white",
									"bg-red-600",
									"rounded-xs",
									"px-1",
									"gap-0.5",
									"hover:before:content-none"
								)}
								variant={"ghost_customer"}
								size={"sm_customer"}
								onClick={() => onChangeActions?.({ removeActions: "delete", id })}
							>
								<span className="font-medium">Delete</span>
								<X className={cn("size-3")} />
							</Buttons> : <>
								<Buttons
									className={"cursor-pointer"}
									variant={"ghost_customer"}
									size={"sm_customer"}
									onClick={() => onChangeActions?.({ removeActions: "unlink", id })}
								>
									<Link2Off className={cn(
										"size-3.5",
										"cursor-pointer",
										datas?._removeActions == "unlink" && "text-red-600"
									)} />
								</Buttons>
								<Buttons
									className={"cursor-pointer"}
									variant={"ghost_customer"}
									size={"sm_customer"}
									onClick={() => onChangeActions?.({ removeActions: "delete", id })}
								>
									<Trash2 className={cn(
										"size-3.5",
										datas?._removeActions == "delete" && "text-red-600"
									)} />
								</Buttons>
								<Buttons
									className={"cursor-pointer"}
									variant={"ghost_customer"}
									size={"sm_customer"}
									onClick={() => onEditorsOpen?.({ editActions: "update", editId: id, editorMode: "form" })}
								>
									<SquarePen className={cn(
										"size-3.5",
										!datas?._removeActions && datas?._actions == "update" && "text-green-600"
									)} />
								</Buttons>

							</>}

						{/* {
							(datas?._removeActions || datas?._actions) && <span className="text-mini-10">
								{datas?._removeActions && (datas?._removeActions + " + ")}{datas?._actions}
							</span>
						} */}
					</div>
				</div>
				<TemplatesComponents template-id={5} {...slots[5]} />
			</div>
		</div>
	)
}

TemplatesA.displayName = "TemplatesA"
export default TemplatesA
