"use client"

import {
	Fragment,
	memo,
	useCallback,
	useEffect,
	useState
} from "react"
import {
	Tabs,
	Forms,
	ScrollAreas,
	getErrorLabels,
	globalToaster,
	scrolltoFirstField,
	toast,
} from "@/components"
import type { FormFields } from "@/components"
import {
	useFormContext,
	useFormState
} from "react-hook-form"
import { PageViews } from "../pageviews/page-views"
import { cn } from "@/utils"

const EditorsViewsContentsTabsList: React.FC<React.ComponentProps<"div">> = memo(({
	className,
	...props
}) => {

	return (
		<div className={cn(
			"!h-view-header",
			"flex",
			"flex-nowrap",
			"items-center",
			"gap-x-3",
			"relative",
			"!w-full",
			"!px-space",
			"!py-0",
			"!justify-start",
			"!rounded-none",
			"!bg-background",

			"snap-x",
			"scroll-pl-space",
			"overflow-x-auto",
			"[scrollbar-width:none]",
			"[-ms-overflow-style:none]",

			"[&>button]:cursor-pointer",
			"[&>button]:select-none",
			"[&>button]:relative",
			"[&>button]:text-xs",
			"[&>button]:flex-0",
			"[&>button]:py-0",
			"[&>button]:px-0",
			"[&>button]:snap-start",
			"[&>button]:h-full",
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
			className
		)}
			{...props}
		/>
	)
}
)

interface EditorsViewsContentsTabsItemProps
	extends React.ComponentProps<"span"> {
	fields: string[]
}

const EditorsViewsContentsTabsItem: React.FC<EditorsViewsContentsTabsItemProps> = memo(({
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



interface EditorsViewsContentsProps {
	datas: FormFields[]
}

const EditorsViewsContents = memo(({
	datas: formFields
}: EditorsViewsContentsProps) => {

	const [currenTab, setCurrenTab] = useState(formFields?.[0].id)
	const { formState: { errors }, control } = useFormContext()


	const errorActionsHandler = useCallback((errorskey: string[]) => {
		if (!errorskey?.[0]) return
		const { tabId: nextTab, label } = getErrorLabels(errorskey[0], formFields)

		globalToaster("editorsViews.formError", { message: label })
		setCurrenTab(prevTab => prevTab == nextTab ? prevTab : nextTab)
		scrolltoFirstField()
	}, [formFields])


	useEffect(() => {
		setCurrenTab(formFields?.[0].id)
	}, [formFields])

	useEffect(() => {
		if (!errors) return
		const errorskey = Object.keys(errors)

		// console.log(errors);

		if (!errorskey?.length) return
		errorActionsHandler(errorskey)
	}, [errors])

	useEffect(() => {
		return () => { toast.dismiss() }
	}, [])

	return (
		<section
			data-components="editors-views-content"
			className={cn(
				"h-full",
				"relative",
				"flex-1",

				"overflow-hidden",
				"flex",
				"flex-col",
				"scroll-smooth",
				"gap-divider-line",
				"transition-opacity",
				"duration-300",
				"opacity-100",
				"data-[loading=false]:opacity-100",
				formFields ? "bg-divider-line" : "bg-white",
			)}
		>
			{formFields?.length > 0 ? <Tabs.Root
				data-component="editors-views-form"
				className={cn("flex-1 w-full min-h-view-header gap-px")}
				value={currenTab || formFields?.[0]?.id || ""}
				onValueChange={(value) => setCurrenTab(value)}
			>
				<Tabs.List asChild >
					<EditorsViewsContentsTabsList>
						{formFields.map((block: any, key: number) => (
							<Tabs.Trigger key={key} value={block.id}>
								<EditorsViewsContentsTabsItem
									fields={block.fields.map(({ field }: any) => field)}
								>
									{block.tabName}
								</EditorsViewsContentsTabsItem>
							</Tabs.Trigger>
						))}
					</EditorsViewsContentsTabsList>
				</Tabs.List>

				<ScrollAreas.Root
					data-components="content"
					orientation="vertical"
					viewportClassName="scroll-smooth"
					className={cn(
						"flex-1",
						"relative",
						"flex",
						"flex-col",
						"overflow-hidden",
						"bg-background",
						"scroll-smooth",
					)}
					thumbClassName="bg-black/30"
					type="scroll"
				>
					{formFields.map((block: any, key: number) => (
						<Tabs.Content
							forceMount
							key={key}
							value={block.id}
							className={cn(
								"w-full",
								"px-10",
								"py-10",
								"mb-20",
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
									field: name, fieldspan, component, ...fieldsProps }: any,
									key: number
								) => <Fragment key={key}>
										{component == "hidden" ? null :
											<Forms.Field
												name={name}
												control={control}
												render={({ field }) => <>
													{component == "pageviews" && <PageViews datas={fieldsProps} />}
													{component !== "pageviews" && <Forms.Item colspan={fieldspan}>
														<Forms.Component
															component={component}
															control={control}
															fieldsProps={{ ...fieldsProps }}
															field={field}
														/>
													</Forms.Item>}
												</>

												}
											/>
										}</Fragment>)}
							</Forms.Block>
						</Tabs.Content>
					))}
				</ScrollAreas.Root>
			</Tabs.Root> : null}

		</section>
	)
})

EditorsViewsContents.displayName = "EditorsViewsContents"
export default EditorsViewsContents

