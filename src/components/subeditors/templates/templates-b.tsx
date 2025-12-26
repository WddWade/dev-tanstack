"use client"

import { Buttons, Separators } from "@/components"
import { format } from "date-fns"
import { zhTW } from "date-fns/locale";
import { Link2, Link2Off, SquarePen, Trash2 } from "lucide-react"
import { cn } from "@/utils"
import { useEffect } from "react";

export interface TemplatesBProps {
	datas?: any
	timeline?: boolean
	onEdit?: ({ actions, index }: any) => void
}

const TemplatesB: React.FC<TemplatesBProps> = ({
	datas,
	timeline,
	onEdit
}) => {

	if (!datas) return null

	return (
		<>
			<div
				data-templates="A"
				className={cn(
					"flex",
					"flex-col",
					"gap-y-3.5",
					"border-t",
					"border-b",
					timeline && [
						"pt-7",
						"gap-y-10"
					],

				)}>
				{datas.map(({
					actions,
					disables,
					keywords,
					...slots
				}: any, index: number) => (
					<div
						key={index}
						className={cn(
							"flex",
							"flex-row",
							"gap-x-15",
							"border-t",
							"pt-7",
							"last:pb-3.5",
							"last:border-b",

							timeline && [
								"p-0",
								"relative",
								"border-none",
								"last:pb-0",

								"after:min-w-2.5",
								"after:h-2.5",
								"after:border-2",
								"after:bg-white",
								"after:absolute",
								"after:top-0.5",
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
								"[&>div]:nth-of-type-2:pb-5",
								"[&>div]:nth-of-type-2:border-b",

								"last:[&>div]:nth-of-type-2:border-none",
							],

						)}>
						<div className="flex flex-col gap-y-0.5 text-nowrap min-w-36">
							<span>
								1.{slots[1].value ?? slots[1].defaultValue} - 2.{slots[2].value ?? slots[2].defaultValue}
							</span>
						</div>
						<div className={cn("space-y-3 flex-1")}>
							<div className="flex justify-between">
								<div className="flex flex-row gap-x-4">
									<div className="font-medium space-x-2">
										3.<span>{actions == "create"
											? format(new Date(), slots[3].format, { locale: zhTW })
											: format(slots[3]?.value ? new Date(slots[3].value) : new Date(), slots[3].format, { locale: zhTW })
										}</span>
									</div>
									<Separators orientation="vertical" className="bg-black/30" />
									<div>
										4.<span className="text-mini-11 uppercase font-semibold pr-1">
											{slots[4]?.label} :
										</span>
										<span>{slots[4]?.value}</span>
									</div>
								</div>
								<div className="flex gap-x-2.5">
									<Link2Off className="size-3.5" />
									<Trash2 className="size-3.5" />
									<Buttons
										className="cursor-pointer"
										variant={"ghost_customer"}
										size={"sm_customer"}
										onClick={() => onEdit?.({ actions: "update", index })}
									>
										<SquarePen className="size-3.5" />

									</Buttons>
								</div>
							</div>
							<span>
								5.<p className={"text-muted-foreground whitespace-pre-wrap"}>
									{slots[5]?.value}
								</p>
							</span>
							<div className="space-x-10">

							</div>
						</div>
					</div>
				))}

			</div>
		</>

	)
}

TemplatesB.displayName = "TemplatesB"
export default TemplatesB
