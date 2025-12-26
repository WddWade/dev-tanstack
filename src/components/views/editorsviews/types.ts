import { FieldType } from "@/components";

export interface ContentsViewsDatasetsTypes {
	headers?: {
		title: string;
		name: string;
	};
	titles?: {};
	contents?: {
		forms: any;
	};
	forms?: {};
	controllers?: {};
}

export interface ContentsViewsConfigs {
	templates: ContentsViewsTemplatesTypes<"defaults" | "vertical">
	settings: any
	actions: any
}

export interface FormFields {
	id: string
	tabName: string
	title: string
	// columns: string
	fields: FieldType[]
}

export type ContentsViewsTemplatesTypes<T> = {
	name: T;
} & {
	headers?: {};
	titles?: {};
	contents?: {
		forms: any;
	};
	controllers?: {};
};
