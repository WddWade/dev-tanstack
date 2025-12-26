// import type { SitesNavsMenusTypes, SitesTypes } from "@/types";


// SidesViewsDatasets
export interface SidesViewsDatasetsTypes {
	sitesDatas: any[];
	sitesSelects: any[];
	siteNavigations: {
		[sitesLagnuageName: string]: any[];
	};
}

// SidesViewsConfigs
export interface SidesViewsConfigs {
	templates: SidesViewsTemplatesTypes<"defaults" | "sitesSideBars">;
	settings: any;
	actions: any;
}

// SidesViewsTemplates
export type SidesViewsTemplatesTypes<T> = {
	name: T;
} & {
	sitesSelects: {};
	siteNavigations: [];
};
