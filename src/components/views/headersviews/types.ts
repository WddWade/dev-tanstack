import type {
	LogosConfigs,
	LogosDatasets,
	NavigationsConfigsTypes,
	NavigationsDatasetsTypes,
	PersonalsConfigs,
	PersonalsDatasets,
	NotificationsConfigs,
	NotificationsDatasets,
} from "./components";


export interface HeadersViewsDatasetsTypes {
	logos?: LogosDatasets;
	personals?: PersonalsDatasets;
	notifications?: NotificationsDatasets;
	navigations?: NavigationsDatasetsTypes;
	// logouts?: LogoutsDatasetsTypes
}

//HeadersViewsConfigs
export interface HeadersViewsConfigs {
	templates: HeadersViewsTemplatesTypes<"defaults" | "vertical">;
	settings: any;
	actions: any;
}

export type HeadersViewsTemplatesTypes<T> = {
	name: T;
} & {
	logos: LogosConfigs;
	personals: PersonalsConfigs;
	notifications: NotificationsConfigs;
	navigations: NavigationsConfigsTypes;
};

// type Aoc = Kof[keyof Kof]
