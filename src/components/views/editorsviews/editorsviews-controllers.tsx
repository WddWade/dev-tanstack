
"use client"

import { Fragment, memo, useMemo, useRef } from "react"

import { Buttons, buttonVariants } from "@/components"
import { useFormContext, type UseFormReturn } from "react-hook-form"
import { VariantProps } from "class-variance-authority"
import { Trash2, RefreshCw } from "lucide-react"
import { useEditorsViewsContext } from "./editorsviews-context"

interface ContrillersTypes {
	name: string;
	title: string;
	actions:
	| "create"
	| "delete"
	| "update"
	| "reset"
}

interface PropsTypes extends
	React.ComponentProps<"button">,
	VariantProps<typeof buttonVariants> {
	datas?: {
		create: ContrillersTypes[],
		update: ContrillersTypes[]
	}
}

const EditorsViewsControllers: React.FC<PropsTypes> = memo((props) => {

	const {
		variant,
		size,
		datas,
		...buttonsProps
	} = props

	const { create, update } = datas || {}

	const { mutationPending, isCreateActions, editorsActionsControllers } = useEditorsViewsContext()
	const { formState: { isDirty } } = useFormContext()

	const renderControllers = isCreateActions ? create : update

	// const controllerActions = (actions: string) => {
	// 	if (actions == "reset" && isDirty) return () => editorsViewsAlerts("editorsViews.restore")
	// 	if (actions == "delete") return () => editorsViewsAlerts("editorsViews.delete")

	// 	return handleSubmit((data: any) => {
	// 		mutation.mutate({ actions, payload: data })
	// 	})
	// }

	if (!datas) return null

	return (<>
		{renderControllers?.map((control, key) =>
			<Buttons
				key={key}
				data-controllers-action={control.name}
				disabled={mutationPending || (control.actions == "reset" && !isDirty)}
				variant={(control.actions == "delete" || control.actions == "reset") ? "icon_customer" : variant}
				size={(control.actions == "delete" || control.actions == "reset") ? "icon_customer" : size}
				type="button"
				onClick={editorsActionsControllers(control.actions)}
				{...buttonsProps}
			>
				{control.actions == "delete" && <Trash2 className="size-3.5" strokeWidth={2.5} />}
				{control.actions == "reset" && <RefreshCw className="size-3.5" strokeWidth={2.5} />}
				{(control.actions == "create" || control.actions == "update") && control.title}
			</Buttons >
		)}
	</>
	)
})

EditorsViewsControllers.displayName = "EditorsViewsControllers"
export default EditorsViewsControllers
