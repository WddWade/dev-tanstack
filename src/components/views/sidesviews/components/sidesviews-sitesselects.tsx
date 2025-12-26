"use client"

import { memo, startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { usePathname, useRouter } from "next/navigation"
import { IconMenu2, IconWorld } from '@tabler/icons-react'
import { Accordions, Loaders, LoadersSpinners, useViews } from "@/components"
import { cn, sleep } from "@/utils"
// import type { SitesTypes } from "@/types"
import { Globe } from "lucide-react"

interface PropsType {
	datas?: any[]
	area: string
	sites?: string
}

const SidesSitesSelects: React.FC<PropsType> = memo(({ datas, area, sites: params = "" }) => {

	const { leaveEditorsViewsEdited } = useViews()

	// const router = useRouter()
	// const pathname = usePathname()

	const [language, setLanguage] = useState("")
	const [isLoading, setLoading] = useState(false)

	const currentSitesDatas = useMemo(() => datas
		? datas.find(sites => params.startsWith(sites.route))
		: null, [datas, params])

	const currentSiteLanguageName = useMemo(() => {
		if (!currentSitesDatas?.sites) return "Undefined"
		return currentSitesDatas.sites?.find((site: Record<string, any>) => site.route == params)?.name
	}, [currentSitesDatas?.sites, params])

	const onChangeRoute = useCallback(async (
		site?: Record<string, any>
	) => startTransition(async () => {

		const { name, route } = site || {}
		if (currentSiteLanguageName == name) return setLanguage("")

		const actions = await leaveEditorsViewsEdited()
		if (actions == "save") return setLanguage("")

		const nextRoute = "/" + area + "/" + (route ? route : params)
		// if (pathname == nextRoute) return

		setLanguage("")
		setLoading(true)

		await sleep(300)
		// router.push(nextRoute as any)
	}), [
		// area, params, pathname,
		currentSiteLanguageName,
		leaveEditorsViewsEdited,
	])

	// useEffect(() => {
	// 	setLanguage("")
	// 	setLoading(false)
	// }, [pathname])

	return (
		<section
			data-components="sidesSitesSelects"
			className={cn(
				"flex",
				"flex-col",
				"justify-start",
				"gap-divider-line"
			)}
		>
			<div
				data-components="sites"
				className={cn(
					"min-h-view-header",
					"flex",
					"justify-between",
					"items-center",
					"flex-1",
					"px-space",
					"py-0",
					"bg-background",
					"gap-2.5",
				)}
			>
				<div
					data-components="current-site-name"
					className={cn(
						"font-medium",
						"line-clamp-1",
						"flex-1",
					)}
				>
					<div
						onClick={() => onChangeRoute()}
						className="cursor-pointer"
					>
						{currentSitesDatas?.name}
					</div>
				</div>
				<div data-components="button">
					<button
						className={cn(
							"flex",
							"items-center",
							"cursor-pointer",
							"bg-transparent"
						)}
					>
						<IconMenu2 size="16" />
					</button>
				</div>
			</div>
			<div
				data-components="languages"
				className={cn(
					"flex-col",
					"justify-start",
					"items-stretch",
					"bg-background"
				)}
			>
				<Accordions.Root
					type="single"
					value={language}
					onValueChange={(setLanguage)}
					collapsible
				>
					<Accordions.Item
						value={"language"}
					>
						<Accordions.Trigger
							data-components="selected"
							className={cn(
								"w-full",
								"min-h-view-header",
								"px-space",
								"py-0",
								"flex",
								"justify-start", "items-center",
								"cursor-pointer",
								"hover:no-underline",
								"[&_.arrow]:hidden"
							)}
						>
							<div
								data-components="name"
								className={cn(
									"text-xs",
									"flex-1",
									"font-normal",
									"flex",
									"justify-between"
								)}
							>
								{currentSiteLanguageName}語系
							</div>

							{isLoading
								? <LoadersSpinners />
								: <Globe size={15} />
							}
						</Accordions.Trigger>
						<Accordions.Content className="p-0">
							{currentSitesDatas?.sites && <ul
								data-components="lists"
								className={cn(
									"max-h-[250px]",
									"overflow-y-auto",
									"flex flex-col",
									"[&_li]:flex-1",
									"[&_li]:py-1.5",
									"[&_li]:px-space",
									"[&_li]:cursor-pointer",
									"[&_li]:bg-transparent",
									"[&_li]:transition-all duration-300",
									"[&_li]:data-[active=true]:text-xs",
									"[&_li]:data-[active=true]:bg-black",
									"[&_li]:data-[active=true]:text-white",
									" [&_li]:hover:bg-[#f2f2f2]",
								)}
							>
								{currentSitesDatas?.sites.map((site: any, index: number) =>
									<li
										key={site.id}
										data-active={currentSiteLanguageName == site.name}
										className={cn(
											"px-0",
											"py-0",
											"text-xs"
										)}
										onClick={() => onChangeRoute(site)}
									>
										{index == 0 ? site.name + "-預設" : site.name}
									</li>
								)}
							</ul>}
						</Accordions.Content>
					</Accordions.Item>
				</Accordions.Root>
			</div>
		</section >
	)
})

SidesSitesSelects.displayName = "SidesSitesSelects"
export default SidesSitesSelects


