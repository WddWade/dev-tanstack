

export type ViewsEditorActions = | "create" | "update"
export type ViewsRemoveActions = | "delete" | "reset" | "unlink";
export type ViewsActions = ViewsEditorActions | ViewsRemoveActions
export type ViewsMutationActions = Exclude<ViewsActions, "unlink" | "reset">

export interface ViewsCaches {
	remove: string[][]
	invalidate: string[][]
}

export type ViewsResizeStores = {
	resize: boolean;
	resizeStoreKey?: string;
	resizeStoreValue?: {
		width?: number | string
		height?: number | string
	}
	resizeStore?: boolean;
	resizeMinWidth?: number;
	resizeMaxWidth?: number;
	resizeMinHeight?: number;
	resizeMaxHeight?: number;
}

export interface ViewsDatas<
	Cdatas = Record<string, any>,
	Tdatas = Record<string, any>
> {
	configs?: Cdatas
	datasets?: Tdatas
	resizeStores?: ViewsResizeStores
	cache?: ViewsCaches
}




