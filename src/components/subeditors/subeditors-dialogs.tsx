"use client"

import { Dialogs } from "@/components"
import { cn } from "@/utils"
import { memo, useCallback } from "react"
import { useSubeditorsStatesContext } from "./subeditors-context"

interface Props {
	className?: string,
	children: React.ReactNode
}

const SubeditorsDialogs: React.FC<Props> = memo(({
	children,
	className,
	...props
}) => {

	const { editorOpen } = useSubeditorsStatesContext()
	// const { setEditorOpen } = useSubeditorsActionsContext()

	const onPointerDownOutside = useCallback((event: any) => {
		event.preventDefault()
		return
	}, [])

	return (
		<Dialogs.Root
			data-component="sub-editors-dialogs"
			open={editorOpen}
			{...props}
		>
			<Dialogs.Content
				showCloseButton={false}
				className={cn(
					"sm:max-h-2/3",
					"sm:h-full",
					"rounded",
					"p-0",
					"sm:max-w-9/12",
					"sm:min-h-[90%]",
					className
				)}
				onPointerDownOutside={onPointerDownOutside}
			>
				{children}
			</Dialogs.Content>
			<Dialogs.Title hidden />
			<Dialogs.Description hidden />
		</Dialogs.Root>
	)
})

SubeditorsDialogs.displayName = "SubeditorsDialogs"
export default SubeditorsDialogs
