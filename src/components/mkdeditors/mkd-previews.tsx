"use client"

import { useEffect } from "react"
// import MDEditor from "@uiw/react-md-editor"
import { cn } from "@/utils"
// import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview'

interface PropsTypes extends MarkdownPreviewProps {
	value?: string
}

export const previewsOptions = {
	components: {
		code: ({ node, inline, className, children, ...props }: any) => (
			<code
				data-color-mode="dark"
				{...props}
			>{children}
			</code>
		)
	},
	className: cn(
		"dark-prism",
		"prism-theme-github-copilot",
		"prism-material-dark",
		"prism-one-dark",
		"prism-laserwave",
		"dracula-prism",
		"prism-xonokai",
		"selection:bg-yellow-300",
		"selection:text-black"
	),
	wrapperElement: {
		"data-color-mode": "light"
	},
	style: {
		display: "flex",
		flexDirection: "column",
	}
} as any

const MkdPreviews: React.FC<PropsTypes> = (props) => {

	useEffect(() => {
		const elementsWithId = Array.from(document.querySelectorAll('[id]'));
		// console.log(elementsWithId.map((el) => el.textContent));
	}, [])

	return (
		// <MDEditor.Markdown
		// 	{...props}
		// 	{...previewsOptions}
		// />
		null
	)
}

MkdPreviews.displayName = "MkdPreviews"
export default MkdPreviews
