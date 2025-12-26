export const genRoutePrefix = (
	views: string,
	parameters: Record<string, string>
) => {
	const genRoutePrefixs = (prefixs: string[]) => "/" + prefixs.join("/")
	switch (views) {
		case "cms-units-roots":
		case "cms-units-index":
			return genRoutePrefixs([
				parameters.area,
				parameters.sites,
				parameters.units
			])
		case "cms-units-contents":
			return genRoutePrefixs([
				parameters.area,
				parameters.sites,
				parameters.units
			])
		default:
			return "/"
	}
}

export const genRemoteRoute = (
	views: string,
	parameters: Record<string, string>
) => {
	switch (views) {
		case "cms-units-roots":
			return [
				parameters.area,
				parameters.sites,
				"units",
				parameters.units
			]
		case "cms-units-index":
			return [
				parameters.area,
				parameters.sites,
				"units",
				parameters.units,
				"index"
			]
		case "cms-units-contents":
			return [
				parameters.area,
				parameters.sites,
				"units",
				parameters.units,
				"contents"
			]
		default:
			return []
	}
}

export const genBootsOptions = (
	views: string,
	parameters: Record<string, string>,
	boots?: Record<string, any>,
): Record<string, any> => {

	if (!boots) return {}
	switch (parameters.area) {
		case "cms":
			return boots
				?.[parameters.area]
				?.[parameters.sites]
				?.[parameters.units]
				?.[views]

		default:
			return {}
	}
}

export const genUnitsViewsOptions = (options: {
	views: string
	boots?: Record<string, any>
	parameters: Record<string, string>
}) => {
	const { views, boots, parameters } = options
	const viewsRoutePrefix = genRoutePrefix(views, parameters)
	const viewsRemoteRoute = genRemoteRoute(views, parameters)

	const {
		component: viewsComponent,
		cache: viewsQueryCache
	} = genBootsOptions(
		views, parameters, boots
	)

	return {
		viewsRoutePrefix,
		viewsRemoteRoute,
		viewsComponent,
		viewsQueryCache
	}
}
