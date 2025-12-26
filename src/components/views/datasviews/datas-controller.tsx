import { DragablePanels, DragBoxs } from "@/components"
import { Check, Funnel, Grip, RotateCcw } from "lucide-react"
import { cn } from "@/utils"

interface PropsTypes {
	active?: boolean
	defaultPosX?: number
	defaultPosY?: number
	panelWidth?: number
	panelHeight?: number
	setClose?: () => void
}

const DatasController: React.FC<PropsTypes> = ({
	active,
	defaultPosX = 0,
	defaultPosY = 0,
	panelWidth = 250,
	panelHeight = 600,
	setClose
}) => {

	return (
		<>
			{active && <DragBoxs
				defaultPosX={defaultPosX}
				defaultPosY={defaultPosY}
			>
				<DragablePanels.Root
					data-components="datasView-datasController"
					width={panelWidth}
					height={panelHeight}
					className={cn(
						"animate-in",
						"fade-in",
						"slide-in-from-top-[1%]",
						"slide-in-from-left-[1%]"
					)}
				>
					<DragablePanels.Header
						closeHandler={setClose}
						className={cn(
							"min-h-view-header",
							"*:inline-flex",
							"*:gap-x-1.5",
							"*:items-center"
						)}
					>
						<Grip size={15} strokeWidth={2.5} />
						<span>Data Controller</span>
					</DragablePanels.Header>
					<section className={cn(
						"flex-1",
						// "border-b-1",
						"bg-background",
						// "border-b-divider-line",
					)}>
						<div className={cn(
							"flex",
							"flex-row",
							"flex-nowrap",
							"items-center",
							"gap-5",
							"px-5",
							"min-h-view-header",
							// "bg-black/5",
						)}>
							<div>Filter</div>
							<div>Sort</div>
							<div>View</div>
							<div>Setting</div>
						</div>

					</section>
					<DragablePanels.Body>
						<section className={cn(
							"bg-divider-line",
							"flex flex-col gap-px",
							"*:px-5",
							"*:py-5",
							"*:bg-white",
						)}>
							<div className={"flex flex-col gap-1"}>
								<span className={"flex justify-between items-center"}>
									<p className={"text-sm font-medium"}>Main Categories</p>
									<div className="flex gap-0.5 items-center">
										<Funnel size={13} />
										<span>5</span>
									</div>
								</span>
								<div className="relative">
									<input
										type="text"
										id="floating_standard"
										className={cn(
											"my-1",
											"peer",
											"block",
											"py-1.5",
											"px-3",
											"w-full",
											"text-gray-900",
											"bg-transparent",
											"border-2",
											"rounded",
											// "border-b-2",
											"border-gray-200",
											"appearance-none",
											"dark:text-white",
											"dark:border-gray-600",
											"dark:focus:border-blue-500",
											"focus:outline-none",
											"focus:ring-0",
											"focus:border-stone-800",
										)}
										placeholder="input filter..."
									/>
									<div className={cn(
										"hidden",
										"overflow-y-auto",
										"absolute",
										"z-1",
										"w-full",
										"h-fit",
										"max-h-52",
										"bg-black",
										"text-white",
										"border",
										"rounded",
										"peer-focus:block",
										"py-4",
										"px-3.5",
										"shadow-lg",
									)}>
										<ul className={cn(
											"flex",
											"flex-col",
											"gap-2",
										)}>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>E-commerce</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>E-commerce</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>E-commerce</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>E-commerce</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>UI/UX Design</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Branding</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} className="opacity-40" /><div>E-commerce</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Front-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>Back-end Dev</div></li>
											<li className="flex gap-2 items-center"><Check size={15} /><div>E-commerce</div></li>
										</ul>
									</div>
								</div>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input
													id="comments"
													aria-describedby="comments-description"
													name="comments"
													type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)}
													defaultChecked
												/>
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">Branding</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">Front-end Dev</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">Back-end Dev</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">E-Commerce</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span className={"flex justify-between items-center"}>
									<p className={"text-sm font-medium"}>Sub Categories</p>
									<div className="flex gap-0.5 items-center">
										{/* <Funnel size={13} />
										<span>0</span> */}
									</div>
								</span>
								<div className="relative">
									<input
										type="text"
										id="floating_standard"
										className={cn(
											"my-1",
											"peer",
											"block",
											"py-1.5",
											"px-3",
											"w-full",
											"text-gray-900",
											"bg-transparent",
											"border-2",
											"rounded",
											// "border-b-2",
											"border-gray-200",
											"appearance-none",
											"dark:text-white",
											"dark:border-gray-600",
											"dark:focus:border-blue-500",
											"focus:outline-none",
											"focus:ring-0",
											"focus:border-stone-800",
										)}
										placeholder="input filter..."
									/>
									<div className={cn(
										"hidden",
										"overflow-y-auto",
										"absolute",
										"z-1",
										"w-full",
										"h-fit",
										"max-h-52",
										"bg-black",
										"text-white",
										"border",
										"rounded-sm",
										"peer-focus:block",
										"py-3",
										"px-3.5",
										"mt-1",
										"shadow-lg",
									)}>
										<ul className={cn(
											"flex",
											"flex-col",
											"gap-2",
										)}>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
											<li>UI/UX Design</li>
											<li>Branding</li>
											<li>Front-end Dev</li>
											<li>Back-end Dev</li>
											<li>E-commerce</li>
										</ul>
									</div>
								</div>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">Back-end Dev</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">E-Commerce</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span className={"flex justify-between items-center"}>
									<p className={"text-sm font-medium"}>Status</p>
									<span>All</span>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span>
									<p className={"text-sm font-medium"}>Date</p>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span>
									<p className={"text-sm font-medium"}>Users</p>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span>
									<p className={"text-sm font-medium"}>Categories</p>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span>
									<p className={"text-sm font-medium"}>Account</p>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
							<div className={"flex flex-col gap-1"}>
								<span>
									<p className={"text-sm font-medium"}>Rwview</p>
								</span>
								<div>
									<div className="mt-2 space-y-1">
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
										<div className="flex items-center gap-x-3">
											<div className="group grid size-4 grid-cols-1">
												<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox"
													className={cn(
														"col-start-1",
														"row-start-1",
														"appearance-none",
														"rounded-[4px]",
														"border",
														"border-gray-300",
														"bg-white",
														"checked:border-black",
														"checked:bg-black",
														"indeterminate:border-black",
														"indeterminate:bg-black",
														"focus-visible:outline-2",
														"focus-visible:outline-offset-2",
														"focus-visible:outline-black",
														"disabled:border-gray-300",
														"disabled:bg-gray-100",
														"disabled:checked:bg-gray-100",
														"forced-colors:appearance-auto"
													)} />
												<svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
													<path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													<path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<label htmlFor="push-email" className="block text-gray-900">UI/UX Design</label>
										</div>
									</div>
								</div>
							</div>
						</section>
					</DragablePanels.Body>
					<DragablePanels.Footer
						className="flex items-center p-0"
					>
						<div className={cn(
							"flex",
							"w-full",
							"inline-flex",
							"gap-x-px",
							"bg-divider-line",
							"justify-center",
							"*:flex-1",
							"*:flex",
							"*:justify-center",
							"*:items-center",
							"*:bg-background",
							"*:min-h-view-footer",
							"*:cursor-pointer",
						)}>
							<button><RotateCcw size={13} strokeWidth={2.5} /></button>
							<button><Check size={15} strokeWidth={2.5} /></button>
						</div>
					</DragablePanels.Footer>
				</DragablePanels.Root>
			</DragBoxs>}
		</>
	)
}

DatasController.displayName = "DatasController"
export default DatasController
