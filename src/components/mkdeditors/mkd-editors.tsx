"use client"

import MDEditor from "@uiw/react-md-editor"
import type { MDEditorProps } from "@uiw/react-md-editor"
import { previewsOptions } from "./mkd-previews"
import { cn } from "@/utils"

interface PropsTypes extends MDEditorProps { }

const MkdEditors: React.FC<PropsTypes> = ({ className, ...props }) => {

	return (
		<div className={cn("w-full grid grid-cols-1", className)}>
			<MDEditor
				data-color-mode="light"
				height={"100vh"}
				maxHeight={500}
				previewOptions={{ ...previewsOptions }}
				{...props}
			/>
			{/* <MDEditor.Markdown source={codes} style={{ whiteSpace: "pre-wrap" }} /> */}
		</div>
	)
}

MkdEditors.displayName = "MkdEditors"
export default MkdEditors
