"use client"

import { DropdownMenus } from "@/components"
import { cn } from "@/utils"
import { CheckCheck, Layers, ListChecks, SquareX, X } from "lucide-react"

interface PropsTypes {
	children: React.ReactNode
}

const DatasOption: React.FC<PropsTypes> = ({
	children
}) => {

	return (
		<DropdownMenus.Root>
			<DropdownMenus.Trigger asChild>
				{children}
			</DropdownMenus.Trigger>
			<DropdownMenus.Content
				data-components="datasViews-datasOption"
				align="end"
				className={cn(
					"w-fit",
					"max-w-64",
					"rounded",
					"py-0",
					"px-0",
					"pb-1.5",
					"text-block",
					"rounded-sm",
					"shadow-xl",
					"border-2",
					// "bg-gray-100",
					// "text-white",
					"border-neutral-600",
				)}
				// align="start"
				onCloseAutoFocus={() => console.log("onCloseAutoFocus")}
			// onEscapeKeyDown={() => console.log("onEscapeKeyDown")}
			// onPointerDownOutside={() => console.log("onPointerDownOutside")}
			// onFocusOutside={() => console.log("onFocusOutside")}
			// onInteractOutside={() => console.log("onInteractOutside")}
			>
				<DropdownMenus.Label className={cn(
					"px-5",
					"py-2",
					"flex",
					"justify-between",
					"items-center",
					"gap-1.5",
					"font-medium",
					// "bg-neutral-50",
					// "hover:bg-neutral-100",
					// "min-h-view-header",
					"*:inline-flex",
					"*:gap-x-1.5",
					"*:items-center",
				)}>
					<span className="text-mini-13">Data Option</span>
				</DropdownMenus.Label>
				<DropdownMenus.Separator className="bg-stone-200" />
				<DropdownMenus.Group>
					<DropdownMenus.Item
						className={cn(
							"text-xs",
							"focus:bg-gray-900",
							"focus:text-foreground-hover",
							"rounded-none",
							"px-space",
							"py-2",
						)}
					>
						<ListChecks />
						<span>刪除資料</span>
						<DropdownMenus.Shortcut className="tracking-normal pl-5">50</DropdownMenus.Shortcut>
					</DropdownMenus.Item>
					<DropdownMenus.Item
						className={cn(
							"text-xs",
							"focus:bg-black/30",
							"focus:text-foreground-hover",
							"rounded-none",
							"px-space",
							"py-2",
						)}
					>
						<SquareX />
						<span>複製資料</span>
						<DropdownMenus.Shortcut className="tracking-normal pl-5">50</DropdownMenus.Shortcut>
					</DropdownMenus.Item>
				</DropdownMenus.Group>
				<DropdownMenus.Separator className="bg-stone-200" />
				<DropdownMenus.Group>
					<DropdownMenus.Item
						className={cn(
							"text-xs",
							"focus:bg-black/30",
							"focus:text-foreground-hover",
							"rounded-none",
							"px-space",
							"py-2",
						)}
					>
						<CheckCheck />
						<span>匯入資料</span>
						<DropdownMenus.Shortcut className="tracking-normal pl-5">50</DropdownMenus.Shortcut>
					</DropdownMenus.Item>
					<DropdownMenus.Item
						className={cn(
							"text-xs",
							"focus:bg-black/30",
							"focus:text-foreground-hover",
							"rounded-none",
							"px-space",
							"py-2",
						)}
					>
						<X />
						<span>匯出資料</span>
						<DropdownMenus.Shortcut className="tracking-normal pl-5">50</DropdownMenus.Shortcut>
					</DropdownMenus.Item>
				</DropdownMenus.Group>
				<DropdownMenus.Separator className="bg-stone-200" />
				<DropdownMenus.Item
					className={cn(
						"text-xs",
						"focus:bg-black/30",
						"focus:text-foreground-hover",
						"rounded-none",
						"px-space",
						"py-2",
					)}
				>
					<Layers />
					<span>批次編輯</span>
					<DropdownMenus.Shortcut className="tracking-normal pl-5">150</DropdownMenus.Shortcut>
				</DropdownMenus.Item>
			</DropdownMenus.Content>
		</DropdownMenus.Root>
	)
}

DatasOption.displayName = "DatasOption"
export default DatasOption
