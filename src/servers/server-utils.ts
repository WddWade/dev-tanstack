export const getRouteAddress = (routes: string[]) => ("/" + routes.join("/"))

export const getViewsCacheTags = (nodes: string[]) => nodes
	.reduce((
		init: string[], currentNode: string, index: number
	) => index === 0 ? [currentNode] : [...init, (init[index - 1] + ":" + currentNode)], [])
	.reverse()

export const getDatasQueryKey = (keys: string[]) => [keys.join("/"), "query-key"]
