// import type {
//     ViewsNavigationsType,
//     ViewsHeadersType
// } from './components';


export interface DatasViewsDatasetsTypes {
	headers: {
		title: string;
		name: string;
		description: string;
	};
	functions: [];
	categories: [];
	searchs: [];
	lists: {
		id: string | number;
		title?: string;
		description?: string;
		created_at?: string;
		updated_at?: string;
	} & { [key: string]: any }[];
	pagination: [];
}

//ListsViewsConfigs
export interface DatasViewsConfigs {
	templates: DatasViewsTemplatesTypes<"defaults">;
	settings: any;
	actions: any;
}

export type DatasViewsTemplatesTypes<T> = {
	name: T;
} & {
	headers: { name: string; slots: any };
	functions: [];
	categories: [];
	searchs: [];
	lists: { name: string; slots: any };
	pagination: [];
};
