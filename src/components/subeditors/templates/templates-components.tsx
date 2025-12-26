"use client"

import { TemplatesComponents as Components } from "./components"

export interface TemplatesComponentsProps {
	label?: string
	field?: string
	value?: string
	defaultsValue?: string
	component?: string
}

export const TemplatesComponents: React.FC<TemplatesComponentsProps> = ({
	component,
	...props
}) => {

	return (
		<>
			{component == "text" && <Components.Text {...props} />}
			{component == "paragraph" && <Components.Paragraph {...props} />}
			{component == "date" && <Components.Date {...props} />}
		</>
	)
}
