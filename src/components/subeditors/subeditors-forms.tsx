"use client"

import {
	Fragment,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react"
import { X } from "lucide-react"
import {
	useFormContext,
	useFormState
} from "react-hook-form"
import {
	Buttons,
	Tabs,
	Forms,
	ScrollAreas,
	globalToaster,
	useViewsForms,
	getErrorLabels,
	scrolltoFirstField
} from "@/components"
import {
	useSubeditorsActionsContext,
	useSubeditorsStatesContext
} from "./subeditors-context"
import { cn } from "@/utils"
import type { SubmitDatas } from "./subeditors-types"

interface FormsBlockTabsListProps
	extends React.ComponentProps<"div"> {
	title: string
}
interface FormsBlockTabProps
	extends React.ComponentProps<"span"> {
	fields: string[]
}

interface SubeditorsFormsProps {
	title?: string
}

const FormsBlockTabsList: React.FC<FormsBlockTabsListProps> = memo(({
	title,
	className,
	children,
	...props
}) => {

	return (
		<div
			data-component="sub-editors-forms-tabslist"
			className={cn(
				"!w-52",
				"bg-black/5",
				"!h-full",
				"!p-10",
				"flex",
				"flex-col",
				"!justify-start",
				"!items-start",
				"!gap-y-3",
				"!rounded-none",
				className
			)}
			{...props}
		>
			<h3
				className={cn(
					"text-lg",
					"font-medium",
					"text-black",
				)}
			>
				{title}
			</h3>
			<div
				className={cn(
					"flex",
					"flex-col",
					"justify-start",
					"items-start",
					"relative",
					"gap-y-2",

					"[&>button]:cursor-pointer",
					"[&>button]:select-none",
					"[&>button]:relative",
					"[&>button]:text-md",
					"[&>button]:font-normal",
					"[&>button]:flex-0",
					"[&>button]:py-0",
					"[&>button]:px-0",
					"[&>button]:snap-start",
					"[&>button]:w-fit",
					"[&>button]:bg-transparent",
					"[&>button[data-state='active']]:shadow-none",
					"[&>button[data-state='active']]:bg-transparent",

					"[&>button]:before:w-full",
					"[&>button]:before:h-0.75",
					"[&>button]:before:absolute",
					"[&>button]:before:-bottom-0.5",
					"[&>button]:before:left-0",
					"[&>button]:before:duration-300",
					"[&>button]:before:w-0",
					"[&>button]:before:bg-black",
					"[&>button[data-state='active']]:before:w-full",
					"[&>button:has([data-fields-error='true'])]:before:bg-destructive",
					"[&>button:has([data-fields-error='true'])]:text-destructive",
				)}
			>
				{children}
			</div>
		</div>
	)
})

const FormsBlockTab: React.FC<FormsBlockTabProps> = memo(({
	fields,
	...props
}) => {

	const { control } = useFormContext()
	const { errors } = useFormState({ control })
	const isError = !!fields.find((field: string) => errors[field])

	return (
		<span data-fields-error={isError} {...props} />
	)
})

const SubeditorsForms = (props: SubeditorsFormsProps) => {

	const { title = "Sub-Editors" } = props

	const { editState, editorsForms } = useSubeditorsStatesContext()
	const { setEditorOpen, onEditorsFormSubmit } = useSubeditorsActionsContext()

	const [currenTab, setCurrenTab] = useState(editorsForms[0].id)

	const { editActions, formsDatas } = useMemo(() => {
		const { actions: editActions = "create", datas: formsDatas } = editState
		return { editActions, formsDatas }
	}, [editState])

	const isCreateActions = useMemo(() => editActions === "create", [editActions])

	const { hooksFormStates } = useViewsForms({
		forms: editorsForms,
		formsDatas: formsDatas,
		isCreateActions: isCreateActions,
	})

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty }
	} = hooksFormStates

	// TODO
	const onChangeValue = (
		editedValue: SubmitDatas,
		behavior: "submit" | "close"
	) => {

		if (behavior == "submit" && isDirty) {
			const { id, _actions } = editedValue
			const nextEditedValue = _actions !== "create"
				? { ...editedValue, id, _actions: editActions }
				: editedValue

			onEditorsFormSubmit?.(nextEditedValue)
			setEditorOpen?.(false)
		}

		else if (behavior == "close") {
			if (!isDirty) return setEditorOpen?.(false)
		}

		// setEditorOpen?.(false)
	}

	const errorActionsHandler = useCallback((errorskey: string[]) => {
		if (!errorskey?.[0]) return
		const { tabId: nextTab, label } = getErrorLabels(errorskey[0], editorsForms)

		globalToaster("editorsViews.formError", { message: label })
		setCurrenTab(prevTab => prevTab == nextTab ? prevTab : nextTab)
		scrolltoFirstField()
	}, [editorsForms])

	useEffect(() => {
		if (!errors) return
		const errorskey = Object.keys(errors)

		// console.log(errors);

		if (!errorskey?.length) return
		errorActionsHandler(errorskey)
	}, [errors])

	useEffect(() => {
		return () => { globalToaster("dismiss") }
	}, [])

	return (
		<Forms.Root {...hooksFormStates}>
			<Tabs.Root
				data-component="sub-editors-forms"
				className={cn("flex flex-row h-[inherit] gap-0")}
				value={currenTab}
				onValueChange={(value) => setCurrenTab(value)}
			>
				<Tabs.List asChild >
					<FormsBlockTabsList title={title}>
						{editorsForms.map((block: any, key: number) => (
							<Tabs.Trigger key={key} value={block.id}>
								<FormsBlockTab
									fields={block.fields.map(({ field }: any) => field)}
								>
									{block.tabName}
								</FormsBlockTab>
							</Tabs.Trigger>
						))}
						{/* <Tabs.Trigger value="status">狀態</Tabs.Trigger>
						<Tabs.Trigger value="contents">內容</Tabs.Trigger>
						<Tabs.Trigger value="tables">規格表</Tabs.Trigger>
						<Tabs.Trigger value="relation">關聯</Tabs.Trigger>
						<Tabs.Trigger value="seo">SEO</Tabs.Trigger>
						<Tabs.Trigger value="information">資訊</Tabs.Trigger> */}
					</FormsBlockTabsList>
				</Tabs.List>

				<ScrollAreas.Root
					data-components="content"
					orientation="vertical"
					viewportClassName="scroll-smooth"
					thumbClassName="bg-black/30"
					type="scroll"
					className={cn(
						"flex-1",
						"relative",
						"flex",
						"flex-col",
						"overflow-hidden",
						"bg-background",
						"scroll-smooth",
					)}
				>
					<div className={cn(
						"flex",
						"justify-end",
						"gap-px",
						"absolute",
						"top-0",
						"w-full",
						"pr-8",
						"pt-1.5",
						"bg-linear-to-b",
						"from-white",
						"from-20%",
						"to-white/0"
					)}>
						{JSON.stringify(isDirty)}
						<Buttons
							className={cn(
								"rounded-none",
								"uppercase",
								"text-xs",
								"font-semibold",
								"hover:bg-transparent"
							)}
							disabled={!isDirty}
							variant={"ghost"}
							onClick={handleSubmit((data) => onChangeValue(data, "submit"))}
						>{editActions == "create" ? "Create" : "Update"}
						</Buttons>
						<Buttons
							className={cn(
								"rounded-none",
								"absolute",
								"right-1",
								"hover:bg-transparent"
							)}
							variant={"ghost"}
							// onClick={handleSubmit((data) => onChangeValue(data, "close"))}
							onClick={() => setEditorOpen?.(false)}
						><X />
						</Buttons>
					</div>
					{editorsForms.map((block: any, key: number) => (
						<Tabs.Content
							key={key}
							value={block.id}
							className={cn(
								"w-full",
								"px-10",
								"py-10",
								// "mb-20",
								"max-w-[990px]",
								"flex",
								"self-center",
								"justify-self-center",
								"flex-col",
								"gap-20",
								"data-[state=active]:block",
								"hidden",
							)}
						>
							<Forms.Block
								title={block.title}
								description={block.description ?? "Use a permanent address where you can receive mail."}
								columns={block.columns}
							>
								{block.fields.map(({
									field: name,
									fieldspan = "full",
									fieldset = [1, 2, 3, 4],
									fieldsetColumns = 6,
									fieldsetSpan = 6,
									component,
									...fieldsProps
								}: any, key: number) => <Fragment key={key}>{
									component !== "hidden" && <Forms.Field
										control={control}
										name={name}
										render={({ field }) => (
											<Forms.Item colspan={fieldspan}>
												<Forms.Component
													component={component}
													control={control}
													modal={true}
													fieldsProps={fieldsProps}
													field={field}
												/>{JSON.stringify(field.value)}
											</Forms.Item>
										)}
									/>
								}</Fragment>)}
							</Forms.Block>
						</Tabs.Content>
					))}
				</ScrollAreas.Root>
			</Tabs.Root>
		</Forms.Root>

	)
}

SubeditorsForms.displayName = "SubeditorsForms"
export default SubeditorsForms

